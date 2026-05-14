import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useTheme, ThemeProvider, Icons, PartnerLogos, Card, SectionLabel, WaBtn, PrimaryBtn, FloatingWA, Nav, Footer, waL, globalStyles } from "./theme";
import Broadband from "./pages/Broadband";
import AirBiz from "./pages/AirBiz";
import Mobile from "./pages/Mobile";
import CloudStorage from "./pages/CloudStorage";

/* ═══════════════════════════════════════════
   SOLUTION CATALOG — the core of the revamp
   ═══════════════════════════════════════════ */
const SOLUTIONS = [
  {
    id:"connectivity", cat:"Connectivity", tagline:"Get online. Stay connected.",
    icon:Icons.wifi, color:"#0EA5E9",
    items:[
      { n:"Business Broadband", p:"From RM129/mo", d:"Up to 2Gbps fibre · Free WiFi 6/7 router included", icon:Icons.globe, link:"/broadband", badge:"Free Router" },
      { n:"UNI5G Business Mobile", p:"From RM39/mo", d:"Unlimited 5G data · Free smartphone with every line", icon:Icons.phone, link:"/mobile", badge:"Free Phone" },
      { n:"Unifi Air Biz 5G", p:"From RM99/mo", d:"Wireless 5G broadband · Plug & play, no wiring needed", icon:Icons.wifi, link:"/air-biz", badge:"No Installation" },
    ]
  },
  {
    id:"ai", cat:"AI & Automation", tagline:"Let AI handle your customers 24/7.",
    icon:Icons.zap, color:"#8B5CF6",
    items:[
      { n:"AI WhatsApp Chatbot", p:"From RM200/mo", d:"Smart AI assistant that replies, qualifies leads & takes orders on WhatsApp — 24/7, in BM & English", icon:Icons.zap, external:"https://botku.ai", badge:"NEW" },
    ]
  },
  {
    id:"marketing", cat:"Digital Marketing", tagline:"Reach customers across 4 platforms.",
    icon:Icons.trending, color:"#F97316",
    items:[
      { n:"Standard Pack", p:"RM100/mo", d:"1.5–2 month campaign · 840 ad credits · 4 platforms", icon:Icons.target, wa:true, pkg:"Standard" },
      { n:"Premium Pack", p:"RM200/mo", d:"3-month campaign · 1,680 credits · Video included", icon:Icons.target, wa:true, pkg:"Premium" },
      { n:"Prime Pack", p:"RM450/mo", d:"5–6 month campaign · 3,500 credits · Video included", icon:Icons.target, wa:true, pkg:"Prime" },
      { n:"Pro Pack", p:"RM900/mo", d:"12-month campaign · 7,000 credits · Maximum ROI", icon:Icons.chart, wa:true, pkg:"Pro", pop:true },
    ]
  },
  {
    id:"digital", cat:"Cloud & Security", tagline:"Protect data. Sell online.",
    icon:Icons.cloud, color:"#059669",
    items:[
      { n:"Cloud Storage", p:"From RM11/mo", d:"500GB–5TB · Local MY data residency", icon:Icons.cloud, link:"/cloud-storage" },
      { n:"eCommerce Hub", p:"From RM49/mo", d:"All-in-one online store management", icon:Icons.chart, wa:true },
      { n:"Kaspersky Security", p:"From RM30/mo", d:"Business-grade endpoint cybersecurity", icon:Icons.shield, wa:true },
    ]
  },
];

