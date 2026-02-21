import { useState, useEffect, useRef } from "react";

// ─── CONSTANTS ───
const COLORS = {
  primary: "#005CB9",
  orange: "#FF6B00",
  cyan: "#88E8FF",
  dark: "#0A1628",
  darkCard: "#111D33",
  darkBorder: "#1E303E",
  text: "#E8F0FE",
  textMuted: "#8BA3C7",
};

const WA_NUMBER = "60111311595";
const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const PACKAGES = [
  {
    name: "Standard", label: "Awareness", monthly: 100, credits: 840,
    color: "#88E8FF", icon: "⚡", campaign: "1.5 - 2 months",
    platforms: "Facebook, Google Ads, Instagram, TikTok",
    desc: "Perfect for businesses ready to scale their reach across multiple platforms.",
    experts: ["Dedicated Campaign Manager", "Graphic Design", "Copywriter", "TikTok (Purely ad setting)"],
    video: false,
  },
  {
    name: "Premium", label: "Engagement", monthly: 200, credits: 1680,
    color: "#005CB9", icon: "🚀", campaign: "Up to 3 months (1 month TikTok)",
    platforms: "Facebook, Google Ads, TikTok, Rev Media",
    desc: "Ideal for building customer interaction and loyalty.",
    experts: ["Dedicated Campaign Manager", "Graphic Design", "Copywriter", "Video as a service (680 ad credit)"],
    video: true,
  },
  {
    name: "Prime", label: "Sales Conversion", monthly: 450, credits: 3500,
    color: "#FF6B00", icon: "🔥", popular: true, campaign: "5 - 6 months",
    platforms: "Facebook, Google Ads, TikTok, Rev Media",
    desc: "Great for converting leads and boosting revenue.",
    experts: ["Dedicated Campaign Manager", "Graphic Design", "Copywriter", "Video as a service (680 ad credit)"],
    video: true,
  },
  {
    name: "Pro", label: "2x Sales Conversion", monthly: 900, credits: 7000,
    color: "#FF3D00", icon: "💎", campaign: "Up to 12 months",
    platforms: "Facebook, Google Ads, TikTok, Rev Media",
    desc: "Double up the effectiveness of your campaign to maximise your returns.",
    experts: ["Dedicated Campaign Manager", "Graphic Design", "Copywriter", "Video as a service (680 ad credit)"],
    video: true,
  },
];

const STORIES = [
  {
    icon: "🍜",
    title: "From Warung to Nationwide",
    before: "A Kelantan food business only sold locally at Pasar Siti Khadijah.",
    after: "After DMS, they ran targeted Facebook & Instagram ads. Sales jumped 49% in just one campaign cycle.",
    tag: "Standard Pack",
    color: COLORS.cyan,
  },
  {
    icon: "🏡",
    title: "Property Agent Goes Digital",
    before: "Relied on walk-ins and word of mouth. Leads were inconsistent and slow.",
    after: "Google Ads + TikTok video campaign drove 3x more qualified leads per month. Closed 5 extra units in 3 months.",
    tag: "Prime Pack",
    color: COLORS.orange,
  },
  {
    icon: "🎨",
    title: "Sabah Artisan Goes Global",
    before: "A rural craft business with zero online presence or digital marketing experience.",
    after: "With DMS managing everything, they expanded reach nationwide. Sales surged 165% with campaigns across Facebook and Rev Media.",
    tag: "Premium Pack",
    color: COLORS.primary,
  },
  {
    icon: "🏢",
    title: "Service Company Dominates Search",
    before: "Pest control company only served northern states. Relied on flyers and referrals.",
    after: "12-month Google + Facebook strategy doubled their sales and expanded coverage to new states.",
    tag: "Pro Pack",
    color: "#FF3D00",
  },
];

