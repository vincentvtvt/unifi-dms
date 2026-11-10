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

/* ═══ CALCULATOR BENCHMARKS — edit here ═══
   Malaysian SME estimates. cpm = RM per 1,000 impressions, cpc = RM per click,
   cvr = click-to-lead rate, ctr = used to estimate Google impressions. */
const BENCH = {
  fb:     {name:"Facebook & Instagram", color:"#1877F2", cpm:[8,15], cpc:[0.40,1.20], cvr:[0.03,0.07]},
  google: {name:"Google Search",        color:"#EA4335", ctr:[0.03,0.06], cpc:[1.00,4.00], cvr:[0.04,0.10]},
  tiktok: {name:"TikTok",               color:"#111111", cpm:[6,12], cpc:[0.30,1.00], cvr:[0.015,0.04]},
};
/* mult = cost multiplier on CPM/CPC · split = default budget mix
   deal = typical sale value (RM) · margin = profit % · close = % of leads that buy
   repeat = purchases per new customer in 12 months (F&B regulars come back) */
const INDUSTRY = {
  "F&B":       {mult:0.8, split:{fb:60,google:15,tiktok:25}, deal:40,    margin:60, close:30, repeat:6},
  "Retail":    {mult:0.9, split:{fb:50,google:20,tiktok:30}, deal:150,   margin:40, close:20, repeat:2},
  "Beauty":    {mult:1.0, split:{fb:50,google:15,tiktok:35}, deal:200,   margin:60, close:25, repeat:3},
  "Services":  {mult:1.1, split:{fb:40,google:45,tiktok:15}, deal:800,   margin:40, close:15, repeat:1},
  "Education": {mult:1.2, split:{fb:45,google:35,tiktok:20}, deal:2500,  margin:50, close:10, repeat:1},
  "Property":  {mult:1.6, split:{fb:45,google:45,tiktok:10}, deal:10000, margin:70, close:2, repeat:1},
};

const fmt = n => n>=1e6 ? (n/1e6).toFixed(1)+"M" : n>=1e4 ? Math.round(n/1e3)+"k" : n>=1e3 ? (n/1e3).toFixed(1)+"k" : Math.round(n).toLocaleString();
const rm = n => "RM"+(n>=100?Math.round(n).toLocaleString():n.toFixed(2));

/* q(range,t): point t (0–1) within a benchmark range.
   Conservative scenario = costs at 75% of range, conversion at 25%; optimistic = the reverse.
   Avoids stacking every worst/best case, which would give an unrealistic 8x spread. */
const q = (r,t) => r[0]+(r[1]-r[0])*t;
function estimate(spend, key, mult){
  const b = BENCH[key];
  if(spend<=0) return null;
  const clicksLo=spend/(q(b.cpc,0.75)*mult), clicksHi=spend/(q(b.cpc,0.25)*mult);
  const impLo = b.cpm ? spend/(q(b.cpm,0.75)*mult)*1000 : clicksLo/q(b.ctr,0.75);
  const impHi = b.cpm ? spend/(q(b.cpm,0.25)*mult)*1000 : clicksHi/q(b.ctr,0.25);
  const leadsLo=clicksLo*q(b.cvr,0.25), leadsHi=clicksHi*q(b.cvr,0.75);
  return {impLo,impHi,clicksLo,clicksHi,leadsLo,leadsHi,cplLo:spend/leadsHi,cplHi:spend/leadsLo};
}