/* ═══ BUNDLES — curated combos ═══ */
const BUNDLES = [
  {
    name:"Kedai Baru",
    tagline:"Everything to open shop",
    who:"New businesses, retail shops, F&B outlets",
    items:["Business Broadband","UNI5G Business Mobile","Standard Marketing Pack"],
    highlight:"Free router + free smartphone",
    from:"RM268/mo",
    color:"#0EA5E9",
    msg:"Hi *UnifiBiz*, I'm interested in the *Kedai Baru Bundle* (Broadband + Mobile + Marketing). Can you share more details?"
  },
  {
    name:"Sales Machine",
    tagline:"Equip your sales team",
    who:"Agents, field sales, service businesses",
    items:["3–5 Mobile lines (free phones)","AI WhatsApp Chatbot","Premium Marketing Pack"],
    highlight:"AI chatbot qualifies leads while you close",
    from:"RM517/mo",
    color:"#8B5CF6",
    msg:"Hi *UnifiBiz*, I'm interested in the *Sales Machine Bundle* (Mobile lines + AI Chatbot + Marketing). Tell me more!"
  },
  {
    name:"Go Digital",
    tagline:"Take your business online",
    who:"Traditional businesses going digital",
    items:["Business Broadband","Cloud Storage","eCommerce Hub","AI WhatsApp Chatbot"],
    highlight:"AI handles enquiries, you handle fulfilment",
    from:"RM389/mo",
    color:"#059669",
    msg:"Hi *UnifiBiz*, I'm interested in the *Go Digital Bundle* (Broadband + Cloud + eCommerce + AI Chatbot). Let's discuss!"
  },
];

