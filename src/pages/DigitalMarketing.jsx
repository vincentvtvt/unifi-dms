import { useState, useMemo, useEffect } from "react";
import { useTheme, Icons as I, Card, SectionLabel, WaBtn, waL, track } from "../theme";

const UB = { blue:"#0033A1", sky:"#00A3E0", navy:"#001A5C", orange:"#FF6B00", green:"#00B67A", red:"#E5002B" };
const PLATFORMS_SHOWN = ["Facebook","Instagram","Google","TikTok","YouTube","Rev Media"];

/* ═══ DMS PLANS (official) ═══ */
const PLANS = [
  {name:"Standard",mo:100,cr:840,camp:"1.5–2 months",goal:"Awareness",color:UB.blue},
  {name:"Premium",mo:200,cr:1680,camp:"Up to 3 months",goal:"Engagement",color:UB.sky},
  {name:"Prime",mo:450,cr:3500,camp:"5–6 months",goal:"Sales conversion",color:UB.orange,pop:"Best Value"},
  {name:"Pro",mo:900,cr:7000,camp:"Up to 12 months",goal:"Dominate your market",color:UB.red},
];

/* ═══ CALCULATOR SETTINGS — edit here ═══
   INDUSTRY: cpl = cost per lead on Facebook (RM), close = % of leads that buy,
   deal = default sale value (customer can change it).
   PLATFORM: x = cost-per-lead multiplier vs Facebook. */
const INDUSTRY = {
  "F&B":       {cpl:5,  close:40, deal:50},
  "Retail":    {cpl:8,  close:20, deal:150},
  "Beauty":    {cpl:12, close:25, deal:200},
  "Services":  {cpl:20, close:15, deal:800},
  "Education": {cpl:25, close:10, deal:2500},
  "Property":  {cpl:35, close:2,  deal:10000},
};
const PLATFORM = {
  fb:     {name:"Facebook & Instagram", color:"#1877F2", x:1.0},
  google: {name:"Google",               color:"#EA4335", x:1.8},
  tiktok: {name:"TikTok",               color:"#111111", x:1.2},
};
const REVENUE_PRESETS = [1000,2000,3000,5000,10000];
/* DMS credits are spread over the 12 months you pay → average ad budget per month */
const adPerMonth = p => Math.round(p.cr/12);

/* monthly revenue → sales → leads → monthly ad budget → smallest plan that covers it */
function plan(revenue, deal, industry, platforms){
  const ind = INDUSTRY[industry];
  const keys = platforms.length ? platforms : ["fb"];
  const cpl = ind.cpl * keys.reduce((a,k)=>a+PLATFORM[k].x,0)/keys.length;
  const sales = Math.ceil(revenue/Math.max(1,deal));
  const leads = Math.ceil(sales/(ind.close/100));
  const budget = Math.ceil(leads*cpl/10)*10;
  const idx = PLANS.findIndex(p=>adPerMonth(p)>=budget);
  const pkg = PLANS[idx===-1?PLANS.length-1:idx];
  return {sales, leads, budget, cpl, pkg, over:idx===-1, topup:Math.max(0,budget-adPerMonth(pkg))};
}
const fmt = n => Math.round(n).toLocaleString();
const HERO = plan(2000,50,"F&B",["fb","tiktok"]);

const STEPS = [
  {d:"Day 1",t:"Subscribe",s:"Sign up via WhatsApp. Confirmation sent, charges go to your Unifi bill."},
  {d:"Day 3",t:"Onboarding",s:"Your Campaign Manager calls you. Share your logo, photos and offers."},
  {d:"Day 8",t:"First draft",s:"Review ad creatives and copy. One free revision included."},
  {d:"Day 10",t:"Go live",s:"Ads launch. Your team optimises and sends performance reports."},
];

