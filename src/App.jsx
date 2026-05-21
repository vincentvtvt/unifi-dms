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
  .hero-btns{max-width:100%!important;}
  .hero-right{width:100%!important;flex:1 1 100%!important;}
  .hero-right .carousel-wrap{height:220px!important;}
  .chat-flex{flex-direction:column!important;}
  .chat-mockup{max-width:100%!important;}
  .stories-grid{grid-template-columns:1fr!important;}
  .finder-cards{grid-template-columns:1fr 1fr!important;}
  .proof-toast{top:68px!important;bottom:auto!important;left:50%!important;transform:translateX(-50%)!important;max-width:85vw!important;padding:8px 12px!important;font-size:11px!important;border-radius:10px!important;}
}
@media(max-width:480px){
  .finder-cards{grid-template-columns:1fr!important;}
  .hero-right .carousel-wrap{height:180px!important;}
}`;

/* ═══ SOCIAL PROOF TOAST ═══ */
const PROOF = [
  {name:"Ahmad R.",product:"300Mbps Prime (RM129)",loc:"Shah Alam",min:3},
  {name:"Siti N.",product:"500Mbps + FREE iPad",loc:"Petaling Jaya",min:8},
  {name:"Kumar S.",product:"Uni5G 69 Unlimited",loc:"Penang",min:14},
  {name:"Mei Ling",product:"100Mbps Prime (RM89)",loc:"Puchong",min:19},
  {name:"Faizal H.",product:"Biz 500Mbps + Mesh",loc:"Johor Bahru",min:25},
  {name:"Nurul A.",product:"300Mbps + FREE 6 Months",loc:"Kota Kinabalu",min:31},
  {name:"Jason T.",product:"DMS Prime Pack (RM450)",loc:"Subang Jaya",min:37},
  {name:"Amirah Z.",product:"1Gbps + Smart Home",loc:"Cyberjaya",min:42},
];
function SocialProofToast() {
  const [idx,setIdx]=useState(0);const [show,setShow]=useState(false);
  useEffect(()=>{const cycle=()=>{setShow(true);setTimeout(()=>{setShow(false);setTimeout(()=>{setIdx(p=>(p+1)%PROOF.length);cycle();},25000);},5000);};const init=setTimeout(cycle,3000);return()=>clearTimeout(init);},[]);
  const p=PROOF[idx];const colors=["#4A90D9","#E5002B","#00B67A","#FF6B00","#7B2FBE","#00A3E0","#0033A1","#059669"];
  return <div className="proof-toast" style={{position:"fixed",bottom:90,left:16,zIndex:998,maxWidth:300,background:"white",borderRadius:12,padding:"10px 14px",boxShadow:"0 8px 30px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",gap:10,opacity:show?1:0,pointerEvents:show?"auto":"none",transition:"all 0.5s ease",border:"1px solid #e5e7eb"}}>
    <div style={{width:32,height:32,borderRadius:"50%",background:colors[idx%colors.length],display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:13,fontWeight:700,flexShrink:0}}>{p.name.charAt(0)}</div>
    <div style={{flex:1,minWidth:0}}>
      <div style={{fontSize:12,fontWeight:600,color:"#1a1a2e"}}>{p.name} applied for {p.product}</div>
      <div style={{fontSize:10,color:"#6b7280",marginTop:1}}>{p.loc} · {p.min} min ago</div>
    </div>
    {Icons.check("#00B67A",14)}
  </div>;
}

/* ═══ PLAN DATA ═══ */
const P = {
  home_mobile: [
    {name:"Uni5G 39",price:"39",tag:"30GB Data",feat:["30GB 5G/4G data","Add RM1 for 200GB extra","Unlimited calls","No contract"],color:UB.blue},
    {name:"Uni5G 69",price:"69",tag:"Unlimited Data",feat:["Unlimited 5G/4G data","60GB hotspot","Unlimited calls","No contract"],color:UB.sky,pop:"Best Value"},
    {name:"Unifi Air 99",price:"99",tag:"Wireless Broadband",feat:["Unlimited data","Free 5G router","Plug & play","24-month contract"],color:UB.green},
    {name:"Uni5G 99 + Free Phone",price:"69",tag:"RM30 Rebate",feat:["Unlimited 5G + 100GB hotspot","FREE 5G smartphone (choose 1)","For existing Unifi customers","24-month contract"],color:UB.orange,pop:"Free Phone"},
  ],
  home_new: {
    "Just Internet": [
      {name:"100Mbps Prime",price:"89",tag:"FREE 3 Months",feat:["Free WiFi 6 router","27-month contract"],color:UB.blue},
      {name:"300Mbps Prime",price:"129",tag:"FREE 3 Months",feat:["Free WiFi 6 router","HD streaming, 3-5 users"],color:UB.blue,pop:"Most Popular"},
      {name:"500Mbps Prime",price:"149",tag:"FREE 3 Months",feat:["Free WiFi 6 router","4K, smart home"],color:UB.sky},
      {name:"1Gbps",price:"249",tag:"Smart Home Bundle",feat:["Free WiFi 7","AI camera + smart hub"],color:UB.orange},
      {name:"2Gbps",price:"319",tag:"Premium Smart Home",feat:["Free WiFi 7","Full security kit"],color:UB.red},
    ],
    "With Entertainment": [
      {name:"100Mbps + TV Pack",price:"119",tag:"6 Pack Choices",feat:["Wira/Ying Xiong/Veeran/Kids/Sports/Max","Device add-on from RM29/mo"],color:UB.purple},
      {name:"300Mbps + TV Pack",price:"159",tag:"6 Pack Choices",feat:["Choose your pack","Device add-on from RM29/mo"],color:UB.purple,pop:"Popular"},
      {name:"500Mbps + TV Pack",price:"179",tag:"6 Pack Choices",feat:["Choose your pack","Device add-on from RM29/mo"],color:UB.purple},
      {name:"100Mbps + Max",price:"114",tag:"HBO & Cinemax",feat:["HBO, HBO Hits, Family, Cinemax","Star Pack (36 channels)"],color:UB.navy},
    ],
    "With Mobile Combo": [
      {name:"100Mbps + 2 SIM",price:"167",tag:"Postpaid 39 × 2",feat:["2 SIMs with 30GB each","Device add-on from RM1/mo"],color:UB.sky},
      {name:"300Mbps + 2 SIM",price:"207",tag:"Postpaid 39 × 2",feat:["2 SIMs with 30GB each","Device add-on from RM1/mo"],color:UB.sky,pop:"Family Deal"},
      {name:"300Mbps + Unlimited",price:"188",tag:"Postpaid 69",feat:["1 SIM unlimited 5G","Device add-on from RM18/mo"],color:UB.green},
    ],
    "Business": [
      {name:"Biz 300Mbps",price:"139",tag:"No Frills",feat:["Static IP, SLA","24-month contract"],color:UB.blue},
      {name:"Biz 500Mbps",price:"179",tag:"Mesh WiFi",feat:["Free mesh WiFi","Static IP, priority"],color:UB.sky,pop:"Most Popular"},
      {name:"Biz 1Gbps",price:"319",tag:"TV / iPad / Credit",feat:["Choose your free device","Enterprise performance"],color:UB.red},
      {name:"Biz 2Gbps",price:"369",tag:"Ultimate",feat:["Choose your free device","Maximum bandwidth"],color:UB.red},
    ],
  },
  home_switch: {
    "Free Months": [
      {name:"100Mbps",price:"89",tag:"FREE 6 Months",feat:["Save RM534","Competitor bill required"],color:UB.green},
      {name:"300Mbps",price:"129",tag:"FREE 6 Months",feat:["Save RM774","Competitor bill required"],color:UB.green,pop:"Most Savings"},
      {name:"500Mbps",price:"149",tag:"FREE 6 Months",feat:["Save RM894","Competitor bill required"],color:UB.green},
      {name:"1Gbps",price:"249",tag:"FREE 6 Months",feat:["Save RM1,494","Competitor bill required"],color:UB.green},
    ],
    "Free Device": [
      {name:"300Mbps + 43\" TV",price:"139",tag:"FREE TV",feat:["Free 43\" smart TV","36-month contract"],color:UB.orange},
      {name:"500Mbps + iPad",price:"159",tag:"FREE iPad",feat:["Free iPad 11\" 128GB","36-month contract"],color:UB.orange,pop:"Best Pick"},
      {name:"500Mbps + 65\" TV",price:"169",tag:"FREE 65\" TV",feat:["Free 65\" smart TV","36-month contract"],color:UB.red},
      {name:"1Gbps + 75\" TV",price:"269",tag:"FREE 75\" TV",feat:["Free 75\" smart TV","30-month contract"],color:UB.red},
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

const STORIES = [
  {title:"Kelantan Food Business",bef:"Sold locally at pasar only.",aft:"Applied DMS Standard Pack — Facebook ads boosted orders by 49% in 2 months.",metric:"+49%",img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=260&fit=crop"},
  {title:"Property Agent Team",bef:"Walk-ins only. No online leads.",aft:"Got Biz 500Mbps + Uni5G for team. AI chatbot qualified 3x more leads.",metric:"3x",img:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=260&fit=crop"},
  {title:"Boutique Café in PJ",bef:"Single outlet. No delivery orders.",aft:"Switched to Unifi 300Mbps (6 months free) + DMS Premium. Opened 2nd branch in 6 months.",metric:"2x",img:"https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=260&fit=crop"},
];

const FAQ = [
  ["What is UnifiBiz.digital?","We are Synergy Spark Sdn Bhd (SSM 1221398-T), an authorized reseller for all Unifi products — Home, Business, Mobile, 5G, DMS, and Cloud Storage. 140,000+ installations over 15 years."],
  ["How do I apply?","Just tap any WhatsApp button on this page. Tell us what you need, and we'll process within 24 hours. Available 24/7."],
  ["Do I need to visit a TM store?","No. Everything is handled via WhatsApp — application, activation, after-sales support."],
  ["What broadband speeds are available?","Home fibre: 100Mbps (RM89), 300Mbps (RM129), 500Mbps (RM149), 1Gbps (RM249), 2Gbps (RM319). Business: 300Mbps to 2Gbps with static IP and SLA."],
  ["What's included free with broadband?","All plans include a free WiFi 6 or WiFi 7 router. Prime Promo plans get 3 months free. 1Gbps and 2Gbps include smart home security kits."],
  ["Can I get free months if I switch from another provider?","Yes — bring your competitor bill and get up to 6 months free on selected plans. Free TV or iPad options also available for switchers."],
  ["What mobile plans do you offer?","Uni5G RM39 (30GB, no contract), Uni5G RM69 (unlimited, no contract), Unifi Air RM99 (unlimited + free router, 24 months). Existing Unifi customers can get a free 5G smartphone."],
  ["What is Unifi DMS?","Digital Marketing Solution — Malaysia's first instalment-based marketing. A dedicated team runs Facebook, Google, TikTok & Instagram ads for you. From RM100/month over 12 months."],
  ["How is DMS different from hiring an agency?","Agencies charge RM1,500–5,000/month upfront. DMS starts at RM100/month on instalments with no upfront cost. Includes campaign manager, designer, and copywriter."],
  ["Is there a contract?","Broadband: 24–36 months depending on plan. Mobile SIM-only: no contract. DMS: 12-month instalment period."],
  ["Can I bundle broadband with mobile?","Yes — combo plans start from RM128 (100Mbps + 1 SIM). Family plans with 2 SIMs from RM167. Includes device add-on options."],
  ["What areas do you cover?","All 13 states and 3 Federal Territories in Malaysia. Tap the WhatsApp button and we'll check coverage at your exact address instantly."],
];


function Home() {
  const T = useTheme();
  const [pick,setPick]=useState(null);
  const [sub,setSub]=useState(null);
  const [qs,setQs]=useState(-1);const [sc,setSc]=useState([0,0,0,0]);const [qr,setQr]=useState(null);
  const [faq,setFaq]=useState(null);
  const [userLoc,setUserLoc]=useState(null);
  const [heroIdx,setHeroIdx]=useState(0);

  const HERO_IMG=[
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  ];

  useEffect(()=>{const t=setInterval(()=>setHeroIdx(p=>(p+1)%3),4000);return()=>clearInterval(t);},[]);
  useEffect(()=>{fetch("https://ipapi.co/json/").then(r=>r.json()).then(d=>{if(d.city&&d.region)setUserLoc({city:d.city,region:d.region});}).catch(()=>{});},[]);
  const scr=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  const qa=s=>{const n=sc.map((v,i)=>v+s[i]);setSc(n);if(qs+1>=DMS_QZ.length)setQr(n.indexOf(Math.max(...n)));else setQs(qs+1);};
  const sel=(id)=>{setPick(pick===id?null:id);setSub(null);if(pick!==id)setTimeout(()=>document.getElementById("plans")?.scrollIntoView({behavior:"smooth",block:"nearest"}),100);};

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

  const Tabs=({data,def})=>{const tabs=Object.keys(data);const cur=sub||def||tabs[0];return<div><div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>{tabs.map(t=><button key={t} onClick={()=>setSub(t)} style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${cur===t?UB.blue:T.border}`,background:cur===t?UB.blue:T.card,color:cur===t?"white":T.muted,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>{t}</button>)}</div><PlanGrid plans={data[cur]}/></div>;};

  return <>
    <style>{responsiveCSS}</style>

    {/* ═══ HERO ═══ */}
    <section style={{width:"100%",background:`linear-gradient(160deg,${UB.navy} 0%,${UB.blue} 60%,${UB.sky} 100%)`,padding:"80px 20px 48px",overflow:"hidden"}}>
      <div className="hero-flex" style={{maxWidth:1100,margin:"0 auto",display:"flex",flexWrap:"wrap",gap:40,alignItems:"center"}}>
        {/* LEFT */}
        <div className="hero-left" style={{flex:"1 1 400px",maxWidth:520}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 14px",borderRadius:8,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",marginBottom:18}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:UB.green}}/>
            <span style={{fontSize:12,fontWeight:600,color:"white"}}>Official Unifi Partner — Home & Business</span>
          </div>
          <h1 style={{fontSize:"clamp(28px,5vw,50px)",fontWeight:800,lineHeight:1.08,marginBottom:14,color:"white",letterSpacing:"-0.02em"}}>
            Get Your Unifi.<br/>Free devices included.<br/><span style={{color:UB.sky}}>From RM89/mo.</span>
          </h1>
          <p style={{fontSize:"clamp(14px,2vw,16px)",color:"rgba(255,255,255,0.8)",lineHeight:1.7,marginBottom:20,maxWidth:440}}>
            Home fibre, business broadband, 5G mobile, digital marketing — every plan includes <strong style={{color:"white"}}>free router, free phone, or free months</strong>.
          </p>

          <div className="hero-btns" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16,maxWidth:420}}>
            {[
              {id:"switch",label:"Switch & Save",sub:"Exclusive switcher deals",color:UB.green,icon:Icons.trending},
              {id:"new",label:"New to Unifi",sub:"FREE 3 months",color:"white",icon:Icons.zap},
              {id:"phone",label:"Free 5G Phone",sub:"Samsung / OPPO / Redmi",color:UB.sky,icon:Icons.phone},
              {id:"dms",label:"Digital Marketing",sub:"From RM100/mo",color:UB.orange,icon:Icons.trending},
            ].map(o=><button key={o.id} onClick={()=>{sel(o.id);scr("solutions");}} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.08)",color:"white",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.18)";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";}}>
              <div style={{width:28,height:28,borderRadius:7,background:"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{o.icon("white",14)}</div>
              <div style={{textAlign:"left"}}><div style={{fontSize:12,fontWeight:700}}>{o.label}</div><div style={{fontSize:9,opacity:0.7}}>{o.sub}</div></div>
            </button>)}
          </div>

          <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",fontSize:11,color:"rgba(255,255,255,0.6)"}}>
            {[1,2,3,4,5].map(i=><svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
            <span style={{color:"white",fontWeight:600}}>4.8/5</span>
            <span>140,000+ customers · 15 years · SSM 1221398-T</span>
          </div>
        </div>

        {/* RIGHT — carousel */}
        <div className="hero-right" style={{flex:"1 1 360px",position:"relative"}}>
          <div style={{borderRadius:16,overflow:"hidden",position:"relative",border:"2px solid rgba(255,255,255,0.1)"}}>
            <div className="carousel-wrap" style={{position:"relative",overflow:"hidden",height:300}}>
              {HERO_IMG.map((src,i)=><img key={i} src={src} alt="" style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",opacity:heroIdx===i?1:0,transition:"opacity 0.8s ease"}} onError={e=>{e.target.style.opacity="0";}}/>)}
              <div style={{position:"absolute",bottom:0,left:0,right:0,height:80,background:"linear-gradient(to top,rgba(0,26,92,0.6),transparent)",pointerEvents:"none"}}/>
            </div>
            <div style={{position:"absolute",top:12,right:12,background:"white",borderRadius:8,padding:"8px 12px",boxShadow:"0 4px 15px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",gap:6,zIndex:2}}>
              {Icons.trending(UB.green,16)}<div><div style={{fontSize:14,fontWeight:800,color:UB.green}}>140K+</div><div style={{fontSize:9,color:"#666"}}>Installations</div></div>
            </div>
            <div style={{position:"absolute",bottom:12,left:12,background:"white",borderRadius:8,padding:"8px 12px",boxShadow:"0 4px 15px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",gap:6,zIndex:2}}>
              {Icons.zap(UB.blue,16)}<div><div style={{fontSize:14,fontWeight:800,color:UB.navy}}>24/7</div><div style={{fontSize:9,color:"#666"}}>WhatsApp Support</div></div>
            </div>
            <div style={{position:"absolute",bottom:12,right:12,background:UB.green,borderRadius:8,padding:"8px 12px",boxShadow:"0 4px 15px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",gap:6,zIndex:2}}>
              {Icons.check("white",16)}<div><div style={{fontSize:13,fontWeight:800,color:"white"}}>&lt;30s</div><div style={{fontSize:9,color:"rgba(255,255,255,0.8)"}}>Reply Time</div></div>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:10}}>
            {HERO_IMG.map((_,i)=><button key={i} onClick={()=>setHeroIdx(i)} style={{width:heroIdx===i?22:8,height:7,borderRadius:4,border:"none",cursor:"pointer",transition:"all 0.3s",background:heroIdx===i?"white":"rgba(255,255,255,0.3)"}}/>)}
          </div>
        </div>
      </div>
    </section>

    {/* ═══ PRODUCT FINDER ═══ */}
    <section id="solutions" style={{padding:"40px 20px 56px",maxWidth:1000,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <SectionLabel text="Find Your Plan" />
        <h2 style={{fontSize:"clamp(22px,3.5vw,34px)",fontWeight:800}}>What are you looking for?</h2>
      </div>

      <div className="finder-cards" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:pick?24:0}}>
        {[
          {id:"switch",label:"Switch & Save",desc:"FREE 6 months or FREE TV/iPad",icon:Icons.trending,color:UB.green},
          {id:"new",label:"New to Unifi",desc:"Home, business, bundles",icon:Icons.zap,color:UB.blue},
          {id:"phone",label:"Free Phone",desc:"5G plans + free smartphone",icon:Icons.phone,color:UB.sky},
          {id:"dms",label:"Digital Marketing",desc:"Ads managed for you",icon:Icons.trending,color:UB.orange},
        ].map(o=><button key={o.id} onClick={()=>sel(o.id)}
          style={{background:pick===o.id?o.color:T.card,border:`2px solid ${pick===o.id?o.color:T.border}`,borderRadius:12,padding:"16px 12px",textAlign:"center",cursor:"pointer",transition:"all 0.2s",fontFamily:"'DM Sans',sans-serif"}}
          onMouseEnter={e=>{if(pick!==o.id){e.currentTarget.style.borderColor=o.color;e.currentTarget.style.transform="translateY(-2px)";}}}
          onMouseLeave={e=>{if(pick!==o.id){e.currentTarget.style.borderColor=T.border;e.currentTarget.style.transform="none";}}}>
          <div style={{width:40,height:40,borderRadius:10,background:pick===o.id?"rgba(255,255,255,0.2)":o.color+"0D",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:6}}>{o.icon(pick===o.id?"white":o.color,20)}</div>
          <div style={{fontSize:14,fontWeight:700,color:pick===o.id?"white":T.text}}>{o.label}</div>
          <div style={{fontSize:11,color:pick===o.id?"rgba(255,255,255,0.8)":T.muted,marginTop:2}}>{o.desc}</div>
        </button>)}
      </div>

      {/* PLANS */}
      <div id="plans">
        {pick==="switch"&&<div style={{animation:"fadeUp 0.3s ease"}}>
          <h3 style={{fontSize:18,fontWeight:800,marginBottom:4}}>Switching Deals</h3>
          <p style={{color:T.muted,fontSize:12,marginBottom:14}}>Competitor bill required (same address & name).</p>
          <Tabs data={P.home_switch}/>
        </div>}
        {pick==="new"&&<div style={{animation:"fadeUp 0.3s ease"}}>
          <h3 style={{fontSize:18,fontWeight:800,marginBottom:4}}>Plans & Bundles</h3>
          <p style={{color:T.muted,fontSize:12,marginBottom:14}}>All plans include free WiFi 6/7 router.</p>
          <Tabs data={P.home_new} def="Just Internet"/>
        </div>}
        {pick==="phone"&&<div style={{animation:"fadeUp 0.3s ease"}}>
          <h3 style={{fontSize:18,fontWeight:800,marginBottom:4}}>Mobile & Free Phone</h3>
          <p style={{color:T.muted,fontSize:12,marginBottom:14}}>Free smartphone for existing Unifi customers.</p>
          <PlanGrid plans={P.home_mobile}/>
        </div>}
        {pick==="dms"&&<div style={{animation:"fadeUp 0.3s ease"}}>
          <h3 style={{fontSize:18,fontWeight:800,marginBottom:4}}>Digital Marketing Solution (DMS)</h3>
          <p style={{color:T.muted,fontSize:12,marginBottom:4}}>Agency: RM1,500-5,000/mo. <span style={{color:UB.orange,fontWeight:700}}>DMS: from RM100/mo.</span></p>
          <div style={{marginBottom:12,opacity:0.5}}><p style={{fontSize:9,letterSpacing:1,textTransform:"uppercase",color:T.muted,marginBottom:4}}>Your ads run on</p><PartnerLogos T={T}/></div>
          <Card hover={false} style={{padding:20,border:`1px solid ${UB.orange}20`,marginBottom:16,maxWidth:500}}>
            {qs===-1&&!qr&&<div style={{textAlign:"center"}}>
              <h3 style={{fontSize:15,fontWeight:700,marginBottom:4}}>Not sure which pack?</h3>
              <p style={{fontSize:12,color:T.muted,marginBottom:12}}>4 questions. 30 seconds.</p>
              <PrimaryBtn text="Find My Package" onClick={()=>setQs(0)} style={{fontSize:13,padding:"8px 20px"}}/>
            </div>}
            {qs>=0&&!qr&&<div>
              <div style={{display:"flex",gap:3,marginBottom:14}}>{DMS_QZ.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=qs?UB.orange:T.border}}/>)}</div>
              <div style={{fontSize:10,fontWeight:700,color:UB.orange,marginBottom:4}}>Q{qs+1}/{DMS_QZ.length}</div>
              <h3 style={{fontSize:15,fontWeight:700,marginBottom:10}}>{DMS_QZ[qs].q}</h3>
              {DMS_QZ[qs].o.map((o,i)=><button key={i} onClick={()=>qa(o.s)} style={{display:"block",width:"100%",background:T.sub,border:`1px solid ${T.border}`,padding:"9px 12px",borderRadius:8,cursor:"pointer",color:T.text,textAlign:"left",fontSize:12,fontFamily:"'DM Sans',sans-serif",marginBottom:6,transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=UB.orange;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;}}>{String.fromCharCode(65+i)}. {o.l}</button>)}
            </div>}
            {qr!==null&&(()=>{const p=DMS_PKG[qr];return<div style={{textAlign:"center"}}>
              <div style={{fontSize:11,fontWeight:700,color:UB.green,marginBottom:4}}>{Icons.check(UB.green,14)} PERFECT MATCH</div>
              <h3 style={{fontSize:18,fontWeight:800}}>{p.name} — <span style={{color:p.color}}>RM{p.mo}/mo</span></h3>
              <div style={{fontSize:11,color:T.muted,margin:"4px 0 12px"}}>{p.cr.toLocaleString()} credits · {p.camp}</div>
              <WaBtn text={`Get ${p.name}`} msg={`Package Finder recommended DMS *${p.name} Pack* (RM${p.mo}/mo). I want to proceed.`} utm="dms_finder" sm/>
              <button onClick={()=>{setQs(-1);setSc([0,0,0,0]);setQr(null);}} style={{background:"none",border:"none",color:T.muted,fontSize:11,cursor:"pointer",marginTop:8,fontFamily:"'DM Sans',sans-serif"}}>Retake →</button>
            </div>;})()}
          </Card>
          <PlanGrid plans={P.biz_dms}/>
        </div>}
      </div>
    </section>

    {/* ═══ AI CHATBOT ═══ */}
    <section style={{padding:"56px 20px",background:`linear-gradient(160deg,${UB.navy} 0%,${UB.purple} 100%)`,color:"white"}}>
      <div className="chat-flex" style={{maxWidth:850,margin:"0 auto",display:"flex",flexWrap:"wrap",gap:32,alignItems:"center"}}>
        <div style={{flex:"1 1 300px"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:8,background:"rgba(255,255,255,0.1)",marginBottom:12,fontSize:11,fontWeight:700}}>{"🤖"} AI WHATSAPP CHATBOT</div>
          <h2 style={{fontSize:"clamp(22px,3.5vw,34px)",fontWeight:800,marginBottom:10}}>Hire an AI that<br/><span style={{color:UB.sky}}>never sleeps</span></h2>
          <p style={{fontSize:14,color:"rgba(255,255,255,0.8)",lineHeight:1.7,marginBottom:16}}>Replies in seconds. BM & English. Qualifies leads, takes orders, books appointments.</p>
          {["Replies instantly","BM & English","Takes orders & books","Learns YOUR business"].map(f=><div key={f} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,marginBottom:4}}>{Icons.check(UB.green,13)} {f}</div>)}
          <div style={{marginTop:16,display:"flex",alignItems:"center",gap:12}}>
            <button onClick={()=>window.open("https://botku.ai","_blank")} style={{padding:"10px 20px",borderRadius:10,background:"white",color:UB.purple,fontSize:14,fontWeight:700,cursor:"pointer",border:"none",fontFamily:"'DM Sans',sans-serif"}}>Explore BotKu.ai →</button>
            <span style={{fontSize:14,fontWeight:700,color:UB.sky}}>From RM200/mo</span>
          </div>
        </div>
        <div className="chat-mockup" style={{flex:"1 1 240px",maxWidth:320}}>
          <div style={{background:"white",borderRadius:12,padding:14,boxShadow:"0 12px 40px rgba(0,0,0,0.3)"}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10,paddingBottom:8,borderBottom:"1px solid #eee"}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:UB.purple+"15",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{"🤖"}</div>
              <div><div style={{fontSize:12,fontWeight:700,color:"#1a1a1a"}}>BotKu AI</div><div style={{fontSize:9,color:UB.green}}>● Online 24/7</div></div>
            </div>
            {[{f:"user",t:"Berapa harga servis aircond?"},{f:"bot",t:"RM80 untuk 1 unit. Nak book slot? 😊"},{f:"user",t:"Ok book esok pagi"},{f:"bot",t:"10am ada. Nama dan alamat? 👍"}].map((m,i)=>
              <div key={i} style={{display:"flex",justifyContent:m.f==="user"?"flex-end":"flex-start",marginBottom:5}}>
                <div style={{maxWidth:"78%",padding:"6px 10px",borderRadius:8,fontSize:11,lineHeight:1.4,color:"#1a1a1a",background:m.f==="user"?"#DCF8C6":"#f0f0f0"}}>{m.t}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>

    {/* ═══ STORIES ═══ */}
    <section style={{padding:"56px 20px"}}>
      <div style={{maxWidth:900,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:28}}><SectionLabel text="Results"/><h2 style={{fontSize:"clamp(22px,3vw,32px)",fontWeight:800}}>Real results from Malaysian SMEs</h2></div>
        <div className="stories-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
          {STORIES.map(s=><div key={s.title} style={{background:T.card,borderRadius:12,overflow:"hidden",border:`1px solid ${T.border}`,transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";}}>
            <div style={{height:130,position:"relative",overflow:"hidden",background:`linear-gradient(135deg,${UB.blue}20,${UB.sky}10)`}}>
              <img src={s.img} alt={s.title} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{e.target.style.opacity="0";}}/>
              <div style={{position:"absolute",bottom:8,right:8,background:"white",borderRadius:8,padding:"4px 10px",boxShadow:"0 2px 8px rgba(0,0,0,0.12)"}}><div style={{fontSize:18,fontWeight:800,color:UB.green}}>{s.metric}</div></div>
            </div>
            <div style={{padding:14}}>
              <h3 style={{fontSize:14,fontWeight:700,marginBottom:6}}>{s.title}</h3>
              <div style={{fontSize:11,marginBottom:3,display:"flex",alignItems:"flex-start",gap:4}}>{Icons.x(UB.red,11)}<span style={{color:T.muted}}>{s.bef}</span></div>
              <div style={{fontSize:11,display:"flex",alignItems:"flex-start",gap:4}}>{Icons.check(UB.green,11)}<span>{s.aft}</span></div>
            </div>
          </div>)}
        </div>
      </div>
    </section>

    {/* ═══ COVERAGE ═══ */}
    <section id="coverage" style={{padding:"40px 20px",background:T.sub,textAlign:"center"}}>
      <div style={{maxWidth:480,margin:"0 auto"}}>
        <h2 style={{fontSize:"clamp(20px,3vw,28px)",fontWeight:800,marginBottom:12}}>Available nationwide</h2>
        {userLoc?
          <div style={{background:UB.green+"08",border:`1px solid ${UB.green}20`,borderRadius:10,padding:"14px 18px",marginBottom:16}}>
            <div style={{fontSize:15,fontWeight:700,color:UB.green}}>Get Unifi installed in {userLoc.city} within 24 hours</div>
            <div style={{fontSize:12,color:T.muted,marginTop:2}}>Same-day installation available in most areas.</div>
          </div>
          :<p style={{color:T.muted,fontSize:14,marginBottom:16}}>Same-day installation in most areas across Malaysia.</p>
        }
        <WaBtn text={userLoc?`Check Coverage in ${userLoc.city}`:"Check My Coverage"} msg={userLoc?`I'm in ${userLoc.city}, ${userLoc.region}. I want to check Unifi coverage at my address.`:"I want to check Unifi coverage at my address."} utm="coverage"/>
      </div>
    </section>

    {/* ═══ FAQ ═══ */}
    <section style={{padding:"48px 20px"}}>
      <div style={{maxWidth:650,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:24}}><SectionLabel text="FAQ"/><h2 style={{fontSize:"clamp(20px,3vw,28px)",fontWeight:800}}>Common questions</h2></div>
        {FAQ.map(([q,a],i)=><div key={i} style={{border:`1px solid ${T.border}`,borderRadius:10,marginBottom:8,background:T.card}}>
          <button onClick={()=>setFaq(faq===i?null:i)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:"none",border:"none",color:T.text,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",textAlign:"left"}}>
            {q}<span style={{transition:"transform 0.3s",transform:faq===i?"rotate(180deg)":"rotate(0)",flexShrink:0,marginLeft:10}}>{Icons.chevDown(T.muted,14)}</span>
          </button>
          {faq===i&&<div style={{padding:"0 16px 14px",fontSize:12,color:T.muted,lineHeight:1.7}}>{a}</div>}
        </div>)}
      </div>
    </section>

    {/* ═══ CTA ═══ */}
    <section style={{padding:"56px 20px",background:`linear-gradient(160deg,${UB.blue},${UB.sky})`,textAlign:"center"}}>
      <div style={{maxWidth:460,margin:"0 auto"}}>
        <h2 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:800,color:"white",marginBottom:10}}>Ready to get started?</h2>
        <p style={{color:"rgba(255,255,255,0.85)",fontSize:14,marginBottom:20}}>140,000+ customers. 15 years. One WhatsApp away.</p>
        <WaBtn text="WhatsApp Apply Now" msg="I want to apply for a Unifi product." utm="final_cta" style={{fontSize:15,padding:"14px 28px"}}/>
        <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",marginTop:10}}>Available 24/7 · SSM 1221398-T</div>
      </div>
    </section>
  </>;
}

function Layout({children}){const T=useTheme();return<div style={{fontFamily:"'DM Sans',sans-serif",background:T.bg,color:T.text,minHeight:"100vh"}}><style>{globalStyles(T)}</style><Nav/>{children}<Footer/><FloatingWA/><SocialProofToast/></div>;}

export default function App(){return<ThemeProvider><Routes>
  <Route path="/" element={<Layout><Home/></Layout>}/>
  <Route path="/broadband" element={<Layout><Broadband/></Layout>}/>
  <Route path="/air-biz" element={<Layout><AirBiz/></Layout>}/>
  <Route path="/mobile" element={<Layout><Mobile/></Layout>}/>
  <Route path="/cloud-storage" element={<Layout><CloudStorage/></Layout>}/>
</Routes></ThemeProvider>;}
