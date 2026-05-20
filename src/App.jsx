import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useTheme, ThemeProvider, Icons, PartnerLogos, Card, SectionLabel, WaBtn, PrimaryBtn, FloatingWA, Nav, Footer, waL, globalStyles } from "./theme";
import Broadband from "./pages/Broadband";
import AirBiz from "./pages/AirBiz";
import Mobile from "./pages/Mobile";
import CloudStorage from "./pages/CloudStorage";

const UB = {
  blue:"#0033A1", sky:"#00A3E0", navy:"#001A5C",
  orange:"#FF6B00", green:"#00B67A", purple:"#7B2FBE", red:"#E5002B",
};

/* ═══ SOCIAL PROOF TOAST DATA ═══ */
const PROOF = [
  {name:"Ahmad R.",product:"Biz Broadband 300Mbps",loc:"Shah Alam",min:3},
  {name:"Siti N.",product:"Home Fibre 500Mbps",loc:"Petaling Jaya",min:5},
  {name:"Kumar S.",product:"UNI5G Biz 59",loc:"Penang",min:9},
  {name:"Mei Ling",product:"Home Fibre 300Mbps",loc:"Puchong",min:14},
  {name:"Faizal H.",product:"Air Biz 5G",loc:"Johor Bahru",min:18},
  {name:"Nurul A.",product:"Unifi Mobile 49",loc:"Kota Kinabalu",min:23},
  {name:"Jason T.",product:"DMS Prime Pack",loc:"Subang Jaya",min:29},
  {name:"Amirah Z.",product:"Home Fibre 1Gbps",loc:"Cyberjaya",min:35},
];

function SocialProofToast() {
  const [idx,setIdx] = useState(0);
  const [show,setShow] = useState(false);
  useEffect(()=>{
    const cycle=()=>{setShow(true);setTimeout(()=>{setShow(false);setTimeout(()=>{setIdx(p=>(p+1)%PROOF.length);cycle();},25000);},5000);};
    const init=setTimeout(cycle,3000);
    return()=>clearTimeout(init);
  },[]);
  const p=PROOF[idx];
  const initials=p.name.charAt(0);
  const colors=["#4A90D9","#E5002B","#00B67A","#FF6B00","#7B2FBE","#00A3E0","#0033A1","#059669"];
  return (
    <div style={{position:"fixed",bottom:24,left:24,zIndex:998,maxWidth:320,background:"white",borderRadius:12,padding:"12px 16px",boxShadow:"0 8px 30px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",gap:12,transform:show?"translateX(0)":"translateX(-120%)",opacity:show?1:0,transition:"all 0.5s cubic-bezier(0.4,0,0.2,1)",border:"1px solid #e5e7eb"}}>
      <div style={{width:36,height:36,borderRadius:"50%",background:colors[idx%colors.length],display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:14,fontWeight:700,flexShrink:0}}>{initials}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:13,fontWeight:600,color:"#1a1a2e"}}>{p.name} applied for {p.product}</div>
        <div style={{fontSize:11,color:"#6b7280",marginTop:2}}>{p.loc} · {p.min} min ago</div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00B67A" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
    </div>
  );
}

const responsiveCSS = `
@media(max-width:768px){
  .hero-flex{flex-direction:column!important;gap:28px!important;}
  .hero-left{max-width:100%!important;}
  .hero-right{width:100%!important;flex:1 1 100%!important;}
  .hero-right .carousel-wrap{height:220px!important;}
  .steps-grid{grid-template-columns:1fr!important;gap:0!important;background:transparent!important;}
  .steps-grid>div{border-radius:12px!important;margin-bottom:8px!important;}
  .sol-grid{grid-template-columns:1fr!important;}
  .chat-flex{flex-direction:column!important;}
  .chat-mockup{max-width:100%!important;}
  .cta-flex{flex-direction:column!important;align-items:stretch!important;}
  .cta-flex button,.cta-flex a{width:100%!important;justify-content:center!important;}
  .stories-grid{grid-template-columns:1fr!important;}
  .tabs-wrap{gap:6px!important;}
  .tabs-wrap button{padding:8px 14px!important;font-size:13px!important;}
  .hero-stats-strip{gap:10px!important;}
  .proof-toast{bottom:12px!important;left:12px!important;max-width:280px!important;padding:10px 12px!important;}
  .quick-nav{grid-template-columns:repeat(2,1fr)!important;}
  .compare-table th,.compare-table td{padding:8px 6px!important;font-size:11px!important;}
}
@media(max-width:480px){
  .sol-grid{grid-template-columns:1fr!important;}
  .hero-right .carousel-wrap{height:180px!important;}
  .quick-nav{grid-template-columns:1fr!important;}
}`;