const FAQ = [
  ["What is Unifi Digital Marketing Solution?","Malaysia's first instalment-based marketing plan. You get your full ad budget (credits) upfront and pay it back in low monthly instalments over 12 months, while a dedicated team runs your campaigns."],
  ["How do ad credits work?","1 credit = RM1 of ad spend. Credits are used on the supported platforms during your campaign period, e.g. Standard gives 840 credits."],
  ["Which platforms will my ads run on?","Facebook, Instagram, Google, TikTok, YouTube and the Rev Media network. Your Campaign Manager picks the mix that fits your goal."],
  ["Is video production included?","No. Video is not included in any plan. If you want one, it can be produced by redeeming 680 credits per video."],
  ["Who does the work?","A dedicated 3-person team: Campaign Manager, Graphic Designer and Copywriter (BM & English)."],
  ["How long until my ads go live?","About 10 days from subscription: onboarding on day 3, first draft on day 8, live by day 10."],
  ["Can I make changes after the campaign is live?","One free revision is included during the draft stage. Changes are not allowed once the campaign is live."],
  ["Who is eligible?","Businesses with a valid SSM registration. Charges are billed through your Unifi account on a 12-month subscription."],
  ["Are the calculator results guaranteed?","No. They are estimates based on typical Malaysian SME ad costs. Actual results depend on your offer, creatives, location and competition."],
];

