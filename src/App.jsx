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
  {name:"Siti N.",product:"UNI5G Biz 59",loc:"Petaling Jaya",min:7},
  {name:"Kumar S.",product:"DMS Premium Pack",loc:"Penang",min:12},
  {name:"Mei Ling",product:"Air Biz 5G",loc:"Johor Bahru",min:18},
  {name:"Faizal H.",product:"Biz Broadband 500Mbps",loc:"Kuching",min:22},
  {name:"Nurul A.",product:"Cloud Storage Standard",loc:"Kota Kinabalu",min:28},
  {name:"Jason T.",product:"DMS Prime Pack",loc:"Subang Jaya",min:35},
  {name:"Amirah Z.",product:"UNI5G Biz 99",loc:"Cyberjaya",min:41},
];

function SocialProofToast() {
  const [idx,setIdx] = useState(0);
  const [show,setShow] = useState(false);
  useEffect(()=>{
    const cycle=()=>{setShow(true);setTimeout(()=>{setShow(false);setTimeout(()=>{setIdx(p=>(p+1)%PROOF.length);cycle();},2000);},4500);};
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

/* ═══ SOLUTIONS DATA (your deployed version) ═══ */
const SOLUTIONS = [
  { id:"internet", cat:"Internet", tagline:"Fibre & 5G wireless for your business.", icon:Icons.wifi, color:UB.blue, items:[
    { n:"Business Broadband", p:"From RM129/mo", sub:"Up to 2Gbps fibre", d:"Malaysia's fastest business fibre. Stream, sell, operate without limits.", img:"https://images.unsplash.com/photo-1497215842964-222b430dc094?w=480&h=280&fit=crop", link:"/broadband", hook:"FREE WiFi 7 Router + iPad 11", hookColor:UB.green },
    { n:"Unifi Air Biz 5G", p:"From RM99/mo", sub:"Wireless 5G — plug & play", d:"No wiring. No waiting. Plug in and go online in minutes.", img:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=480&h=280&fit=crop", link:"/air-biz", hook:"FREE 5G Router or MiFi", hookColor:UB.green },
  ]},
  { id:"mobile", cat:"Mobile", tagline:"Every line comes with a free 5G phone.", icon:Icons.phone, color:UB.sky, items:[
    { n:"UNI5G Biz 59", p:"RM59/mo", sub:"Samsung Galaxy A16 5G included", d:"Free 5G phone + unlimited data + unlimited calls.", img:"https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=480&h=280&fit=crop", link:"/mobile", hook:"FREE phone worth RM799", hookColor:UB.green },
    { n:"UNI5G Biz 99", p:"RM99/mo", sub:"Choose your flagship 5G phone", d:"100GB 5G data, unlimited calls. Pick Samsung, Redmi, or vivo.", img:"https://images.unsplash.com/photo-1560264280-88b68371db39?w=480&h=280&fit=crop", link:"/mobile", hook:"FREE flagship phone worth RM999+", hookColor:UB.green },
    { n:"UNI5G Biz 39", p:"RM39/mo", sub:"SIM only — bring your own phone", d:"30GB 5G data + unlimited calls. Cheapest 5G business line.", img:"https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?w=480&h=280&fit=crop", link:"/mobile", hook:"Only RM1.30/day", hookColor:UB.orange },
    { n:"Go Bookit Bundle", p:"RM99/mo", sub:"Phone + appointment booking app", d:"UNI5G Biz 99 + free Samsung + Go Bookit system for service businesses.", img:"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=480&h=280&fit=crop", link:"/mobile", hook:"RM3.30/day — phone + app + data", hookColor:UB.orange },
  ]},
  { id:"marketing", cat:"Digital Marketing", tagline:"Ads on Facebook, Google, TikTok & Instagram.", icon:Icons.trending, color:UB.orange, items:[
    { n:"Standard Pack", p:"RM100/mo", sub:"Awareness · 1.5–2 months", d:"840 ad credits. 4 platforms. Dedicated 3-person team.", img:"https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=480&h=280&fit=crop", wa:true, pkg:"Standard", hook:"RM3.30/day — cheaper than nasi lemak", hookColor:UB.orange },
    { n:"Premium Pack", p:"RM200/mo", sub:"Engagement · 3 months", d:"1,680 credits + video production included.", img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=480&h=280&fit=crop", wa:true, pkg:"Premium", hook:"Video production included FREE", hookColor:UB.green },
    { n:"Prime Pack", p:"RM450/mo", sub:"Sales Conversion · 5–6 months", d:"3,500 credits + video. Turn followers into paying customers.", img:"https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=480&h=280&fit=crop", wa:true, pkg:"Prime", hook:"4x more credits than Standard", hookColor:UB.blue },
    { n:"Pro Pack", p:"RM900/mo", sub:"Dominate · 12 months", d:"7,000 credits + video. Full-year campaign with maximum reach.", img:"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=480&h=280&fit=crop", wa:true, pkg:"Pro", pop:true, hook:"12 months of non-stop ads", hookColor:UB.red },
  ]},
  { id:"digital", cat:"Cloud & Security", tagline:"Protect your data. Sell online.", icon:Icons.cloud, color:UB.green, items:[
    { n:"Cloud Storage", p:"From RM11/mo", sub:"500GB – 5TB", d:"Files hosted in Malaysia. Access anywhere. End-to-end encrypted.", img:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=480&h=280&fit=crop", link:"/cloud-storage", hook:"Local MY data residency", hookColor:UB.blue },
    { n:"eCommerce Hub", p:"From RM49/mo", sub:"All-in-one online store", d:"Products, orders, payments, delivery — one platform.", img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=480&h=280&fit=crop", wa:true, hook:"Launch your store in days", hookColor:UB.orange },
    { n:"Kaspersky Security", p:"From RM30/mo", sub:"Business-grade protection", d:"Ransomware, phishing, data breach protection for every device.", img:"https://images.unsplash.com/photo-1563986768609-322da13575f2?w=480&h=280&fit=crop", wa:true, hook:"Protect all your devices", hookColor:UB.red },
  ]},
];

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
  const [activeSol, setActiveSol] = useState("internet");
  const [heroIdx, setHeroIdx] = useState(0);
  const [qs,setQs]=useState(-1);const [sc,setSc]=useState([0,0,0,0]);const [qr,setQr]=useState(null);
  const [faq,setFaq]=useState(null);

  useEffect(() => { const t=setInterval(()=>setHeroIdx(p=>(p+1)%HERO_IMAGES.length),4000); return()=>clearInterval(t); }, []);

  const scr = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  const act = (it) => {
    if (it.link) navigate(it.link);
    else if (it.wa||it.pkg) window.open(waL("Hi, I'm interested in *"+it.n+"* ("+it.p+"). Can you share more details?","solution_"+it.n.replace(/\s/g,"_")), "_blank");
  };
  const cat = SOLUTIONS.find(s => s.id === activeSol);
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
              <span style={{ fontSize:12, fontWeight:600, color:"white" }}>Official Unifi Business Partner</span>
            </div>
            <h1 style={{ fontSize:"clamp(30px,5vw,54px)", fontWeight:800, lineHeight:1.08, marginBottom:16, color:"white", letterSpacing:"-0.02em" }}>
              Free phones.<br/>Free routers.<br/><span style={{ color:UB.sky }}>From RM39/mo.</span>
            </h1>
            <p style={{ fontSize:"clamp(15px,2vw,17px)", color:"rgba(255,255,255,0.8)", lineHeight:1.7, marginBottom:24, maxWidth:460 }}>
              Every Unifi Business plan comes with <strong style={{ color:"white" }}>free devices</strong>. Add an AI chatbot that handles your customers 24/7. One partner, everything your business needs.
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
                <div><div>Check Coverage & Apply Now</div><div style={{ fontSize:11, fontWeight:400, opacity:0.85 }}>We reply in 30 seconds · 24/7</div></div>
              </a>
              <button onClick={()=>{setActiveSol("mobile");scr("solutions");}} style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"13px 24px", borderRadius:10, border:"1px solid rgba(255,255,255,0.3)", background:"rgba(255,255,255,0.08)", color:"white", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.15)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.08)"}>
                {Icons.phone("white",16)} Free 5G Phones
              </button>
            </div>
            <div style={{ marginBottom:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                {[1,2,3,4,5].map(i=><svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                <span style={{ fontSize:13, color:"white", fontWeight:600, marginLeft:2 }}>4.8/5</span>
                <span style={{ fontSize:12, color:"rgba(255,255,255,0.6)" }}>from 500+ customers</span>
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
          {[[Icons.shield,"SSM-Registered","Synergy Spark Sdn Bhd"],[Icons.users,"500+ Customers","Served nationwide"],[Icons.map,"All 13 States","+ 3 Federal Territories"],[Icons.zap,"24-Hour Processing","Fast activation"]].map(([ic,t,d])=>
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
          {[["500+","INSTALLATIONS",UB.blue],["4.8/5","RATING",UB.orange],["<30s","REPLY TIME",UB.green]].map(([v,l,c])=>
            <div key={l} style={{ textAlign:"center", minWidth:120 }}>
              <div style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:800, color:c, letterSpacing:"-0.02em" }}>{v}</div>
              <div style={{ fontSize:11, color:T.muted, fontWeight:600, letterSpacing:1.5, marginTop:2 }}>{l}</div>
            </div>
          )}
        </div>
      </section>

      {/* Partner strip */}
      <div style={{ padding:"20px 20px 0" }}><div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}><p style={{ fontSize:11, color:T.muted, marginBottom:12, fontWeight:500, letterSpacing:1, textTransform:"uppercase" }}>Your ads run on</p><PartnerLogos T={T} /></div></div>

      {/* ═══ NEW: QUICK NAV ═══ */}
      <section style={{ padding:"40px 20px 16px", maxWidth:1000, margin:"0 auto" }}>
        <div className="quick-nav" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10 }}>
          {[[Icons.building,"Business BB","From RM129","internet"],[Icons.phone,"5G Mobile","From RM39","mobile"],[Icons.trending,"DMS","From RM100","marketing"],[Icons.wifi,"Air 5G","From RM99","internet"],[Icons.cloud,"Cloud & Security","From RM11","digital"]].map(([ic,t,p,tab])=>
            <button key={t} onClick={()=>{setActiveSol(tab);scr("solutions");}}
              style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:10, padding:"14px 10px", textAlign:"center", cursor:"pointer", transition:"all 0.2s", fontFamily:"'DM Sans',sans-serif" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=UB.blue;e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=T.cardHover;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
              <div style={{ width:36, height:36, borderRadius:10, background:UB.blue+"0A", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:6 }}>{ic(UB.blue,18)}</div>
              <div style={{ fontSize:12, fontWeight:700, color:T.text }}>{t}</div>
              <div style={{ fontSize:11, fontWeight:700, color:T.accent }}>{p}</div>
            </button>
          )}
        </div>
      </section>

      {/* ═══ SOLUTIONS (your deployed tab system) ═══ */}
      <section id="solutions" style={{ padding:"36px 20px 72px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:36 }}><SectionLabel text="Business Solutions" /><h2 style={{ fontSize:"clamp(24px,3.5vw,36px)", fontWeight:800, color:T.text }}>Everything under one roof</h2><p style={{ color:T.muted, fontSize:15, marginTop:8 }}>Internet, mobile, marketing, cloud — pick what you need.</p></div>
        <div className="tabs-wrap" style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center", marginBottom:28 }}>
          {SOLUTIONS.map(s=><button key={s.id} onClick={()=>setActiveSol(s.id)} style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 18px", borderRadius:10, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, transition:"all 0.2s", border:activeSol===s.id?"2px solid "+s.color:"1px solid "+T.border, background:activeSol===s.id?s.color:T.card, color:activeSol===s.id?"white":T.muted }}>
            {s.icon(activeSol===s.id?"white":T.muted,16)} {s.cat}
          </button>)}
        </div>
        {cat&&<div>
          <div style={{ marginBottom:20, textAlign:"center" }}><span style={{ fontSize:14, color:cat.color, fontWeight:600 }}>{cat.tagline}</span></div>
          <div className="sol-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:16 }}>
            {cat.items.map(it=>(
              <div key={it.n} style={{ background:T.card, borderRadius:14, overflow:"hidden", border:"1px solid "+T.border, transition:"all 0.25s", position:"relative" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=cat.color;e.currentTarget.style.boxShadow="0 8px 30px "+cat.color+"15";e.currentTarget.style.transform="translateY(-4px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}>
                {it.pop&&<div style={{ background:UB.red, color:"white", textAlign:"center", fontSize:11, fontWeight:700, padding:"5px 0", letterSpacing:1 }}>MOST POPULAR</div>}
                <div style={{ height:170, overflow:"hidden", position:"relative" }}>
                  <img src={it.img} alt={it.n} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>{e.target.parentElement.style.background=cat.color+"10";e.target.style.display="none";}} />
                  {it.hook&&<div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"8px 12px", background:"linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))" }}>
                    <div style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 10px", borderRadius:6, background:it.hookColor, fontSize:11, fontWeight:700, color:"white" }}>{it.hookColor===UB.green?Icons.check("white",11):Icons.zap("white",11)} {it.hook}</div>
                  </div>}
                  <div style={{ position:"absolute", top:8, right:8, background:"white", borderRadius:6, padding:"4px 8px", boxShadow:"0 2px 8px rgba(0,0,0,0.12)" }}><div style={{ fontSize:14, fontWeight:800, color:cat.color }}>{it.p}</div></div>
                </div>
                <div style={{ padding:"14px 16px 18px" }}>
                  {it.sub&&<div style={{ fontSize:11, fontWeight:600, color:cat.color, marginBottom:3 }}>{it.sub}</div>}
                  <h3 style={{ fontSize:16, fontWeight:700, color:T.text, marginBottom:6 }}>{it.n}</h3>
                  <p style={{ fontSize:13, color:T.muted, lineHeight:1.55, marginBottom:14 }}>{it.d}</p>
                  <button onClick={()=>act(it)} style={{ width:"100%", padding:"10px 14px", borderRadius:10, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600, transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:6, border:"none", background:cat.color, color:"white" }}
                    onMouseEnter={e=>e.currentTarget.style.opacity="0.85"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                    {it.link?"View Plans →":"Enquire Now →"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>}
      </section>

      {/* ═══ NEW: DMS PACKAGE FINDER ═══ */}
      <section id="dms-finder" style={{ padding:"56px 20px", background:T.sub }}>
        <div style={{ maxWidth:600, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:20 }}><SectionLabel text="Digital Marketing Solution (DMS)" /><h2 style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:800 }}>Not sure which DMS pack?</h2><p style={{ color:T.muted, fontSize:14, marginTop:6 }}>Agency: RM1,500–5,000/month upfront. <span style={{ color:T.accent, fontWeight:700 }}>DMS: from RM100/month.</span></p></div>
          <Card hover={false} style={{ padding:28, border:`1px solid ${UB.orange}20` }}>
            {qs===-1&&!qr&&<div style={{ textAlign:"center" }}>
              <div style={{ width:52, height:52, borderRadius:14, background:UB.orange+"0D", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>{Icons.target(UB.orange,24)}</div>
              <h3 style={{ fontSize:18, fontWeight:700, marginBottom:6 }}>Find your perfect DMS pack</h3>
              <p style={{ fontSize:13, color:T.muted, marginBottom:16 }}>4 questions. 30 seconds. Dream big.</p>
              <PrimaryBtn text="Find My Package" onClick={()=>setQs(0)} />
            </div>}
            {qs>=0&&!qr&&<div>
              <div style={{ display:"flex", gap:4, marginBottom:20 }}>{DMS_QZ.map((_,i)=><div key={i} style={{ flex:1, height:3, borderRadius:2, background:i<=qs?UB.orange:T.border, transition:"background 0.3s" }} />)}</div>
              <div style={{ fontSize:11, fontWeight:700, color:UB.orange, letterSpacing:1, marginBottom:6 }}>QUESTION {qs+1} OF {DMS_QZ.length}</div>
              <h3 style={{ fontSize:17, fontWeight:700, marginBottom:14 }}>{DMS_QZ[qs].q}</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>{DMS_QZ[qs].o.map((o,i)=><button key={i} onClick={()=>qa(o.s)} style={{ background:T.sub, border:`1px solid ${T.border}`, padding:"12px 16px", borderRadius:10, cursor:"pointer", transition:"all 0.2s", color:T.text, textAlign:"left", fontSize:13, fontFamily:"'DM Sans',sans-serif", display:"flex", alignItems:"center", gap:8 }} onMouseEnter={e=>{e.currentTarget.style.borderColor=UB.orange;e.currentTarget.style.background=UB.orange+"08";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.background=T.sub;}}>
                <span style={{ width:22, height:22, borderRadius:6, background:UB.orange+"0D", color:UB.orange, fontSize:10, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{String.fromCharCode(65+i)}</span>{o.l}
              </button>)}</div>
            </div>}
            {qr!==null&&(()=>{const p=DMS_PKG[qr];return<div style={{ textAlign:"center" }}>
              <div style={{ fontSize:12, fontWeight:700, color:UB.green, letterSpacing:1, marginBottom:6 }}>{Icons.check(UB.green,16)} PERFECT MATCH</div>
              <h3 style={{ fontSize:22, fontWeight:800 }}>{p.name} Pack — <span style={{ color:p.color }}>RM{p.mo}/mo</span></h3>
              <div style={{ fontSize:12, color:T.muted, margin:"6px 0 16px" }}>{p.cr.toLocaleString()} credits · {p.camp} campaign</div>
              <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
                <WaBtn text={`Get ${p.name} Pack`} msg={`Hi, the Smart Package Finder recommended *${p.name} Pack* (RM${p.mo}/mo, ${p.cr} credits). Please proceed.`} utm="dms_finder" />
                <button onClick={()=>{setQs(-1);setSc([0,0,0,0]);setQr(null);}} style={{ background:"none", border:`1px solid ${T.border}`, color:T.muted, padding:"10px 18px", borderRadius:10, fontSize:13, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>Retake</button>
              </div>
            </div>;})()}
          </Card>
        </div>
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
        <div style={{ maxWidth:600, margin:"0 auto" }}>
          <SectionLabel text="Coverage" /><h2 style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:800, marginBottom:16 }}>Available nationwide</h2>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:8, marginBottom:24 }}>
            {["Johor","Kedah","Kelantan","Melaka","N. Sembilan","Pahang","Perak","Perlis","Penang","Sabah","Sarawak","Selangor","Terengganu","KL","Putrajaya","Labuan"].map(s=>
              <span key={s} style={{ padding:"6px 12px", borderRadius:8, background:UB.blue+"08", color:UB.blue, fontSize:11, fontWeight:600, border:`1px solid ${UB.blue}15` }}>{s}</span>
            )}
          </div>
          <p style={{ color:T.muted, fontSize:14, marginBottom:16 }}>Not sure if your area has coverage?</p>
          <WaBtn text="Check My Coverage" msg="Hi, can you check if Unifi fibre is available at my address?" utm="coverage" />
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
          <h2 style={{ fontSize:"clamp(26px,4vw,40px)", fontWeight:800, marginBottom:12, color:"white" }}>Ready to equip your business?</h2>
          <p style={{ color:"rgba(255,255,255,0.85)", fontSize:15, marginBottom:24, lineHeight:1.7 }}>Internet, free 5G phones, AI chatbot, marketing — <strong style={{ color:"white" }}>one partner</strong>.</p>
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