const SOLUTIONS = [
  {
    cat: "🌐 Connectivity",
    items: [
      { name: "Business Fibre", price: "From RM99/mo", desc: "Up to 2Gbps speed, WiFi 6 router + mesh, 24hr service restoration", icon: "🌐" },
      { name: "UNI5G Business Mobile", price: "From RM49/mo", desc: "Unlimited 5G/4G data, calls & SMS, free 5G smartphone", icon: "📶" },
      { name: "Unifi Air Biz", price: "From RM99/mo", desc: "Wireless 5G, plug-and-play, free 5G router or MiFi", icon: "📡" },
      { name: "FTTR (Fibre-to-Room)", price: "RM319/mo", desc: "1Gbps to every room via transparent fibre cable", icon: "🏢" },
      { name: "SMART Internet", price: "Contact us", desc: "Built-in content control policies for safer browsing", icon: "🛡" },
    ],
  },
  {
    cat: "💡 Digital Solutions",
    items: [
      { name: "eCommerce Hub", price: "From RM49/mo", desc: "Manage all online stores from one platform, built-in payment", icon: "🛒" },
      { name: "Cloud Storage", price: "From RM9/mo", desc: "Secure local hosting at TM Tier-3 data centres", icon: "☁️" },
      { name: "Kaspersky Security", price: "From RM30/mo", desc: "Protect against ransomware, fraud, data theft", icon: "🔒" },
      { name: "Go Bookit", price: "From RM3.30/day", desc: "Self-service appointment scheduling system", icon: "📅" },
      { name: "Cari @ Unifi", price: "FREE", desc: "List your business on Unifi marketplace", icon: "📍" },
      { name: "Rtist Platform", price: "Contact us", desc: "Access 18,000+ verified creative talents", icon: "🎨" },
    ],
  },
  {
    cat: "🎬 Entertainment & Bundles",
    items: [
      { name: "Hospitality TV", price: "Contact us", desc: "Malaysia's largest integrated entertainment for premises", icon: "📺" },
      { name: "Biz Fun Pack", price: "RM70/mo", desc: "20 premium local & international channels", icon: "🎬" },
      { name: "Go Niaga + Maybank", price: "Bundle pricing", desc: "Mobile + QRPay + financing up to RM500K", icon: "🏦" },
      { name: "IMPAK BIZ", price: "FREE", desc: "Digital maturity assessment + recommendations", icon: "📊" },
    ],
  },
];

const QUIZ_QUESTIONS = [
  {
    q: "What's your primary business goal?",
    opts: [
      { label: "Build brand awareness", score: [3, 1, 0, 0] },
      { label: "Engage & build loyalty", score: [0, 3, 1, 0] },
      { label: "Generate leads & sales", score: [0, 0, 3, 1] },
      { label: "Dominate my market", score: [0, 0, 1, 3] },
    ],
  },
  {
    q: "Do you need video content?",
    opts: [
      { label: "No, images are enough", score: [3, 1, 0, 0] },
      { label: "Maybe 1 video", score: [0, 3, 1, 0] },
      { label: "Yes, 2-3 videos", score: [0, 0, 3, 1] },
      { label: "Full video strategy", score: [0, 0, 0, 3] },
    ],
  },
  {
    q: "How long should your campaign run?",
    opts: [
      { label: "1-2 months test run", score: [3, 1, 0, 0] },
      { label: "3 months", score: [0, 3, 1, 0] },
      { label: "6 months serious push", score: [0, 0, 3, 1] },
      { label: "Full year domination", score: [0, 0, 0, 3] },
    ],
  },
  {
    q: "What's your monthly comfort level?",
    opts: [
      { label: "Under RM150", score: [3, 1, 0, 0] },
      { label: "RM150 - RM300", score: [0, 3, 1, 0] },
      { label: "RM300 - RM600", score: [0, 0, 3, 1] },
      { label: "RM600+", score: [0, 0, 1, 3] },
    ],
  },
];

// ─── PARTICLES ───
const ParticleField = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5, color: Math.random() > 0.5 ? COLORS.cyan : COLORS.primary,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "60"; ctx.fill();
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = COLORS.primary + Math.floor((1 - dist / 100) * 30).toString(16).padStart(2, "0");
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
};

