import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useTheme, ThemeProvider, Icons, PartnerLogos, Card, SectionLabel, WaBtn, PrimaryBtn, Nav, Footer, waL, globalStyles } from "./theme";
import Broadband from "./pages/Broadband";
import AirBiz from "./pages/AirBiz";
import Mobile from "./pages/Mobile";
import CloudStorage from "./pages/CloudStorage";

const UB = {
  blue:"#0033A1", sky:"#00A3E0", navy:"#001A5C",
  orange:"#FF6B00", green:"#00B67A", purple:"#7B2FBE", red:"#E5002B",
};

/* ═══ RESPONSIVE STYLES injected once ═══ */
const responsiveCSS = "\n@media(max-width:768px){\n  .hero-flex{flex-direction:column!important;gap:28px!important;}\n  .hero-left{max-width:100%!important;}\n  .hero-right{width:100%!important;flex:1 1 100%!important;}\n  .hero-right .carousel-wrap{height:220px!important;}\n  .steps-grid{grid-template-columns:1fr!important;gap:0!important;background:transparent!important;}\n  .steps-grid>div{border-radius:12px!important;margin-bottom:8px!important;}\n  .sol-grid{grid-template-columns:1fr!important;}\n  .chat-flex{flex-direction:column!important;}\n  .chat-mockup{max-width:100%!important;}\n  .cta-flex{flex-direction:column!important;align-items:stretch!important;}\n  .cta-flex button{width:100%!important;justify-content:center!important;}\n  .stories-grid{grid-template-columns:1fr!important;}\n  .tabs-wrap{gap:6px!important;}\n  .tabs-wrap button{padding:8px 14px!important;font-size:13px!important;}\n  .hero-stats-strip{gap:10px!important;}\n}\n@media(max-width:480px){\n  .sol-grid{grid-template-columns:1fr!important;}\n  .hero-right .carousel-wrap{height:180px!important;}\n}\n";

