import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTheme, ThemeProvider, Icons, PartnerLogos, Card, SectionLabel, WaBtn, PrimaryBtn, FloatingWA, Nav, Footer, waL, globalStyles } from "./theme";
import Broadband from "./pages/Broadband";
import AirBiz from "./pages/AirBiz";
import Mobile from "./pages/Mobile";
import CloudStorage from "./pages/CloudStorage";

const UB = { blue:"#0033A1", sky:"#00A3E0", navy:"#001A5C", orange:"#FF6B00", green:"#00B67A", purple:"#7B2FBE", red:"#E5002B" };

const responsiveCSS = `
@media(max-width:768px){
  .hero-flex{flex-direction:column!important;gap:24px!important;}
  .hero-left{max-width:100%!important;text-align:center!important;}
  .hero-ctas{justify-content:center!important;}
  .hero-right{width:100%!important;flex:1 1 100%!important;}
  .split-grid{grid-template-columns:1fr!important;}
  .two-col{grid-template-columns:1fr!important;}
  .usecase-grid{grid-template-columns:1fr!important;}
  .verify-grid{grid-template-columns:1fr 1fr!important;}
}
@media(max-width:480px){
  .verify-grid{grid-template-columns:1fr!important;}
}`;

/* ═══ PLAN DATA ═══ */
const P = {
  home_new: {
    "Business": [
      {name:"Biz 300Mbps",price:"139",tag:"No Frills",feat:["Static IP, SLA","24-month contract"],color:UB.blue},
      {name:"Biz 500Mbps",price:"179",tag:"Mesh WiFi",feat:["Free mesh WiFi","Static IP, priority"],color:UB.sky,pop:"Most Popular"},
      {name:"Biz 1Gbps",price:"319",tag:"TV / iPad / Credit",feat:["Choose your free device","Enterprise performance"],color:UB.red},
      {name:"Biz 2Gbps",price:"369",tag:"Ultimate",feat:["Choose your free device","Maximum bandwidth"],color:UB.red},
    ],
  },
  biz_dms: [
    {name:"Standard",price:"100",tag:"Awareness",feat:["840 ad credits","1.5-2 month campaign"],color:UB.blue},
    {name:"Premium",price:"200",tag:"Engagement",feat:["1,680 credits","Video production included"],color:UB.sky},
    {name:"Prime",price:"450",tag:"Sales Conversion",feat:["3,500 credits","5-6 months campaign"],color:UB.orange,pop:"Best Value"},
    {name:"Pro",price:"900",tag:"Dominate",feat:["7,000 credits","Up to 12 months"],color:UB.red},
  ],
};

const DMS_QZ = [
  {q:"What do you really want for your business?",o:[{l:"Get my name out there",s:[2,1,0,0]},{l:"Build a loyal customer base",s:[0,2,1,1]},{l:"Flood my business with leads & sales",s:[0,0,3,2]},{l:"Become THE brand in my industry",s:[0,0,1,3]}]},
  {q:"How serious are you about video marketing?",o:[{l:"Not right now",s:[2,1,0,0]},{l:"Worth trying with 1 video",s:[0,2,1,1]},{l:"Yes — video converts best",s:[0,0,3,2]},{l:"Full video-first strategy",s:[0,0,1,3]}]},
  {q:"How fast do you want results?",o:[{l:"Just testing (1-2 months)",s:[2,1,0,0]},{l:"Commit for 3 months",s:[0,2,1,1]},{l:"Go big for 6 months",s:[0,0,3,2]},{l:"All-in 12 months",s:[0,0,1,3]}]},
  {q:"Monthly investment to grow revenue?",o:[{l:"Under RM150",s:[2,1,0,0]},{l:"RM150-300",s:[0,2,1,1]},{l:"RM300-600",s:[0,0,3,2]},{l:"RM600+",s:[0,0,1,3]}]},
];
const DMS_PKG = [
  {name:"Standard",mo:100,cr:840,camp:"1.5-2 months",color:UB.blue},
  {name:"Premium",mo:200,cr:1680,camp:"Up to 3 months",color:UB.sky},
  {name:"Prime",mo:450,cr:3500,camp:"5-6 months",color:UB.orange},
  {name:"Pro",mo:900,cr:7000,camp:"Up to 12 months",color:UB.red},
];