// ─── COMPONENTS ───
const GlowCard = ({ children, color = COLORS.primary, style = {} }) => (
  <div
    style={{ background: COLORS.darkCard, border: `1px solid ${color}25`, borderRadius: 16, padding: 24, position: "relative", overflow: "hidden", transition: "all 0.3s ease", ...style }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = color + "70"; e.currentTarget.style.boxShadow = `0 0 30px ${color}15`; e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = color + "25"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
  >
    {children}
  </div>
);

const SectionTag = ({ text }) => (
  <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, border: `1px solid ${COLORS.orange}40`, color: COLORS.orange, fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14, background: COLORS.orange + "08" }}>{text}</div>
);

const WhatsAppBtn = ({ text, msg, style = {}, small = false }) => (
  <a href={waLink(msg)} target="_blank" rel="noopener noreferrer"
    style={{
      display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
      background: "linear-gradient(135deg, #25D366, #128C7E)", color: "white", border: "none",
      padding: small ? "10px 20px" : "14px 32px", borderRadius: 12,
      fontSize: small ? 13 : 16, fontWeight: 600, cursor: "pointer", transition: "all 0.3s ease",
      boxShadow: "0 4px 15px #25D36630", ...style,
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 25px #25D36650"; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px #25D36630"; }}
  >
    💬 {text}
  </a>
);

const OrangeBtn = ({ text, onClick, style = {} }) => (
  <button onClick={onClick}
    style={{
      background: "linear-gradient(135deg, #FF6B00, #FF8C00)", color: "white", border: "none",
      padding: "14px 32px", borderRadius: 12, fontSize: 16, fontWeight: 600,
      cursor: "pointer", transition: "all 0.3s ease", ...style,
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 25px ${COLORS.orange}40`; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
  >
    {text}
  </button>
);

// ─── MAIN ───
export default function App() {
  const [quizStep, setQuizStep] = useState(-1);
  const [quizScores, setQuizScores] = useState([0, 0, 0, 0]);
  const [quizResult, setQuizResult] = useState(null);
  const [roiBudget, setRoiBudget] = useState(1);
  const [roiVideos, setRoiVideos] = useState(0);
  const [expandedSol, setExpandedSol] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [expandedPkg, setExpandedPkg] = useState(null);
  const heroText = "Grow Your Business with AI-Powered Marketing";

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => { setTypedText(heroText.slice(0, i + 1)); i++; if (i >= heroText.length) clearInterval(iv); }, 50);
    return () => clearInterval(iv);
  }, []);

  const handleQuizAnswer = (scoreArr) => {
    const ns = quizScores.map((s, i) => s + scoreArr[i]);
    setQuizScores(ns);
    if (quizStep + 1 >= QUIZ_QUESTIONS.length) { setQuizResult(ns.indexOf(Math.max(...ns))); }
    else { setQuizStep(quizStep + 1); }
  };

  const roiPkg = PACKAGES[roiBudget];
  const videoCost = roiVideos * 680;
  const remaining = Math.max(0, roiPkg.credits - videoCost);
  const estReach = remaining * 120;
  const estClicks = Math.round(remaining * 3.5);
  const estLeads = Math.round(remaining * 0.15);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: COLORS.dark, color: COLORS.text, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Outfit', sans-serif; }
        ::selection { background: ${COLORS.orange}40; color: white; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${COLORS.dark}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.primary}50; border-radius: 3px; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glow { 0%,100% { box-shadow:0 0 20px #25D36620; } 50% { box-shadow:0 0 40px #25D36640; } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        @keyframes scan { 0% { top:0; } 100% { top:100%; } }
        .fade-in { animation: slideUp 0.6s ease forwards; }
        .quiz-opt {
          background: ${COLORS.darkCard}; border: 1px solid ${COLORS.darkBorder};
          padding: 14px 18px; border-radius: 12px; cursor: pointer; transition: all 0.2s ease;
          color: ${COLORS.text}; text-align: left; font-size: 15px; width: 100%; font-family: 'Outfit', sans-serif;
        }
        .quiz-opt:hover { border-color: ${COLORS.orange}; background: ${COLORS.orange}10; transform: translateX(4px); }
        .range-slider { -webkit-appearance:none; width:100%; height:6px; border-radius:3px; outline:none; cursor:pointer; background:linear-gradient(to right,${COLORS.primary},${COLORS.orange}); }
        .range-slider::-webkit-slider-thumb { -webkit-appearance:none; width:22px; height:22px; border-radius:50%; background:${COLORS.orange}; border:3px solid ${COLORS.dark}; box-shadow:0 0 10px ${COLORS.orange}60; }
        a { text-decoration: none; }
      `}</style>

      {/* ─── NAV ─── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: COLORS.dark + "E8", backdropFilter: "blur(20px)", borderBottom: `1px solid ${COLORS.darkBorder}40`, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <img src="/unifi-biz-logo.webp" alt="Unifi Business" style={{ height: 36, cursor: "pointer" }} onClick={() => scrollTo("hero")} />
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          {[["Packages", "packages"], ["Simulator", "simulator"], ["Stories", "stories"], ["Solutions", "solutions"]].map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: "none", border: "none", color: COLORS.textMuted, fontSize: 13, fontWeight: 500, padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "'Outfit',sans-serif", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = COLORS.orange}
              onMouseLeave={(e) => e.currentTarget.style.color = COLORS.textMuted}
            >{label}</button>
          ))}
          <WhatsAppBtn text="Contact Us" msg="Hi, I'm interested in Unifi Digital Marketing Solution. Please share more details." small={true} style={{ padding: "8px 16px", fontSize: 12, borderRadius: 8 }} />
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px 60px", overflow: "hidden" }}>
        <ParticleField />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 50%, ${COLORS.primary}12 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, ${COLORS.orange}08 0%, transparent 50%)` }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 780, width: "100%" }} className="fade-in">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 20, border: `1px solid ${COLORS.cyan}30`, background: COLORS.cyan + "08", marginBottom: 24, fontSize: 13, color: COLORS.cyan, fontWeight: 500 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.cyan, animation: "pulse 2s infinite" }} />
            Malaysia's First Instalment-Based Marketing Plan
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
            {typedText}<span style={{ animation: "pulse 1s infinite", color: COLORS.orange }}>|</span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.2vw, 18px)", color: COLORS.textMuted, maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.7 }}>
            Get a dedicated campaign manager, graphic designer & copywriter — running your ads across Facebook, Google, TikTok & Rev Media. Starting from just <span style={{ color: COLORS.orange, fontWeight: 700 }}>RM100/month</span>.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <OrangeBtn text="🤖 Find My Package" onClick={() => { setQuizStep(0); setQuizScores([0,0,0,0]); setQuizResult(null); scrollTo("advisor"); }} />
            <WhatsAppBtn text="Talk to Us" msg="Hi, I'm interested in Unifi Digital Marketing Solution. Please advise on the best package for my business." />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 56, flexWrap: "wrap" }}>
            {[{ label: "Ad Platforms", val: "4+", color: COLORS.cyan }, { label: "Max Ad Credits", val: "7,000", color: COLORS.orange }, { label: "From", val: "RM100/mo", color: COLORS.primary }, { label: "Campaign", val: "Up to 12mo", color: "#4ADE80" }].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section style={{ padding: "60px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <SectionTag text="How It Works" />
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800 }}>3 Simple Steps to Launch</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {[
            { step: "01", icon: "📋", title: "Choose Your Pack", desc: "Pick from Standard to Pro based on your goals and budget. Pay monthly over 12 months." },
            { step: "02", icon: "🎯", title: "We Handle Everything", desc: "Your dedicated team creates the strategy, designs, copy, and launches campaigns for you." },
            { step: "03", icon: "📈", title: "Watch Results Flow", desc: "Track performance through reports. Your campaign manager optimises for maximum results." },
          ].map((s) => (
            <GlowCard key={s.step} color={COLORS.primary}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.orange, marginBottom: 8, letterSpacing: 2 }}>STEP {s.step}</div>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.6 }}>{s.desc}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* ─── PACKAGES ─── */}
      <section id="packages" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <SectionTag text="DMS Packages" />
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800 }}>Choose Your Growth Plan</h2>
          <p style={{ color: COLORS.textMuted, fontSize: 15, marginTop: 8 }}>All plans include a dedicated team + 12-month instalment</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
          {PACKAGES.map((pkg, idx) => (
            <GlowCard key={pkg.name} color={pkg.color} style={{ border: pkg.popular ? `2px solid ${pkg.color}` : undefined }}>
              {pkg.popular && <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: pkg.color, color: "white", fontSize: 10, fontWeight: 700, padding: "3px 14px", borderRadius: "0 0 8px 8px", letterSpacing: 1 }}>MOST POPULAR</div>}
              <div style={{ textAlign: "center", paddingTop: pkg.popular ? 10 : 0 }}>
                <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 6, background: pkg.color + "15", color: pkg.color, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>{pkg.label.toUpperCase()}</div>
                <h3 style={{ fontSize: 22, fontWeight: 800 }}>{pkg.name} Pack</h3>
                <div style={{ fontSize: 40, fontWeight: 900, margin: "12px 0 2px" }}>
                  <span style={{ fontSize: 16, fontWeight: 500, color: COLORS.textMuted }}>RM</span>{pkg.monthly}
                </div>
                <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 16 }}>/month × 12 months</div>

                <div style={{ background: COLORS.dark, borderRadius: 12, padding: 14, marginBottom: 14, textAlign: "left" }}>
                  {[
                    ["Ad Credits", pkg.credits.toLocaleString(), COLORS.cyan],
                    ["Campaign Duration", pkg.campaign, COLORS.text],
                    ["Video", pkg.video ? "✅ Included (680/video)" : "❌ Not included", pkg.video ? "#4ADE80" : COLORS.textMuted],
                    ["Max Videos", pkg.video ? Math.floor(pkg.credits / 680).toString() : "—", "#A855F7"],
                  ].map(([label, val, col]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${COLORS.darkBorder}20`, fontSize: 13 }}>
                      <span style={{ color: COLORS.textMuted }}>{label}</span>
                      <span style={{ fontWeight: 600, color: col }}>{val}</span>
                    </div>
                  ))}
                </div>

                {/* Expandable details */}
                <button onClick={() => setExpandedPkg(expandedPkg === idx ? null : idx)}
                  style={{ background: "none", border: `1px solid ${COLORS.darkBorder}`, color: COLORS.textMuted, fontSize: 12, padding: "6px 14px", borderRadius: 8, cursor: "pointer", marginBottom: 12, fontFamily: "'Outfit',sans-serif", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = pkg.color; e.currentTarget.style.color = pkg.color; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.darkBorder; e.currentTarget.style.color = COLORS.textMuted; }}
                >
                  {expandedPkg === idx ? "Less details ▲" : "More details ▼"}
                </button>
                {expandedPkg === idx && (
                  <div style={{ textAlign: "left", background: COLORS.dark, borderRadius: 10, padding: 12, marginBottom: 12, animation: "slideUp 0.3s ease" }}>
                    <div style={{ fontSize: 11, color: COLORS.orange, fontWeight: 600, marginBottom: 6, letterSpacing: 1 }}>PLATFORMS</div>
                    <p style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 10 }}>{pkg.platforms}</p>
                    <div style={{ fontSize: 11, color: COLORS.orange, fontWeight: 600, marginBottom: 6, letterSpacing: 1 }}>YOUR TEAM</div>
                    {pkg.experts.map((e) => (
                      <div key={e} style={{ fontSize: 12, color: COLORS.textMuted, padding: "2px 0" }}>✓ {e}</div>
                    ))}
                  </div>
                )}

                <WhatsAppBtn
                  text={`Get ${pkg.name} Pack`}
                  msg={`Hi, I'm interested in the *${pkg.name} Pack* (RM${pkg.monthly}/mo, ${pkg.credits} ad credits). Please share more details on how to subscribe.`}
                  small={true}
                  style={{ width: "100%", justifyContent: "center", background: pkg.popular ? "linear-gradient(135deg, #25D366, #128C7E)" : COLORS.darkBorder, boxShadow: pkg.popular ? undefined : "none", color: pkg.popular ? "white" : COLORS.text }}
                />
              </div>
            </GlowCard>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: COLORS.textMuted, marginTop: 16 }}>
          * Prices exclude 6% SST • Ad credits upfront, pay monthly • 30% management fee front-loaded • Languages: BM & English
        </p>
      </section>

      {/* ─── AI ADVISOR ─── */}
      <section id="advisor" style={{ padding: "80px 24px", maxWidth: 650, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <SectionTag text="AI Advisor" />
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800 }}>Not Sure Which Pack?</h2>
          <p style={{ color: COLORS.textMuted, fontSize: 15, marginTop: 8 }}>Answer 4 quick questions — we'll recommend the best fit</p>
        </div>
        <GlowCard color={COLORS.orange}>
          <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${COLORS.cyan}30, transparent)`, animation: "scan 3s linear infinite", pointerEvents: "none" }} />

          {quizStep === -1 && !quizResult && (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 12, animation: "float 3s ease-in-out infinite" }}>🤖</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Ready for Your AI Consultation?</h3>
              <p style={{ color: COLORS.textMuted, marginBottom: 20, fontSize: 14 }}>4 questions. 30 seconds. Your perfect package revealed.</p>
              <OrangeBtn text="Start Analysis" onClick={() => setQuizStep(0)} />
            </div>
          )}

          {quizStep >= 0 && !quizResult && (
            <div>
              <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                {QUIZ_QUESTIONS.map((_, i) => (
                  <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= quizStep ? COLORS.orange : COLORS.darkBorder, transition: "background 0.3s" }} />
                ))}
              </div>
              <div style={{ fontSize: 11, color: COLORS.orange, fontWeight: 600, marginBottom: 6, letterSpacing: 1 }}>QUESTION {quizStep + 1}/{QUIZ_QUESTIONS.length}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{QUIZ_QUESTIONS[quizStep].q}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {QUIZ_QUESTIONS[quizStep].opts.map((opt, i) => (
                  <button key={i} className="quiz-opt" onClick={() => handleQuizAnswer(opt.score)}>
                    <span style={{ color: COLORS.orange, marginRight: 10, fontWeight: 700 }}>0{i + 1}</span>{opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {quizResult !== null && (() => {
            const pkg = PACKAGES[quizResult];
            return (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ fontSize: 13, color: COLORS.cyan, fontWeight: 600, marginBottom: 8, letterSpacing: 1 }}>⚡ ANALYSIS COMPLETE</div>
                <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>
                  <span style={{ color: pkg.color }}>{pkg.icon} {pkg.name} Pack</span>
                </h3>
                <div style={{ display: "inline-block", padding: "3px 12px", borderRadius: 6, background: pkg.color + "15", color: pkg.color, fontSize: 11, fontWeight: 700, marginBottom: 16 }}>{pkg.label}</div>
                <p style={{ color: COLORS.textMuted, marginBottom: 20, fontSize: 14 }}>{pkg.desc}</p>
                <div style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 24, flexWrap: "wrap" }}>
                  <div><div style={{ fontSize: 22, fontWeight: 800, color: COLORS.orange }}>RM{pkg.monthly}</div><div style={{ fontSize: 11, color: COLORS.textMuted }}>/month</div></div>
                  <div><div style={{ fontSize: 22, fontWeight: 800, color: COLORS.cyan }}>{pkg.credits.toLocaleString()}</div><div style={{ fontSize: 11, color: COLORS.textMuted }}>Ad Credits</div></div>
                  <div><div style={{ fontSize: 22, fontWeight: 800, color: "#4ADE80" }}>{pkg.campaign}</div><div style={{ fontSize: 11, color: COLORS.textMuted }}>Campaign</div></div>
                </div>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                  <WhatsAppBtn text={`Get ${pkg.name} Pack`} msg={`Hi! The AI Advisor recommended the *${pkg.name} Pack* (RM${pkg.monthly}/mo, ${pkg.credits} credits) for my business. I'd like to proceed!`} />
                  <button onClick={() => { setQuizStep(-1); setQuizScores([0,0,0,0]); setQuizResult(null); }}
                    style={{ background: "none", border: `1px solid ${COLORS.darkBorder}`, color: COLORS.textMuted, padding: "12px 24px", borderRadius: 12, fontSize: 14, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
                    Retake
                  </button>
                </div>
              </div>
            );
          })()}
        </GlowCard>
      </section>

      {/* ─── ROI SIMULATOR ─── */}
      <section id="simulator" style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <SectionTag text="ROI Simulator" />
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800 }}>Simulate Your Campaign</h2>
          <p style={{ color: COLORS.textMuted, fontSize: 15, marginTop: 8 }}>See projected results based on package + video needs</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          <GlowCard color={COLORS.primary}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: COLORS.cyan, marginBottom: 18, letterSpacing: 1 }}>⚙️ CONFIGURE</h4>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 14, color: COLORS.textMuted }}>Package</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: COLORS.orange }}>{roiPkg.name} — RM{roiPkg.monthly}/mo</span>
              </div>
              <input type="range" className="range-slider" min={0} max={3} step={1} value={roiBudget} onChange={(e) => { setRoiBudget(Number(e.target.value)); setRoiVideos(0); }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                {PACKAGES.map((p, i) => (
                  <button key={p.name} onClick={() => { setRoiBudget(i); setRoiVideos(0); }}
                    style={{ background: roiBudget === i ? COLORS.orange + "20" : "transparent", border: `1px solid ${roiBudget === i ? COLORS.orange : COLORS.darkBorder}`, color: roiBudget === i ? COLORS.orange : COLORS.textMuted, padding: "3px 8px", borderRadius: 6, fontSize: 10, cursor: "pointer", fontWeight: 600, fontFamily: "'Outfit',sans-serif" }}>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
            {roiPkg.video && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 14, color: COLORS.textMuted }}>Videos</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: COLORS.cyan }}>{roiVideos}</span>
                </div>
                <input type="range" className="range-slider" min={0} max={Math.floor(roiPkg.credits / 680)} step={1} value={roiVideos} onChange={(e) => setRoiVideos(Number(e.target.value))} />
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>Each video = 680 ad credits</div>
              </div>
            )}
            {!roiPkg.video && <p style={{ fontSize: 13, color: COLORS.textMuted, fontStyle: "italic" }}>Video not available on Standard. Upgrade for video content.</p>}
            <div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 6 }}>Credit Allocation</div>
              <div style={{ height: 16, borderRadius: 8, background: COLORS.darkBorder, overflow: "hidden", display: "flex" }}>
                {videoCost > 0 && <div style={{ width: `${(videoCost / roiPkg.credits) * 100}%`, background: "linear-gradient(90deg, #E11D48, #F43F5E)", transition: "width 0.4s" }} />}
                <div style={{ width: `${(remaining / roiPkg.credits) * 100}%`, background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.cyan})`, transition: "width 0.4s" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 11, color: COLORS.textMuted }}>
                <span>🎬 Video: {videoCost}</span>
                <span>📢 Ads: {remaining}</span>
              </div>
            </div>
          </GlowCard>

          <GlowCard color={COLORS.orange}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: COLORS.orange, marginBottom: 18, letterSpacing: 1 }}>📊 PROJECTED RESULTS</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                ["Total Credits", roiPkg.credits.toLocaleString(), COLORS.cyan],
                ["For Ads", remaining.toLocaleString(), remaining > 0 ? "#4ADE80" : "#EF4444"],
                ["Est. Impressions", estReach.toLocaleString(), COLORS.primary],
                ["Est. Clicks", estClicks.toLocaleString(), COLORS.orange],
                ["Est. Leads", estLeads.toLocaleString(), "#A855F7"],
                ["Max Videos", roiPkg.video ? Math.floor(roiPkg.credits / 680).toString() : "N/A", "#F59E0B"],
              ].map(([label, val, col]) => (
                <div key={label} style={{ padding: 12, background: COLORS.dark, borderRadius: 10, border: `1px solid ${COLORS.darkBorder}` }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: col }}>{val}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
            {remaining === 0 && roiPkg.video && (
              <div style={{ marginTop: 14, padding: 10, borderRadius: 8, background: "#EF444412", border: "1px solid #EF444425", fontSize: 12, color: "#FCA5A5" }}>
                ⚠️ All credits used for videos. Consider upgrading for ad budget.
              </div>
            )}
            <WhatsAppBtn
              text="Discuss This Plan"
              msg={`Hi! I used the ROI Simulator and I'm looking at the *${roiPkg.name} Pack* (RM${roiPkg.monthly}/mo) with ${roiVideos} video(s). Estimated ${estLeads} leads. Can we discuss?`}
              small={true}
              style={{ width: "100%", justifyContent: "center", marginTop: 16 }}
            />
          </GlowCard>
        </div>
      </section>

      {/* ─── STORIES ─── */}
      <section id="stories" style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <SectionTag text="Success Stories" />
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800 }}>Real Results from Real Businesses</h2>
          <p style={{ color: COLORS.textMuted, fontSize: 15, marginTop: 8 }}>See what DMS can do for businesses like yours</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
          {STORIES.map((s) => (
            <GlowCard key={s.title} color={s.color}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, background: s.color + "15", color: s.color, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>{s.tag.toUpperCase()}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{s.title}</h3>
              <div style={{ fontSize: 13, color: "#EF4444", marginBottom: 6 }}>❌ Before: <span style={{ color: COLORS.textMuted }}>{s.before}</span></div>
              <div style={{ fontSize: 13, color: "#4ADE80" }}>✅ After: <span style={{ color: COLORS.text }}>{s.after}</span></div>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* ─── OTHER SOLUTIONS (EXPANDABLE) ─── */}
      <section id="solutions" style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <SectionTag text="Full Ecosystem" />
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800 }}>More Unifi Business Solutions</h2>
          <p style={{ color: COLORS.textMuted, fontSize: 15, marginTop: 8 }}>Connectivity, digital tools, entertainment & financial bundles</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SOLUTIONS.map((cat, idx) => (
            <div key={cat.cat} style={{ border: `1px solid ${COLORS.darkBorder}`, borderRadius: 14, overflow: "hidden", background: COLORS.darkCard }}>
              <button onClick={() => setExpandedSol(expandedSol === idx ? null : idx)}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "none", border: "none", color: COLORS.text, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
                <span>{cat.cat}</span>
                <span style={{ color: COLORS.orange, fontSize: 14, transition: "transform 0.3s", transform: expandedSol === idx ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
              </button>
              {expandedSol === idx && (
                <div style={{ padding: "0 16px 16px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, animation: "slideUp 0.3s ease" }}>
                  {cat.items.map((item) => (
                    <div key={item.name} style={{ padding: "14px 16px", borderRadius: 10, background: COLORS.dark, border: `1px solid ${COLORS.darkBorder}` }}>
                      <span style={{ fontSize: 22 }}>{item.icon}</span>
                      <div style={{ fontWeight: 600, fontSize: 13, marginTop: 6, marginBottom: 2 }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 6 }}>{item.desc}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.orange }}>{item.price}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: "80px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, ${COLORS.primary}12 0%, transparent 60%)` }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 550, margin: "0 auto" }}>
          <div style={{ fontSize: 48, marginBottom: 14 }}>🚀</div>
          <h2 style={{ fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 900, marginBottom: 14 }}>
            Ready to <span style={{ color: COLORS.orange }}>Grow</span>?
          </h2>
          <p style={{ color: COLORS.textMuted, fontSize: 16, marginBottom: 28, lineHeight: 1.7 }}>
            Start from RM100/month. Your dedicated marketing team is one message away.
          </p>
          <WhatsAppBtn
            text="Start My Campaign Now"
            msg="Hi! I'd like to get started with Unifi Digital Marketing Solution. What's the next step?"
            style={{ animation: "glow 2s infinite", fontSize: 18, padding: "16px 36px" }}
          />
          <div style={{ marginTop: 16, fontSize: 12, color: COLORS.textMuted }}>
            Valid SSM registration required • 12-month subscription • No hidden fees
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ padding: "28px 24px", borderTop: `1px solid ${COLORS.darkBorder}`, textAlign: "center" }}>
        <img src="/unifi-biz-logo.webp" alt="Unifi Business" style={{ height: 32, marginBottom: 10, filter: "brightness(1.2)" }} />
        <p style={{ fontSize: 12, color: COLORS.textMuted }}>Unifi Digital Marketing Solution — Authorized Reseller</p>
        <p style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 6 }}>Prices exclude 6% SST • Ad credits non-transferable • Campaign languages: BM & English</p>
      </footer>
    </div>
  );
}
