import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useTheme, ThemeProvider, Icons, PartnerLogos, Card, SectionLabel, WaBtn, PrimaryBtn, Nav, Footer, waL, globalStyles } from "./theme";
import Broadband from "./pages/Broadband";
import AirBiz from "./pages/AirBiz";
import Mobile from "./pages/Mobile";
import CloudStorage from "./pages/CloudStorage";

/* ═══════════════════════════════════════════════════════
   SOLUTION CATALOG — 4 tabs: Internet, Mobile, Marketing, Cloud
   Mobile is its own tab with phone images
   ═══════════════════════════════════════════════════════ */
const SOLUTIONS = [
  {
    id:"internet", cat:"Internet", tagline:"Fibre & wireless broadband for your business.",
    icon:Icons.wifi, color:"#0EA5E9",
    layout:"card", // standard card layout
    items:[
      {
        n:"Business Broadband",
        p:"From RM129/mo",
        d:"Up to 2Gbps fibre with free WiFi 6/7 router. Subscribe to 1Gbps/2Gbps and get a free iPad 11.",
        icon:Icons.globe, link:"/broadband", badge:"Free Router + iPad"
      },
      {
        n:"Unifi Air Biz 5G",
        p:"From RM99/mo",
        d:"Wireless 5G broadband. Plug & play — free 5G router or MiFi included. No wiring, no installation wait.",
        icon:Icons.wifi, link:"/air-biz", badge:"Free 5G Router"
      },
    ]
  },
  {
    id:"mobile", cat:"Mobile", tagline:"Free 5G smartphones with every business line.",
    icon:Icons.phone, color:"#6366F1",
    layout:"phone", // special phone card layout with images
    items:[
      {
        n:"UNI5G Biz 59",
        p:"RM59/mo",
        d:"Free 5G smartphone with 0% instalment. Unlimited 5G/4G data, unlimited calls. No credit card needed.",
        phone:"Samsung Galaxy A16 5G",
        phoneImg:"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=400&fit=crop",
        badge:"FREE Phone",
        link:"/mobile",
      },
      {
        n:"UNI5G Biz 99",
        p:"RM99/mo",
        d:"100GB 5G + 4G data, unlimited calls. Choose from flagship 5G phones — Redmi, vivo, Samsung. Best for field teams.",
        phone:"Choose your 5G phone",
        phoneImg:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=400&fit=crop",
        badge:"FREE Flagship Phone",
        link:"/mobile",
      },
      {
        n:"UNI5G Biz 39",
        p:"RM39/mo",
        d:"30GB 5G + 4G data, unlimited calls. Entry-level plan — no device included. Perfect as supplementary line.",
        phone:"SIM only",
        phoneImg:"https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=400&fit=crop",
        badge:"From RM39",
        link:"/mobile",
      },
      {
        n:"Go Bookit Bundle",
        p:"RM99/mo",
        d:"UNI5G Biz 99 + free Samsung Galaxy A16 5G + Go Bookit appointment system. Only RM3.30/day.",
        phone:"Samsung Galaxy A16 5G",
        phoneImg:"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=400&fit=crop",
        badge:"FREE Phone + App",
        link:"/mobile",
      },
    ]
  },
  {
    id:"marketing", cat:"Digital Marketing", tagline:"Reach customers across 4 platforms.",
    icon:Icons.trending, color:"#F97316",
    layout:"card",
    items:[
      { n:"Standard Pack", p:"RM100/mo", d:"1.5\u20132 month campaign \u00B7 840 ad credits \u00B7 Facebook, Google, Instagram, TikTok", icon:Icons.target, wa:true, pkg:"Standard" },
      { n:"Premium Pack", p:"RM200/mo", d:"3-month campaign \u00B7 1,680 credits \u00B7 Video production included", icon:Icons.target, wa:true, pkg:"Premium" },
      { n:"Prime Pack", p:"RM450/mo", d:"5\u20136 month campaign \u00B7 3,500 credits \u00B7 Video included", icon:Icons.target, wa:true, pkg:"Prime" },
      { n:"Pro Pack", p:"RM900/mo", d:"12-month campaign \u00B7 7,000 credits \u00B7 Maximum ROI", icon:Icons.chart, wa:true, pkg:"Pro", pop:true },
    ]
  },
  {
    id:"digital", cat:"Cloud & Security", tagline:"Protect data. Sell online.",
    icon:Icons.cloud, color:"#059669",
    layout:"card",
    items:[
      { n:"Cloud Storage", p:"From RM11/mo", d:"500GB\u20135TB with local Malaysian data residency", icon:Icons.cloud, link:"/cloud-storage" },
      { n:"eCommerce Hub", p:"From RM49/mo", d:"All-in-one online store management", icon:Icons.chart, wa:true },
      { n:"Kaspersky Security", p:"From RM30/mo", d:"Business-grade endpoint cybersecurity", icon:Icons.shield, wa:true },
    ]
  },
];