/* ═══ PLAN DATA BY CATEGORY ═══ */
const P = {
  home_mobile: [
    {name:"Uni5G 39",price:"39",tag:"30GB Data",feat:["30GB 5G/4G data","Add RM1 for 200GB extra","Unlimited calls","No contract"],color:UB.blue},
    {name:"Uni5G 69",price:"69",tag:"Unlimited Data",feat:["Unlimited 5G/4G data","60GB hotspot","Unlimited calls","No contract"],color:UB.sky,pop:"Best Value"},
    {name:"Unifi Air 99",price:"99",tag:"Wireless Broadband",feat:["Unlimited data","Free 5G router","Plug & play — no wiring","24-month contract"],color:UB.green},
    {name:"Uni5G 99 + Free Phone",price:"69",tag:"RM30 Rebate",feat:["Unlimited 5G + 100GB hotspot","FREE 5G smartphone (choose 1)","For existing Unifi customers","24-month contract"],color:UB.orange,pop:"Free Phone"},
  ],
  home_new: {
    "Just Internet": [
      {name:"100Mbps Prime",price:"89",tag:"FREE 3 Months",feat:["Free WiFi 6 router","Basic browsing & WFH","27-month contract"],color:UB.blue},
      {name:"300Mbps Prime",price:"129",tag:"FREE 3 Months",feat:["Free WiFi 6 router","HD streaming, 3-5 users","27-month contract"],color:UB.blue,pop:"Most Popular"},
      {name:"500Mbps Prime",price:"149",tag:"FREE 3 Months",feat:["Free WiFi 6 router","4K streaming, smart home","27-month contract"],color:UB.sky},
      {name:"1Gbps",price:"249",tag:"Smart Home Bundle",feat:["Free WiFi 7 router","AI camera + solar cam + smart hub","8+ users, gaming","24-month contract"],color:UB.orange},
      {name:"2Gbps",price:"319",tag:"Premium Smart Home",feat:["Free WiFi 7 router","Full smart home security kit","Large household, creators","24-month contract"],color:UB.red},
    ],
    "With Entertainment": [
      {name:"100Mbps + TV Pack",price:"119",tag:"Choose Your Pack",feat:["Choose: Wira/Ying Xiong/Veeran/Kids/Sports/Max","Optional device add-on from RM29/mo","24-month contract"],color:UB.purple},
      {name:"300Mbps + TV Pack",price:"159",tag:"Choose Your Pack",feat:["Choose: Wira/Ying Xiong/Veeran/Kids/Sports/Max","Optional device add-on from RM29/mo","24-month contract"],color:UB.purple,pop:"Popular"},
      {name:"500Mbps + TV Pack",price:"179",tag:"Choose Your Pack",feat:["Choose: Wira/Ying Xiong/Veeran/Kids/Sports/Max","Optional device add-on from RM29/mo","24-month contract"],color:UB.purple},
      {name:"100Mbps + TV Premium",price:"149",tag:"HBO Max / Disney+",feat:["Max Plus Pack OR Disney+","Optional device add-on from RM26/mo","36-month contract"],color:UB.navy},
      {name:"300Mbps + TV Premium",price:"189",tag:"HBO Max / Disney+",feat:["Max Plus Pack OR Disney+","Optional device add-on from RM26/mo","36-month contract"],color:UB.navy},
      {name:"100Mbps + Max",price:"114",tag:"HBO & Cinemax",feat:["HBO, HBO Hits, HBO Family, Cinemax","Star Pack (36 channels)","HBO Max app","24-month contract"],color:UB.navy},
    ],
    "With Mobile Combo": [
      {name:"100Mbps + 2 SIM",price:"167",tag:"Postpaid 39 × 2",feat:["2 SIM cards with 30GB each","Add RM1 for 200GB extra each","Device add-on from RM1/mo","36-month contract"],color:UB.sky},
      {name:"300Mbps + 2 SIM",price:"207",tag:"Postpaid 39 × 2",feat:["2 SIM cards with 30GB each","Add RM1 for 200GB extra each","Device add-on from RM1/mo","36-month contract"],color:UB.sky,pop:"Family Deal"},
      {name:"300Mbps + Unlimited 5G",price:"188",tag:"Postpaid 69",feat:["1 SIM unlimited 5G/4G","60GB hotspot","Device add-on from RM18/mo","36-month contract"],color:UB.green},
      {name:"500Mbps + Unlimited 5G",price:"208",tag:"Postpaid 69",feat:["1 SIM unlimited 5G/4G","60GB hotspot","Device add-on from RM18/mo","36-month contract"],color:UB.green},
    ],
  },
  home_switch: {
    "Free Months": [
      {name:"100Mbps",price:"89",tag:"FREE 6 Months",feat:["Save RM534 total","Competitor bill required","36-month contract"],color:UB.green},
      {name:"300Mbps",price:"129",tag:"FREE 6 Months",feat:["Save RM774 total","Competitor bill required","30-month contract"],color:UB.green,pop:"Most Savings"},
      {name:"500Mbps",price:"149",tag:"FREE 6 Months",feat:["Save RM894 total","Competitor bill required","30-month contract"],color:UB.green},
      {name:"1Gbps",price:"249",tag:"FREE 6 Months",feat:["Save RM1,494 total","Competitor bill required","30-month contract"],color:UB.green},
    ],
    "Free Device": [
      {name:"300Mbps + 43\" TV",price:"139",tag:"FREE TV",feat:["Free LG/Sharp/Samsung 43\" TV","Competitor bill required","36-month contract"],color:UB.orange},
      {name:"500Mbps + iPad 128GB",price:"159",tag:"FREE iPad",feat:["Free iPad 11\" 128GB","Competitor bill required","36-month contract"],color:UB.orange,pop:"Best Pick"},
      {name:"500Mbps + 55\" TV",price:"159",tag:"FREE TV",feat:["Free 55\" smart TV","Competitor bill required","36-month contract"],color:UB.orange},
      {name:"500Mbps + 65\" TV",price:"169",tag:"FREE TV",feat:["Free 65\" smart TV","Competitor bill required","36-month contract"],color:UB.red},
      {name:"1Gbps + 65\" TV",price:"259",tag:"FREE TV",feat:["Free 65\" smart TV","Competitor bill required","30-month contract"],color:UB.red},
      {name:"1Gbps + 75\" TV",price:"269",tag:"FREE TV",feat:["Free 75\" smart TV","Competitor bill required","30-month contract"],color:UB.red},
    ],
  },
  biz_internet: [
    {name:"Biz 300Mbps",price:"139",tag:"No Frills",feat:["Static IP, SLA uptime","Priority support","24-month contract"],color:UB.blue},
    {name:"Biz 300Mbps + 43\" TV",price:"199",tag:"FREE TV",feat:["Free LG/Sharp/Samsung 43\" TV","Static IP, priority support","36-month contract"],color:UB.blue},
    {name:"Biz 500Mbps",price:"179",tag:"Mesh WiFi",feat:["Free mesh WiFi system","Static IP, SLA uptime","24-month contract"],color:UB.sky,pop:"Most Popular"},
    {name:"Biz 500Mbps + 55\" TV",price:"239",tag:"FREE TV",feat:["Free 55\" smart TV","Static IP, priority support","36-month contract"],color:UB.sky},
    {name:"Biz 800Mbps",price:"259",tag:"RM70 Credit",feat:["RM70 monthly voice credit","High-density WiFi","24-month contract"],color:UB.orange},
    {name:"Biz 1Gbps",price:"319",tag:"RM70 Credit / iPad",feat:["Choose: RM70 credit, 65\" TV, or iPad","Enterprise performance","24 or 36-month contract"],color:UB.red},
    {name:"Biz 2Gbps",price:"369",tag:"Ultimate",feat:["Choose: RM70 credit, 75\" TV, or iPad","Maximum bandwidth","24 or 36-month contract"],color:UB.red},
  ],
  biz_dms: [
    {name:"Standard",price:"100",tag:"Awareness",feat:["840 ad credits","1.5–2 month campaign","Facebook, Google, IG, TikTok","Dedicated 3-person team"],color:UB.blue},
    {name:"Premium",price:"200",tag:"Engagement",feat:["1,680 ad credits","Up to 3 months","Video production included","4 ad platforms + Rev Media"],color:UB.sky},
    {name:"Prime",price:"450",tag:"Sales Conversion",feat:["3,500 ad credits","5–6 months campaign","Video production included","4x more credits than Standard"],color:UB.orange,pop:"Best Value"},
    {name:"Pro",price:"900",tag:"Dominate",feat:["7,000 ad credits","Up to 12 months","Full video strategy","Maximum market reach"],color:UB.red},
  ],
};

