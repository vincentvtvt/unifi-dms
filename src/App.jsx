import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useTheme, ThemeProvider, Icons, PartnerLogos, Card, SectionLabel, WaBtn, PrimaryBtn, Nav, Footer, waL, globalStyles } from "./theme";
import Broadband from "./pages/Broadband";
import AirBiz from "./pages/AirBiz";
import Mobile from "./pages/Mobile";
import CloudStorage from "./pages/CloudStorage";

/* ═══ UNIFI-INSPIRED PALETTE ═══ */
const UB = {
  blue:"#0033A1",      // Unifi deep blue
  sky:"#00A3E0",       // Unifi light blue
  navy:"#001A5C",      // Darker navy
  orange:"#FF6B00",    // Unifi orange accent
  green:"#00B67A",     // Success/free
  purple:"#7B2FBE",    // AI/tech
  red:"#E5002B",       // Urgency
};

/* ═══════════════════════════════════════════════
   SOLUTIONS — every item has a hook + lifestyle image
   ═══════════════════════════════════════════════ */
const SOLUTIONS = [
  {
    id:"internet", cat:"Internet", tagline:"Fibre & 5G wireless for your business.",
    icon:Icons.wifi, color:UB.blue,
    items:[
      {
        n:"Business Broadband", p:"From RM129/mo",
        sub:"Up to 2Gbps fibre",
        d:"Malaysia's fastest business fibre. Stream, sell, operate without limits.",
        img:"https://images.unsplash.com/photo-1497215842964-222b430dc094?w=480&h=280&fit=crop",
        link:"/broadband",
        hook:"FREE WiFi 7 Router + iPad 11", hookColor:UB.green,
      },
      {
        n:"Unifi Air Biz 5G", p:"From RM99/mo",
        sub:"Wireless 5G \u2014 plug & play",
        d:"No wiring. No waiting. Plug in and go online in minutes. Ideal for new outlets & pop-ups.",
        img:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=480&h=280&fit=crop",
        link:"/air-biz",
        hook:"FREE 5G Router or MiFi", hookColor:UB.green,
      },
    ]
  },
  {
    id:"mobile", cat:"Mobile", tagline:"Every line comes with a free 5G phone.",
    icon:Icons.phone, color:UB.sky,
    items:[
      {
        n:"UNI5G Biz 59", p:"RM59/mo",
        sub:"Samsung Galaxy A16 5G included",
        d:"Free 5G phone + unlimited data + unlimited calls. 0% instalment, no credit card needed.",
        img:"https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=480&h=280&fit=crop",
        link:"/mobile",
        hook:"FREE phone worth RM799", hookColor:UB.green,
      },
      {
        n:"UNI5G Biz 99", p:"RM99/mo",
        sub:"Choose your flagship 5G phone",
        d:"100GB 5G data, unlimited calls. Pick Samsung, Redmi, or vivo. Equip every field agent.",
        img:"https://images.unsplash.com/photo-1560264280-88b68371db39?w=480&h=280&fit=crop",
        link:"/mobile",
        hook:"FREE flagship phone worth RM999+", hookColor:UB.green,
      },
      {
        n:"UNI5G Biz 39", p:"RM39/mo",
        sub:"SIM only \u2014 bring your own phone",
        d:"30GB 5G data + unlimited calls. Cheapest 5G business line in Malaysia. Add lines for your team.",
        img:"https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?w=480&h=280&fit=crop",
        link:"/mobile",
        hook:"Only RM1.30/day", hookColor:UB.orange,
      },
      {
        n:"Go Bookit Bundle", p:"RM99/mo",
        sub:"Phone + appointment booking app",
        d:"UNI5G Biz 99 + free Samsung Galaxy A16 5G + Go Bookit system. Perfect for service businesses.",
        img:"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=480&h=280&fit=crop",
        link:"/mobile",
        hook:"RM3.30/day \u2014 phone + app + data", hookColor:UB.orange,
      },
    ]
  },
  {
    id:"marketing", cat:"Digital Marketing", tagline:"Ads on Facebook, Google, TikTok & Instagram.",
    icon:Icons.trending, color:UB.orange,
    items:[
      {
        n:"Standard Pack", p:"RM100/mo",
        sub:"Awareness \u00B7 1.5\u20132 months",
        d:"840 ad credits. 4 platforms. Dedicated 3-person team. Start for less than a coffee a day.",
        img:"https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=480&h=280&fit=crop",
        wa:true, pkg:"Standard",
        hook:"RM3.30/day \u2014 cheaper than nasi lemak", hookColor:UB.orange,
      },
      {
        n:"Premium Pack", p:"RM200/mo",
        sub:"Engagement \u00B7 3 months",
        d:"1,680 credits + video production included. Build loyal followers who actually buy.",
        img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=480&h=280&fit=crop",
        wa:true, pkg:"Premium",
        hook:"Video production included FREE", hookColor:UB.green,
      },
      {
        n:"Prime Pack", p:"RM450/mo",
        sub:"Sales Conversion \u00B7 5\u20136 months",
        d:"3,500 credits + video. Extended campaign to turn followers into paying customers.",
        img:"https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=480&h=280&fit=crop",
        wa:true, pkg:"Prime",
        hook:"4x more credits than Standard", hookColor:UB.blue,
      },
      {
        n:"Pro Pack", p:"RM900/mo",
        sub:"Dominate \u00B7 12 months",
        d:"7,000 credits + video. Full-year campaign with maximum reach. For businesses ready to scale hard.",
        img:"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=480&h=280&fit=crop",
        wa:true, pkg:"Pro", pop:true,
        hook:"12 months of non-stop ads", hookColor:UB.red,
      },
    ]
  },
  {
    id:"digital", cat:"Cloud & Security", tagline:"Protect your data. Sell online.",
    icon:Icons.cloud, color:UB.green,
    items:[
      {
        n:"Cloud Storage", p:"From RM11/mo",
        sub:"500GB \u2013 5TB",
        d:"Your files, hosted in Malaysia. Access from anywhere. End-to-end encrypted. Tier-3 data centre.",
        img:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=480&h=280&fit=crop",
        link:"/cloud-storage",
        hook:"Local MY data residency", hookColor:UB.blue,
      },
      {
        n:"eCommerce Hub", p:"From RM49/mo",
        sub:"All-in-one online store",
        d:"Products, orders, payments, delivery \u2014 one platform. Start selling online this week.",
        img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=480&h=280&fit=crop",
        wa:true,
        hook:"Launch your online store in days", hookColor:UB.orange,
      },
      {
        n:"Kaspersky Security", p:"From RM30/mo",
        sub:"Business-grade protection",
        d:"Endpoint cybersecurity. Ransomware, phishing, data breach protection for every device.",
        img:"https://images.unsplash.com/photo-1563986768609-322da13575f2?w=480&h=280&fit=crop",
        wa:true,
        hook:"Protect all your devices", hookColor:UB.red,
      },
    ]
  },
];