/* ═══ SUCCESS STORIES — reframed as business transformations ═══ */
const STORIES = [
  { title:"Kelantan Food Business", bef:"Sold locally at Pasar Siti Khadijah only.", aft:"Broadband + Facebook ads boosted online orders by 49% in one cycle.", tag:"Kedai Baru Bundle", metric:"+49%", metricLabel:"Sales Growth", img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=260&fit=crop" },
  { title:"Property Agent Team", bef:"Relied on walk-ins. Leads were slow and expensive.", aft:"5G mobile + AI chatbot + TikTok video drove 3x more qualified leads.", tag:"Sales Machine", metric:"3x", metricLabel:"Lead Volume", img:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=260&fit=crop" },
  { title:"Boutique Café Chain", bef:"Single outlet in PJ. Marketing limited to word-of-mouth.", aft:"Full digital setup — broadband, cloud POS, Instagram ads — opened 2nd branch in 6 months.", tag:"Go Digital", metric:"2x", metricLabel:"Foot Traffic", img:"https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=260&fit=crop" },
  { title:"Pest Control Service", bef:"Only northern states. Marketing limited to flyers.", aft:"AI chatbot handled 60% of enquiries. 12-month campaign doubled coverage area.", tag:"Sales Machine", metric:"2x", metricLabel:"Revenue Doubled", img:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=260&fit=crop" },
];

/* ═══ SMART SOLUTION FINDER (revamped quiz) ═══ */
const QZ = [
  { q:"What's your biggest business challenge right now?", o:[
    { l:"I need reliable internet & connectivity", s:[3,0,0,0] },
    { l:"I can't keep up with customer enquiries", s:[0,3,1,0] },
    { l:"Not enough customers — I need more leads", s:[0,1,3,0] },
    { l:"I want to go fully digital (online store, cloud, etc.)", s:[0,1,0,3] },
  ]},
  { q:"How many staff does your business have?", o:[
    { l:"Just me (solopreneur)", s:[1,2,1,1] },
    { l:"2–5 people", s:[2,1,2,1] },
    { l:"6–20 people", s:[2,1,2,2] },
    { l:"20+ people", s:[3,1,2,2] },
  ]},
  { q:"Do you currently have business internet?", o:[
    { l:"No — using personal WiFi / mobile data", s:[3,0,0,1] },
    { l:"Yes, but it's slow or unreliable", s:[2,0,0,0] },
    { l:"Yes, it's fine — I need other solutions", s:[0,1,2,1] },
  ]},
  { q:"What's your monthly budget for business tools?", o:[
    { l:"Under RM300", s:[2,1,1,0] },
    { l:"RM300 – RM600", s:[1,2,2,1] },
    { l:"RM600+ — I want the full package", s:[1,2,2,3] },
  ]},
];

const BUNDLE_MAP = ["Kedai Baru","Sales Machine","Sales Machine","Go Digital"];

function Home() {
  const T = useTheme();
  const navigate = useNavigate();
  const [activeSol, setActiveSol] = useState("connectivity");
  const [qs, setQs] = useState(-1);
  const [sc, setSc] = useState([0,0,0,0]);
  const [qr, setQr] = useState(null);
  const [expandBundle, setExpandBundle] = useState(null);

  const qa = (s) => {
    const n = sc.map((v,i) => v + s[i]);
    setSc(n);
    if (qs + 1 >= QZ.length) {
      setQr(n.indexOf(Math.max(...n)));
    } else {
      setQs(qs + 1);
    }
  };

  const scr = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  const handleItemAction = (it) => {
    if (it.link) navigate(it.link);
    else if (it.external) window.open(it.external, "_blank");
    else if (it.wa || it.pkg) window.open(waL(`Hi *UnifiBiz*, I'm interested in *${it.n}* (${it.p}). Can you share more details?`), "_blank");
  };

  return (
    <>
      {/* ═══ HERO — Business Solutions First ═══ */}
      <section style={{ background:T.heroBg, padding:"100px 24px 64px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-120, right:-120, width:500, height:500, borderRadius:"50%", background:T.primary+"06", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-80, left:-80, width:350, height:350, borderRadius:"50%", background:T.accent+"06", pointerEvents:"none" }} />

        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", flexWrap:"wrap", gap:48, alignItems:"center" }}>
          {/* Left */}
          <div className="fade-up" style={{ flex:"1 1 440px", maxWidth:560 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:8, background:T.accent+"0D", border:`1px solid ${T.accent}20`, marginBottom:20 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:T.accent }} />
              <span style={{ fontSize:12, fontWeight:600, color:T.accent }}>Official Unifi Business Partner</span>
            </div>
            <h1 style={{ fontSize:"clamp(32px,4.5vw,52px)", fontWeight:800, lineHeight:1.12, marginBottom:16, color:T.text, letterSpacing:"-0.02em" }}>
              Internet. Devices. AI.<br/>
              <span style={{ color:T.accent, fontSize:"clamp(36px,5vw,58px)" }}>Everything your<br/>business needs.</span>
            </h1>
            <p style={{ fontSize:17, color:T.muted, lineHeight:1.7, marginBottom:28, maxWidth:480 }}>
              Get <strong style={{ color:T.text }}>free smartphones, free routers, AI chatbot</strong> and digital marketing — all from one partner. Malaysian SMEs trust us to set up their entire digital backbone.
            </p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:20 }}>
              <span data-track="hero_consult">
                <WaBtn text="Free Business Consultation" msg="Hi *UnifiBiz*, I'd like a FREE consultation. I want to understand which business solutions (internet, mobile, AI chatbot, marketing) are right for my company." style={{ fontSize:15, padding:"14px 24px" }} />
              </span>
              <span data-track="hero_quiz">
                <button onClick={() => { setQs(0); setSc([0,0,0,0]); setQr(null); scr("finder"); }}
                  style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"14px 24px", borderRadius:10, border:`1px solid ${T.border}`, background:"transparent", color:T.text, fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.primary; e.currentTarget.style.color = T.primary; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.text; }}
                >
                  Find My Solution {Icons.arrow(T.primary,16)}
                </button>
              </span>
            </div>

            {/* Trust strip */}
            <div className="hero-stats" style={{ display:"flex", alignItems:"center", gap:16, fontSize:12, color:T.muted, flexWrap:"wrap" }}>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>{Icons.shield(T.primary,16)}<span>SSM Registered</span></div>
              <span style={{ color:T.border }}>|</span>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>{Icons.check("#059669",16)}<span>Official Unifi Reseller</span></div>
              <span style={{ color:T.border }}>|</span>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>{Icons.users(T.primary,16)}<span>500+ SMEs Served</span></div>
            </div>
          </div>

          {/* Right — highlight cards instead of single image */}
          <div className="fade-up-d2" style={{ flex:"1 1 380px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {[
                { icon:Icons.phone, label:"Free Smartphones", sub:"with every mobile plan", color:"#0EA5E9" },
                { icon:Icons.wifi, label:"Free WiFi 7 Router", sub:"with broadband plans", color:"#059669" },
                { icon:Icons.zap, label:"AI Chatbot", sub:"from RM200/mo", color:"#8B5CF6" },
                { icon:Icons.trending, label:"Digital Marketing", sub:"from RM100/mo", color:"#F97316" },
              ].map((h,i) => (
                <div key={i} className={`fade-up-d${i+1}`}
                  style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"20px 16px", transition:"all 0.25s", cursor:"pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = h.color; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 25px ${h.color}15`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                  onClick={() => scr("solutions")}
                >
                  <div style={{ width:40, height:40, borderRadius:10, background:h.color+"12", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}>
                    {h.icon(h.color, 20)}
                  </div>
                  <div style={{ fontSize:15, fontWeight:700, color:T.text }}>{h.label}</div>
                  <div style={{ fontSize:12, color:T.muted, marginTop:2 }}>{h.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partner logos */}
        <div style={{ maxWidth:800, margin:"48px auto 0", textAlign:"center" }}>
          <p style={{ fontSize:11, color:T.muted, marginBottom:14, fontWeight:500, letterSpacing:1, textTransform:"uppercase" }}>Powered by</p>
          <PartnerLogos T={T} />
        </div>
      </section>


      {/* ═══ SOLUTIONS SHOWCASE — the main event ═══ */}
      <section id="solutions" style={{ padding:"80px 24px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <SectionLabel text="Business Solutions" />
          <h2 style={{ fontSize:"clamp(26px,3.5vw,38px)", fontWeight:800, color:T.text }}>Everything under one roof</h2>
          <p style={{ color:T.muted, fontSize:15, marginTop:8 }}>Connectivity, AI, marketing, cloud — pick what you need or bundle them together.</p>
        </div>

        {/* Category tabs */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center", marginBottom:32 }}>
          {SOLUTIONS.map(s => (
            <button key={s.id} onClick={() => setActiveSol(s.id)}
              style={{
                display:"flex", alignItems:"center", gap:6, padding:"10px 18px", borderRadius:10, cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, transition:"all 0.2s",
                border: activeSol === s.id ? `2px solid ${s.color}` : `1px solid ${T.border}`,
                background: activeSol === s.id ? s.color+"0A" : T.card,
                color: activeSol === s.id ? s.color : T.muted,
              }}
            >
              {s.icon(activeSol === s.id ? s.color : T.muted, 16)} {s.cat}
            </button>
          ))}
        </div>

        {/* Active category items */}
        {SOLUTIONS.filter(s => s.id === activeSol).map(sol => (
          <div key={sol.id}>
            <div style={{ marginBottom:20, textAlign:"center" }}>
              <span style={{ fontSize:14, color:sol.color, fontWeight:600 }}>{sol.tagline}</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:16 }}>
              {sol.items.map(it => (
                <Card key={it.n} style={{ padding:0, overflow:"hidden", border: it.pop ? `2px solid ${sol.color}` : undefined }}>
                  {it.badge && (
                    <div style={{
                      background: it.badge === "NEW" ? "#8B5CF6" : sol.color,
                      color:"white", textAlign:"center", fontSize:11, fontWeight:700, padding:"5px 0", letterSpacing:1
                    }}>{it.badge}</div>
                  )}
                  {it.pop && (
                    <div style={{ background:sol.color, color:"white", textAlign:"center", fontSize:11, fontWeight:700, padding:"5px 0", letterSpacing:1 }}>MOST POPULAR</div>
                  )}
                  <div style={{ padding:24 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                      <div style={{ width:42, height:42, borderRadius:10, background:sol.color+"12", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        {it.icon(sol.color, 20)}
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
                        border: it.external ? `1px solid #8B5CF6` : `1px solid ${T.primary}`,
                        background: it.external ? "#8B5CF610" : T.primary+"0A",
                        color: it.external ? "#8B5CF6" : T.primary,
                      }}
                      onMouseEnter={e => { const c = it.external ? "#8B5CF6" : T.primary; e.currentTarget.style.background = c; e.currentTarget.style.color = "white"; }}
                      onMouseLeave={e => { const c = it.external ? "#8B5CF6" : T.primary; e.currentTarget.style.background = c + "10"; e.currentTarget.style.color = c; }}
                    >
                      {it.link ? "View Plans" : it.external ? "Explore BotKu.ai →" : "Enquire via WhatsApp"}
                      {!it.external && !it.link && <span style={{ fontSize:16 }}>💬</span>}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </section>


      {/* ═══ BUSINESS STARTER BUNDLES ═══ */}
      <section id="bundles" style={{ padding:"80px 24px", background:T.sub }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <SectionLabel text="Starter Bundles" />
            <h2 style={{ fontSize:"clamp(26px,3.5vw,38px)", fontWeight:800, color:T.text }}>Don't pick one — bundle everything</h2>
            <p style={{ color:T.muted, fontSize:15, marginTop:8 }}>Curated combos for common business needs. One partner, one bill.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:18 }}>
            {BUNDLES.map((b,i) => (
              <Card key={b.name} style={{ padding:0, overflow:"hidden", border:`1px solid ${b.color}30` }}>
                <div style={{ background:`linear-gradient(135deg, ${b.color}15, ${b.color}05)`, padding:"24px 24px 16px" }}>
                  <div style={{ display:"inline-block", padding:"4px 10px", borderRadius:6, background:b.color+"15", color:b.color, fontSize:11, fontWeight:700, letterSpacing:0.5, marginBottom:8 }}>
                    {b.tagline.toUpperCase()}
                  </div>
                  <h3 style={{ fontSize:22, fontWeight:800, color:T.text, marginBottom:4 }}>{b.name} Bundle</h3>
                  <p style={{ fontSize:13, color:T.muted }}>{b.who}</p>
                  <div style={{ fontSize:28, fontWeight:800, color:b.color, marginTop:12 }}>
                    {b.from} <span style={{ fontSize:13, fontWeight:500, color:T.muted }}>combined</span>
                  </div>
                </div>
                <div style={{ padding:"16px 24px 24px" }}>
                  <div style={{ marginBottom:14 }}>
                    {b.items.map(item => (
                      <div key={item} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 0", fontSize:13, color:T.text }}>
                        {Icons.check("#059669",14)} {item}
                      </div>
                    ))}
                  </div>
                  <div style={{ padding:"10px 14px", borderRadius:8, background:b.color+"08", border:`1px solid ${b.color}15`, marginBottom:16 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:b.color }}>✨ {b.highlight}</div>
                  </div>
                  <WaBtn text={`Get ${b.name} Bundle`} msg={b.msg} sm style={{ width:"100%", justifyContent:"center" }} />
                </div>
              </Card>
            ))}
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
            { n:"01", icon:Icons.target, t:"Tell Us What You Need", d:"Pick individual solutions or a bundle. Not sure? Take the 30-second quiz or chat with us free." },
            { n:"02", icon:Icons.users, t:"We Set Everything Up", d:"Broadband installation, device delivery, chatbot training, ad campaigns — we handle it all." },
            { n:"03", icon:Icons.chart, t:"Focus on Your Business", d:"Your AI chatbot handles enquiries. Your ads run. Your team is connected. You grow." },
          ].map((s,i) => (
            <div key={s.n} className={`fade-up-d${i+1}`} style={{ background:T.card, padding:36, textAlign:"center" }}>
              <div style={{ width:48, height:48, borderRadius:12, background:i===1?T.accent+"0D":T.primary+"0A", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                {s.icon(i===1?T.accent:T.primary,22)}
              </div>
              <div style={{ fontSize:11, fontWeight:700, color:T.accent, letterSpacing:2, marginBottom:8 }}>STEP {s.n}</div>
              <h3 style={{ fontSize:18, fontWeight:700, marginBottom:8, color:T.text }}>{s.t}</h3>
              <p style={{ fontSize:14, color:T.muted, lineHeight:1.6 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ═══ AI CHATBOT SPOTLIGHT ═══ */}
      <section style={{ padding:"80px 24px", background:`linear-gradient(135deg, #8B5CF608, #8B5CF603)` }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", flexWrap:"wrap", gap:40, alignItems:"center" }}>
          <div style={{ flex:"1 1 360px" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:8, background:"#8B5CF612", border:"1px solid #8B5CF620", marginBottom:16 }}>
              <span style={{ fontSize:12, fontWeight:700, color:"#8B5CF6" }}>🤖 POWERED BY BOTKU.AI</span>
            </div>
            <h2 style={{ fontSize:"clamp(26px,3.5vw,38px)", fontWeight:800, color:T.text, marginBottom:14 }}>
              Your AI employee that<br/>never sleeps
            </h2>
            <p style={{ fontSize:15, color:T.muted, lineHeight:1.7, marginBottom:24 }}>
              Imagine a WhatsApp assistant that replies instantly in BM & English, qualifies leads, answers FAQs, takes orders — 24/7. That's what BotKu does for RM200/mo.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
              {[
                "Replies in seconds — customers don't wait",
                "Speaks Bahasa Malaysia & English naturally",
                "Qualifies leads before they reach your sales team",
                "Takes orders & books appointments automatically",
                "Learns your business — products, pricing, policies",
              ].map(f => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:8, fontSize:14, color:T.text }}>
                  {Icons.check("#8B5CF6",16)} {f}
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <button onClick={() => window.open("https://botku.ai","_blank")}
                style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"14px 28px", borderRadius:10, background:"#8B5CF6", color:"white", fontSize:15, fontWeight:700, cursor:"pointer", border:"none", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#7C3AED"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#8B5CF6"; }}
              >
                Explore BotKu.ai →
              </button>
              <WaBtn text="Ask About AI Chatbot" msg="Hi *UnifiBiz*, I'm interested in the AI WhatsApp Chatbot (BotKu). Can you tell me more about the RM200/mo plan?" />
            </div>
          </div>
          <div style={{ flex:"1 1 300px", maxWidth:380 }}>
            {/* Chat mockup */}
            <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:16, padding:20, boxShadow:T.floatShadow }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16, paddingBottom:12, borderBottom:`1px solid ${T.border}` }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:"#8B5CF612", display:"flex", alignItems:"center", justifyContent:"center" }}>🤖</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:T.text }}>BotKu AI</div>
                  <div style={{ fontSize:11, color:"#059669" }}>● Online 24/7</div>
                </div>
              </div>
              {[
                { from:"user", text:"Berapa harga servis aircond?" },
                { from:"bot", text:"Servis aircond kami bermula dari RM80 untuk 1 unit. Untuk 2 unit, harga istimewa RM140. Nak saya book slot untuk awak? 😊" },
                { from:"user", text:"Ok book esok pagi boleh?" },
                { from:"bot", text:"Boleh! Esok (Rabu) pukul 10am ada slot. Saya perlukan nama dan alamat untuk confirm booking. 👍" },
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


      {/* ═══ SMART SOLUTION FINDER (Quiz) ═══ */}
      <section id="finder" style={{ padding:"80px 24px", maxWidth:640, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <SectionLabel text="Smart Solution Finder" />
          <h2 style={{ fontSize:"clamp(26px,3.5vw,38px)", fontWeight:800, color:T.text }}>Not sure what you need?</h2>
          <p style={{ color:T.muted, fontSize:15, marginTop:8 }}>Answer 4 quick questions — we'll recommend the perfect bundle.</p>
        </div>
        <Card hover={false} style={{ border:`1px solid ${T.border}`, padding:32 }}>
          {qs === -1 && !qr && (
            <div style={{ textAlign:"center", padding:"24px 0" }}>
              <div style={{ width:64, height:64, borderRadius:16, background:T.accent+"0D", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                {Icons.target(T.accent,28)}
              </div>
              <h3 style={{ fontSize:20, fontWeight:700, marginBottom:8, color:T.text }}>Find your perfect setup</h3>
              <p style={{ color:T.muted, marginBottom:24, fontSize:14 }}>Takes less than 30 seconds.</p>
              <span data-track="quiz_start"><PrimaryBtn text="Start Now" onClick={() => setQs(0)} /></span>
            </div>
          )}
          {qs >= 0 && !qr && (
            <div>
              <div style={{ display:"flex", gap:4, marginBottom:24 }}>
                {QZ.map((_,i) => <div key={i} style={{ flex:1, height:3, borderRadius:2, background:i<=qs?T.accent:T.border, transition:"background 0.3s" }} />)}
              </div>
              <div style={{ fontSize:11, fontWeight:700, color:T.accent, letterSpacing:1, marginBottom:6 }}>QUESTION {qs+1} OF {QZ.length}</div>
              <h3 style={{ fontSize:18, fontWeight:700, marginBottom:18, color:T.text }}>{QZ[qs].q}</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {QZ[qs].o.map((o,i) => (
                  <button key={i} onClick={() => qa(o.s)}
                    style={{ background:T.sub, border:`1px solid ${T.border}`, padding:"14px 18px", borderRadius:10, cursor:"pointer", transition:"all 0.2s", color:T.text, textAlign:"left", fontSize:14, fontFamily:"'DM Sans',sans-serif", display:"flex", alignItems:"center", gap:10 }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.background = T.accent+"08"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.sub; }}
                  >
                    <span style={{ width:24, height:24, borderRadius:6, background:T.accent+"0D", color:T.accent, fontSize:11, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      {String.fromCharCode(65+i)}
                    </span>
                    {o.l}
                  </button>
                ))}
              </div>
            </div>
          )}
          {qr !== null && (() => {
            const b = BUNDLES[qr] || BUNDLES[0];
            return (
              <div style={{ textAlign:"center", padding:"16px 0" }}>
                <div style={{ width:48, height:48, borderRadius:12, background:"#059669"+"12", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>{Icons.check("#059669",24)}</div>
                <div style={{ fontSize:12, fontWeight:700, color:"#059669", letterSpacing:1, marginBottom:6 }}>WE RECOMMEND</div>
                <h3 style={{ fontSize:24, fontWeight:800, marginBottom:4, color:T.text }}>{b.name} Bundle</h3>
                <div style={{ display:"inline-block", padding:"3px 10px", borderRadius:6, background:b.color+"0D", color:b.color, fontSize:11, fontWeight:700, marginBottom:14 }}>{b.tagline.toUpperCase()}</div>
                <p style={{ color:T.muted, marginBottom:16, fontSize:14, maxWidth:400, margin:"0 auto 16px" }}>{b.who}</p>
                <div style={{ textAlign:"left", maxWidth:340, margin:"0 auto 20px" }}>
                  {b.items.map(item => (
                    <div key={item} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 0", fontSize:13, color:T.text }}>
                      {Icons.check("#059669",14)} {item}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize:28, fontWeight:800, color:b.color, marginBottom:20 }}>
                  {b.from} <span style={{ fontSize:13, fontWeight:500, color:T.muted }}>combined</span>
                </div>
                <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
                  <WaBtn text={`Get ${b.name} Bundle`} msg={b.msg} />
                  <button onClick={() => { setQs(-1); setSc([0,0,0,0]); setQr(null); }}
                    style={{ background:"none", border:`1px solid ${T.border}`, color:T.muted, padding:"12px 20px", borderRadius:10, fontSize:14, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}
                  >Retake Quiz</button>
                </div>
              </div>
            );
          })()}
        </Card>
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
                <div style={{ height:160, background:`linear-gradient(135deg, ${T.primary}20, ${T.accent}15)`, position:"relative", overflow:"hidden" }}>
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
      <section style={{ padding:"80px 24px", background:`linear-gradient(135deg, ${T.primary}08, ${T.accent}06)`, textAlign:"center" }}>
        <div style={{ maxWidth:560, margin:"0 auto" }}>
          <SectionLabel text="Get Started" />
          <h2 style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:800, marginBottom:14, color:T.text }}>One partner for your entire business</h2>
          <p style={{ color:T.muted, fontSize:16, marginBottom:28, lineHeight:1.7 }}>
            Internet, devices, AI chatbot, digital marketing — start with a <strong style={{ color:T.text }}>free consultation</strong>. Join 500+ Malaysian SMEs we've equipped.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:16 }}>
            <span data-track="bottom_consult">
              <WaBtn text="Free Business Consultation" msg="Hi *UnifiBiz*, I'd like a FREE consultation. Help me figure out which solutions (internet, devices, AI chatbot, marketing) are right for my business." style={{ fontSize:16, padding:"16px 32px" }} />
            </span>
            <span data-track="bottom_solutions">
              <button onClick={() => scr("solutions")}
                style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"16px 28px", borderRadius:10, border:`1px solid ${T.border}`, background:"transparent", color:T.text, fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.primary; e.currentTarget.style.color = T.primary; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.text; }}
              >Browse All Solutions →</button>
            </span>
          </div>
          <div style={{ fontSize:12, color:T.muted }}>Free consultation · No credit card · SSM required only if you sign up</div>
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
      <FloatingWA />
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