/* ═══ SUCCESS STORIES ═══ */
const STORIES = [
  { title:"Kelantan Food Business", bef:"Sold locally at Pasar Siti Khadijah only.", aft:"Broadband + Facebook ads boosted online orders by 49% in one cycle.", tag:"Internet + Marketing", metric:"+49%", metricLabel:"Sales Growth", img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=260&fit=crop" },
  { title:"Property Agent Team", bef:"Relied on walk-ins. Leads were slow and expensive.", aft:"5G mobile for every agent + AI chatbot + TikTok video drove 3x more qualified leads.", tag:"Mobile + AI Chatbot", metric:"3x", metricLabel:"Lead Volume", img:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=260&fit=crop" },
  { title:"Boutique Caf\u00E9 Chain", bef:"Single outlet in PJ. Marketing limited to word-of-mouth.", aft:"Full digital setup \u2014 broadband, cloud POS, Instagram ads \u2014 opened 2nd branch in 6 months.", tag:"Internet + Cloud", metric:"2x", metricLabel:"Foot Traffic", img:"https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=260&fit=crop" },
  { title:"Pest Control Service", bef:"Only northern states. Marketing limited to flyers.", aft:"AI chatbot handled 60% of enquiries. 12-month campaign doubled coverage area.", tag:"AI Chatbot + Marketing", metric:"2x", metricLabel:"Revenue Doubled", img:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=260&fit=crop" },
];

/* ═══ HERO IMAGES ═══ */
const HERO_IMAGES = [
  { src:"https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=520&h=360&fit=crop", alt:"Business team collaborating" },
  { src:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=520&h=360&fit=crop", alt:"Smartphone business use" },
  { src:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=520&h=360&fit=crop", alt:"Business strategy session" },
];


function Home() {
  const T = useTheme();
  const navigate = useNavigate();
  const [activeSol, setActiveSol] = useState("internet");
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setHeroIdx(p => (p + 1) % HERO_IMAGES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const scr = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  const handleItemAction = (it) => {
    if (it.link) navigate(it.link);
    else if (it.wa || it.pkg) window.open(waL("Hi, I'm interested in *" + it.n + "* (" + it.p + "). Can you share more details?"), "_blank");
  };

  const activeCat = SOLUTIONS.find(s => s.id === activeSol);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section style={{ background:T.heroBg, padding:"100px 24px 64px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-120, right:-120, width:500, height:500, borderRadius:"50%", background:T.primary+"06", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-80, left:-80, width:350, height:350, borderRadius:"50%", background:T.accent+"06", pointerEvents:"none" }} />

        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", flexWrap:"wrap", gap:48, alignItems:"center" }}>
          <div className="fade-up" style={{ flex:"1 1 440px", maxWidth:560 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:8, background:T.accent+"0D", border:"1px solid " + T.accent + "20", marginBottom:20 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:T.accent }} />
              <span style={{ fontSize:12, fontWeight:600, color:T.accent }}>Official Unifi Business Partner</span>
            </div>
            <h1 style={{ fontSize:"clamp(32px,4.5vw,52px)", fontWeight:800, lineHeight:1.12, marginBottom:16, color:T.text, letterSpacing:"-0.02em" }}>
              Internet. Devices. AI.<br/>
              <span style={{ color:T.accent, fontSize:"clamp(36px,5vw,58px)" }}>Everything your<br/>business needs.</span>
            </h1>
            <p style={{ fontSize:17, color:T.muted, lineHeight:1.7, marginBottom:28, maxWidth:480 }}>
              Get <strong style={{ color:T.text }}>free 5G smartphones, free routers, AI chatbot</strong> and digital marketing — all from one partner. Malaysian SMEs trust us to set up their entire business infrastructure.
            </p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:20 }}>
              <button onClick={() => scr("solutions")}
                style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 28px", borderRadius:10, background:T.accent, color:"white", fontSize:15, fontWeight:700, cursor:"pointer", border:"none", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                Explore Solutions {Icons.arrow("white",16)}
              </button>
              <button onClick={() => { setActiveSol("mobile"); scr("solutions"); }}
                style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"14px 24px", borderRadius:10, border:"1px solid " + T.border, background:"transparent", color:T.text, fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#6366F1"; e.currentTarget.style.color = "#6366F1"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.text; }}
              >
                {Icons.phone("#6366F1",16)} Free Phones
              </button>
            </div>

            <div className="hero-stats" style={{ display:"flex", alignItems:"center", gap:16, fontSize:12, color:T.muted, flexWrap:"wrap" }}>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>{Icons.shield(T.primary,16)}<span>SSM Registered</span></div>
              <span style={{ color:T.border }}>|</span>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>{Icons.check("#059669",16)}<span>Official Unifi Reseller</span></div>
              <span style={{ color:T.border }}>|</span>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>{Icons.users(T.primary,16)}<span>500+ SMEs Served</span></div>
            </div>
          </div>

          {/* Right — Image carousel */}
          <div className="fade-up-d2" style={{ flex:"1 1 380px", position:"relative" }}>
            <div style={{ borderRadius:20, overflow:"hidden", position:"relative", background:"linear-gradient(135deg, " + T.primary + "12, " + T.accent + "08)", padding:6 }}>
              <div style={{ position:"relative", borderRadius:16, overflow:"hidden", height:340 }}>
                {HERO_IMAGES.map((img, i) => (
                  <img key={i} src={img.src} alt={img.alt}
                    style={{
                      position:"absolute", top:0, left:0, width:"100%", height:"100%", objectFit:"cover",
                      opacity: heroIdx === i ? 1 : 0, transition:"opacity 0.8s ease",
                    }}
                    onError={e => { e.target.style.opacity = "0"; }}
                  />
                ))}
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:100, background:"linear-gradient(to top, rgba(0,0,0,0.45), transparent)", pointerEvents:"none" }} />
              </div>
              <div style={{ position:"absolute", top:16, right:16, background:T.card, borderRadius:10, padding:"10px 14px", boxShadow:T.floatShadow, display:"flex", alignItems:"center", gap:8, zIndex:2 }}>
                {Icons.trending("#059669",18)}
                <div><div style={{ fontSize:16, fontWeight:800, color:"#059669" }}>+49%</div><div style={{ fontSize:10, color:T.muted }}>Avg. Sales Boost</div></div>
              </div>
              <div style={{ position:"absolute", bottom:16, left:16, background:T.card, borderRadius:10, padding:"10px 14px", boxShadow:T.floatShadow, display:"flex", alignItems:"center", gap:8, zIndex:2 }}>
                {Icons.zap("#8B5CF6",18)}
                <div><div style={{ fontSize:16, fontWeight:800, color:T.text }}>24/7</div><div style={{ fontSize:10, color:T.muted }}>AI Chatbot</div></div>
              </div>
              <div style={{ position:"absolute", bottom:16, right:16, background:T.card, borderRadius:10, padding:"10px 14px", boxShadow:T.floatShadow, display:"flex", alignItems:"center", gap:8, zIndex:2 }}>
                {Icons.phone("#0EA5E9",18)}
                <div><div style={{ fontSize:16, fontWeight:800, color:T.text }}>Free</div><div style={{ fontSize:10, color:T.muted }}>5G Phones</div></div>
              </div>
            </div>
            <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:12 }}>
              {HERO_IMAGES.map((_, i) => (
                <button key={i} onClick={() => setHeroIdx(i)}
                  style={{ width: heroIdx === i ? 24 : 8, height:8, borderRadius:4, border:"none", cursor:"pointer", transition:"all 0.3s",
                    background: heroIdx === i ? T.accent : T.border,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth:800, margin:"48px auto 0", textAlign:"center" }}>
          <p style={{ fontSize:11, color:T.muted, marginBottom:14, fontWeight:500, letterSpacing:1, textTransform:"uppercase" }}>Powered by</p>
          <PartnerLogos T={T} />
        </div>
      </section>


      {/* ═══ SOLUTIONS — 4 tabs ═══ */}
      <section id="solutions" style={{ padding:"80px 24px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <SectionLabel text="Business Solutions" />
          <h2 style={{ fontSize:"clamp(26px,3.5vw,38px)", fontWeight:800, color:T.text }}>Everything under one roof</h2>
          <p style={{ color:T.muted, fontSize:15, marginTop:8 }}>Internet, mobile, marketing, cloud — pick what you need.</p>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center", marginBottom:32 }}>
          {SOLUTIONS.map(s => (
            <button key={s.id} onClick={() => setActiveSol(s.id)}
              style={{
                display:"flex", alignItems:"center", gap:6, padding:"10px 18px", borderRadius:10, cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, transition:"all 0.2s",
                border: activeSol === s.id ? "2px solid " + s.color : "1px solid " + T.border,
                background: activeSol === s.id ? s.color + "0A" : T.card,
                color: activeSol === s.id ? s.color : T.muted,
              }}
            >
              {s.icon(activeSol === s.id ? s.color : T.muted, 16)} {s.cat}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeCat && (
          <div>
            <div style={{ marginBottom:24, textAlign:"center" }}>
              <span style={{ fontSize:14, color:activeCat.color, fontWeight:600 }}>{activeCat.tagline}</span>
            </div>

            {/* ── PHONE LAYOUT (Mobile tab) ── */}
            {activeCat.layout === "phone" ? (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:18 }}>
                {activeCat.items.map(it => (
                  <Card key={it.n} style={{ padding:0, overflow:"hidden", textAlign:"center" }}>
                    {it.badge && (
                      <div style={{ background:activeCat.color, color:"white", fontSize:11, fontWeight:700, padding:"6px 0", letterSpacing:1 }}>{it.badge}</div>
                    )}
                    {/* Phone image */}
                    <div style={{ height:200, background:"linear-gradient(180deg, " + activeCat.color + "08, " + activeCat.color + "03)", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", position:"relative" }}>
                      <img src={it.phoneImg} alt={it.phone}
                        style={{ height:"100%", width:"100%", objectFit:"cover", transition:"transform 0.3s" }}
                        onError={e => { e.target.style.display = "none"; }}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                      />
                    </div>
                    <div style={{ padding:"20px 20px 24px" }}>
                      <div style={{ fontSize:12, fontWeight:600, color:activeCat.color, marginBottom:4 }}>{it.phone}</div>
                      <div style={{ fontSize:18, fontWeight:800, color:T.text, marginBottom:2 }}>{it.n}</div>
                      <div style={{ fontSize:22, fontWeight:800, color:T.accent, marginBottom:10 }}>{it.p}</div>
                      <p style={{ fontSize:13, color:T.muted, lineHeight:1.6, marginBottom:18 }}>{it.d}</p>
                      <button onClick={() => handleItemAction(it)}
                        style={{
                          width:"100%", padding:"12px 16px", borderRadius:10, cursor:"pointer",
                          fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, transition:"all 0.2s",
                          display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                          border:"1px solid " + activeCat.color, background:activeCat.color+"0A", color:activeCat.color,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = activeCat.color; e.currentTarget.style.color = "white"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = activeCat.color+"0A"; e.currentTarget.style.color = activeCat.color; }}
                      >
                        {"View Plans \u2192"}
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              /* ── STANDARD CARD LAYOUT ── */
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:16 }}>
                {activeCat.items.map(it => (
                  <Card key={it.n} style={{ padding:0, overflow:"hidden", border: it.pop ? "2px solid " + activeCat.color : undefined }}>
                    {it.badge && (
                      <div style={{ background:activeCat.color, color:"white", textAlign:"center", fontSize:11, fontWeight:700, padding:"5px 0", letterSpacing:1 }}>{it.badge}</div>
                    )}
                    {it.pop && (
                      <div style={{ background:activeCat.color, color:"white", textAlign:"center", fontSize:11, fontWeight:700, padding:"5px 0", letterSpacing:1 }}>MOST POPULAR</div>
                    )}
                    <div style={{ padding:24 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                        <div style={{ width:42, height:42, borderRadius:10, background:activeCat.color+"12", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          {it.icon(activeCat.color, 20)}
                        </div>
                        <div>
                          <div style={{ fontSize:16, fontWeight:700, color:T.text }}>{it.n}</div>
                          <div style={{ fontSize:14, fontWeight:700, color:T.accent }}>{it.p}</div>
                        </div>
                      </div>
                      <p style={{ fontSize:13, color:T.muted, lineHeight:1.6, marginBottom:18 }}>{it.d}</p>
                      <button onClick={() => handleItemAction(it)}
                        style={{
                          width:"100%", padding:"12px 16px", borderRadius:10, cursor:"pointer",
                          fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, transition:"all 0.2s",
                          display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                          border:"1px solid " + activeCat.color, background:activeCat.color+"0A", color:activeCat.color,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = activeCat.color; e.currentTarget.style.color = "white"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = activeCat.color+"0A"; e.currentTarget.style.color = activeCat.color; }}
                      >
                        {it.link ? "View Plans \u2192" : "Enquire \u2192"}
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </section>


      {/* ═══ AI CHATBOT SPOTLIGHT ═══ */}
      <section style={{ padding:"80px 24px", background:"linear-gradient(135deg, #8B5CF608, #8B5CF603)" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", flexWrap:"wrap", gap:40, alignItems:"center" }}>
          <div style={{ flex:"1 1 360px" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:8, background:"#8B5CF612", border:"1px solid #8B5CF620", marginBottom:16 }}>
              <span style={{ fontSize:12, fontWeight:700, color:"#8B5CF6" }}>{"🤖"} AI WHATSAPP CHATBOT</span>
            </div>
            <h2 style={{ fontSize:"clamp(26px,3.5vw,38px)", fontWeight:800, color:T.text, marginBottom:14 }}>
              Your AI employee that<br/>never sleeps
            </h2>
            <p style={{ fontSize:15, color:T.muted, lineHeight:1.7, marginBottom:24 }}>
              A WhatsApp assistant that replies instantly in BM & English, qualifies leads, answers FAQs, takes orders — 24/7. Powered by BotKu.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
              {[
                "Replies in seconds \u2014 customers don't wait",
                "Speaks Bahasa Malaysia & English naturally",
                "Qualifies leads before they reach your sales team",
                "Takes orders & books appointments automatically",
                "Learns your business \u2014 products, pricing, policies",
              ].map(f => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:8, fontSize:14, color:T.text }}>
                  {Icons.check("#8B5CF6",16)} {f}
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:16, flexWrap:"wrap", alignItems:"center" }}>
              <button onClick={() => window.open("https://botku.ai","_blank")}
                style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"14px 28px", borderRadius:10, background:"#8B5CF6", color:"white", fontSize:15, fontWeight:700, cursor:"pointer", border:"none", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#7C3AED"}
                onMouseLeave={e => e.currentTarget.style.background = "#8B5CF6"}
              >
                {"Explore BotKu.ai \u2192"}
              </button>
              <span style={{ fontSize:15, fontWeight:700, color:"#8B5CF6" }}>From RM200/mo</span>
            </div>
          </div>

          {/* Chat mockup */}
          <div style={{ flex:"1 1 300px", maxWidth:380 }}>
            <div style={{ background:T.card, border:"1px solid " + T.border, borderRadius:16, padding:20, boxShadow:T.floatShadow }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16, paddingBottom:12, borderBottom:"1px solid " + T.border }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:"#8B5CF612", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{"🤖"}</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:T.text }}>BotKu AI</div>
                  <div style={{ fontSize:11, color:"#059669", display:"flex", alignItems:"center", gap:4 }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background:"#059669", display:"inline-block" }} />
                    Online 24/7
                  </div>
                </div>
              </div>
              {[
                { from:"user", text:"Berapa harga servis aircond?" },
                { from:"bot", text:"Servis aircond kami bermula dari RM80 untuk 1 unit. Untuk 2 unit, harga istimewa RM140. Nak saya book slot untuk awak? \uD83D\uDE0A" },
                { from:"user", text:"Ok book esok pagi boleh?" },
                { from:"bot", text:"Boleh! Esok (Rabu) pukul 10am ada slot. Saya perlukan nama dan alamat untuk confirm booking. \uD83D\uDC4D" },
              ].map((m,i) => (
                <div key={i} style={{ display:"flex", justifyContent: m.from==="user" ? "flex-end" : "flex-start", marginBottom:8 }}>
                  <div style={{
                    maxWidth:"80%", padding:"10px 14px", borderRadius:12, fontSize:13, lineHeight:1.5,
                    background: m.from==="user" ? "#DCF8C6" : T.sub,
                    color: m.from==="user" ? "#1a1a1a" : T.text,
                    borderBottomRightRadius: m.from==="user" ? 4 : 12,
                    borderBottomLeftRadius: m.from==="bot" ? 4 : 12,
                  }}>{m.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{ padding:"80px 24px", maxWidth:1000, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <SectionLabel text="How It Works" />
          <h2 style={{ fontSize:"clamp(26px,3.5vw,38px)", fontWeight:800, color:T.text }}>Up and running in 3 steps</h2>
        </div>
        <div className="steps-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2, background:T.border, borderRadius:16, overflow:"hidden" }}>
          {[
            { n:"01", icon:Icons.target, t:"Tell Us What You Need", d:"Pick from internet, mobile, marketing, cloud, or AI chatbot. Mix and match freely." },
            { n:"02", icon:Icons.users, t:"We Set Everything Up", d:"Broadband installation, phone delivery, chatbot training, ad campaigns \u2014 we handle it all." },
            { n:"03", icon:Icons.chart, t:"Focus on Your Business", d:"Your AI chatbot handles enquiries. Your ads run. Your team stays connected. You grow." },
          ].map((s,i) => (
            <div key={s.n} className={"fade-up-d" + (i+1)} style={{ background:T.card, padding:36, textAlign:"center" }}>
              <div style={{ width:48, height:48, borderRadius:12, background:i===1?T.accent+"0D":T.primary+"0A", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                {s.icon(i===1?T.accent:T.primary,22)}
              </div>
              <div style={{ fontSize:11, fontWeight:700, color:T.accent, letterSpacing:2, marginBottom:8 }}>{"STEP " + s.n}</div>
              <h3 style={{ fontSize:18, fontWeight:700, marginBottom:8, color:T.text }}>{s.t}</h3>
              <p style={{ fontSize:14, color:T.muted, lineHeight:1.6 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ═══ SUCCESS STORIES ═══ */}
      <section style={{ padding:"80px 24px", background:T.sub }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <SectionLabel text="Success Stories" />
            <h2 style={{ fontSize:"clamp(26px,3.5vw,38px)", fontWeight:800, color:T.text }}>Real results from Malaysian businesses</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:18 }}>
            {STORIES.map(s => (
              <Card key={s.title} style={{ padding:0, overflow:"hidden" }}>
                <div style={{ height:160, background:"linear-gradient(135deg, " + T.primary + "20, " + T.accent + "15)", position:"relative", overflow:"hidden" }}>
                  <img src={s.img} alt={s.title} style={{ width:"100%", height:"100%", objectFit:"cover", position:"relative", zIndex:1 }} onError={e => { e.target.style.opacity="0"; }} />
                  <div style={{ position:"absolute", top:12, left:12, background:T.card, borderRadius:8, padding:"6px 10px", fontSize:11, fontWeight:700, color:T.accent, boxShadow:T.floatShadow }}>{s.tag}</div>
                  <div style={{ position:"absolute", bottom:12, right:12, background:T.card, borderRadius:10, padding:"8px 14px", boxShadow:T.floatShadow, textAlign:"center" }}>
                    <div style={{ fontSize:22, fontWeight:800, color:"#059669" }}>{s.metric}</div>
                    <div style={{ fontSize:9, color:T.muted, fontWeight:600 }}>{s.metricLabel}</div>
                  </div>
                </div>
                <div style={{ padding:20 }}>
                  <h3 style={{ fontSize:16, fontWeight:700, marginBottom:10, color:T.text }}>{s.title}</h3>
                  <div style={{ fontSize:13, marginBottom:6, display:"flex", alignItems:"flex-start", gap:6 }}>
                    {Icons.x("#DC2626",14)}
                    <span style={{ color:T.muted }}>{s.bef}</span>
                  </div>
                  <div style={{ fontSize:13, display:"flex", alignItems:"flex-start", gap:6 }}>
                    {Icons.check("#059669",14)}
                    <span style={{ color:T.text }}>{s.aft}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ FINAL CTA ═══ */}
      <section style={{ padding:"80px 24px", background:"linear-gradient(135deg, " + T.primary + "08, " + T.accent + "06)", textAlign:"center" }}>
        <div style={{ maxWidth:560, margin:"0 auto" }}>
          <SectionLabel text="Get Started" />
          <h2 style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:800, marginBottom:14, color:T.text }}>One partner for your entire business</h2>
          <p style={{ color:T.muted, fontSize:16, marginBottom:28, lineHeight:1.7 }}>
            Internet, free 5G devices, AI chatbot, marketing — <strong style={{ color:T.text }}>everything your business needs</strong> from a single trusted partner.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:16 }}>
            <button onClick={() => scr("solutions")}
              style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"16px 32px", borderRadius:10, background:T.accent, color:"white", fontSize:16, fontWeight:700, cursor:"pointer", border:"none", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Browse Solutions {Icons.arrow("white",16)}
            </button>
            <button onClick={() => window.open("https://botku.ai","_blank")}
              style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"16px 28px", borderRadius:10, border:"1px solid #8B5CF6", background:"#8B5CF60A", color:"#8B5CF6", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#8B5CF6"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#8B5CF60A"; e.currentTarget.style.color = "#8B5CF6"; }}
            >{"🤖 AI Chatbot \u2192"}</button>
          </div>
          <div style={{ fontSize:12, color:T.muted }}>{"Free consultation \u00B7 No credit card \u00B7 SSM required only if you sign up"}</div>
        </div>
      </section>
    </>
  );
}

function Layout({ children }) {
  const T = useTheme();
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:T.bg, color:T.text, minHeight:"100vh" }}>
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