function Calculator(){
  const T = useTheme();
  const [revenue,setRevenue] = useState(2000);
  const [industry,setIndustry] = useState("F&B");
  const [deal,setDeal] = useState(INDUSTRY["F&B"].deal);
  const pickIndustry = k => { setIndustry(k); setDeal(INDUSTRY[k].deal); };
  const [platforms,setPlatforms] = useState(["fb","tiktok"]);
  const toggle = k => setPlatforms(p => p.includes(k) ? (p.length>1 ? p.filter(x=>x!==k) : p) : [...p,k]);
  const r = useMemo(()=>plan(revenue,deal,industry,platforms),[revenue,deal,industry,platforms]);
  const p = r.pkg;

  const waMsg = `I used the DMS calculator.\n• Monthly revenue target: RM${fmt(revenue)}\n• Avg. sale: RM${fmt(deal)}\n• Industry: ${industry}\n• Platforms: ${platforms.map(k=>PLATFORM[k].name).join(", ")}\n• Per month: ${fmt(r.sales)} sales · ~${fmt(r.leads)} leads · ~RM${fmt(r.budget)} ads\n• Suggested: *${p.name} Pack* (RM${p.mo}/mo)\nI want to get started.`;
  const goWA = () => { track("calc_whatsapp"); window.open(waL(waMsg,"dms_calculator"),"_blank"); };

  const chip = (on,c=UB.blue) => ({padding:"10px 16px",borderRadius:999,border:`1.5px solid ${on?c:T.border}`,background:on?c+"12":"white",color:on?c:T.text,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"});
  const label = {fontSize:12,fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:10};

  return <div className="calc-grid" style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)",gap:20,alignItems:"stretch"}}>
    <Card hover={false} style={{padding:26,display:"flex",flexDirection:"column",gap:26}}>
      <div>
        <div style={label}>1 · Revenue you want from ads (per month)</div>
        <div style={{display:"flex",alignItems:"center",border:`1.5px solid ${T.border}`,borderRadius:12,padding:"0 14px",marginBottom:10}}>
          <span style={{fontSize:20,fontWeight:700,color:T.muted}}>RM</span>
          <input type="number" min={0} step={1000} value={revenue} onChange={e=>setRevenue(Math.max(0,+e.target.value))} style={{width:"100%",border:"none",outline:"none",padding:"12px 8px",fontSize:26,fontWeight:800,color:UB.navy,fontFamily:"'DM Sans',sans-serif",background:"transparent"}}/>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {REVENUE_PRESETS.map(v=><button key={v} onClick={()=>setRevenue(v)} style={{...chip(revenue===v,UB.orange),padding:"6px 12px",fontSize:12}}>RM{v>=1000?v/1000+"k":v}</button>)}
        </div>
      </div>
      <div>
        <div style={label}>2 · Your average sale value</div>
        <div style={{display:"flex",alignItems:"center",border:`1.5px solid ${T.border}`,borderRadius:12,padding:"0 14px"}}>
          <span style={{fontSize:16,fontWeight:700,color:T.muted}}>RM</span>
          <input type="number" min={1} value={deal} onChange={e=>setDeal(Math.max(1,+e.target.value))} style={{width:"100%",border:"none",outline:"none",padding:"10px 8px",fontSize:20,fontWeight:800,color:UB.navy,fontFamily:"'DM Sans',sans-serif",background:"transparent"}}/>
          <span style={{fontSize:12,color:T.muted,whiteSpace:"nowrap"}}>per sale</span>
        </div>
      </div>
      <div>
        <div style={label}>3 · Your industry</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {Object.keys(INDUSTRY).map(k=><button key={k} onClick={()=>pickIndustry(k)} style={chip(industry===k)}>{k}</button>)}
        </div>
      </div>
      <div>
        <div style={label}>4 · Platforms</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {Object.entries(PLATFORM).map(([k,v])=><button key={k} onClick={()=>toggle(k)} style={{...chip(platforms.includes(k),v.color),display:"inline-flex",alignItems:"center",gap:8}}>
            <span style={{width:16,height:16,borderRadius:4,border:`2px solid ${v.color}`,background:platforms.includes(k)?v.color:"white",display:"inline-flex",alignItems:"center",justifyContent:"center"}}>{platforms.includes(k)&&I.check("white",11)}</span>{v.name}
          </button>)}
        </div>
      </div>
    </Card>

    <div style={{background:`linear-gradient(135deg, ${UB.navy}, ${UB.blue})`,borderRadius:16,padding:26,color:"white",display:"flex",flexDirection:"column",gap:18}}>
      <div style={{fontSize:12,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:UB.orange}}>To make RM{fmt(revenue)} every month you need</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
        {[["Sales",fmt(r.sales),`at RM${fmt(deal)} each`],["Leads",`~${fmt(r.leads)}`,`${INDUSTRY[industry].close}% buy`],["Ad budget",`RM${fmt(r.budget)}`,`~RM${fmt(r.cpl)}/lead`]].map(([a,b,c])=><div key={a} style={{background:"rgba(255,255,255,0.08)",borderRadius:12,padding:"14px 12px"}}>
          <div style={{fontSize:12,opacity:0.65}}>{a}</div>
          <div style={{fontSize:"clamp(22px,3.6vw,32px)",fontWeight:800,lineHeight:1.15}}>{b}</div>
          <div style={{fontSize:11,opacity:0.5}}>{c}</div>
        </div>)}
      </div>
      <div style={{fontSize:11,opacity:0.5,marginTop:-8,textAlign:"right"}}>all figures per month</div>

      <div style={{background:"white",color:T.text,borderRadius:14,padding:20,borderTop:`5px solid ${p.color}`}}>
        <div style={{fontSize:11,fontWeight:700,color:UB.green,display:"flex",alignItems:"center",gap:4,marginBottom:4}}>{I.check(UB.green,14)} YOUR PACKAGE</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",flexWrap:"wrap",gap:8}}>
          <div style={{fontSize:24,fontWeight:800}}>{p.name} Pack</div>
          <div style={{fontSize:30,fontWeight:800,color:p.color}}>RM{p.mo}<span style={{fontSize:14,color:T.muted,fontWeight:500}}>/mo</span></div>
        </div>
        <div style={{fontSize:13,color:T.muted,margin:"4px 0 16px"}}>{p.cr.toLocaleString()} ad credits ≈ <b style={{color:T.text}}>RM{fmt(adPerMonth(p))} of ads every month</b> · 3-person team</div>
        {r.over&&<div style={{fontSize:12,background:UB.orange+"12",color:UB.orange,borderRadius:8,padding:"8px 10px",marginBottom:12,fontWeight:600}}>Your target needs about RM{fmt(r.topup)}/month more in ads than Pro covers. WhatsApp us for top-up credits or a custom plan.</div>}
        <button onClick={goWA} style={{width:"100%",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,background:"#25D366",color:"white",border:"none",padding:"14px 20px",borderRadius:10,fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>{I.msg("white",18)} Get {p.name} on WhatsApp</button>
      </div>
      <p style={{fontSize:11,opacity:0.5,lineHeight:1.5}}>Estimate based on typical {industry} cost per lead and close rate in Malaysia. Ad credits are averaged over your 12-month subscription; your campaign may spend them faster. Actual results vary. Prices exclude 6% SST.</p>
    </div>
  </div>;
}

export default function DigitalMarketing(){
  const T = useTheme();
  const [showTable,setShowTable] = useState(false);
  const [faq,setFaq] = useState(0);
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  useEffect(()=>{ if(window.location.hash){ const t=setTimeout(()=>scrollTo(window.location.hash.slice(1)),300); return ()=>clearTimeout(t);} },[]);
  const wrap = {maxWidth:1100,margin:"0 auto",padding:"0 20px"};

  return <>
    <style>{`@media(max-width:860px){.calc-grid{grid-template-columns:1fr!important}.dm-hero{flex-direction:column!important;text-align:center}.dm-hero-btns{justify-content:center}.dm-logos{justify-content:center}}`}</style>

    {/* 1 · HERO */}
    <section style={{background:`linear-gradient(135deg, ${UB.navy} 0%, ${UB.blue} 60%, ${UB.sky} 100%)`,color:"white",padding:"110px 0 70px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-120,right:-120,width:420,height:420,borderRadius:"50%",background:"rgba(255,255,255,0.05)"}}/>
      <div style={{position:"absolute",bottom:-160,left:-80,width:360,height:360,borderRadius:"50%",background:"rgba(255,107,0,0.12)"}}/>
      <div className="dm-hero" style={{...wrap,display:"flex",gap:40,alignItems:"center",position:"relative"}}>
        <div style={{flex:"1 1 520px"}}>
          <div style={{display:"inline-block",padding:"6px 14px",borderRadius:8,background:"rgba(255,255,255,0.12)",fontSize:12,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:16}}>Unifi Business · Digital Solutions</div>
          <h1 style={{fontSize:"clamp(32px,5.5vw,54px)",fontWeight:800,lineHeight:1.08,marginBottom:16}}>Digital Marketing Solution (DMS)</h1>
          <p style={{fontSize:18,opacity:0.85,lineHeight:1.6,marginBottom:28,maxWidth:520}}>Your own marketing team and full ad budget upfront. Pay in low monthly instalments from <b style={{color:"#FFB27A"}}>RM100/month</b>.</p>
          <div className="dm-hero-btns" style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:28}}>
            <button onClick={()=>{track("dm_hero_calc");scrollTo("calculator");}} style={{background:UB.orange,color:"white",border:"none",padding:"14px 26px",borderRadius:10,fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Estimate My Leads</button>
            <WaBtn text="WhatsApp Us" msg="I want to know more about Digital Marketing Solution (DMS)." utm="dm_hero"/>
          </div>
          <div className="dm-logos" style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {PLATFORMS_SHOWN.map(p=><span key={p} style={{padding:"6px 12px",borderRadius:8,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",fontSize:12,fontWeight:600}}>{p}</span>)}
          </div>
        </div>
        <div style={{flex:"0 1 380px",width:"100%",maxWidth:380}}>
          <div style={{background:"white",borderRadius:18,padding:22,color:T.text,boxShadow:"0 24px 60px rgba(0,0,0,0.25)"}}>
            <div style={{fontSize:12,color:T.muted,fontWeight:600,marginBottom:12}}>F&amp;B example · RM2,000 revenue per month</div>
            {[["Sales per month",fmt(HERO.sales)],["Leads per month",`~${fmt(HERO.leads)}`],["Ad budget per month",`RM${fmt(HERO.budget)}`],["Platforms","Facebook + TikTok"]].map(([a,b])=><div key={a} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${T.border}`,fontSize:14}}><span style={{color:T.muted}}>{a}</span><b>{b}</b></div>)}
            <div style={{marginTop:14,background:UB.green+"12",borderRadius:10,padding:12,textAlign:"center"}}>
              <div style={{fontSize:11,color:UB.green,fontWeight:700}}>Your package</div>
              <div style={{fontSize:24,fontWeight:800,color:UB.navy}}>{HERO.pkg.name} · RM{HERO.pkg.mo}/mo</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 2 · WHAT IS DMS */}
    <section style={{...wrap,padding:"64px 20px 24px",textAlign:"center",maxWidth:820}}>
      <SectionLabel text="What is DMS"/>
      <h2 style={{fontSize:"clamp(24px,4vw,34px)",fontWeight:800,marginBottom:14}}>Malaysia's first instalment-based marketing plan</h2>
      <p style={{fontSize:16,color:T.muted,lineHeight:1.7}}>A credit-based model: you get your full ad budget upfront, then pay it in low monthly instalments over 12 months. A dedicated team plans, designs, writes and runs your ads across Facebook, Instagram, Google, TikTok, YouTube and Rev Media.</p>
    </section>

    {/* 3 · FEATURES */}
    <section style={{...wrap,padding:"24px 20px 64px"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16}}>
        {[
          {icon:I.users(UB.blue,26),c:UB.blue,t:"Digital marketing expertise",s:"A Campaign Manager, Graphic Designer and Copywriter run your campaigns end to end."},
          {icon:I.trending(UB.orange,26),c:UB.orange,t:"Maximum impressions",s:"Reach more people and get more leads by running across multiple ad platforms at once."},
          {icon:I.shield(UB.green,26),c:UB.green,t:"Pay over 12 months",s:"Full ad credits upfront, staggered payments. No big agency fee, no upfront cost."},
        ].map(f=><Card key={f.t} color={f.c} style={{padding:26}}>
          <div style={{width:52,height:52,borderRadius:14,background:f.c+"12",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14}}>{f.icon}</div>
          <h3 style={{fontSize:18,fontWeight:800,marginBottom:6}}>{f.t}</h3>
          <p style={{fontSize:14,color:T.muted,lineHeight:1.6}}>{f.s}</p>
        </Card>)}
      </div>
    </section>

    {/* 4 · PLANS */}
    <section id="plans" style={{background:T.sub,padding:"64px 0"}}>
      <div style={wrap}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <SectionLabel text="Plans"/>
          <h2 style={{fontSize:"clamp(24px,4vw,34px)",fontWeight:800}}>Let's find you the right plan</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:16}}>
          {PLANS.map(p=><Card key={p.name} color={p.color} style={{padding:0,border:p.pop?`2px solid ${p.color}`:undefined}}>
            {p.pop&&<div style={{background:p.color,color:"white",fontSize:11,fontWeight:700,textAlign:"center",padding:"6px 0",letterSpacing:1,textTransform:"uppercase"}}>{p.pop}</div>}
            <div style={{padding:24}}>
              <div style={{fontSize:12,fontWeight:700,color:p.color,letterSpacing:1,textTransform:"uppercase"}}>{p.name}</div>
              <div style={{fontSize:13,color:T.muted,marginBottom:10}}>{p.goal}</div>
              <div style={{fontSize:40,fontWeight:800,color:UB.navy,lineHeight:1}}><span style={{fontSize:15,color:T.muted}}>RM</span>{p.mo}<span style={{fontSize:14,color:T.muted,fontWeight:500}}>/mo</span></div>
              <div style={{margin:"18px 0",display:"flex",flexDirection:"column",gap:8,fontSize:14}}>
                <div style={{display:"flex",gap:8}}>{I.check(UB.green,16)}<b>{p.cr.toLocaleString()}</b> ad credits</div>
                <div style={{display:"flex",gap:8}}>{I.check(UB.green,16)}{p.camp} campaign</div>
                <div style={{display:"flex",gap:8}}>{I.check(UB.green,16)}3-person dedicated team</div>
              </div>
              <WaBtn text={`Get ${p.name}`} msg={`I want to apply for DMS *${p.name} Pack* (RM${p.mo}/mo, ${p.cr.toLocaleString()} credits).`} utm={`dm_plan_${p.name}`} sm style={{width:"100%"}}/>
            </div>
          </Card>)}
        </div>

        <div style={{textAlign:"center",marginTop:24}}>
          <button onClick={()=>setShowTable(!showTable)} style={{display:"inline-flex",alignItems:"center",gap:6,background:"white",border:`1px solid ${T.border}`,padding:"10px 18px",borderRadius:10,fontSize:13,fontWeight:700,color:UB.blue,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
            {showTable?"Hide":"Compare"} all plans <span style={{transform:showTable?"rotate(180deg)":"none",display:"inline-flex",transition:"transform 0.2s"}}>{I.chevDown(UB.blue)}</span>
          </button>
        </div>
        {showTable&&<Card hover={false} style={{marginTop:16,padding:0,overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,minWidth:560}}>
            <thead><tr style={{background:UB.navy,color:"white"}}><th style={{textAlign:"left",padding:"12px 16px"}}></th>{PLANS.map(p=><th key={p.name} style={{padding:"12px 8px"}}>{p.name}</th>)}</tr></thead>
            <tbody>
              {[
                ["Monthly payment",PLANS.map(p=>`RM${p.mo}`)],
                ["Ad credits",PLANS.map(p=>p.cr.toLocaleString())],
                ["Campaign duration",PLANS.map(p=>p.camp)],
                ["Best for",PLANS.map(p=>p.goal)],
                ["Dedicated team",PLANS.map(()=>"✓")],
                ["Video production",PLANS.map(()=>"Optional · 680 credits")],
                ["Subscription",PLANS.map(()=>"12 months")],
              ].map(([l,v],i)=><tr key={l} style={{background:i%2?"white":T.sub}}><td style={{padding:"11px 16px",fontWeight:600,color:T.muted}}>{l}</td>{v.map((x,j)=><td key={j} style={{padding:"11px 8px",textAlign:"center",fontWeight:x==="✓"?800:500,color:x==="✓"?UB.green:T.text}}>{x}</td>)}</tr>)}
            </tbody>
          </table>
        </Card>}
        <p style={{textAlign:"center",fontSize:12,color:T.muted,marginTop:14}}>1 ad credit = RM1 ad spend · Prices exclude 6% SST</p>
      </div>
    </section>

    {/* 5 · CALCULATOR */}
    <section id="calculator" style={{...wrap,padding:"72px 20px"}}>
      <div style={{textAlign:"center",marginBottom:32}}>
        <SectionLabel text="Package Calculator"/>
        <h2 style={{fontSize:"clamp(24px,4vw,34px)",fontWeight:800,marginBottom:8}}>How much do you want to make?</h2>
        <p style={{fontSize:15,color:T.muted}}>Tell us your monthly revenue target and average sale. We'll show the sales, leads, budget and package you need each month.</p>
      </div>
      <Calculator/>
    </section>

    {/* 6 · HOW IT WORKS */}
    <section style={{background:UB.navy,color:"white",padding:"64px 0"}}>
      <div style={wrap}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:12,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:UB.orange,marginBottom:8}}>How it works</div>
          <h2 style={{fontSize:"clamp(24px,4vw,34px)",fontWeight:800}}>Live in about 10 days</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14}}>
          {STEPS.map((s,i)=><div key={s.t} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:14,padding:22}}>
            <div style={{width:40,height:40,borderRadius:"50%",background:i===3?UB.orange:UB.sky,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,marginBottom:12}}>{i+1}</div>
            <div style={{fontSize:12,color:UB.sky,fontWeight:700}}>{s.d}</div>
            <h3 style={{fontSize:18,fontWeight:800,margin:"2px 0 6px"}}>{s.t}</h3>
            <p style={{fontSize:13,opacity:0.65,lineHeight:1.6}}>{s.s}</p>
          </div>)}
        </div>
      </div>
    </section>

    {/* 7 · FAQ */}
    <section style={{...wrap,maxWidth:820,padding:"64px 20px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <SectionLabel text="FAQ"/>
        <h2 style={{fontSize:"clamp(24px,4vw,34px)",fontWeight:800}}>Frequently asked questions</h2>
      </div>
      {FAQ.map(([q,a],i)=><div key={q} style={{borderBottom:`1px solid ${T.border}`}}>
        <button onClick={()=>setFaq(faq===i?-1:i)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,padding:"18px 0",background:"none",border:"none",cursor:"pointer",textAlign:"left",fontSize:15,fontWeight:700,color:T.text,fontFamily:"'DM Sans',sans-serif"}}>
          {q}<span style={{transform:faq===i?"rotate(180deg)":"none",transition:"transform 0.2s",display:"inline-flex",flexShrink:0}}>{I.chevDown(T.muted)}</span>
        </button>
        {faq===i&&<p style={{fontSize:14,color:T.muted,lineHeight:1.7,paddingBottom:18}}>{a}</p>}
      </div>)}
      <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",marginTop:24}}>
        <a href="https://biz.unifi.com.my/tncfaq/dms/FAQ_Unifi_Digital_Marketing_Solutions.pdf" target="_blank" rel="noreferrer" style={{padding:"10px 18px",borderRadius:10,border:`1px solid ${T.border}`,fontSize:13,fontWeight:600,color:UB.blue}}>Official FAQ (PDF)</a>
        <a href="https://biz.unifi.com.my/digital-solutions/digitalmarketingsolution" target="_blank" rel="noreferrer" style={{padding:"10px 18px",borderRadius:10,border:`1px solid ${T.border}`,fontSize:13,fontWeight:600,color:UB.blue}}>Terms &amp; Conditions</a>
      </div>
    </section>

    {/* 8 · CTA */}
    <section style={{background:`linear-gradient(135deg, ${UB.navy}, ${UB.blue})`,color:"white",padding:"64px 20px",textAlign:"center"}}>
      <h2 style={{fontSize:"clamp(26px,4.5vw,40px)",fontWeight:800,marginBottom:10}}>Ready to grow your business?</h2>
      <p style={{fontSize:16,opacity:0.75,marginBottom:24}}>From RM100/month. Your marketing team is one WhatsApp away.</p>
      <WaBtn text="WhatsApp Us to Apply" msg="I want to apply for Digital Marketing Solution (DMS)." utm="dm_footer_cta"/>
    </section>
  </>;
}