const FAQ = [
  ["Is this page mainly for the World Cup Pass?","No. The main service is business internet and digital marketing. The World Cup Business Pass is a support offer for businesses preparing for FIFA World Cup 2026."],
  ["Can you help with normal Unifi Business internet?","Yes. We can help check coverage and guide the application process for your premise."],
  ["Can you help with digital marketing?","Yes. We can help with landing pages, ads (Google / Facebook / TikTok), SEO, WhatsApp lead flow and campaign setup."],
  ["What is the RM400 World Cup Pass?","It refers to the Unifi FIFA World Cup 2026 Business Season Pass, subject to Unifi's official terms and eligibility."],
  ["Can I use the World Cup Pass to advertise my café event?","Be careful. Business viewing rights are limited. Commercial, promotional and advertising use may not be included unless officially allowed under the terms."],
  ["Can home users ask about the World Cup Pass too?","Yes, but this page prioritises business customers. Home users can still ask about personal pass eligibility (pricing starts from RM50 / RM60, depending on eligibility)."],
  ["Should I upgrade internet before the World Cup?","If your business internet is already unstable, check early. World Cup season can increase streaming and customer WiFi demand."],
  ["Who are you?","We are an authorized Unifi reseller (SSM 1221398-T). We help business owners with internet coverage, plan selection, digital marketing and campaign setup through one guided WhatsApp route."],
];