const STORIES = [
  { title:"Kelantan Food Business", bef:"Sold locally only.", aft:"Broadband + Facebook ads boosted orders by 49%.", tag:"Internet + Marketing", metric:"+49%", metricLabel:"Sales Growth", img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=260&fit=crop" },
  { title:"Property Agent Team", bef:"Walk-ins only. Slow leads.", aft:"5G mobile + AI chatbot drove 3x more qualified leads.", tag:"Mobile + AI", metric:"3x", metricLabel:"Lead Volume", img:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=260&fit=crop" },
  { title:"Boutique Café", bef:"Single outlet. Word-of-mouth.", aft:"Full digital setup — opened 2nd branch in 6 months.", tag:"Internet + Cloud", metric:"2x", metricLabel:"Foot Traffic", img:"https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=260&fit=crop" },
  { title:"Pest Control Service", bef:"Northern states only.", aft:"AI chatbot + 12-month ads doubled coverage area.", tag:"AI + Marketing", metric:"2x", metricLabel:"Revenue", img:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=260&fit=crop" },
];

const HERO_IMAGES = [
  { src:"https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop", alt:"Business team" },
  { src:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop", alt:"Mobile business" },
  { src:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop", alt:"Strategy session" },
];

/* ═══ NEW: DMS Package Finder quiz ═══ */
const DMS_QZ = [
  {q:"What do you really want for your business?",o:[{l:"Get my name out there",s:[2,1,0,0]},{l:"Build a loyal customer base",s:[0,2,1,1]},{l:"Flood my business with leads & sales",s:[0,0,3,2]},{l:"Become THE brand in my industry",s:[0,0,1,3]}]},
  {q:"How serious are you about video marketing?",o:[{l:"Not right now",s:[2,1,0,0]},{l:"Worth trying with 1 video",s:[0,2,1,1]},{l:"Yes — video converts best",s:[0,0,3,2]},{l:"Full video-first strategy",s:[0,0,1,3]}]},
  {q:"How fast do you want results?",o:[{l:"Just testing (1–2 months)",s:[2,1,0,0]},{l:"Commit for 3 months",s:[0,2,1,1]},{l:"Go big for 6 months",s:[0,0,3,2]},{l:"All-in 12 months — dominate",s:[0,0,1,3]}]},
  {q:"Monthly investment to grow revenue?",o:[{l:"Under RM150 to start",s:[2,1,0,0]},{l:"RM150–300 for steady growth",s:[0,2,1,1]},{l:"RM300–600 to really push",s:[0,0,3,2]},{l:"RM600+ because ROI > cost",s:[0,0,1,3]}]},
];
const DMS_PKG = [
  {name:"Standard",mo:100,cr:840,camp:"1.5–2 months",color:UB.blue},
  {name:"Premium",mo:200,cr:1680,camp:"Up to 3 months",color:UB.sky},
  {name:"Prime",mo:450,cr:3500,camp:"5–6 months",color:UB.orange},
  {name:"Pro",mo:900,cr:7000,camp:"Up to 12 months",color:UB.red},
];

/* ═══ NEW: FAQ ═══ */
const FAQ = [
  ["What is UnifiBiz.digital?","We are Synergy Spark Sdn Bhd (SSM 1221398-T), an authorized reseller for all Unifi products — Broadband, Mobile, Air 5G, DMS, Cloud Storage, and AI Chatbot."],
  ["How do I apply?","WhatsApp us at +60 11-1311 5950. Tell us what you need, we'll process within 24 hours."],
  ["Do I need to visit a TM store?","No. Everything is handled via WhatsApp — application, activation, after-sales support."],
  ["What areas do you cover?","All 13 states and 3 Federal Territories. We can check fibre coverage for your address instantly."],
  ["What is Unifi DMS?","Malaysia's first instalment-based digital marketing. Dedicated campaign manager, designer & copywriter running ads on Facebook, Google, TikTok — from RM100/month."],
  ["How is DMS different from an agency?","Agencies charge RM1,500–5,000/month upfront. DMS starts at RM100/month on 12-month instalments with no upfront cost."],
  ["Can I switch plans later?","Yes. WhatsApp us and we'll help you upgrade or adjust."],
  ["Is there a contract?","Broadband: 24 months. Mobile SIM-only: no contract. DMS: 12-month instalment."],
];


function Home() {
  const T = useTheme();
  const navigate = useNavigate();
  const [heroIdx, setHeroIdx] = useState(0);
  const [qs,setQs]=useState(-1);const [sc,setSc]=useState([0,0,0,0]);const [qr,setQr]=useState(null);
  const [faq,setFaq]=useState(null);
  const [wizPath,setWizPath]=useState([]);
  const [wizTab,setWizTab]=useState(null);
  const [userLoc,setUserLoc]=useState(null);

  useEffect(() => { const t=setInterval(()=>setHeroIdx(p=>(p+1)%HERO_IMAGES.length),4000); return()=>clearInterval(t); }, []);
  useEffect(() => {
    fetch("https://ipapi.co/json/").then(r=>r.json()).then(d=>{
      if(d.city&&d.region) setUserLoc({city:d.city,region:d.region});
    }).catch(()=>{});
  }, []);

  const scr = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  const qa=s=>{const n=sc.map((v,i)=>v+s[i]);setSc(n);if(qs+1>=DMS_QZ.length)setQr(n.indexOf(Math.max(...n)));else setQs(qs+1);};

  return (
    <>
      <style>{responsiveCSS}</style>

      {/* ═══ HERO (your deployed version) ═══ */}
      <section style={{ width:"100%", background:"linear-gradient(160deg, "+UB.navy+" 0%, "+UB.blue+" 60%, "+UB.sky+" 100%)", padding:"90px 20px 60px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:400, height:400, borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-100, left:"30%", width:500, height:500, borderRadius:"50%", background:"rgba(0,163,224,0.06)", pointerEvents:"none" }} />
        <div className="hero-flex" style={{ maxWidth:1100, margin:"0 auto", display:"flex", flexWrap:"wrap", gap:48, alignItems:"center" }}>
          <div className="hero-left fade-up" style={{ flex:"1 1 400px", maxWidth:540 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:8, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", marginBottom:18 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:UB.green }} />
              <span style={{ fontSize:12, fontWeight:600, color:"white" }}>Official Unifi Partner — Home & Business</span>
            </div>
            <h1 style={{ fontSize:"clamp(30px,5vw,54px)", fontWeight:800, lineHeight:1.08, marginBottom:16, color:"white", letterSpacing:"-0.02em" }}>
              Get Your Unifi.<br/>Free devices included.<br/><span style={{ color:UB.sky }}>From RM39/mo.</span>
            </h1>
            <p style={{ fontSize:"clamp(15px,2vw,17px)", color:"rgba(255,255,255,0.8)", lineHeight:1.7, marginBottom:24, maxWidth:460 }}>
              Home fibre, business broadband, 5G mobile, digital marketing — every plan includes <strong style={{ color:"white" }}>free devices</strong>. One partner for home and business.
            </p>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
              {[["Free Router","#25D366"],["Free 5G Phone","#25D366"],["24hr Setup",UB.sky],["Up to 6mo FREE",UB.orange]].map(([t,c])=>
                <span key={t} style={{ padding:"5px 12px", borderRadius:20, background:c+"20", border:`1px solid ${c}40`, color:"white", fontSize:11, fontWeight:600 }}>{t}</span>
              )}
            </div>
            <div className="cta-flex" style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:16 }}>
              <a href={waL("Hi, I'd like to check coverage and apply for Unifi. Can you help?","hero")} target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"16px 28px", borderRadius:12, background:"#25D366", color:"white", fontSize:16, fontWeight:700, cursor:"pointer", border:"none", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s", boxShadow:"0 4px 20px rgba(37,211,102,0.35)", textDecoration:"none" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 30px rgba(37,211,102,0.45)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 20px rgba(37,211,102,0.35)";}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <div><div>Check Coverage & Apply Now</div><div style={{ fontSize:11, fontWeight:400, opacity:0.85 }}>We reply 24/7 within 30 seconds</div></div>
              </a>
              <button onClick={()=>{setWizPath(["home","mobile"]);scr("solutions");}} style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"13px 24px", borderRadius:10, border:"1px solid rgba(255,255,255,0.3)", background:"rgba(255,255,255,0.08)", color:"white", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.15)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.08)"}>
                {Icons.phone("white",16)} Free 5G Phones
              </button>
            </div>
            <div style={{ marginBottom:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                {[1,2,3,4,5].map(i=><svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                <span style={{ fontSize:13, color:"white", fontWeight:600, marginLeft:2 }}>4.8/5</span>
                <span style={{ fontSize:12, color:"rgba(255,255,255,0.6)" }}>from 140,000+ customers</span>
              </div>
            </div>
            <div className="hero-stats-strip" style={{ display:"flex", gap:16, flexWrap:"wrap", fontSize:12, color:"rgba(255,255,255,0.65)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}><span style={{ width:7, height:7, borderRadius:"50%", background:UB.green, display:"inline-block", boxShadow:`0 0 6px ${UB.green}` }} /><span style={{ color:"rgba(255,255,255,0.85)", fontWeight:600 }}>3 agents online</span></div>
              <span>·</span>
              <span>127 applications today</span>
              <span>·</span>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>{Icons.shield(UB.sky,13)}<span>SSM 1221398-T</span></div>
            </div>
          </div>
          <div className="hero-right fade-up-d2" style={{ flex:"1 1 380px", position:"relative" }}>
            <div style={{ borderRadius:16, overflow:"hidden", position:"relative", border:"2px solid rgba(255,255,255,0.1)" }}>
              <div className="carousel-wrap" style={{ position:"relative", overflow:"hidden", height:300 }}>
                {HERO_IMAGES.map((img,i)=><img key={i} src={img.src} alt={img.alt} style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", objectFit:"cover", opacity:heroIdx===i?1:0, transition:"opacity 0.8s ease" }} onError={e=>{e.target.style.opacity="0";}} />)}
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:80, background:"linear-gradient(to top, rgba(0,26,92,0.6), transparent)", pointerEvents:"none" }} />
              </div>
              <div style={{ position:"absolute", top:12, right:12, background:"white", borderRadius:8, padding:"8px 12px", boxShadow:"0 4px 15px rgba(0,0,0,0.15)", display:"flex", alignItems:"center", gap:6, zIndex:2 }}>
                {Icons.trending(UB.green,16)}<div><div style={{ fontSize:14, fontWeight:800, color:UB.green }}>+49%</div><div style={{ fontSize:9, color:"#666" }}>Avg. Sales Boost</div></div>
              </div>
              <div style={{ position:"absolute", bottom:12, left:12, background:"white", borderRadius:8, padding:"8px 12px", boxShadow:"0 4px 15px rgba(0,0,0,0.15)", display:"flex", alignItems:"center", gap:6, zIndex:2 }}>
                {Icons.zap(UB.purple,16)}<div><div style={{ fontSize:14, fontWeight:800, color:UB.navy }}>24/7</div><div style={{ fontSize:9, color:"#666" }}>AI Chatbot</div></div>
              </div>
              <div style={{ position:"absolute", bottom:12, right:12, background:UB.green, borderRadius:8, padding:"8px 12px", boxShadow:"0 4px 15px rgba(0,0,0,0.15)", display:"flex", alignItems:"center", gap:6, zIndex:2 }}>
                {Icons.phone("white",16)}<div><div style={{ fontSize:13, fontWeight:800, color:"white" }}>FREE</div><div style={{ fontSize:9, color:"rgba(255,255,255,0.8)" }}>5G Phones</div></div>
              </div>
            </div>
            <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:10 }}>
              {HERO_IMAGES.map((_,i)=><button key={i} onClick={()=>setHeroIdx(i)} style={{ width:heroIdx===i?22:8, height:7, borderRadius:4, border:"none", cursor:"pointer", transition:"all 0.3s", background:heroIdx===i?"white":"rgba(255,255,255,0.3)" }} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NEW: TRUST STRIP ═══ */}
      <section style={{ background:T.sub, borderBottom:`1px solid ${T.border}`, padding:"16px 20px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", justifyContent:"space-around", flexWrap:"wrap", gap:16 }}>
          {[[Icons.shield,"SSM-Registered","Synergy Spark Sdn Bhd"],[Icons.users,"140,000+ Customers","Over 15 years nationwide"],[Icons.map,"All 13 States","+ 3 Federal Territories"],[Icons.zap,"24-Hour Processing","Fast activation"]].map(([ic,t,d])=>
            <div key={t} style={{ display:"flex", alignItems:"center", gap:10, padding:"4px 0" }}>
              <div style={{ width:36, height:36, borderRadius:10, background:UB.blue+"0D", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{ic(UB.blue,18)}</div>
              <div><div style={{ fontSize:13, fontWeight:700, color:T.text }}>{t}</div><div style={{ fontSize:11, color:T.muted }}>{d}</div></div>
            </div>
          )}
        </div>
      </section>

      {/* ═══ STAT COUNTERS ═══ */}
      <section style={{ padding:"32px 20px", background:T.card, borderBottom:`1px solid ${T.border}` }}>
        <div style={{ maxWidth:700, margin:"0 auto", display:"flex", justifyContent:"space-around", flexWrap:"wrap", gap:20 }}>
          {[["140,000+","INSTALLATIONS",UB.blue],["15","YEARS TRUSTED",UB.navy],["4.8/5","RATING",UB.orange],["<30s","REPLY TIME",UB.green]].map(([v,l,c])=>
            <div key={l} style={{ textAlign:"center", minWidth:120 }}>
              <div style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:800, color:c, letterSpacing:"-0.02em" }}>{v}</div>
              <div style={{ fontSize:11, color:T.muted, fontWeight:600, letterSpacing:1.5, marginTop:2 }}>{l}</div>
            </div>
          )}
        </div>
      </section>

      {/* Partner strip */}
      <div style={{ padding:"20px 20px 0" }}><div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}><p style={{ fontSize:11, color:T.muted, marginBottom:12, fontWeight:500, letterSpacing:1, textTransform:"uppercase" }}>Your ads run on</p><PartnerLogos T={T} /></div></div>

      {/* ═══ GUIDED PRODUCT FINDER ═══ */}
      <section id="solutions" style={{ padding:"56px 20px 72px", maxWidth:1000, margin:"0 auto" }}>
        {(()=>{
          const [path,setPath] = [wizPath,setWizPath];
          const [subTab,setSubTab] = [wizTab,setWizTab];
          const go = (step) => { setPath([...path,step]); setSubTab(null); };
          const back = (idx) => { setPath(path.slice(0,idx)); setSubTab(null); };
          const crumbs = [{label:"All Products",path:[]},...path.map((p,i)=>({label:p==="home"?"Home":p==="biz"?"Business":p==="mobile"?"Mobile & 5G":p==="fixed"?"Home Fibre":p==="new"?"New Application":p==="switch"?"Switching Deals":p==="internet"?"Business Internet":p==="dms"?"Digital Marketing":p,path:path.slice(0,i+1)}))];
          const depth = path.join("_");

          /* Choice card renderer */
          const Choice = ({opts}) => (
            <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fit,minmax(${opts.length<=2?"280px":"200px"},1fr))`, gap:14 }}>
              {opts.map(o=>(
                <button key={o.id} onClick={()=>go(o.id)}
                  style={{ background:T.card, border:`2px solid ${T.border}`, borderRadius:14, padding:"28px 20px", textAlign:"center", cursor:"pointer", transition:"all 0.25s", fontFamily:"'DM Sans',sans-serif", display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=o.color||UB.blue;e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=T.cardHover;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                  <div style={{ width:52, height:52, borderRadius:14, background:(o.color||UB.blue)+"0D", display:"flex", alignItems:"center", justifyContent:"center" }}>{o.icon}</div>
                  <div style={{ fontSize:18, fontWeight:700, color:T.text }}>{o.label}</div>
                  <div style={{ fontSize:13, color:T.muted }}>{o.desc}</div>
                  {o.hook&&<div style={{ fontSize:11, fontWeight:700, color:o.color||UB.orange, background:(o.color||UB.orange)+"0D", padding:"4px 12px", borderRadius:6, marginTop:4 }}>{o.hook}</div>}
                </button>
              ))}
            </div>
          );

          /* Plan card renderer */
          const Plans = ({plans}) => (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:12 }}>
              {plans.map(p=>(
                <div key={p.name} style={{ background:T.card, border:p.pop?`2px solid ${p.color}`:`1px solid ${T.border}`, borderRadius:12, overflow:"hidden", transition:"all 0.2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=T.cardHover;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                  {p.pop&&<div style={{ background:p.color, color:"white", textAlign:"center", fontSize:10, fontWeight:700, padding:"4px 0", letterSpacing:.5 }}>{p.pop}</div>}
                  <div style={{ padding:"16px 14px" }}>
                    <div style={{ display:"inline-block", padding:"3px 8px", borderRadius:5, background:p.color+"0D", color:p.color, fontSize:10, fontWeight:700, marginBottom:6 }}>{p.tag}</div>
                    <h4 style={{ fontSize:14, fontWeight:700, marginBottom:4 }}>{p.name}</h4>
                    <div style={{ fontSize:30, fontWeight:800, margin:"4px 0" }}><span style={{ fontSize:13, color:T.muted }}>RM</span>{p.price}</div>
                    <div style={{ fontSize:11, color:T.muted, marginBottom:10 }}>/month</div>
                    <div style={{ marginBottom:12 }}>
                      {p.feat.map(f=><div key={f} style={{ fontSize:11, color:T.muted, padding:"2px 0", display:"flex", alignItems:"flex-start", gap:5 }}>{Icons.check(UB.green,11)}<span>{f}</span></div>)}
                    </div>
                    <WaBtn text="Apply Now" msg={`Hi, I'd like to apply for *${p.name}* (RM${p.price}/mo). ${p.tag}.`} utm={`plan_${p.name.replace(/\s/g,"_")}`} sm style={{ width:"100%", justifyContent:"center", fontSize:11, padding:"8px" }} />
                  </div>
                </div>
              ))}
            </div>
          );

          /* Tabbed plans renderer */
          const TabbedPlans = ({data}) => {
            const tabs = Object.keys(data);
            const active = subTab || tabs[0];
            return (<div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20 }}>
                {tabs.map(t=><button key={t} onClick={()=>setSubTab(t)} style={{ padding:"8px 16px", borderRadius:8, border:`1px solid ${active===t?UB.blue:T.border}`, background:active===t?UB.blue:T.card, color:active===t?"white":T.muted, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}>{t}</button>)}
              </div>
              <Plans plans={data[active]} />
            </div>);
          };

          return (<div>
            {/* Breadcrumb */}
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:24, flexWrap:"wrap" }}>
              {crumbs.map((c,i)=>(
                <span key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
                  {i>0&&<span style={{ color:T.border, fontSize:12 }}>/</span>}
                  <button onClick={()=>back(i)} style={{ background:"none", border:"none", color:i===crumbs.length-1?T.text:T.primary, fontSize:13, fontWeight:i===crumbs.length-1?700:500, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", padding:0 }}>{c.label}</button>
                </span>
              ))}
            </div>

            {/* Step content */}
            {depth===""&&<><div style={{ textAlign:"center", marginBottom:32 }}><SectionLabel text="Find Your Plan" /><h2 style={{ fontSize:"clamp(24px,3.5vw,36px)", fontWeight:800 }}>What are you looking for?</h2></div>
              <Choice opts={[
                {id:"home",label:"Home",desc:"Personal & family internet, mobile, TV bundles",icon:Icons.home(UB.blue,26),color:UB.blue,hook:"Plans from RM39/mo"},
                {id:"biz",label:"Business",desc:"Business broadband, marketing, cloud, AI chatbot",icon:Icons.building(UB.orange,26),color:UB.orange,hook:"Plans from RM100/mo"},
              ]} /></>}

            {depth==="home"&&<><div style={{ textAlign:"center", marginBottom:32 }}><SectionLabel text="Home" /><h2 style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:800 }}>What do you need?</h2></div>
              <Choice opts={[
                {id:"mobile",label:"Mobile & 5G",desc:"SIM plans, wireless broadband, free smartphones",icon:Icons.phone(UB.sky,26),color:UB.sky,hook:"No wiring needed"},
                {id:"fixed",label:"Home Fibre",desc:"Fixed broadband with WiFi router, TV & combo bundles",icon:Icons.wifi(UB.blue,26),color:UB.blue,hook:"Free 3-6 months"},
              ]} /></>}

            {depth==="home_mobile"&&<><div style={{ marginBottom:24 }}><SectionLabel text="Mobile & 5G" /><h2 style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:800, marginBottom:6 }}>Stay connected everywhere</h2><p style={{ color:T.muted, fontSize:14 }}>No fibre needed. All plans include unlimited calls.</p></div>
              <Plans plans={P.home_mobile} /></>}

            {depth==="home_fixed"&&<><div style={{ textAlign:"center", marginBottom:32 }}><SectionLabel text="Home Fibre" /><h2 style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:800 }}>What's your situation?</h2></div>
              <Choice opts={[
                {id:"new",label:"New Application",desc:"First time Unifi or already a customer upgrading",icon:Icons.zap(UB.blue,26),color:UB.blue,hook:"FREE 3 months on selected plans"},
                {id:"switch",label:"Switching from Other Telco",desc:"Currently on Maxis, Celcom, Time, etc.",icon:Icons.trending(UB.green,26),color:UB.green,hook:"FREE up to 6 months or FREE TV/iPad"},
              ]} /></>}

            {depth==="home_fixed_new"&&<><div style={{ marginBottom:20 }}><SectionLabel text="New Application" /><h2 style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:800, marginBottom:6 }}>Pick your perfect plan</h2></div>
              <TabbedPlans data={P.home_new} /></>}

            {depth==="home_fixed_switch"&&<><div style={{ marginBottom:20 }}><SectionLabel text="Switching Deals" /><h2 style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:800, marginBottom:6 }}>Exclusive offers for switchers</h2><p style={{ color:T.muted, fontSize:13, marginBottom:4 }}>Competitor fibre/wireless bill required as proof.</p></div>
              <TabbedPlans data={P.home_switch} /></>}

            {depth==="biz"&&<><div style={{ textAlign:"center", marginBottom:32 }}><SectionLabel text="Business" /><h2 style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:800 }}>What does your business need?</h2></div>
              <Choice opts={[
                {id:"internet",label:"Business Internet",desc:"Fibre 300Mbps–2Gbps with static IP, SLA, free devices",icon:Icons.globe(UB.blue,26),color:UB.blue,hook:"From RM139/mo"},
                {id:"dms",label:"Digital Marketing",desc:"Facebook, Google, TikTok ads — managed for you",icon:Icons.trending(UB.orange,26),color:UB.orange,hook:"From RM100/mo"},
              ]} /></>}

            {depth==="biz_internet"&&<><div style={{ marginBottom:24 }}><SectionLabel text="Business Internet" /><h2 style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:800, marginBottom:6 }}>Built for operations</h2><div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:8 }}>{["Symmetric speeds","Static IP","Priority support"].map(b=><span key={b} style={{ padding:"4px 10px", borderRadius:6, background:UB.blue+"0A", color:UB.blue, fontSize:11, fontWeight:600, display:"flex", alignItems:"center", gap:4 }}>{Icons.check(UB.blue,11)}{b}</span>)}</div></div>
              <Plans plans={P.biz_internet} /></>}

            {depth==="biz_dms"&&<><div style={{ marginBottom:20 }}><SectionLabel text="Digital Marketing Solution (DMS)" /><h2 style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:800, marginBottom:6 }}>Your marketing team, on instalments</h2><p style={{ color:T.muted, fontSize:13 }}>Agency: RM1,500–5,000/mo upfront. <span style={{ color:UB.orange, fontWeight:700 }}>DMS: from RM100/mo.</span></p></div>
              {/* Package Finder */}
              <Card hover={false} style={{ padding:24, border:`1px solid ${UB.orange}20`, marginBottom:20, maxWidth:560 }}>
                {qs===-1&&!qr&&<div style={{ textAlign:"center" }}>
                  <div style={{ width:48, height:48, borderRadius:12, background:UB.orange+"0D", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}>{Icons.target(UB.orange,22)}</div>
                  <h3 style={{ fontSize:16, fontWeight:700, marginBottom:4 }}>Not sure which pack?</h3>
                  <p style={{ fontSize:13, color:T.muted, marginBottom:14 }}>4 questions. 30 seconds. Dream big.</p>
                  <PrimaryBtn text="Find My Package" onClick={()=>setQs(0)} style={{ fontSize:14, padding:"10px 22px" }} />
                </div>}
                {qs>=0&&!qr&&<div>
                  <div style={{ display:"flex", gap:4, marginBottom:16 }}>{DMS_QZ.map((_,i)=><div key={i} style={{ flex:1, height:3, borderRadius:2, background:i<=qs?UB.orange:T.border }} />)}</div>
                  <div style={{ fontSize:11, fontWeight:700, color:UB.orange, letterSpacing:1, marginBottom:4 }}>Q{qs+1}/{DMS_QZ.length}</div>
                  <h3 style={{ fontSize:16, fontWeight:700, marginBottom:12 }}>{DMS_QZ[qs].q}</h3>
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>{DMS_QZ[qs].o.map((o,i)=><button key={i} onClick={()=>qa(o.s)} style={{ background:T.sub, border:`1px solid ${T.border}`, padding:"10px 14px", borderRadius:8, cursor:"pointer", transition:"all 0.2s", color:T.text, textAlign:"left", fontSize:13, fontFamily:"'DM Sans',sans-serif", display:"flex", alignItems:"center", gap:8 }} onMouseEnter={e=>{e.currentTarget.style.borderColor=UB.orange;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;}}>
                    <span style={{ width:20, height:20, borderRadius:5, background:UB.orange+"0D", color:UB.orange, fontSize:10, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{String.fromCharCode(65+i)}</span>{o.l}
                  </button>)}</div>
                </div>}
                {qr!==null&&(()=>{const p=DMS_PKG[qr];return<div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:11, fontWeight:700, color:UB.green, letterSpacing:1, marginBottom:6 }}>{Icons.check(UB.green,14)} PERFECT MATCH</div>
                  <h3 style={{ fontSize:20, fontWeight:800 }}>{p.name} Pack — <span style={{ color:p.color }}>RM{p.mo}/mo</span></h3>
                  <div style={{ fontSize:12, color:T.muted, margin:"6px 0 14px" }}>{p.cr.toLocaleString()} credits · {p.camp}</div>
                  <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
                    <WaBtn text={`Get ${p.name}`} msg={`Hi, the Package Finder recommended DMS *${p.name} Pack* (RM${p.mo}/mo). Please proceed.`} utm="dms_finder" sm />
                    <button onClick={()=>{setQs(-1);setSc([0,0,0,0]);setQr(null);}} style={{ background:"none", border:`1px solid ${T.border}`, color:T.muted, padding:"8px 16px", borderRadius:8, fontSize:12, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>Retake</button>
                  </div>
                </div>;})()}
              </Card>
              <Plans plans={P.biz_dms} /></>}
          </div>);
        })()}
      </section>

      {/* ═══ AI CHATBOT (your deployed version) ═══ */}
      <section id="chatbot" style={{ padding:"72px 20px", background:"linear-gradient(160deg, "+UB.navy+" 0%, "+UB.purple+" 100%)", color:"white" }}>
        <div className="chat-flex" style={{ maxWidth:900, margin:"0 auto", display:"flex", flexWrap:"wrap", gap:36, alignItems:"center" }}>
          <div style={{ flex:"1 1 320px" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:8, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", marginBottom:14 }}><span style={{ fontSize:12, fontWeight:700 }}>{"🤖"} AI WHATSAPP CHATBOT</span></div>
            <h2 style={{ fontSize:"clamp(24px,3.5vw,36px)", fontWeight:800, marginBottom:12 }}>Hire an AI that<br/><span style={{ color:UB.sky }}>never sleeps</span></h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.8)", lineHeight:1.7, marginBottom:20 }}>WhatsApp replies in seconds. BM & English. Qualifies leads, takes orders, books appointments — while you sleep.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
              {["Replies instantly — no customer waits","BM & English fluently","Qualifies leads before they reach you","Takes orders & books appointments","Learns YOUR business"].map(f=><div key={f} style={{ display:"flex", alignItems:"center", gap:7, fontSize:13 }}>{Icons.check(UB.green,14)} {f}</div>)}
            </div>
            <div className="cta-flex" style={{ display:"flex", gap:14, flexWrap:"wrap", alignItems:"center" }}>
              <button onClick={()=>window.open("https://botku.ai","_blank")} style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"13px 24px", borderRadius:10, background:"white", color:UB.purple, fontSize:15, fontWeight:700, cursor:"pointer", border:"none", fontFamily:"'DM Sans',sans-serif" }} onMouseEnter={e=>{e.currentTarget.style.background=UB.sky;e.currentTarget.style.color="white";}} onMouseLeave={e=>{e.currentTarget.style.background="white";e.currentTarget.style.color=UB.purple;}}>Explore BotKu.ai →</button>
              <span style={{ fontSize:15, fontWeight:700, color:UB.sky }}>From RM200/mo</span>
            </div>
          </div>
          <div className="chat-mockup" style={{ flex:"1 1 280px", maxWidth:360 }}>
            <div style={{ background:"white", borderRadius:14, padding:16, boxShadow:"0 12px 40px rgba(0,0,0,0.3)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12, paddingBottom:10, borderBottom:"1px solid #eee" }}>
                <div style={{ width:32, height:32, borderRadius:"50%", background:UB.purple+"15", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{"🤖"}</div>
                <div><div style={{ fontSize:13, fontWeight:700, color:"#1a1a1a" }}>BotKu AI</div><div style={{ fontSize:10, color:UB.green, display:"flex", alignItems:"center", gap:3 }}><span style={{ width:5, height:5, borderRadius:"50%", background:UB.green, display:"inline-block" }} />Online 24/7</div></div>
              </div>
              {[{f:"user",t:"Berapa harga servis aircond?"},{f:"bot",t:"RM80 untuk 1 unit, RM140 untuk 2. Nak saya book slot? 😊"},{f:"user",t:"Ok book esok pagi"},{f:"bot",t:"Esok 10am ada slot. Nama dan alamat please? 👍"}].map((m,i)=>
                <div key={i} style={{ display:"flex", justifyContent:m.f==="user"?"flex-end":"flex-start", marginBottom:6 }}>
                  <div style={{ maxWidth:"80%", padding:"8px 12px", borderRadius:10, fontSize:12, lineHeight:1.5, color:"#1a1a1a", background:m.f==="user"?"#DCF8C6":"#f0f0f0", borderBottomRightRadius:m.f==="user"?3:10, borderBottomLeftRadius:m.f==="bot"?3:10 }}>{m.t}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS (your deployed version) ═══ */}
      <section style={{ padding:"72px 20px", maxWidth:1000, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}><SectionLabel text="How It Works" /><h2 style={{ fontSize:"clamp(24px,3.5vw,36px)", fontWeight:800 }}>Up and running in 3 steps</h2></div>
        <div className="steps-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2, background:T.border, borderRadius:16, overflow:"hidden" }}>
          {[{n:"01",icon:Icons.target,t:"Pick What You Need",d:"Internet, mobile, marketing, cloud, AI chatbot — mix and match."},{n:"02",icon:Icons.users,t:"We Handle Everything",d:"Installation, delivery, chatbot training, ad campaigns — done for you."},{n:"03",icon:Icons.chart,t:"Watch It Grow",d:"AI replies to customers. Ads bring leads. Team connected. You scale."}].map(s=>
            <div key={s.n} style={{ background:T.card, padding:"28px 20px", textAlign:"center" }}>
              <div style={{ width:44, height:44, borderRadius:10, background:UB.blue+"0D", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>{s.icon(UB.blue,20)}</div>
              <div style={{ fontSize:11, fontWeight:700, color:UB.blue, letterSpacing:2, marginBottom:6 }}>STEP {s.n}</div>
              <h3 style={{ fontSize:16, fontWeight:700, marginBottom:6 }}>{s.t}</h3>
              <p style={{ fontSize:13, color:T.muted, lineHeight:1.55 }}>{s.d}</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══ SUCCESS STORIES (your deployed version) ═══ */}
      <section style={{ padding:"72px 20px", background:T.sub }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}><SectionLabel text="Success Stories" /><h2 style={{ fontSize:"clamp(24px,3.5vw,36px)", fontWeight:800 }}>Real results from Malaysian SMEs</h2></div>
          <div className="stories-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16 }}>
            {STORIES.map(s=>(
              <div key={s.title} style={{ background:T.card, borderRadius:14, overflow:"hidden", border:"1px solid "+T.border, transition:"all 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.08)";e.currentTarget.style.transform="translateY(-3px)";}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}>
                <div style={{ height:150, position:"relative", overflow:"hidden", background:`linear-gradient(135deg,${UB.blue}20,${UB.sky}10)` }}>
                  <img src={s.img} alt={s.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>{e.target.style.opacity="0";}} />
                  <div style={{ position:"absolute", top:8, left:8, background:UB.blue, borderRadius:5, padding:"3px 8px", fontSize:10, fontWeight:700, color:"white" }}>{s.tag}</div>
                  <div style={{ position:"absolute", bottom:8, right:8, background:"white", borderRadius:8, padding:"6px 12px", boxShadow:"0 2px 8px rgba(0,0,0,0.12)", textAlign:"center" }}><div style={{ fontSize:20, fontWeight:800, color:UB.green }}>{s.metric}</div><div style={{ fontSize:8, color:"#666", fontWeight:600 }}>{s.metricLabel}</div></div>
                </div>
                <div style={{ padding:16 }}>
                  <h3 style={{ fontSize:15, fontWeight:700, marginBottom:8 }}>{s.title}</h3>
                  <div style={{ fontSize:12, marginBottom:4, display:"flex", alignItems:"flex-start", gap:5 }}>{Icons.x(UB.red,12)}<span style={{ color:T.muted }}>{s.bef}</span></div>
                  <div style={{ fontSize:12, display:"flex", alignItems:"flex-start", gap:5 }}>{Icons.check(UB.green,12)}<span>{s.aft}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NEW: COVERAGE ═══ */}
      <section id="coverage" style={{ padding:"56px 20px", textAlign:"center" }}>
        <div style={{ maxWidth:520, margin:"0 auto" }}>
          <SectionLabel text="Coverage" /><h2 style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:800, marginBottom:16 }}>Available nationwide</h2>
          {userLoc?
            <div style={{ background:UB.green+"08", border:`1px solid ${UB.green}20`, borderRadius:12, padding:"20px 24px", marginBottom:20 }}>
              <div style={{ fontSize:17, fontWeight:700, color:UB.green, marginBottom:4 }}>Get Unifi installed in {userLoc.city} within 24 hours</div>
              <div style={{ fontSize:13, color:T.muted }}>Same-day installation available in most areas.</div>
            </div>
            :<p style={{ color:T.muted, fontSize:15, marginBottom:20 }}>Same-day installation available in most areas across Malaysia.</p>
          }
          <WaBtn text={userLoc?`Check Coverage in ${userLoc.city}`:"Check My Coverage"} msg={userLoc?`Hi, I'm in ${userLoc.city}, ${userLoc.region}. Can you check if Unifi is available at my address?`:"Hi, can you check if Unifi fibre is available at my address?"} utm="coverage" />
        </div>
      </section>

      {/* ═══ NEW: WHY US ═══ */}
      <section style={{ padding:"56px 20px", background:T.sub }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:28 }}><SectionLabel text="Why UnifiBiz" /><h2 style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:800 }}>Why choose us?</h2></div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))", gap:12 }}>
            {[[Icons.msg,"WhatsApp Support","One contact for everything"],[Icons.target,"Plan Advisory","Honest — no upsell"],[Icons.zap,"24hr Processing","Fast application to activation"],[Icons.users,"After-Sales","Escalation & troubleshooting"],[Icons.shield,"SSM Registered","Fully legitimate reseller"]].map(([ic,t,d])=>
              <Card key={t} style={{ textAlign:"center", padding:18 }}>
                <div style={{ width:40, height:40, borderRadius:10, background:UB.orange+"0A", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}>{ic(UB.orange,18)}</div>
                <div style={{ fontSize:13, fontWeight:700 }}>{t}</div>
                <div style={{ fontSize:11, color:T.muted, marginTop:4 }}>{d}</div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* ═══ NEW: FAQ ═══ */}
      <section style={{ padding:"56px 20px" }}>
        <div style={{ maxWidth:700, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:28 }}><SectionLabel text="FAQ" /><h2 style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:800 }}>Frequently asked questions</h2></div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {FAQ.map(([q,a],i)=>(
              <div key={i} style={{ border:`1px solid ${T.border}`, borderRadius:10, overflow:"hidden", background:T.card }}>
                <button onClick={()=>setFaq(faq===i?null:i)} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 18px", background:"none", border:"none", color:T.text, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", textAlign:"left" }}>
                  {q}<span style={{ transition:"transform 0.3s", transform:faq===i?"rotate(180deg)":"rotate(0)", flexShrink:0, marginLeft:12 }}>{Icons.chevDown(T.muted,14)}</span>
                </button>
                {faq===i&&<div style={{ padding:"0 18px 16px", fontSize:13, color:T.muted, lineHeight:1.7, animation:"fadeUp 0.2s ease" }}>{a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA (your deployed version) ═══ */}
      <section style={{ padding:"72px 20px", background:"linear-gradient(160deg, "+UB.blue+", "+UB.sky+")", textAlign:"center" }}>
        <div style={{ maxWidth:520, margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(26px,4vw,40px)", fontWeight:800, marginBottom:12, color:"white" }}>Ready to get started?</h2>
          <p style={{ color:"rgba(255,255,255,0.85)", fontSize:15, marginBottom:24, lineHeight:1.7 }}>Home fibre, business broadband, free 5G phones, AI chatbot, marketing — <strong style={{ color:"white" }}>one partner</strong>.</p>
          <div className="cta-flex" style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:14 }}>
            <WaBtn text="WhatsApp Apply Now" msg="Hi, I'd like to apply for a Unifi product. Can you help?" utm="final_cta" style={{ fontSize:15, padding:"14px 28px" }} />
            <button onClick={()=>window.open("https://botku.ai","_blank")} style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"14px 24px", borderRadius:10, border:"1px solid rgba(255,255,255,0.3)", background:"rgba(255,255,255,0.1)", color:"white", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>{"🤖 AI Chatbot →"}</button>
          </div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.55)" }}>Free consultation · Mon–Sat · SSM required only if you sign up</div>
        </div>
      </section>
    </>
  );
}

function Layout({ children }) {
  const T = useTheme();
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:T.bg, color:T.text, minHeight:"100vh", overflowX:"hidden" }}>
      <style>{globalStyles(T)}</style>
      <Nav />{children}<Footer /><FloatingWA /><SocialProofToast />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider><Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/broadband" element={<Layout><Broadband /></Layout>} />
      <Route path="/air-biz" element={<Layout><AirBiz /></Layout>} />
      <Route path="/mobile" element={<Layout><Mobile /></Layout>} />
      <Route path="/cloud-storage" element={<Layout><CloudStorage /></Layout>} />
    </Routes></ThemeProvider>
  );
}