const SOLUTIONS = [
  {
    id:"internet", cat:"Internet", tagline:"Fibre & 5G wireless for your business.",
    icon:Icons.wifi, color:UB.blue,
    items:[
      { n:"Business Broadband", p:"From RM129/mo", sub:"Up to 2Gbps fibre", d:"Malaysia's fastest business fibre. Stream, sell, operate without limits.", img:"https://images.unsplash.com/photo-1497215842964-222b430dc094?w=480&h=280&fit=crop", link:"/broadband", hook:"FREE WiFi 7 Router + iPad 11", hookColor:UB.green },
      { n:"Unifi Air Biz 5G", p:"From RM99/mo", sub:"Wireless 5G — plug & play", d:"No wiring. No waiting. Plug in and go online in minutes. Ideal for new outlets & pop-ups.", img:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=480&h=280&fit=crop", link:"/air-biz", hook:"FREE 5G Router or MiFi", hookColor:UB.green },
    ]
  },
  {
    id:"mobile", cat:"Mobile", tagline:"Every line comes with a free 5G phone.",
    icon:Icons.phone, color:UB.sky,
    items:[
      { n:"UNI5G Biz 59", p:"RM59/mo", sub:"Samsung Galaxy A16 5G included", d:"Free 5G phone + unlimited data + unlimited calls. 0% instalment, no credit card needed.", img:"https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=480&h=280&fit=crop", link:"/mobile", hook:"FREE phone worth RM799", hookColor:UB.green },
      { n:"UNI5G Biz 99", p:"RM99/mo", sub:"Choose your flagship 5G phone", d:"100GB 5G data, unlimited calls. Pick Samsung, Redmi, or vivo. Equip every field agent.", img:"https://images.unsplash.com/photo-1560264280-88b68371db39?w=480&h=280&fit=crop", link:"/mobile", hook:"FREE flagship phone worth RM999+", hookColor:UB.green },
      { n:"UNI5G Biz 39", p:"RM39/mo", sub:"SIM only — bring your own phone", d:"30GB 5G data + unlimited calls. Cheapest 5G business line in Malaysia.", img:"https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?w=480&h=280&fit=crop", link:"/mobile", hook:"Only RM1.30/day", hookColor:UB.orange },
      { n:"Go Bookit Bundle", p:"RM99/mo", sub:"Phone + appointment booking app", d:"UNI5G Biz 99 + free Samsung Galaxy A16 5G + Go Bookit system for service businesses.", img:"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=480&h=280&fit=crop", link:"/mobile", hook:"RM3.30/day — phone + app + data", hookColor:UB.orange },
    ]
  },
  {
    id:"marketing", cat:"Digital Marketing", tagline:"Ads on Facebook, Google, TikTok & Instagram.",
    icon:Icons.trending, color:UB.orange,
    items:[
      { n:"Standard Pack", p:"RM100/mo", sub:"Awareness · 1.5–2 months", d:"840 ad credits. 4 platforms. Dedicated 3-person team.", img:"https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=480&h=280&fit=crop", wa:true, pkg:"Standard", hook:"RM3.30/day — cheaper than nasi lemak", hookColor:UB.orange },
      { n:"Premium Pack", p:"RM200/mo", sub:"Engagement · 3 months", d:"1,680 credits + video production included. Build loyal followers who buy.", img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=480&h=280&fit=crop", wa:true, pkg:"Premium", hook:"Video production included FREE", hookColor:UB.green },
      { n:"Prime Pack", p:"RM450/mo", sub:"Sales Conversion · 5–6 months", d:"3,500 credits + video. Turn followers into paying customers.", img:"https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=480&h=280&fit=crop", wa:true, pkg:"Prime", hook:"4x more credits than Standard", hookColor:UB.blue },
      { n:"Pro Pack", p:"RM900/mo", sub:"Dominate · 12 months", d:"7,000 credits + video. Full-year campaign with maximum reach.", img:"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=480&h=280&fit=crop", wa:true, pkg:"Pro", pop:true, hook:"12 months of non-stop ads", hookColor:UB.red },
    ]
  },
  {
    id:"digital", cat:"Cloud & Security", tagline:"Protect your data. Sell online.",
    icon:Icons.cloud, color:UB.green,
    items:[
      { n:"Cloud Storage", p:"From RM11/mo", sub:"500GB – 5TB", d:"Files hosted in Malaysia. Access anywhere. End-to-end encrypted.", img:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=480&h=280&fit=crop", link:"/cloud-storage", hook:"Local MY data residency", hookColor:UB.blue },
      { n:"eCommerce Hub", p:"From RM49/mo", sub:"All-in-one online store", d:"Products, orders, payments, delivery — one platform.", img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=480&h=280&fit=crop", wa:true, hook:"Launch your store in days", hookColor:UB.orange },
      { n:"Kaspersky Security", p:"From RM30/mo", sub:"Business-grade protection", d:"Ransomware, phishing, data breach protection for every device.", img:"https://images.unsplash.com/photo-1563986768609-322da13575f2?w=480&h=280&fit=crop", wa:true, hook:"Protect all your devices", hookColor:UB.red },
    ]
  },
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


function Home() {
  const T = useTheme();
  const navigate = useNavigate();
  const [activeSol, setActiveSol] = useState("internet");
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(p => (p + 1) % HERO_IMAGES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const scr = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  const act = (it) => {
    if (it.link) navigate(it.link);
    else if (it.wa || it.pkg) window.open(waL("Hi, I'm interested in *" + it.n + "* (" + it.p + "). Can you share more details?"), "_blank");
  };
  const cat = SOLUTIONS.find(s => s.id === activeSol);

  return (
    <>
      <style>{responsiveCSS}</style>

      {/* ═══ HERO — full width edge to edge ═══ */}
      <section style={{ width:"100%", background:"linear-gradient(160deg, " + UB.navy + " 0%, " + UB.blue + " 60%, " + UB.sky + " 100%)", padding:"90px 20px 60px", position:"relative", overflow:"hidden", boxSizing:"border-box" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:400, height:400, borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-100, left:"30%", width:500, height:500, borderRadius:"50%", background:"rgba(0,163,224,0.06)", pointerEvents:"none" }} />

        <div className="hero-flex" style={{ maxWidth:1100, margin:"0 auto", display:"flex", flexWrap:"wrap", gap:48, alignItems:"center" }}>
          <div className="hero-left fade-up" style={{ flex:"1 1 400px", maxWidth:540 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:8, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", marginBottom:18 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:UB.green }} />
              <span style={{ fontSize:12, fontWeight:600, color:"white" }}>Official Unifi Business Partner</span>
            </div>
            <h1 style={{ fontSize:"clamp(30px,5vw,54px)", fontWeight:800, lineHeight:1.08, marginBottom:16, color:"white", letterSpacing:"-0.02em" }}>
              Free phones.<br/>Free routers.<br/>
              <span style={{ color:UB.sky }}>From RM39/mo.</span>
            </h1>
            <p style={{ fontSize:"clamp(15px,2vw,17px)", color:"rgba(255,255,255,0.8)", lineHeight:1.7, marginBottom:24, maxWidth:460 }}>
              Every Unifi Business plan comes with <strong style={{ color:"white" }}>free devices</strong>. Add an AI chatbot that handles your customers 24/7. One partner, everything your business needs.
            </p>
            <div className="cta-flex" style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:20 }}>
              <button onClick={() => scr("solutions")}
                style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"13px 24px", borderRadius:10, background:"white", color:UB.blue, fontSize:15, fontWeight:700, cursor:"pointer", border:"none", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = UB.sky; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = UB.blue; }}
              >
                See All Solutions {Icons.arrow(UB.blue,16)}
              </button>
              <button onClick={() => { setActiveSol("mobile"); scr("solutions"); }}
                style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"13px 24px", borderRadius:10, border:"1px solid rgba(255,255,255,0.3)", background:"rgba(255,255,255,0.08)", color:"white", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
              >
                {Icons.phone("white",16)} Free 5G Phones
              </button>
            </div>
            <div className="hero-stats-strip" style={{ display:"flex", gap:20, flexWrap:"wrap", fontSize:12, color:"rgba(255,255,255,0.65)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>{Icons.check(UB.green,13)}<span>Free devices with plans</span></div>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>{Icons.shield(UB.sky,13)}<span>SSM Registered</span></div>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>{Icons.users(UB.sky,13)}<span>500+ SMEs</span></div>
            </div>
          </div>

          <div className="hero-right fade-up-d2" style={{ flex:"1 1 380px", position:"relative" }}>
            <div style={{ borderRadius:16, overflow:"hidden", position:"relative", border:"2px solid rgba(255,255,255,0.1)" }}>
              <div className="carousel-wrap" style={{ position:"relative", overflow:"hidden", height:300 }}>
                {HERO_IMAGES.map((img, i) => (
                  <img key={i} src={img.src} alt={img.alt}
                    style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", objectFit:"cover", opacity: heroIdx === i ? 1 : 0, transition:"opacity 0.8s ease" }}
                    onError={e => { e.target.style.opacity = "0"; }}
                  />
                ))}
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
              {HERO_IMAGES.map((_, i) => (
                <button key={i} onClick={() => setHeroIdx(i)} style={{ width: heroIdx === i ? 22 : 8, height:7, borderRadius:4, border:"none", cursor:"pointer", transition:"all 0.3s", background: heroIdx === i ? "white" : "rgba(255,255,255,0.3)" }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner strip */}
      <div style={{ padding:"20px 20px 0" }}>
        <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
          <p style={{ fontSize:11, color:T.muted, marginBottom:12, fontWeight:500, letterSpacing:1, textTransform:"uppercase" }}>Your ads run on</p>
          <PartnerLogos T={T} />
        </div>
      </div>

      {/* ═══ SOLUTIONS ═══ */}
      <section id="solutions" style={{ padding:"56px 20px 72px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <SectionLabel text="Business Solutions" />
          <h2 style={{ fontSize:"clamp(24px,3.5vw,36px)", fontWeight:800, color:T.text }}>Everything under one roof</h2>
          <p style={{ color:T.muted, fontSize:15, marginTop:8 }}>Internet, mobile, marketing, cloud — pick what you need.</p>
        </div>
        <div className="tabs-wrap" style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center", marginBottom:28 }}>
          {SOLUTIONS.map(s => (
            <button key={s.id} onClick={() => setActiveSol(s.id)}
              style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 18px", borderRadius:10, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, transition:"all 0.2s", border: activeSol === s.id ? "2px solid " + s.color : "1px solid " + T.border, background: activeSol === s.id ? s.color : T.card, color: activeSol === s.id ? "white" : T.muted }}>
              {s.icon(activeSol === s.id ? "white" : T.muted, 16)} {s.cat}
            </button>
          ))}
        </div>
        {cat && (
          <div>
            <div style={{ marginBottom:20, textAlign:"center" }}><span style={{ fontSize:14, color:cat.color, fontWeight:600 }}>{cat.tagline}</span></div>
            <div className="sol-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:16 }}>
              {cat.items.map(it => (
                <div key={it.n} style={{ background:T.card, borderRadius:14, overflow:"hidden", border:"1px solid " + T.border, transition:"all 0.25s", position:"relative" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.boxShadow = "0 8px 30px " + cat.color + "15"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
                  {it.pop && <div style={{ background:UB.red, color:"white", textAlign:"center", fontSize:11, fontWeight:700, padding:"5px 0", letterSpacing:1 }}>MOST POPULAR</div>}
                  <div style={{ height:170, overflow:"hidden", position:"relative" }}>
                    <img src={it.img} alt={it.n} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e => { e.target.parentElement.style.background = cat.color + "10"; e.target.style.display = "none"; }} />
                    {it.hook && <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"8px 12px", background:"linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))" }}>
                      <div style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 10px", borderRadius:6, background:it.hookColor, fontSize:11, fontWeight:700, color:"white" }}>
                        {it.hookColor === UB.green ? Icons.check("white",11) : Icons.zap("white",11)} {it.hook}
                      </div>
                    </div>}
                    <div style={{ position:"absolute", top:8, right:8, background:"white", borderRadius:6, padding:"4px 8px", boxShadow:"0 2px 8px rgba(0,0,0,0.12)" }}>
                      <div style={{ fontSize:14, fontWeight:800, color:cat.color }}>{it.p}</div>
                    </div>
                  </div>
                  <div style={{ padding:"14px 16px 18px" }}>
                    {it.sub && <div style={{ fontSize:11, fontWeight:600, color:cat.color, marginBottom:3 }}>{it.sub}</div>}
                    <h3 style={{ fontSize:16, fontWeight:700, color:T.text, marginBottom:6 }}>{it.n}</h3>
                    <p style={{ fontSize:13, color:T.muted, lineHeight:1.55, marginBottom:14 }}>{it.d}</p>
                    <button onClick={() => act(it)}
                      style={{ width:"100%", padding:"10px 14px", borderRadius:10, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600, transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:6, border:"none", background:cat.color, color:"white" }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                      {it.link ? "View Plans →" : "Enquire Now →"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ═══ AI CHATBOT ═══ */}
      <section style={{ padding:"72px 20px", background:"linear-gradient(160deg, " + UB.navy + " 0%, " + UB.purple + " 100%)", color:"white" }}>
        <div className="chat-flex" style={{ maxWidth:900, margin:"0 auto", display:"flex", flexWrap:"wrap", gap:36, alignItems:"center" }}>
          <div style={{ flex:"1 1 320px" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:8, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", marginBottom:14 }}>
              <span style={{ fontSize:12, fontWeight:700 }}>{"🤖"} AI WHATSAPP CHATBOT</span>
            </div>
            <h2 style={{ fontSize:"clamp(24px,3.5vw,36px)", fontWeight:800, marginBottom:12 }}>
              Hire an AI that<br/><span style={{ color:UB.sky }}>never sleeps</span>
            </h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.8)", lineHeight:1.7, marginBottom:20 }}>
              WhatsApp replies in seconds. BM & English. Qualifies leads, takes orders, books appointments — while you sleep.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
              {["Replies instantly — no customer waits","BM & English fluently","Qualifies leads before they reach you","Takes orders & books appointments","Learns YOUR business"].map(f => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:7, fontSize:13 }}>{Icons.check(UB.green,14)} {f}</div>
              ))}
            </div>
            <div className="cta-flex" style={{ display:"flex", gap:14, flexWrap:"wrap", alignItems:"center" }}>
              <button onClick={() => window.open("https://botku.ai","_blank")}
                style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"13px 24px", borderRadius:10, background:"white", color:UB.purple, fontSize:15, fontWeight:700, cursor:"pointer", border:"none", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = UB.sky; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = UB.purple; }}>
                {"Explore BotKu.ai →"}
              </button>
              <span style={{ fontSize:15, fontWeight:700, color:UB.sky }}>From RM200/mo</span>
            </div>
          </div>
          <div className="chat-mockup" style={{ flex:"1 1 280px", maxWidth:360 }}>
            <div style={{ background:"white", borderRadius:14, padding:16, boxShadow:"0 12px 40px rgba(0,0,0,0.3)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12, paddingBottom:10, borderBottom:"1px solid #eee" }}>
                <div style={{ width:32, height:32, borderRadius:"50%", background:UB.purple+"15", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{"🤖"}</div>
                <div><div style={{ fontSize:13, fontWeight:700, color:"#1a1a1a" }}>BotKu AI</div><div style={{ fontSize:10, color:UB.green, display:"flex", alignItems:"center", gap:3 }}><span style={{ width:5, height:5, borderRadius:"50%", background:UB.green, display:"inline-block" }} />Online 24/7</div></div>
              </div>
              {[
                { f:"user", t:"Berapa harga servis aircond?" },
                { f:"bot", t:"RM80 untuk 1 unit, RM140 untuk 2. Nak saya book slot? \uD83D\uDE0A" },
                { f:"user", t:"Ok book esok pagi" },
                { f:"bot", t:"Esok 10am ada slot. Nama dan alamat please? \uD83D\uDC4D" },
              ].map((m,i) => (
                <div key={i} style={{ display:"flex", justifyContent: m.f==="user" ? "flex-end" : "flex-start", marginBottom:6 }}>
                  <div style={{ maxWidth:"80%", padding:"8px 12px", borderRadius:10, fontSize:12, lineHeight:1.5, color:"#1a1a1a", background: m.f==="user" ? "#DCF8C6" : "#f0f0f0", borderBottomRightRadius: m.f==="user" ? 3 : 10, borderBottomLeftRadius: m.f==="bot" ? 3 : 10 }}>{m.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{ padding:"72px 20px", maxWidth:1000, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <SectionLabel text="How It Works" />
          <h2 style={{ fontSize:"clamp(24px,3.5vw,36px)", fontWeight:800, color:T.text }}>Up and running in 3 steps</h2>
        </div>
        <div className="steps-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2, background:T.border, borderRadius:16, overflow:"hidden" }}>
          {[
            { n:"01", icon:Icons.target, t:"Pick What You Need", d:"Internet, mobile, marketing, cloud, AI chatbot — mix and match." },
            { n:"02", icon:Icons.users, t:"We Handle Everything", d:"Installation, delivery, chatbot training, ad campaigns — done for you." },
            { n:"03", icon:Icons.chart, t:"Watch It Grow", d:"AI replies to customers. Ads bring leads. Team connected. You scale." },
          ].map((s,i) => (
            <div key={s.n} style={{ background:T.card, padding:"28px 20px", textAlign:"center" }}>
              <div style={{ width:44, height:44, borderRadius:10, background:UB.blue+"0D", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>{s.icon(UB.blue,20)}</div>
              <div style={{ fontSize:11, fontWeight:700, color:UB.blue, letterSpacing:2, marginBottom:6 }}>{"STEP " + s.n}</div>
              <h3 style={{ fontSize:16, fontWeight:700, marginBottom:6, color:T.text }}>{s.t}</h3>
              <p style={{ fontSize:13, color:T.muted, lineHeight:1.55 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SUCCESS STORIES ═══ */}
      <section style={{ padding:"72px 20px", background:T.sub }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <SectionLabel text="Success Stories" />
            <h2 style={{ fontSize:"clamp(24px,3.5vw,36px)", fontWeight:800, color:T.text }}>Real results from Malaysian SMEs</h2>
          </div>
          <div className="stories-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16 }}>
            {STORIES.map(s => (
              <div key={s.title} style={{ background:T.card, borderRadius:14, overflow:"hidden", border:"1px solid " + T.border, transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
                <div style={{ height:150, position:"relative", overflow:"hidden" }}>
                  <img src={s.img} alt={s.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e => { e.target.style.opacity="0"; }} />
                  <div style={{ position:"absolute", top:8, left:8, background:UB.blue, borderRadius:5, padding:"3px 8px", fontSize:10, fontWeight:700, color:"white" }}>{s.tag}</div>
                  <div style={{ position:"absolute", bottom:8, right:8, background:"white", borderRadius:8, padding:"6px 12px", boxShadow:"0 2px 8px rgba(0,0,0,0.12)", textAlign:"center" }}>
                    <div style={{ fontSize:20, fontWeight:800, color:UB.green }}>{s.metric}</div>
                    <div style={{ fontSize:8, color:"#666", fontWeight:600 }}>{s.metricLabel}</div>
                  </div>
                </div>
                <div style={{ padding:16 }}>
                  <h3 style={{ fontSize:15, fontWeight:700, marginBottom:8, color:T.text }}>{s.title}</h3>
                  <div style={{ fontSize:12, marginBottom:4, display:"flex", alignItems:"flex-start", gap:5 }}>{Icons.x(UB.red,12)}<span style={{ color:T.muted }}>{s.bef}</span></div>
                  <div style={{ fontSize:12, display:"flex", alignItems:"flex-start", gap:5 }}>{Icons.check(UB.green,12)}<span style={{ color:T.text }}>{s.aft}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section style={{ padding:"72px 20px", background:"linear-gradient(160deg, " + UB.blue + ", " + UB.sky + ")", textAlign:"center" }}>
        <div style={{ maxWidth:520, margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(26px,4vw,40px)", fontWeight:800, marginBottom:12, color:"white" }}>Ready to equip your business?</h2>
          <p style={{ color:"rgba(255,255,255,0.85)", fontSize:15, marginBottom:24, lineHeight:1.7 }}>
            Internet, free 5G phones, AI chatbot, marketing — <strong style={{ color:"white" }}>one partner</strong>.
          </p>
          <div className="cta-flex" style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:14 }}>
            <button onClick={() => scr("solutions")}
              style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 28px", borderRadius:10, background:"white", color:UB.blue, fontSize:15, fontWeight:700, cursor:"pointer", border:"none", fontFamily:"'DM Sans',sans-serif" }}>
              Browse Solutions {Icons.arrow(UB.blue,16)}
            </button>
            <button onClick={() => window.open("https://botku.ai","_blank")}
              style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"14px 24px", borderRadius:10, border:"1px solid rgba(255,255,255,0.3)", background:"rgba(255,255,255,0.1)", color:"white", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
              {"🤖 AI Chatbot →"}
            </button>
          </div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.55)" }}>{"Free consultation · No credit card · SSM required only if you sign up"}</div>
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
      <Nav />
      {children}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/broadband" element={<Layout><Broadband /></Layout>} />
        <Route path="/air-biz" element={<Layout><AirBiz /></Layout>} />
        <Route path="/mobile" element={<Layout><Mobile /></Layout>} />
        <Route path="/cloud-storage" element={<Layout><CloudStorage /></Layout>} />
      </Routes>
    </ThemeProvider>
  );
}