/* ═══ SUCCESS STORIES ═══ */
const STORIES = [
  { title:"Kelantan Food Business", bef:"Sold locally at Pasar Siti Khadijah only.", aft:"Broadband + Facebook ads boosted online orders by 49% in one cycle.", tag:"Internet + Marketing", metric:"+49%", metricLabel:"Sales Growth", img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=260&fit=crop" },
  { title:"Property Agent Team", bef:"Relied on walk-ins. Leads were slow.", aft:"5G mobile for every agent + AI chatbot drove 3x more qualified leads.", tag:"Mobile + AI Chatbot", metric:"3x", metricLabel:"Lead Volume", img:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=260&fit=crop" },
  { title:"Boutique Caf\u00E9 Chain", bef:"Single outlet. Word-of-mouth only.", aft:"Broadband + cloud POS + Instagram ads \u2014 opened 2nd branch in 6 months.", tag:"Internet + Cloud", metric:"2x", metricLabel:"Foot Traffic", img:"https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=260&fit=crop" },
  { title:"Pest Control Service", bef:"Northern states only. Flyers.", aft:"AI chatbot handled 60% enquiries. 12-month ads doubled coverage.", tag:"AI Chatbot + Marketing", metric:"2x", metricLabel:"Revenue", img:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=260&fit=crop" },
];

/* ═══ HERO IMAGES ═══ */
const HERO_IMAGES = [
  { src:"https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=520&h=360&fit=crop", alt:"Business team" },
  { src:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=520&h=360&fit=crop", alt:"Mobile business" },
  { src:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=520&h=360&fit=crop", alt:"Strategy session" },
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
      {/* ═══ HERO — Unifi blue dominant ═══ */}
      <section style={{ background:"linear-gradient(160deg, " + UB.navy + " 0%, " + UB.blue + " 60%, " + UB.sky + " 100%)", padding:"100px 24px 72px", position:"relative", overflow:"hidden" }}>
        {/* Geometric accents */}
        <div style={{ position:"absolute", top:-60, right:-60, width:400, height:400, borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-100, left:"30%", width:500, height:500, borderRadius:"50%", background:"rgba(0,163,224,0.06)", pointerEvents:"none" }} />

        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", flexWrap:"wrap", gap:48, alignItems:"center" }}>
          <div className="fade-up" style={{ flex:"1 1 440px", maxWidth:560 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:8, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", marginBottom:20 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:UB.green }} />
              <span style={{ fontSize:12, fontWeight:600, color:"white" }}>Official Unifi Business Partner</span>
            </div>
            <h1 style={{ fontSize:"clamp(34px,4.5vw,54px)", fontWeight:800, lineHeight:1.1, marginBottom:18, color:"white", letterSpacing:"-0.02em" }}>
              Free phones.<br/>Free routers.<br/>
              <span style={{ color:UB.sky }}>From RM39/mo.</span>
            </h1>
            <p style={{ fontSize:17, color:"rgba(255,255,255,0.8)", lineHeight:1.7, marginBottom:28, maxWidth:460 }}>
              Every Unifi Business plan comes with <strong style={{ color:"white" }}>free devices</strong>. Add an AI chatbot that handles your customers 24/7. One partner, everything your business needs.
            </p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:24 }}>
              <button onClick={() => scr("solutions")}
                style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 28px", borderRadius:10, background:"white", color:UB.blue, fontSize:15, fontWeight:700, cursor:"pointer", border:"none", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = UB.sky; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = UB.blue; }}
              >
                See All Solutions {Icons.arrow(UB.blue,16)}
              </button>
              <button onClick={() => { setActiveSol("mobile"); scr("solutions"); }}
                style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"14px 24px", borderRadius:10, border:"1px solid rgba(255,255,255,0.3)", background:"rgba(255,255,255,0.08)", color:"white", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              >
                {Icons.phone("white",16)} Free 5G Phones
              </button>
            </div>

            {/* Value hooks strip */}
            <div style={{ display:"flex", gap:20, flexWrap:"wrap", fontSize:13, color:"rgba(255,255,255,0.7)" }}>
              {[
                { icon:Icons.check, text:"Free devices with plans", color:UB.green },
                { icon:Icons.shield, text:"SSM Registered", color:UB.sky },
                { icon:Icons.users, text:"500+ SMEs", color:UB.sky },
              ].map((t,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:5 }}>
                  {t.icon(t.color,14)}<span>{t.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Image carousel */}
          <div className="fade-up-d2" style={{ flex:"1 1 380px", position:"relative" }}>
            <div style={{ borderRadius:20, overflow:"hidden", position:"relative", border:"2px solid rgba(255,255,255,0.1)" }}>
              <div style={{ position:"relative", borderRadius:18, overflow:"hidden", height:340 }}>
                {HERO_IMAGES.map((img, i) => (
                  <img key={i} src={img.src} alt={img.alt}
                    style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", objectFit:"cover", opacity: heroIdx === i ? 1 : 0, transition:"opacity 0.8s ease" }}
                    onError={e => { e.target.style.opacity = "0"; }}
                  />
                ))}
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:100, background:"linear-gradient(to top, rgba(0,26,92,0.6), transparent)", pointerEvents:"none" }} />
              </div>
              {/* Floating hook cards */}
              <div style={{ position:"absolute", top:16, right:16, background:"white", borderRadius:10, padding:"10px 14px", boxShadow:"0 4px 20px rgba(0,0,0,0.15)", display:"flex", alignItems:"center", gap:8, zIndex:2 }}>
                {Icons.trending(UB.green,18)}
                <div><div style={{ fontSize:16, fontWeight:800, color:UB.green }}>+49%</div><div style={{ fontSize:10, color:"#666" }}>Avg. Sales Boost</div></div>
              </div>
              <div style={{ position:"absolute", bottom:16, left:16, background:"white", borderRadius:10, padding:"10px 14px", boxShadow:"0 4px 20px rgba(0,0,0,0.15)", display:"flex", alignItems:"center", gap:8, zIndex:2 }}>
                {Icons.zap(UB.purple,18)}
                <div><div style={{ fontSize:16, fontWeight:800, color:UB.navy }}>24/7</div><div style={{ fontSize:10, color:"#666" }}>AI Chatbot</div></div>
              </div>
              <div style={{ position:"absolute", bottom:16, right:16, background:UB.green, borderRadius:10, padding:"10px 14px", boxShadow:"0 4px 20px rgba(0,0,0,0.15)", display:"flex", alignItems:"center", gap:8, zIndex:2 }}>
                {Icons.phone("white",18)}
                <div><div style={{ fontSize:14, fontWeight:800, color:"white" }}>FREE</div><div style={{ fontSize:10, color:"rgba(255,255,255,0.8)" }}>5G Phones</div></div>
              </div>
            </div>
            <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:12 }}>
              {HERO_IMAGES.map((_, i) => (
                <button key={i} onClick={() => setHeroIdx(i)}
                  style={{ width: heroIdx === i ? 24 : 8, height:8, borderRadius:4, border:"none", cursor:"pointer", transition:"all 0.3s", background: heroIdx === i ? "white" : "rgba(255,255,255,0.3)" }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner logos on white */}
      <div style={{ padding:"24px 24px 0", background:T.bg }}>
        <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
          <p style={{ fontSize:11, color:T.muted, marginBottom:14, fontWeight:500, letterSpacing:1, textTransform:"uppercase" }}>Your ads run on</p>
          <PartnerLogos T={T} />
        </div>
      </div>


      {/* ═══ SOLUTIONS — Unifi blue tabs, hook badges on every card ═══ */}
      <section id="solutions" style={{ padding:"64px 24px 80px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <SectionLabel text="Business Solutions" />
          <h2 style={{ fontSize:"clamp(26px,3.5vw,38px)", fontWeight:800, color:T.text }}>Everything under one roof</h2>
          <p style={{ color:T.muted, fontSize:15, marginTop:8 }}>Internet, mobile, marketing, cloud \u2014 pick what you need.</p>
        </div>

        <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center", marginBottom:32 }}>
          {SOLUTIONS.map(s => (
            <button key={s.id} onClick={() => setActiveSol(s.id)}
              style={{
                display:"flex", alignItems:"center", gap:6, padding:"10px 18px", borderRadius:10, cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, transition:"all 0.2s",
                border: activeSol === s.id ? "2px solid " + s.color : "1px solid " + T.border,
                background: activeSol === s.id ? s.color : T.card,
                color: activeSol === s.id ? "white" : T.muted,
              }}
            >
              {s.icon(activeSol === s.id ? "white" : T.muted, 16)} {s.cat}
            </button>
          ))}
        </div>

        {activeCat && (
          <div>
            <div style={{ marginBottom:24, textAlign:"center" }}>
              <span style={{ fontSize:14, color:activeCat.color, fontWeight:600 }}>{activeCat.tagline}</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:18 }}>
              {activeCat.items.map(it => (
                <div key={it.n}
                  style={{ background:T.card, borderRadius:14, overflow:"hidden", border:"1px solid " + T.border, transition:"all 0.25s", cursor:"pointer", position:"relative" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = activeCat.color; e.currentTarget.style.boxShadow = "0 8px 30px " + activeCat.color + "15"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                >
                  {it.pop && (
                    <div style={{ background:UB.red, color:"white", textAlign:"center", fontSize:11, fontWeight:700, padding:"6px 0", letterSpacing:1 }}>MOST POPULAR</div>
                  )}
                  {/* Image */}
                  <div style={{ height:170, overflow:"hidden", position:"relative" }}>
                    <img src={it.img} alt={it.n}
                      style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.4s" }}
                      onError={e => { e.target.parentElement.style.background = activeCat.color + "10"; e.target.style.display = "none"; }}
                    />
                    {/* Hook badge — the key conversion element */}
                    {it.hook && (
                      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"8px 14px", background:"linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3))" }}>
                        <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"4px 10px", borderRadius:6, background:it.hookColor, fontSize:12, fontWeight:700, color:"white" }}>
                          {it.hookColor === UB.green ? Icons.check("white",12) : Icons.zap("white",12)}
                          {it.hook}
                        </div>
                      </div>
                    )}
                    {/* Price pill */}
                    <div style={{ position:"absolute", top:10, right:10, background:"white", borderRadius:8, padding:"5px 10px", boxShadow:"0 2px 10px rgba(0,0,0,0.15)" }}>
                      <div style={{ fontSize:15, fontWeight:800, color:activeCat.color }}>{it.p}</div>
                    </div>
                  </div>
                  {/* Content */}
                  <div style={{ padding:"16px 18px 20px" }}>
                    {it.sub && <div style={{ fontSize:11, fontWeight:600, color:activeCat.color, marginBottom:4, letterSpacing:0.3 }}>{it.sub}</div>}
                    <h3 style={{ fontSize:17, fontWeight:700, color:T.text, marginBottom:6 }}>{it.n}</h3>
                    <p style={{ fontSize:13, color:T.muted, lineHeight:1.55, marginBottom:14 }}>{it.d}</p>
                    <button onClick={(e) => { e.stopPropagation(); handleItemAction(it); }}
                      style={{
                        width:"100%", padding:"11px 16px", borderRadius:10, cursor:"pointer",
                        fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, transition:"all 0.2s",
                        display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                        border:"none", background:activeCat.color, color:"white",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                    >
                      {it.link ? "View Plans \u2192" : "Enquire Now \u2192"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>


      {/* ═══ AI CHATBOT SPOTLIGHT — Unifi blue/purple ═══ */}
      <section style={{ padding:"80px 24px", background:"linear-gradient(160deg, " + UB.navy + " 0%, " + UB.purple + " 100%)", color:"white" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", flexWrap:"wrap", gap:40, alignItems:"center" }}>
          <div style={{ flex:"1 1 360px" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:8, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", marginBottom:16 }}>
              <span style={{ fontSize:12, fontWeight:700, color:"white" }}>{"🤖"} AI WHATSAPP CHATBOT</span>
            </div>
            <h2 style={{ fontSize:"clamp(26px,3.5vw,38px)", fontWeight:800, marginBottom:14 }}>
              Hire an AI that<br/><span style={{ color:UB.sky }}>never sleeps, never quits</span>
            </h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.8)", lineHeight:1.7, marginBottom:24 }}>
              Your WhatsApp replies in seconds. BM & English. Qualifies leads, takes orders, books appointments \u2014 while you sleep.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
              {[
                "Replies instantly \u2014 no customer waits",
                "Bahasa Malaysia & English fluently",
                "Qualifies leads before they reach you",
                "Takes orders & books appointments",
                "Learns YOUR business \u2014 products, prices, policies",
              ].map(f => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:8, fontSize:14 }}>
                  {Icons.check(UB.green,16)} {f}
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:16, flexWrap:"wrap", alignItems:"center" }}>
              <button onClick={() => window.open("https://botku.ai","_blank")}
                style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"14px 28px", borderRadius:10, background:"white", color:UB.purple, fontSize:15, fontWeight:700, cursor:"pointer", border:"none", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = UB.sky; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = UB.purple; }}
              >
                {"Explore BotKu.ai \u2192"}
              </button>
              <span style={{ fontSize:15, fontWeight:700, color:UB.sky }}>From RM200/mo</span>
            </div>
          </div>

          {/* Chat mockup */}
          <div style={{ flex:"1 1 300px", maxWidth:380 }}>
            <div style={{ background:"white", borderRadius:16, padding:20, boxShadow:"0 12px 40px rgba(0,0,0,0.3)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16, paddingBottom:12, borderBottom:"1px solid #eee" }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:UB.purple+"15", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{"🤖"}</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:"#1a1a1a" }}>BotKu AI</div>
                  <div style={{ fontSize:11, color:UB.green, display:"flex", alignItems:"center", gap:4 }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background:UB.green, display:"inline-block" }} />
                    Online 24/7
                  </div>
                </div>
              </div>
              {[
                { from:"user", text:"Berapa harga servis aircond?" },
                { from:"bot", text:"Servis aircond kami bermula dari RM80 untuk 1 unit. Untuk 2 unit, harga istimewa RM140. Nak saya book slot? \uD83D\uDE0A" },
                { from:"user", text:"Ok book esok pagi boleh?" },
                { from:"bot", text:"Boleh! Esok pukul 10am ada slot. Saya perlukan nama dan alamat untuk confirm. \uD83D\uDC4D" },
              ].map((m,i) => (
                <div key={i} style={{ display:"flex", justifyContent: m.from==="user" ? "flex-end" : "flex-start", marginBottom:8 }}>
                  <div style={{
                    maxWidth:"80%", padding:"10px 14px", borderRadius:12, fontSize:13, lineHeight:1.5, color:"#1a1a1a",
                    background: m.from==="user" ? "#DCF8C6" : "#f0f0f0",
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
            { n:"01", icon:Icons.target, t:"Pick What You Need", d:"Internet, mobile, marketing, cloud, AI chatbot \u2014 mix and match freely." },
            { n:"02", icon:Icons.users, t:"We Handle Everything", d:"Installation, phone delivery, chatbot training, ad campaigns \u2014 done for you." },
            { n:"03", icon:Icons.chart, t:"Watch Your Business Grow", d:"AI replies to customers. Ads bring leads. Your team stays connected. You scale." },
          ].map((s,i) => (
            <div key={s.n} className={"fade-up-d" + (i+1)} style={{ background:T.card, padding:36, textAlign:"center" }}>
              <div style={{ width:48, height:48, borderRadius:12, background:UB.blue+"0D", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                {s.icon(UB.blue,22)}
              </div>
              <div style={{ fontSize:11, fontWeight:700, color:UB.blue, letterSpacing:2, marginBottom:8 }}>{"STEP " + s.n}</div>
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
            <h2 style={{ fontSize:"clamp(26px,3.5vw,38px)", fontWeight:800, color:T.text }}>Real results from Malaysian SMEs</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:18 }}>
            {STORIES.map(s => (
              <div key={s.title} style={{ background:T.card, borderRadius:14, overflow:"hidden", border:"1px solid " + T.border, transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ height:160, position:"relative", overflow:"hidden" }}>
                  <img src={s.img} alt={s.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e => { e.target.style.opacity="0"; }} />
                  <div style={{ position:"absolute", top:10, left:10, background:UB.blue, borderRadius:6, padding:"4px 10px", fontSize:11, fontWeight:700, color:"white" }}>{s.tag}</div>
                  <div style={{ position:"absolute", bottom:10, right:10, background:"white", borderRadius:10, padding:"8px 14px", boxShadow:"0 2px 10px rgba(0,0,0,0.15)", textAlign:"center" }}>
                    <div style={{ fontSize:22, fontWeight:800, color:UB.green }}>{s.metric}</div>
                    <div style={{ fontSize:9, color:"#666", fontWeight:600 }}>{s.metricLabel}</div>
                  </div>
                </div>
                <div style={{ padding:18 }}>
                  <h3 style={{ fontSize:16, fontWeight:700, marginBottom:10, color:T.text }}>{s.title}</h3>
                  <div style={{ fontSize:13, marginBottom:6, display:"flex", alignItems:"flex-start", gap:6 }}>
                    {Icons.x(UB.red,14)}<span style={{ color:T.muted }}>{s.bef}</span>
                  </div>
                  <div style={{ fontSize:13, display:"flex", alignItems:"flex-start", gap:6 }}>
                    {Icons.check(UB.green,14)}<span style={{ color:T.text }}>{s.aft}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ FINAL CTA — Unifi blue gradient ═══ */}
      <section style={{ padding:"80px 24px", background:"linear-gradient(160deg, " + UB.blue + ", " + UB.sky + ")", textAlign:"center" }}>
        <div style={{ maxWidth:560, margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:800, marginBottom:14, color:"white" }}>Ready to equip your business?</h2>
          <p style={{ color:"rgba(255,255,255,0.85)", fontSize:16, marginBottom:28, lineHeight:1.7 }}>
            Internet, free 5G phones, AI chatbot, marketing \u2014 <strong style={{ color:"white" }}>everything from one partner</strong>.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:16 }}>
            <button onClick={() => scr("solutions")}
              style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"16px 32px", borderRadius:10, background:"white", color:UB.blue, fontSize:16, fontWeight:700, cursor:"pointer", border:"none", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Browse Solutions {Icons.arrow(UB.blue,16)}
            </button>
            <button onClick={() => window.open("https://botku.ai","_blank")}
              style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"16px 28px", borderRadius:10, border:"1px solid rgba(255,255,255,0.3)", background:"rgba(255,255,255,0.1)", color:"white", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            >{"🤖 AI Chatbot \u2192"}</button>
          </div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)" }}>{"Free consultation \u00B7 No credit card \u00B7 SSM required only if you sign up"}</div>
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