function Home() {
  const T = useTheme();
  const [faq,setFaq]=useState(null);
  const [userLoc,setUserLoc]=useState(null);
  const [qs,setQs]=useState(-1);const [sc,setSc]=useState([0,0,0,0]);const [qr,setQr]=useState(null);

  useEffect(()=>{fetch("https://ipapi.co/json/").then(r=>r.json()).then(d=>{if(d.city&&d.region)setUserLoc({city:d.city,region:d.region});}).catch(()=>{});},[]);
  const scr=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  const qa=s=>{const n=sc.map((v,i)=>v+s[i]);setSc(n);if(qs+1>=DMS_QZ.length)setQr(n.indexOf(Math.max(...n)));else setQs(qs+1);};

  const PlanGrid=({plans})=><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(185px,1fr))",gap:10}}>
    {plans.map(p=><div key={p.name} style={{background:T.card,border:p.pop?`2px solid ${p.color}`:`1px solid ${T.border}`,borderRadius:12,overflow:"hidden",transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=T.cardHover;}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
      {p.pop&&<div style={{background:p.color,color:"white",textAlign:"center",fontSize:10,fontWeight:700,padding:"3px 0"}}>{p.pop}</div>}
      <div style={{padding:"12px 10px"}}>
        <span style={{display:"inline-block",padding:"2px 7px",borderRadius:4,background:p.color+"0D",color:p.color,fontSize:9,fontWeight:700,marginBottom:4}}>{p.tag}</span>
        <h4 style={{fontSize:13,fontWeight:700,marginBottom:2}}>{p.name}</h4>
        <div style={{fontSize:26,fontWeight:800,margin:"2px 0"}}><span style={{fontSize:11,color:T.muted}}>RM</span>{p.price}</div>
        <div style={{fontSize:10,color:T.muted,marginBottom:6}}>/month</div>
        {p.feat.map(f=><div key={f} style={{fontSize:10,color:T.muted,padding:"1px 0",display:"flex",alignItems:"flex-start",gap:4}}>{Icons.check(UB.green,10)}<span>{f}</span></div>)}
        <WaBtn text="Apply" msg={`I want to apply for *${p.name}* (RM${p.price}/mo). ${p.tag}.`} utm={`plan_${p.name.replace(/\s/g,"_")}`} sm style={{width:"100%",justifyContent:"center",fontSize:10,padding:"7px",marginTop:8}} />
      </div>
    </div>)}
  </div>;

  const Bullets=({items,color=UB.green,cols=1})=><div style={{display:"grid",gridTemplateColumns:cols===2?"1fr 1fr":"1fr",gap:"6px 16px"}}>
    {items.map(t=><div key={t} style={{fontSize:13,color:T.muted,display:"flex",alignItems:"flex-start",gap:7}}>{Icons.check(color,13)}<span>{t}</span></div>)}
  </div>;

  const heading={fontSize:"clamp(20px,3vw,30px)",fontWeight:800,marginBottom:8};
  const lead={color:T.muted,fontSize:14,lineHeight:1.7,marginBottom:18,maxWidth:620};

  return <>
    <style>{responsiveCSS}</style>

    {/* ═══ 1. PROMO STRIP ═══ */}
    <div style={{background:`linear-gradient(90deg,${UB.navy},${UB.blue})`,color:"white",padding:"9px 16px",textAlign:"center",fontSize:12.5,display:"flex",justifyContent:"center",alignItems:"center",gap:14,flexWrap:"wrap"}}>
      <span style={{fontWeight:600}}>⚽ Prepare your business for World Cup season — Business Internet · Digital Marketing · Unifi FIFA World Cup 2026 Business Pass RM400</span>
      <button onClick={()=>scr("worldcup")} style={{background:"rgba(255,255,255,0.16)",border:"1px solid rgba(255,255,255,0.25)",color:"white",fontSize:11.5,fontWeight:700,padding:"5px 12px",borderRadius:20,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap"}}>Check Business Setup →</button>
    </div>

    {/* ═══ 2. HERO ═══ */}
    <section style={{width:"100%",background:`linear-gradient(160deg,${UB.navy} 0%,${UB.blue} 60%,${UB.sky} 100%)`,padding:"64px 20px 52px",overflow:"hidden"}}>
      <div className="hero-flex" style={{maxWidth:1100,margin:"0 auto",display:"flex",flexWrap:"wrap",gap:40,alignItems:"center"}}>
        <div className="hero-left" style={{flex:"1 1 460px",maxWidth:600}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 14px",borderRadius:8,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",marginBottom:18}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:UB.green}}/>
            <span style={{fontSize:12,fontWeight:600,color:"white"}}>Authorized Unifi Partner — Home & Business</span>
          </div>
          <h1 style={{fontSize:"clamp(26px,4.6vw,46px)",fontWeight:800,lineHeight:1.12,marginBottom:16,color:"white",letterSpacing:"-0.02em"}}>
            Internet, Marketing & World Cup-Ready Setup for Malaysian Businesses
          </h1>
          <p style={{fontSize:"clamp(14px,2vw,16px)",color:"rgba(255,255,255,0.82)",lineHeight:1.7,marginBottom:14,maxWidth:520}}>
            We help business owners set up reliable internet, improve online visibility, and prepare their premise for high-traffic seasons like FIFA World Cup 2026.
          </p>
          <p style={{fontSize:13.5,color:"rgba(255,255,255,0.65)",lineHeight:1.7,marginBottom:24,maxWidth:520}}>
            Café, restaurant, retail shop, office, clinic, salon, showroom or service business — we help you choose the right Unifi business solution and digital marketing support.
          </p>

          <div className="hero-ctas" style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:18}}>
            <WaBtn text="Check Business Internet Coverage" msg="I want to check Unifi Business internet coverage for my premise." utm="hero_internet" style={{fontSize:14,padding:"13px 22px"}}/>
            <button onClick={()=>scr("marketing")} style={{padding:"13px 22px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.5)",background:"transparent",color:"white",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Ask About Digital Marketing</button>
          </div>
          <button onClick={()=>scr("worldcup")} style={{background:"none",border:"none",color:"rgba(255,255,255,0.75)",fontSize:12.5,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",textDecoration:"underline",textUnderlineOffset:3}}>Ask About World Cup Business Pass →</button>

          <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",fontSize:11,color:"rgba(255,255,255,0.6)",marginTop:22}}>
            <span>Authorized Unifi reseller · SSM 1221398-T · Guided via WhatsApp</span>
          </div>
        </div>

        <div className="hero-right" style={{flex:"1 1 320px",position:"relative"}}>
          <div style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.14)",borderRadius:16,padding:"22px 20px",backdropFilter:"blur(4px)"}}>
            <div style={{fontSize:11,letterSpacing:1.5,textTransform:"uppercase",color:"rgba(255,255,255,0.55)",fontWeight:700,marginBottom:14}}>One contact, three needs</div>
            {[
              {i:Icons.zap,t:"Business Internet",d:"POS, payment, CCTV, customer WiFi & cloud"},
              {i:Icons.trending,t:"Digital Marketing",d:"Ads, landing pages, SEO & WhatsApp leads"},
              {i:Icons.check,t:"World Cup Setup",d:"FIFA 2026 Business Pass + stable streaming"},
            ].map(x=><div key={x.t} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"11px 0",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
              <div style={{width:34,height:34,borderRadius:9,background:"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{x.i("white",17)}</div>
              <div><div style={{fontSize:14,fontWeight:700,color:"white"}}>{x.t}</div><div style={{fontSize:11.5,color:"rgba(255,255,255,0.6)",marginTop:1,lineHeight:1.4}}>{x.d}</div></div>
            </div>)}
          </div>
        </div>
      </div>
    </section>

    {/* ═══ 3. MAIN BUYER SPLIT ═══ */}
    <section id="solutions" style={{padding:"48px 20px",maxWidth:1000,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <SectionLabel text="Get Started" />
        <h2 style={heading}>What do you need help with?</h2>
      </div>
      <div className="split-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
        {[
          {id:"internet",icon:Icons.zap,color:UB.blue,t:"Business Internet",d:"Stable internet for POS, payment, CCTV, staff, customer WiFi, streaming, cloud and daily operation.",cta:"Check Business Internet"},
          {id:"marketing",icon:Icons.trending,color:UB.orange,t:"Digital Marketing Service",d:"More leads from Google, Facebook, TikTok, landing pages, SEO, WhatsApp automation and campaigns.",cta:"Improve My Online Leads"},
          {id:"worldcup",icon:Icons.check,color:UB.green,t:"World Cup Business Setup",d:"Prepare your premise for FIFA World Cup 2026 viewing with the correct business pass and internet setup.",cta:"Ask About World Cup Setup"},
        ].map(c=><div key={c.id} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"22px 20px",display:"flex",flexDirection:"column"}}>
          <div style={{width:44,height:44,borderRadius:11,background:c.color+"12",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14}}>{c.icon(c.color,22)}</div>
          <h3 style={{fontSize:17,fontWeight:800,marginBottom:8}}>{c.t}</h3>
          <p style={{fontSize:13,color:T.muted,lineHeight:1.6,marginBottom:16,flex:1}}>{c.d}</p>
          <button onClick={()=>scr(c.id)} style={{padding:"10px 16px",borderRadius:9,border:"none",background:c.color,color:"white",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>{c.cta} →</button>
        </div>)}
      </div>
    </section>

    {/* ═══ 4. PROBLEM ═══ */}
    <section style={{padding:"48px 20px",background:T.sub,borderTop:`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}`}}>
      <div style={{maxWidth:760,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:22}}>
          <SectionLabel text="The Gap" />
          <h2 style={heading}>Weak internet and marketing quietly cost you customers</h2>
        </div>
        <Bullets cols={2} color={UB.red} items={[
          "Internet is unstable during busy hours",
          "POS or payment system slows down",
          "CCTV keeps disconnecting",
          "Customer WiFi is poor",
          "Staff cannot work smoothly online",
          "Ads run but the landing page does not convert",
          "WhatsApp inquiries are not handled properly",
          "Business is hard to find online",
          "Campaigns are done last minute",
          "World Cup season arrives, premise is not ready",
        ]}/>
        <div style={{marginTop:20,padding:"16px 18px",background:T.card,border:`1px solid ${T.border}`,borderRadius:12,fontSize:13.5,lineHeight:1.8,color:T.text}}>
          Your internet brings the business online. Your marketing brings customers in. Your World Cup setup gives customers a reason to stay longer.
        </div>
      </div>
    </section>

    {/* ═══ 5. BUSINESS INTERNET ═══ */}
    <section id="internet" style={{padding:"56px 20px"}}>
      <div style={{maxWidth:900,margin:"0 auto"}}>
        <SectionLabel text="Business Internet" />
        <h2 style={heading}>Business internet that supports daily operations</h2>
        <p style={lead}>We help you check and apply for suitable Unifi Business internet based on your premise and usage.</p>
        <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:24}}>
          <div>
            <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:T.muted,marginBottom:10}}>Suitable for</div>
            <Bullets cols={2} items={["Restaurants","Cafés","Retail shops","Clinics","Salons","Offices","Showrooms","Tuition centres","Service businesses","SMEs"]}/>
          </div>
          <div>
            <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:T.muted,marginBottom:10}}>Common usage</div>
            <Bullets cols={2} items={["POS system","QR payment","CCTV","Staff devices","Customer WiFi","Cloud system","Video calls","Smart TV display","Online orders","Delivery platforms"]}/>
          </div>
        </div>
        <div style={{marginBottom:18}}><PlanGrid plans={P.home_new.Business}/></div>
        {userLoc&&<div style={{background:UB.green+"08",border:`1px solid ${UB.green}20`,borderRadius:10,padding:"12px 16px",marginBottom:16,fontSize:13,color:T.text}}>
          We can check business fibre availability in <strong>{userLoc.city}</strong> for you.
        </div>}
        <WaBtn text={userLoc?`Check My Coverage in ${userLoc.city}`:"Check My Business Coverage"} msg={userLoc?`I'm in ${userLoc.city}, ${userLoc.region}. I want to check Unifi Business internet coverage for my premise.`:"I want to check Unifi Business internet coverage for my premise."} utm="internet_coverage"/>
      </div>
    </section>

    {/* ═══ 6. DIGITAL MARKETING ═══ */}
    <section id="marketing" style={{padding:"56px 20px",background:T.sub,borderTop:`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}`}}>
      <div style={{maxWidth:900,margin:"0 auto"}}>
        <SectionLabel text="Digital Marketing" />
        <h2 style={heading}>Get more customers, not just more clicks</h2>
        <p style={lead}>Internet alone is not enough. If your business is online but customers cannot find you, your setup is incomplete. We help improve your digital presence through:</p>
        <div style={{marginBottom:20}}><Bullets cols={2} color={UB.orange} items={["Landing page setup","Google Ads","Facebook Ads","TikTok Ads","SEO content","WhatsApp lead flow","Campaign copywriting","Lead generation funnel","Tracking setup","Offer positioning","Local business visibility","WhatsApp automation (BotKu AI)"]}/></div>
        <p style={{fontSize:13.5,color:T.text,marginBottom:20,fontWeight:600}}>The goal is simple: bring more qualified inquiries, not random traffic.</p>

        <div style={{marginBottom:8,opacity:0.6}}><p style={{fontSize:9,letterSpacing:1,textTransform:"uppercase",color:T.muted,marginBottom:6}}>Your ads run on</p><PartnerLogos T={T}/></div>

        <Card hover={false} style={{padding:20,border:`1px solid ${UB.orange}20`,margin:"16px 0",maxWidth:520}}>
          {qs===-1&&qr===null&&<div style={{textAlign:"center"}}>
            <h3 style={{fontSize:15,fontWeight:700,marginBottom:4}}>Not sure which marketing pack?</h3>
            <p style={{fontSize:12,color:T.muted,marginBottom:12}}>4 questions. 30 seconds.</p>
            <PrimaryBtn text="Find My Package" onClick={()=>setQs(0)} style={{fontSize:13,padding:"8px 20px"}}/>
          </div>}
          {qs>=0&&qr===null&&<div>
            <div style={{display:"flex",gap:3,marginBottom:14}}>{DMS_QZ.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=qs?UB.orange:T.border}}/>)}</div>
            <div style={{fontSize:10,fontWeight:700,color:UB.orange,marginBottom:4}}>Q{qs+1}/{DMS_QZ.length}</div>
            <h3 style={{fontSize:15,fontWeight:700,marginBottom:10}}>{DMS_QZ[qs].q}</h3>
            {DMS_QZ[qs].o.map((o,i)=><button key={i} onClick={()=>qa(o.s)} style={{display:"block",width:"100%",background:T.sub,border:`1px solid ${T.border}`,padding:"9px 12px",borderRadius:8,cursor:"pointer",color:T.text,textAlign:"left",fontSize:12,fontFamily:"'DM Sans',sans-serif",marginBottom:6,transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=UB.orange;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;}}>{String.fromCharCode(65+i)}. {o.l}</button>)}
          </div>}
          {qr!==null&&(()=>{const p=DMS_PKG[qr];return<div style={{textAlign:"center"}}>
            <div style={{fontSize:11,fontWeight:700,color:UB.green,marginBottom:4}}>{Icons.check(UB.green,14)} SUGGESTED PACK</div>
            <h3 style={{fontSize:18,fontWeight:800}}>{p.name} — <span style={{color:p.color}}>RM{p.mo}/mo</span></h3>
            <div style={{fontSize:11,color:T.muted,margin:"4px 0 12px"}}>{p.cr.toLocaleString()} credits · {p.camp}</div>
            <WaBtn text={`Ask About ${p.name}`} msg={`The package finder suggested the *${p.name} Pack* (RM${p.mo}/mo). I'd like to know more.`} utm="dms_finder" sm/>
            <button onClick={()=>{setQs(-1);setSc([0,0,0,0]);setQr(null);}} style={{background:"none",border:"none",color:T.muted,fontSize:11,cursor:"pointer",marginTop:8,fontFamily:"'DM Sans',sans-serif"}}>Retake →</button>
          </div>;})()}
        </Card>

        <div style={{marginBottom:18}}><PlanGrid plans={P.biz_dms}/></div>
        <WaBtn text="Audit My Digital Marketing" msg="I'd like an audit of my business digital marketing." utm="marketing_audit"/>
      </div>
    </section>

    {/* ═══ 7. COMBINED SOLUTION ═══ */}
    <section style={{padding:"56px 20px"}}>
      <div style={{maxWidth:820,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <SectionLabel text="Infrastructure" />
          <h2 style={heading}>Internet + marketing = better business infrastructure</h2>
          <p style={{...lead,marginInline:"auto"}}>A lot of businesses separate internet and marketing. That is the mistake. We connect both sides so your business is not just online — it's ready to receive customers.</p>
        </div>
        <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"20px"}}>
            <div style={{fontSize:14,fontWeight:800,color:UB.blue,marginBottom:12}}>Your internet affects</div>
            <Bullets items={["Staff productivity","Customer experience","Payment reliability","CCTV stability","Online order handling","Streaming & TV display","Daily business operation"]}/>
          </div>
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"20px"}}>
            <div style={{fontSize:14,fontWeight:800,color:UB.orange,marginBottom:12}}>Your marketing affects</div>
            <Bullets color={UB.orange} items={["Lead volume","Customer trust","Search visibility","WhatsApp inquiries","Sales conversion","Campaign performance"]}/>
          </div>
        </div>
        <div style={{textAlign:"center",marginTop:24}}><WaBtn text="Build My Business Setup" msg="I want help connecting business internet and digital marketing for my business." utm="combined_setup"/></div>
      </div>
    </section>

    {/* ═══ 8. WORLD CUP BUSINESS PASS ═══ */}
    <section id="worldcup" style={{padding:"56px 20px",background:`linear-gradient(160deg,${UB.navy},#0d1330)`,color:"white"}}>
      <div style={{maxWidth:820,margin:"0 auto"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"5px 12px",borderRadius:8,background:"rgba(255,255,255,0.1)",marginBottom:14,fontSize:11,fontWeight:700,letterSpacing:1}}>⚽ ADD-ON · FIFA WORLD CUP 2026</div>
        <h2 style={{fontSize:"clamp(20px,3vw,30px)",fontWeight:800,marginBottom:10}}>FIFA World Cup 2026 Business Pass support</h2>
        <p style={{fontSize:14,color:"rgba(255,255,255,0.78)",lineHeight:1.7,marginBottom:14,maxWidth:640}}>
          World Cup is not the main product — it's a campaign opportunity for businesses that already need proper internet and customer-facing screen setup.
        </p>
        <div style={{display:"inline-flex",alignItems:"baseline",gap:8,background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:12,padding:"14px 20px",marginBottom:20}}>
          <span style={{fontSize:13,color:"rgba(255,255,255,0.7)"}}>Unifi Business Season Pass</span>
          <span style={{fontSize:30,fontWeight:800,color:UB.sky}}>RM400</span>
          <span style={{fontSize:11,color:"rgba(255,255,255,0.5)"}}>subject to official terms</span>
        </div>
        <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:"rgba(255,255,255,0.55)",marginBottom:10}}>Suitable for premises showing matches</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 16px",marginBottom:20}}>
          {["Restaurants","Cafés","Mamak shops","Bistros","Hotels","Lounges","Clubs","Waiting areas","Customer seating areas"].map(t=>
            <div key={t} style={{fontSize:13,color:"rgba(255,255,255,0.8)",display:"flex",gap:7}}>{Icons.check(UB.sky,13)}<span>{t}</span></div>)}
        </div>
        <div style={{background:"rgba(229,0,43,0.12)",border:"1px solid rgba(229,0,43,0.35)",borderRadius:10,padding:"14px 16px",fontSize:12.5,lineHeight:1.7,color:"rgba(255,255,255,0.85)",marginBottom:20}}>
          <strong>Important:</strong> The Business Pass includes limited public viewing rights within the registered business premise. It does not include commercial, promotional or advertising rights unless separately allowed under official terms.
        </div>
        <WaBtn text="Ask About Business World Cup Pass" msg="I want to ask about the Unifi FIFA World Cup 2026 Business Season Pass (RM400) for my premise." utm="worldcup_pass"/>
      </div>
    </section>

    {/* ═══ 9. WORLD CUP INTERNET READINESS ═══ */}
    <section style={{padding:"56px 20px"}}>
      <div style={{maxWidth:760,margin:"0 auto"}}>
        <SectionLabel text="Readiness Check" />
        <h2 style={heading}>Don't let buffering ruin match night</h2>
        <p style={lead}>If your business plans to show matches, your internet must be ready before peak traffic. We can help check:</p>
        <Bullets cols={2} items={["Business fibre availability","Suitable speed for your premise","Customer WiFi requirement","Smart TV / screen setup needs","Streaming stability","POS & QR payment reliability","CCTV & staff usage"]}/>
        <p style={{fontSize:13.5,color:T.text,fontWeight:600,margin:"18px 0"}}>The pass gives you viewing access. The internet makes the experience stable.</p>
        <WaBtn text="Check My World Cup Internet Readiness" msg="I want to check if my business internet is ready for World Cup match streaming." utm="worldcup_readiness"/>
      </div>
    </section>

    {/* ═══ 10. CONSUMER PASS MINI ═══ */}
    <section style={{padding:"0 20px 48px"}}>
      <div style={{maxWidth:760,margin:"0 auto"}}>
        <div style={{background:T.sub,border:`1px solid ${T.border}`,borderRadius:12,padding:"18px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,flexWrap:"wrap"}}>
          <div>
            <div style={{fontSize:14,fontWeight:700,marginBottom:3}}>Watching at home?</div>
            <div style={{fontSize:12.5,color:T.muted,lineHeight:1.6}}>Personal Unifi FIFA World Cup 2026 Season Pass starts from RM50 / RM60, depending on eligibility.</div>
          </div>
          <WaBtn text="Check Personal Pass" msg="I want to check personal Unifi FIFA World Cup 2026 Season Pass eligibility." utm="consumer_pass" sm/>
        </div>
      </div>
    </section>

    {/* ═══ 11. WHY CHOOSE ═══ */}
    <section style={{padding:"56px 20px",background:T.sub,borderTop:`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}`}}>
      <div style={{maxWidth:760,margin:"0 auto",textAlign:"center"}}>
        <SectionLabel text="Why UnifiBiz" />
        <h2 style={heading}>One contact for internet, marketing and campaign setup</h2>
        <p style={{...lead,marginInline:"auto",marginBottom:22}}>Instead of talking to different parties, you get one guided route. You can ask us about:</p>
        <div style={{textAlign:"left",maxWidth:560,margin:"0 auto 22px"}}>
          <Bullets cols={2} items={["Business internet coverage","Home internet coverage","Unifi plan recommendation","World Cup Business Pass","Digital marketing campaign","Landing page setup","WhatsApp lead flow","Local business visibility","Campaign preparation"]}/>
        </div>
        <WaBtn text="WhatsApp Us for Guidance" msg="I'd like guidance on internet, marketing or World Cup setup for my business." utm="why_guidance"/>
      </div>
    </section>

    {/* ═══ 12. USE CASES ═══ */}
    <section style={{padding:"56px 20px"}}>
      <div style={{maxWidth:900,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:24}}><SectionLabel text="Examples"/><h2 style={heading}>Example business use cases</h2></div>
        <div className="usecase-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          {[
            {t:"Café / Restaurant",need:"Stable WiFi, POS, QR payment, customer seating, smart TV and possible World Cup viewing setup.",route:"Business Internet + World Cup Pass Support + Local Marketing Campaign",color:UB.orange},
            {t:"Retail Shop",need:"Stable internet, CCTV, online order handling, Google visibility and WhatsApp inquiry flow.",route:"Business Internet + Google Business Visibility + WhatsApp Lead Flow",color:UB.blue},
            {t:"Clinic / Salon",need:"Appointment inquiries, customer follow-up, payment system, staff WiFi and online presence.",route:"Business Internet + Landing Page + Ads + WhatsApp Booking Flow",color:UB.green},
            {t:"Office / Agency",need:"Reliable internet, cloud tools, video calls, staff productivity and lead generation.",route:"Business Internet + Digital Marketing + Lead Funnel",color:UB.purple},
          ].map(u=><div key={u.t} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"20px"}}>
            <h3 style={{fontSize:15,fontWeight:800,marginBottom:8,color:u.color}}>{u.t}</h3>
            <p style={{fontSize:12.5,color:T.muted,lineHeight:1.6,marginBottom:12}}>{u.need}</p>
            <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,color:T.muted,marginBottom:4}}>Recommended route</div>
            <div style={{fontSize:12.5,color:T.text,fontWeight:600,lineHeight:1.5}}>{u.route}</div>
          </div>)}
        </div>
      </div>
    </section>

    {/* ═══ 13. TRUST & COMPLIANCE ═══ */}
    <section style={{padding:"56px 20px",background:T.sub,borderTop:`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}`}}>
      <div style={{maxWidth:760,margin:"0 auto"}}>
        <SectionLabel text="Trust & Compliance" />
        <h2 style={heading}>Apply safely. Market properly. Avoid risky claims.</h2>
        <p style={lead}>Before applying or paying for any service, always verify:</p>
        <div className="verify-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px 14px",marginBottom:18}}>
          {["Company name","SSM number","Invoice issuer","Payment recipient","Service terms","Installation terms","World Cup Pass eligibility","Viewing rights","Marketing claims","Cancellation policy","Support channel"].map(t=>
            <div key={t} style={{fontSize:12.5,color:T.muted,display:"flex",gap:7,alignItems:"flex-start"}}>{Icons.check(UB.blue,13)}<span>{t}</span></div>)}
        </div>
        <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px 16px",fontSize:13,lineHeight:1.7,color:T.text}}>
          For World Cup-related business use, always follow official viewing rights and avoid making promotional claims that are not allowed.
        </div>
      </div>
    </section>

    {/* ═══ 14. FAQ ═══ */}
    <section style={{padding:"56px 20px"}}>
      <div style={{maxWidth:680,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:24}}><SectionLabel text="FAQ"/><h2 style={heading}>Common questions</h2></div>
        {FAQ.map(([q,a],i)=><div key={i} style={{border:`1px solid ${T.border}`,borderRadius:10,marginBottom:8,background:T.card}}>
          <button onClick={()=>setFaq(faq===i?null:i)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:"none",border:"none",color:T.text,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",textAlign:"left"}}>
            {q}<span style={{transition:"transform 0.3s",transform:faq===i?"rotate(180deg)":"rotate(0)",flexShrink:0,marginLeft:10}}>{Icons.chevDown(T.muted,14)}</span>
          </button>
          {faq===i&&<div style={{padding:"0 16px 14px",fontSize:12,color:T.muted,lineHeight:1.7}}>{a}</div>}
        </div>)}
      </div>
    </section>

    {/* ═══ 15. FINAL CTA ═══ */}
    <section style={{padding:"56px 20px",background:`linear-gradient(160deg,${UB.blue},${UB.sky})`,textAlign:"center"}}>
      <div style={{maxWidth:560,margin:"0 auto"}}>
        <h2 style={{fontSize:"clamp(22px,4vw,32px)",fontWeight:800,color:"white",marginBottom:12,lineHeight:1.25}}>Prepare your business properly — internet first, marketing next, World Cup ready</h2>
        <p style={{color:"rgba(255,255,255,0.85)",fontSize:14,marginBottom:22}}>Whether you need stable business internet, better digital marketing, or World Cup Pass guidance, we'll help you choose the correct route.</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center"}}>
          <WaBtn text="Check Business Internet Coverage" msg="I want to check Unifi Business internet coverage for my premise." utm="final_internet" style={{fontSize:14,padding:"13px 22px"}}/>
          <WaBtn text="Ask About Digital Marketing" msg="I want to ask about digital marketing for my business." utm="final_marketing" style={{fontSize:14,padding:"13px 22px",background:"rgba(255,255,255,0.15)",border:"1.5px solid rgba(255,255,255,0.5)"}}/>
        </div>
        <button onClick={()=>scr("worldcup")} style={{background:"none",border:"none",color:"rgba(255,255,255,0.85)",fontSize:12.5,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",textDecoration:"underline",textUnderlineOffset:3,marginTop:14}}>Ask About World Cup Pass →</button>
        <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",marginTop:14}}>Available 24/7 · Authorized Unifi reseller · SSM 1221398-T</div>
      </div>
    </section>
  </>;
}

function Layout({children}){const T=useTheme();return<div style={{fontFamily:"'DM Sans',sans-serif",background:T.bg,color:T.text,minHeight:"100vh"}}><style>{globalStyles(T)}</style><Nav/>{children}<Footer/><FloatingWA/></div>;}

export default function App(){return<ThemeProvider><Routes>
  <Route path="/" element={<Layout><Home/></Layout>}/>
  <Route path="/broadband" element={<Layout><Broadband/></Layout>}/>
  <Route path="/air-biz" element={<Layout><AirBiz/></Layout>}/>
  <Route path="/mobile" element={<Layout><Mobile/></Layout>}/>
  <Route path="/cloud-storage" element={<Layout><CloudStorage/></Layout>}/>
</Routes></ThemeProvider>;}