/* hero example: Prime Pack, F&B default mix */
const HERO = (()=>{const sp=INDUSTRY["F&B"].split, m=INDUSTRY["F&B"].mult, cr=PLANS[2].cr;
  return Object.keys(BENCH).reduce((a,k)=>{const e=estimate(cr*sp[k]/100,k,m);return {lo:a.lo+e.leadsLo,hi:a.hi+e.leadsHi};},{lo:0,hi:0});})();

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
  const [industry,setIndustry] = useState("F&B");
  const [mode,setMode] = useState("plan");
  const [planIdx,setPlanIdx] = useState(2);
  const [custom,setCustom] = useState(2000);
  const [w,setW] = useState(INDUSTRY["F&B"].split);
  const [deal,setDeal] = useState(INDUSTRY["F&B"].deal);
  const [margin,setMargin] = useState(INDUSTRY["F&B"].margin);
  const [close,setClose] = useState(INDUSTRY["F&B"].close);
  const [repeat,setRepeat] = useState(INDUSTRY["F&B"].repeat);

  const pickIndustry = k => { const d=INDUSTRY[k]; setIndustry(k); setW(d.split); setDeal(d.deal); setMargin(d.margin); setClose(d.close); setRepeat(d.repeat); track("calc_industry_"+k); };
  const spend = mode==="plan" ? PLANS[planIdx].cr : custom;
  const totalW = (w.fb+w.google+w.tiktok)||1;
  const mult = INDUSTRY[industry].mult;

  const res = useMemo(()=>{
    const rows = Object.keys(BENCH).map(k=>{
      const s = spend*w[k]/totalW;
      return {k, pct:Math.round(w[k]/totalW*100), spend:s, e:estimate(s,k,mult)};
    });
    const sum = f => rows.reduce((a,r)=>a+(r.e?r.e[f]:0),0);
    return {rows, leadsLo:sum("leadsLo"), leadsHi:sum("leadsHi"), impLo:sum("impLo"), impHi:sum("impHi")};
  },[spend,w,totalW,mult]);

  const recIdx = mode==="plan" ? planIdx : Math.max(0, PLANS.findIndex(p=>p.cr>=custom)===-1 ? 3 : PLANS.findIndex(p=>p.cr>=custom));
  const rec = PLANS[recIdx];
  /* real cost = what the customer pays over 12 months (credits + team), not just ad credits */
  const costPlan = mode==="plan" ? PLANS[planIdx] : rec;
  const cost = Math.round(spend * (costPlan.mo*12/costPlan.cr));
  const avgCplLo = cost/(res.leadsHi||1), avgCplHi = cost/(res.leadsLo||1);
  const profitPerDeal = deal*margin/100*Math.max(1,repeat); /* profit per new customer over 12 months */
  const beDeals = profitPerDeal>0 ? Math.ceil(cost/profitPerDeal) : Infinity;
  const dealsLo = Math.floor(res.leadsLo*close/100), dealsHi = Math.floor(res.leadsHi*close/100);
  const profitLo = dealsLo*profitPerDeal - cost, profitHi = dealsHi*profitPerDeal - cost;
  const status = dealsLo>=beDeals ? {c:UB.green,t:"Likely profitable"} : dealsHi>=beDeals ? {c:UB.orange,t:"Can break even — depends on execution"} : {c:UB.red,t:"Unlikely to break even at these numbers"};
  const numIn = (v,set,suffix,pre) => <div style={{display:"flex",alignItems:"center",border:`1px solid ${T.border}`,borderRadius:10,padding:"0 10px",background:"white"}}>
    {pre&&<span style={{fontSize:13,color:T.muted,fontWeight:600}}>{pre}</span>}
    <input type="number" min={0} value={v} onChange={e=>set(Math.max(0,+e.target.value))} style={{width:"100%",border:"none",outline:"none",padding:"10px 6px",fontSize:15,fontWeight:700,fontFamily:"'DM Sans',sans-serif",color:UB.navy,background:"transparent"}}/>
    {suffix&&<span style={{fontSize:13,color:T.muted,fontWeight:600}}>{suffix}</span>}
  </div>;

  const waMsg = `I used the DMS lead calculator.\n• Industry: ${industry}\n• Ad budget: RM${spend.toLocaleString()}${mode==="plan"?` (${PLANS[planIdx].name} Pack)`:""}\n• Split: FB/IG ${res.rows[0].pct}% · Google ${res.rows[1].pct}% · TikTok ${res.rows[2].pct}%\n• Estimated leads: ${fmt(res.leadsLo)}–${fmt(res.leadsHi)}\n• Deal value RM${deal.toLocaleString()} · margin ${margin}% · close rate ${close}% · ${repeat}× purchases/yr\n• Break-even: ${beDeals} customers (est. ${dealsLo}–${dealsHi})\n• Recommended: *${rec.name} Pack* (RM${rec.mo}/mo)\nI want to get started.`;
  const goWA = () => { track("calc_whatsapp"); window.open(waL(waMsg,"dms_calculator"),"_blank"); };

  const chip = (active,color=UB.blue) => ({padding:"8px 14px",borderRadius:999,border:`1.5px solid ${active?color:T.border}`,background:active?color+"10":"white",color:active?color:T.text,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"});
  const label = {fontSize:12,fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:10};

  return <div className="calc-grid" style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1.15fr)",gap:20,alignItems:"start"}}>
    {/* INPUTS */}
    <Card hover={false} style={{padding:24}}>
      <div style={label}>1 · Your industry</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:24}}>
        {Object.keys(INDUSTRY).map(k=><button key={k} onClick={()=>pickIndustry(k)} style={chip(industry===k)}>{k}</button>)}
      </div>

      <div style={label}>2 · Your ad budget</div>
      <div style={{display:"flex",background:T.sub,borderRadius:10,padding:4,marginBottom:14}}>
        {[["plan","Pick a DMS plan"],["custom","Custom budget"]].map(([m,l])=><button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"9px 0",borderRadius:8,border:"none",background:mode===m?"white":"transparent",boxShadow:mode===m?"0 1px 4px rgba(0,0,0,0.08)":"none",fontWeight:700,fontSize:13,color:mode===m?UB.blue:T.muted,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>{l}</button>)}
      </div>
      {mode==="plan" ? <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:24}}>
        {PLANS.map((p,i)=><button key={p.name} onClick={()=>setPlanIdx(i)} style={{...chip(planIdx===i,p.color),borderRadius:10,textAlign:"left",padding:"10px 12px"}}>
          <div style={{fontSize:13,fontWeight:700}}>{p.name} · RM{p.mo}/mo</div>
          <div style={{fontSize:11,color:T.muted,fontWeight:500}}>{p.cr.toLocaleString()} credits</div>
        </button>)}
      </div> : <div style={{marginBottom:24}}>
        <div style={{fontSize:30,fontWeight:800,color:UB.navy}}>RM{custom.toLocaleString()}</div>
        <input type="range" min={500} max={10000} step={100} value={custom} onChange={e=>setCustom(+e.target.value)} style={{width:"100%",accentColor:UB.orange}}/>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:T.muted}}><span>RM500</span><span>RM10,000</span></div>
      </div>}

      <div style={label}>3 · Platform mix</div>
      {Object.entries(BENCH).map(([k,b])=><div key={k} style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontWeight:600,marginBottom:2}}>
          <span style={{display:"flex",alignItems:"center",gap:6}}><span style={{width:10,height:10,borderRadius:3,background:b.color}}/>{b.name}</span>
          <span style={{color:T.muted}}>{Math.round(w[k]/totalW*100)}%</span>
        </div>
        <input type="range" min={0} max={100} step={5} value={w[k]} onChange={e=>setW({...w,[k]:+e.target.value})} style={{width:"100%",accentColor:b.color}}/>
      </div>)}
      <button onClick={()=>setW(INDUSTRY[industry].split)} style={{background:"none",border:"none",color:UB.blue,fontSize:12,fontWeight:600,cursor:"pointer",padding:0,fontFamily:"'DM Sans',sans-serif",marginBottom:24}}>Reset to suggested mix for {industry}</button>

      <div style={label}>4 · Your business numbers</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <div><div style={{fontSize:12,color:T.muted,marginBottom:4}}>Avg. price per deal</div>{numIn(deal,setDeal,null,"RM")}</div>
        <div><div style={{fontSize:12,color:T.muted,marginBottom:4}}>Profit margin</div>{numIn(margin,v=>setMargin(Math.min(100,v)),"%")}</div>
        <div><div style={{fontSize:12,color:T.muted,marginBottom:4}}>Leads that buy</div>{numIn(close,v=>setClose(Math.min(100,v)),"%")}</div>
        <div><div style={{fontSize:12,color:T.muted,marginBottom:4}}>Purchases per customer / year</div>{numIn(repeat,v=>setRepeat(Math.max(1,v)),"×")}</div>
      </div>
      <p style={{fontSize:11,color:T.muted,marginTop:8}}>Pre-filled with typical {industry} figures. Change them to your own.</p>
    </Card>

    {/* RESULTS */}
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{background:`linear-gradient(135deg, ${UB.navy}, ${UB.blue})`,borderRadius:16,padding:24,color:"white"}}>
        <div style={{fontSize:12,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:UB.orange}}>Estimated leads</div>
        <div style={{fontSize:"clamp(40px,7vw,56px)",fontWeight:800,lineHeight:1.1,margin:"6px 0"}}>{fmt(res.leadsLo)}–{fmt(res.leadsHi)}</div>
        <div style={{fontSize:13,opacity:0.7,marginBottom:18}}>from RM{spend.toLocaleString()} ad credits{mode==="plan"?` · ${PLANS[planIdx].camp} campaign`:""}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div style={{background:"rgba(255,255,255,0.08)",borderRadius:10,padding:12}}><div style={{fontSize:11,opacity:0.6}}>Ad views (impressions)</div><div style={{fontSize:20,fontWeight:800}}>{fmt(res.impLo)}–{fmt(res.impHi)}</div></div>
          <div style={{background:"rgba(255,255,255,0.08)",borderRadius:10,padding:12}}><div style={{fontSize:11,opacity:0.6}}>Real cost per lead*</div><div style={{fontSize:20,fontWeight:800}}>{rm(avgCplLo)}–{rm(avgCplHi)}</div></div>
        </div>
        <div style={{fontSize:11,opacity:0.5,marginTop:8}}>*Based on RM{cost.toLocaleString()} you pay over 12 months ({costPlan.name}: RM{costPlan.mo} × 12), including your dedicated team.</div>
      </div>

      <Card hover={false} style={{padding:20,border:`2px solid ${status.c}`}}>
        <div style={{fontSize:12,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:status.c,marginBottom:12}}>Break-even check · {status.t}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          <div style={{background:T.sub,borderRadius:10,padding:12}}><div style={{fontSize:11,color:T.muted}}>Profit per customer</div><div style={{fontSize:20,fontWeight:800,color:UB.navy}}>{rm(profitPerDeal)}</div></div>
          <div style={{background:T.sub,borderRadius:10,padding:12}}><div style={{fontSize:11,color:T.muted}}>Customers to break even</div><div style={{fontSize:20,fontWeight:800,color:UB.navy}}>{isFinite(beDeals)?beDeals.toLocaleString():"–"}</div></div>
          <div style={{background:T.sub,borderRadius:10,padding:12}}><div style={{fontSize:11,color:T.muted}}>Expected customers</div><div style={{fontSize:20,fontWeight:800,color:status.c}}>{dealsLo.toLocaleString()}–{dealsHi.toLocaleString()}</div></div>
        </div>
        {isFinite(beDeals)&&<div style={{height:8,borderRadius:4,background:T.sub,marginTop:14,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",left:0,top:0,bottom:0,width:Math.min(100,dealsHi/Math.max(beDeals,dealsHi)*100)+"%",background:status.c+"40"}}/>
          <div style={{position:"absolute",left:0,top:0,bottom:0,width:Math.min(100,dealsLo/Math.max(beDeals,dealsHi)*100)+"%",background:status.c}}/>
          <div style={{position:"absolute",top:-2,bottom:-2,width:2,background:UB.navy,left:Math.min(100,beDeals/Math.max(beDeals,dealsHi)*100)+"%"}}/>
        </div>}
        <p style={{fontSize:13,color:T.text,marginTop:12,lineHeight:1.5}}>
          You need <b>{isFinite(beDeals)?beDeals:"–"} new customer{beDeals===1?"":"s"}</b>{repeat>1?` (buying ${repeat}× a year)`:""} to cover RM{cost.toLocaleString()}. Estimated profit after cost: <b style={{color:profitHi>=0?UB.green:UB.red}}>{profitLo<0?"-":""}RM{Math.abs(Math.round(profitLo)).toLocaleString()} to {profitHi<0?"-":""}RM{Math.abs(Math.round(profitHi)).toLocaleString()}</b>.
        </p>
      </Card>

      <Card hover={false} style={{padding:0}}>
        {res.rows.map((r,i)=>{const b=BENCH[r.k];return<div key={r.k} style={{padding:"14px 18px",borderTop:i?`1px solid ${T.border}`:"none",opacity:r.e?1:0.4}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{display:"flex",alignItems:"center",gap:8,fontWeight:700,fontSize:14}}><span style={{width:10,height:10,borderRadius:3,background:b.color}}/>{b.name}</span>
            <span style={{fontSize:12,color:T.muted}}>RM{Math.round(r.spend).toLocaleString()} · {r.pct}%</span>
          </div>
          <div style={{height:6,borderRadius:3,background:T.sub,marginBottom:10,overflow:"hidden"}}><div style={{width:r.pct+"%",height:"100%",background:b.color,transition:"width 0.3s"}}/></div>
          {r.e ? <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,fontSize:12}}>
            <div><div style={{color:T.muted}}>Clicks</div><div style={{fontWeight:700}}>{fmt(r.e.clicksLo)}–{fmt(r.e.clicksHi)}</div></div>
            <div><div style={{color:T.muted}}>Leads</div><div style={{fontWeight:700,color:UB.green}}>{fmt(r.e.leadsLo)}–{fmt(r.e.leadsHi)}</div></div>
            <div><div style={{color:T.muted}}>Ad cost/lead</div><div style={{fontWeight:700}}>{rm(r.e.cplLo)}–{rm(r.e.cplHi)}</div></div>
          </div> : <div style={{fontSize:12,color:T.muted}}>Not in your mix</div>}
        </div>;})}
      </Card>

      <Card hover={false} style={{padding:18,border:`2px solid ${rec.color}`}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:12,alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,color:UB.green,display:"flex",alignItems:"center",gap:4}}>{I.check(UB.green,14)} RECOMMENDED</div>
            <div style={{fontSize:18,fontWeight:800}}>{rec.name} Pack · <span style={{color:rec.color}}>RM{rec.mo}/mo</span></div>
            <div style={{fontSize:12,color:T.muted}}>{rec.cr.toLocaleString()} credits · {rec.camp}</div>
          </div>
          <button onClick={goWA} style={{display:"inline-flex",alignItems:"center",gap:8,background:"#25D366",color:"white",border:"none",padding:"13px 22px",borderRadius:10,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",boxShadow:"0 2px 8px rgba(37,211,102,0.3)"}}>{I.msg("white",18)} Send my estimate on WhatsApp</button>
        </div>
      </Card>
      <p style={{fontSize:11,color:T.muted,lineHeight:1.5}}>Estimates only, based on typical Malaysian SME ad costs. Actual results depend on your offer, creatives, location and competition. Prices exclude 6% SST.</p>
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
            <div style={{fontSize:12,color:T.muted,fontWeight:600,marginBottom:12}}>Prime Pack · F&amp;B example</div>
            {[["Ad credits upfront","3,500"],["You pay","RM450/mo"],["Campaign","5–6 months"],["Your team","3 people"]].map(([a,b])=><div key={a} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${T.border}`,fontSize:14}}><span style={{color:T.muted}}>{a}</span><b>{b}</b></div>)}
            <div style={{marginTop:14,background:UB.green+"12",borderRadius:10,padding:12,textAlign:"center"}}>
              <div style={{fontSize:11,color:UB.green,fontWeight:700}}>Estimated leads</div>
              <div style={{fontSize:28,fontWeight:800,color:UB.navy}}>{fmt(HERO.lo)}–{fmt(HERO.hi)}</div>
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
        <SectionLabel text="Budget & Lead Calculator"/>
        <h2 style={{fontSize:"clamp(24px,4vw,34px)",fontWeight:800,marginBottom:8}}>How many leads can your budget bring?</h2>
        <p style={{fontSize:15,color:T.muted}}>Pick your industry and budget. See estimated reach, clicks and leads on Facebook, Google and TikTok.</p>
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
