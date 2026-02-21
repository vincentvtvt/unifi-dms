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

const PACKAGES = [
  { name: "Standard", monthly: 100, credits: 840, color: "#88E8FF", icon: "⚡" },
  { name: "Premium", monthly: 200, credits: 1680, color: "#005CB9", icon: "🚀" },
  { name: "Pro", monthly: 500, credits: 4200, color: "#FF6B00", icon: "🔥", popular: true },
  { name: "Enterprise", monthly: 900, credits: 7560, color: "#FF3D00", icon: "💎" },
];

const PLATFORMS = [
  { name: "Facebook & Instagram", icon: "📱", desc: "Social media reach" },
  { name: "Google Ads", icon: "🔍", desc: "Search visibility" },
  { name: "TikTok", icon: "🎵", desc: "Video engagement" },
  { name: "Rev Media", icon: "📰", desc: "Premium publishers" },
];

const SOLUTIONS = [
  { cat: "Connectivity", items: [
    { name: "Business Fibre", price: "From RM99/mo", desc: "Up to 2Gbps speed", icon: "🌐" },
    { name: "UNI5G Business Mobile", price: "From RM49/mo", desc: "Unlimited 5G data", icon: "📶" },
    { name: "Unifi Air Biz", price: "From RM99/mo", desc: "Wireless 5G plug-and-play", icon: "📡" },
    { name: "FTTR (Fibre-to-Room)", price: "RM319/mo", desc: "1Gbps every room", icon: "🏢" },
    { name: "SMART Internet", price: "Contact us", desc: "Built-in content control", icon: "🛡" },
  ]},
  { cat: "Digital Solutions", items: [
    { name: "eCommerce Hub", price: "From RM49/mo", desc: "Manage all online stores", icon: "🛒" },
    { name: "Cloud Storage", price: "From RM9/mo", desc: "Secure local hosting", icon: "☁️" },
    { name: "Kaspersky Security", price: "From RM30/mo", desc: "Business cyber protection", icon: "🔒" },
    { name: "Go Bookit", price: "From RM3.30/day", desc: "Appointment scheduling", icon: "📅" },
    { name: "Cari @ Unifi", price: "FREE", desc: "Business marketplace listing", icon: "📍" },
    { name: "Rtist Platform", price: "Contact us", desc: "18,000+ creative talents", icon: "🎨" },
  ]},
  { cat: "Entertainment", items: [
    { name: "Hospitality TV", price: "Contact us", desc: "In-room entertainment", icon: "📺" },
    { name: "Biz Fun Pack", price: "RM70/mo", desc: "20 premium channels", icon: "🎬" },
  ]},
  { cat: "Bundled Programmes", items: [
    { name: "Go Niaga + Maybank", price: "Bundle pricing", desc: "Mobile + digital banking", icon: "🏦" },
    { name: "IMPAK BIZ", price: "FREE assessment", desc: "Digital maturity tool", icon: "📊" },
  ]},
];

const QUIZ_QUESTIONS = [
  {
    q: "What's your primary business goal?",
    opts: [
      { label: "Build brand awareness", score: [2, 1, 0, 0] },
      { label: "Generate leads & sales", score: [0, 1, 2, 1] },
      { label: "Dominate my market", score: [0, 0, 1, 2] },
      { label: "Scale nationally", score: [0, 0, 0, 3] },
    ],
  },
  {
    q: "How many platforms do you want to advertise on?",
    opts: [
      { label: "Just 1 platform", score: [3, 1, 0, 0] },
      { label: "2 platforms", score: [0, 3, 1, 0] },
      { label: "3-4 platforms", score: [0, 0, 3, 1] },
      { label: "All of them!", score: [0, 0, 1, 3] },
    ],
  },
  {
    q: "Do you need video content for your campaigns?",
    opts: [
      { label: "No, images are fine", score: [3, 2, 0, 0] },
      { label: "Maybe 1 video", score: [0, 2, 2, 0] },
      { label: "2-3 videos", score: [0, 0, 3, 1] },
      { label: "Full video strategy", score: [0, 0, 0, 3] },
    ],
  },
  {
    q: "What's your comfort level with marketing budgets?",
    opts: [
      { label: "Keep it minimal", score: [3, 1, 0, 0] },
      { label: "Moderate investment", score: [0, 3, 1, 0] },
      { label: "Ready to invest seriously", score: [0, 0, 3, 1] },
      { label: "Go big or go home", score: [0, 0, 1, 3] },
    ],
  },
];

// ─── PARTICLES BACKGROUND ───
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

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 0.5,
        color: Math.random() > 0.5 ? COLORS.cyan : COLORS.primary,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "60";
        ctx.fill();
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x, dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = COLORS.primary + Math.floor((1 - dist / 120) * 40).toString(16).padStart(2, "0");
            ctx.lineWidth = 0.5;
            ctx.stroke();
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

// ─── ANIMATED COUNTER ───
const AnimNum = ({ target, prefix = "", suffix = "", duration = 1500 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setVal(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        tick();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
};

// ─── GLOW CARD ───
const GlowCard = ({ children, color = COLORS.primary, className = "", style = {} }) => (
  <div
    className={className}
    style={{
      background: COLORS.darkCard,
      border: `1px solid ${color}30`,
      borderRadius: 16,
      padding: 24,
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s ease",
      ...style,
    }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = color + "80"; e.currentTarget.style.boxShadow = `0 0 30px ${color}20`; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = color + "30"; e.currentTarget.style.boxShadow = "none"; }}
  >
    <div style={{ position: "absolute", top: -60, right: -60, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${color}10 0%, transparent 70%)` }} />
    {children}
  </div>
);

// ─── SECTION HEADER ───
const SectionHeader = ({ tag, title, subtitle }) => (
  <div style={{ textAlign: "center", marginBottom: 48 }}>
    {tag && (
      <div style={{
        display: "inline-block",
        padding: "6px 16px",
        borderRadius: 20,
        border: `1px solid ${COLORS.orange}50`,
        color: COLORS.orange,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: 2,
        textTransform: "uppercase",
        marginBottom: 16,
        background: COLORS.orange + "10",
      }}>
        {tag}
      </div>
    )}
    <h2 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 800, color: COLORS.text, lineHeight: 1.2, margin: 0 }}>{title}</h2>
    {subtitle && <p style={{ color: COLORS.textMuted, fontSize: 17, marginTop: 12, maxWidth: 600, margin: "12px auto 0" }}>{subtitle}</p>}
  </div>
);

// ─── MAIN APP ───
export default function UnifiDMSSite() {
  const [quizStep, setQuizStep] = useState(-1);
  const [quizScores, setQuizScores] = useState([0, 0, 0, 0]);
  const [quizResult, setQuizResult] = useState(null);
  const [roiBudget, setRoiBudget] = useState(200);
  const [roiVideos, setRoiVideos] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [typedText, setTypedText] = useState("");
  const heroText = "Your AI-Powered Growth Engine";

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(heroText.slice(0, i + 1));
      i++;
      if (i >= heroText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Quiz logic
  const handleQuizAnswer = (scoreArr) => {
    const newScores = quizScores.map((s, i) => s + scoreArr[i]);
    setQuizScores(newScores);
    if (quizStep + 1 >= QUIZ_QUESTIONS.length) {
      const maxIdx = newScores.indexOf(Math.max(...newScores));
      setQuizResult(maxIdx);
    } else {
      setQuizStep(quizStep + 1);
    }
  };

  // ROI calculations
  const roiPkg = PACKAGES.find((p) => p.monthly === roiBudget) || PACKAGES[1];
  const videoCost = roiVideos * 680;
  const remainingCredits = Math.max(0, roiPkg.credits - videoCost);
  const estImpressions = remainingCredits * 120;
  const estClicks = Math.round(remainingCredits * 3.5);
  const estLeads = Math.round(remainingCredits * 0.15);

  const scrollStyle = {
    scrollBehavior: "smooth",
    fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
    background: COLORS.dark,
    color: COLORS.text,
    minHeight: "100vh",
  };

  return (
    <div style={scrollStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Outfit', sans-serif; }
        ::selection { background: ${COLORS.orange}40; color: white; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.dark}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.primary}60; border-radius: 3px; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px ${COLORS.orange}20; } 50% { box-shadow: 0 0 40px ${COLORS.orange}40; } }
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .fade-in { animation: slideUp 0.6s ease forwards; }
        .btn-primary {
          background: linear-gradient(135deg, ${COLORS.orange}, #FF8C00);
          color: white; border: none; padding: 14px 32px; border-radius: 12px;
          font-size: 16px; font-weight: 600; cursor: pointer;
          transition: all 0.3s ease; position: relative; overflow: hidden;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px ${COLORS.orange}40; }
        .btn-secondary {
          background: transparent; color: ${COLORS.cyan}; border: 1px solid ${COLORS.cyan}40;
          padding: 14px 32px; border-radius: 12px; font-size: 16px; font-weight: 600;
          cursor: pointer; transition: all 0.3s ease;
        }
        .btn-secondary:hover { background: ${COLORS.cyan}10; border-color: ${COLORS.cyan}; }
        .quiz-opt {
          background: ${COLORS.darkCard}; border: 1px solid ${COLORS.darkBorder};
          padding: 16px 20px; border-radius: 12px; cursor: pointer;
          transition: all 0.2s ease; color: ${COLORS.text}; text-align: left;
          font-size: 15px; width: 100%;
        }
        .quiz-opt:hover { border-color: ${COLORS.orange}; background: ${COLORS.orange}10; transform: translateX(4px); }
        .range-slider {
          -webkit-appearance: none; width: 100%; height: 6px;
          border-radius: 3px; outline: none; cursor: pointer;
          background: linear-gradient(to right, ${COLORS.primary}, ${COLORS.orange});
        }
        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none; width: 22px; height: 22px;
          border-radius: 50%; background: ${COLORS.orange};
          border: 3px solid ${COLORS.dark}; box-shadow: 0 0 10px ${COLORS.orange}60;
        }
        .nav-link { color: ${COLORS.textMuted}; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; padding: 8px 16px; border-radius: 8px; cursor: pointer; border: none; background: none; }
        .nav-link:hover { color: ${COLORS.orange}; }
      `}</style>

      {/* ─── NAVBAR ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: COLORS.dark + "E8", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${COLORS.darkBorder}50`,
        padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.primary})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, color: "white" }}>U</div>
          <span style={{ fontWeight: 700, fontSize: 18, color: COLORS.text }}>unifi <span style={{ color: COLORS.orange }}>DMS</span></span>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {["AI Advisor", "Simulator", "Packages", "Solutions"].map((s) => (
            <button key={s} className="nav-link" onClick={() => document.getElementById(s.toLowerCase().replace(" ", "-"))?.scrollIntoView({ behavior: "smooth" })}>{s}</button>
          ))}
          <button className="btn-primary" style={{ padding: "8px 20px", fontSize: 13, borderRadius: 8 }}>Get Started</button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px 60px", overflow: "hidden" }}>
        <ParticleField />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 50%, ${COLORS.primary}15 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, ${COLORS.orange}10 0%, transparent 50%)` }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 800, width: "100%" }} className="fade-in">
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 18px", borderRadius: 20,
            border: `1px solid ${COLORS.cyan}30`, background: COLORS.cyan + "08",
            marginBottom: 24, fontSize: 13, color: COLORS.cyan, fontWeight: 500,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.cyan, animation: "pulse 2s infinite" }} />
            AI-Powered Marketing Intelligence
          </div>
          <h1 style={{ fontSize: "clamp(36px, 7vw, 64px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, color: COLORS.text }}>
            {typedText}<span style={{ animation: "pulse 1s infinite", color: COLORS.orange }}>|</span>
          </h1>
          <p style={{ fontSize: "clamp(16px, 2.5vw, 20px)", color: COLORS.textMuted, maxWidth: 600, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Unifi Digital Marketing Solution — Malaysia's first instalment-based marketing plan. 
            Let AI find your perfect package, simulate your ROI, and launch campaigns across Facebook, Google, TikTok & more.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => { setQuizStep(0); setQuizScores([0,0,0,0]); setQuizResult(null); document.getElementById("ai-advisor")?.scrollIntoView({ behavior: "smooth" }); }}>
              🤖 Find My Package
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" })}>
              📊 Simulate ROI
            </button>
          </div>
          {/* Stats bar */}
          <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 60, flexWrap: "wrap" }}>
            {[
              { label: "Ad Platforms", val: "4+", color: COLORS.cyan },
              { label: "Max Ad Credits", val: "7,560", color: COLORS.orange },
              { label: "Starting From", val: "RM100/mo", color: COLORS.primary },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI ADVISOR ─── */}
      <section id="ai-advisor" style={{ padding: "80px 24px", maxWidth: 700, margin: "0 auto" }}>
        <SectionHeader tag="AI Advisor" title="Let AI Find Your Perfect Package" subtitle="Answer 4 quick questions and our AI engine will recommend the ideal DMS tier for your business" />
        
        <GlowCard color={COLORS.orange} style={{ minHeight: 300 }}>
          {/* Scan line effect */}
          <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${COLORS.cyan}40, transparent)`, animation: "scan 3s linear infinite", pointerEvents: "none" }} />
          
          {quizStep === -1 && !quizResult && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16, animation: "float 3s ease-in-out infinite" }}>🤖</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Ready for your AI Consultation?</h3>
              <p style={{ color: COLORS.textMuted, marginBottom: 24 }}>4 questions. 30 seconds. Your perfect package revealed.</p>
              <button className="btn-primary" onClick={() => setQuizStep(0)}>Start Analysis</button>
            </div>
          )}

          {quizStep >= 0 && !quizResult && (
            <div>
              <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
                {QUIZ_QUESTIONS.map((_, i) => (
                  <div key={i} style={{
                    flex: 1, height: 4, borderRadius: 2,
                    background: i <= quizStep ? COLORS.orange : COLORS.darkBorder,
                    transition: "background 0.3s",
                  }} />
                ))}
              </div>
              <div style={{ fontSize: 12, color: COLORS.orange, fontWeight: 600, marginBottom: 8 }}>
                QUESTION {quizStep + 1} OF {QUIZ_QUESTIONS.length}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>{QUIZ_QUESTIONS[quizStep].q}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {QUIZ_QUESTIONS[quizStep].opts.map((opt, i) => (
                  <button key={i} className="quiz-opt" onClick={() => handleQuizAnswer(opt.score)}>
                    <span style={{ color: COLORS.orange, marginRight: 10, fontWeight: 700 }}>0{i + 1}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {quizResult !== null && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 14, color: COLORS.cyan, fontWeight: 600, marginBottom: 8, letterSpacing: 1 }}>⚡ ANALYSIS COMPLETE</div>
              <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
                <span style={{ color: PACKAGES[quizResult].color }}>{PACKAGES[quizResult].icon} {PACKAGES[quizResult].name}</span> Package
              </h3>
              <p style={{ color: COLORS.textMuted, marginBottom: 20 }}>Based on your goals, this is your optimal tier.</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 24, flexWrap: "wrap" }}>
                <div><div style={{ fontSize: 24, fontWeight: 800, color: COLORS.orange }}>RM{PACKAGES[quizResult].monthly}</div><div style={{ fontSize: 12, color: COLORS.textMuted }}>/month</div></div>
                <div><div style={{ fontSize: 24, fontWeight: 800, color: COLORS.cyan }}>{PACKAGES[quizResult].credits.toLocaleString()}</div><div style={{ fontSize: 12, color: COLORS.textMuted }}>Ad Credits</div></div>
                <div><div style={{ fontSize: 24, fontWeight: 800, color: "#4ADE80" }}>{Math.floor(PACKAGES[quizResult].credits / 680)}</div><div style={{ fontSize: 12, color: COLORS.textMuted }}>Videos Possible</div></div>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="btn-primary">Subscribe Now</button>
                <button className="btn-secondary" onClick={() => { setQuizStep(-1); setQuizScores([0,0,0,0]); setQuizResult(null); }}>Retake Quiz</button>
              </div>
            </div>
          )}
        </GlowCard>
      </section>

      {/* ─── ROI SIMULATOR ─── */}
      <section id="simulator" style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader tag="ROI Simulator" title="Simulate Your Campaign Performance" subtitle="Adjust your budget and video needs to see projected results in real-time" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {/* Controls */}
          <GlowCard color={COLORS.primary}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: COLORS.cyan, marginBottom: 20, letterSpacing: 1 }}>⚙️ CONFIGURE</h4>
            
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 14, color: COLORS.textMuted }}>Monthly Package</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.orange }}>RM{roiBudget}</span>
              </div>
              <input type="range" className="range-slider" min={100} max={900} step={100}
                value={roiBudget}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  const snaps = [100, 200, 500, 900];
                  const closest = snaps.reduce((a, b) => Math.abs(b - v) < Math.abs(a - v) ? b : a);
                  setRoiBudget(closest);
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                {PACKAGES.map((p) => (
                  <button key={p.monthly} onClick={() => setRoiBudget(p.monthly)}
                    style={{
                      background: roiBudget === p.monthly ? COLORS.orange + "20" : "transparent",
                      border: `1px solid ${roiBudget === p.monthly ? COLORS.orange : COLORS.darkBorder}`,
                      color: roiBudget === p.monthly ? COLORS.orange : COLORS.textMuted,
                      padding: "4px 10px", borderRadius: 6, fontSize: 11, cursor: "pointer", fontWeight: 600,
                    }}>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 14, color: COLORS.textMuted }}>Videos Needed</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.cyan }}>{roiVideos}</span>
              </div>
              <input type="range" className="range-slider" min={0} max={Math.floor(roiPkg.credits / 680)} step={1}
                value={roiVideos} onChange={(e) => setRoiVideos(Number(e.target.value))} />
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 6 }}>
                Each video = 680 ad credits
              </div>
            </div>

            {/* Credit usage bar */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 8 }}>Credit Allocation</div>
              <div style={{ height: 20, borderRadius: 10, background: COLORS.darkBorder, overflow: "hidden", display: "flex" }}>
                <div style={{ width: `${(videoCost / roiPkg.credits) * 100}%`, background: `linear-gradient(90deg, #E11D48, #F43F5E)`, transition: "width 0.4s ease" }} />
                <div style={{ width: `${(remainingCredits / roiPkg.credits) * 100}%`, background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.cyan})`, transition: "width 0.4s ease" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: COLORS.textMuted }}>
                <span>🎬 Videos: {videoCost} credits</span>
                <span>📢 Ads: {remainingCredits} credits</span>
              </div>
            </div>
          </GlowCard>

          {/* Results */}
          <GlowCard color={COLORS.orange}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: COLORS.orange, marginBottom: 20, letterSpacing: 1 }}>📊 PROJECTED RESULTS</h4>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { label: "Total Ad Credits", value: roiPkg.credits.toLocaleString(), sub: "12-month campaign", color: COLORS.cyan },
                { label: "Remaining for Ads", value: remainingCredits.toLocaleString(), sub: `After ${roiVideos} video(s)`, color: remainingCredits > 0 ? "#4ADE80" : "#EF4444" },
                { label: "Est. Impressions", value: estImpressions.toLocaleString(), sub: "Projected reach", color: COLORS.primary },
                { label: "Est. Clicks", value: estClicks.toLocaleString(), sub: "Traffic to your business", color: COLORS.orange },
                { label: "Est. Leads", value: estLeads.toLocaleString(), sub: "Potential customers", color: "#A855F7" },
                { label: "Max Videos", value: Math.floor(roiPkg.credits / 680).toString(), sub: "If all credits used", color: "#F59E0B" },
              ].map((m) => (
                <div key={m.label} style={{ padding: 14, background: COLORS.dark, borderRadius: 12, border: `1px solid ${COLORS.darkBorder}` }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: m.color }}>{m.value}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text, marginTop: 4 }}>{m.label}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>{m.sub}</div>
                </div>
              ))}
            </div>

            {remainingCredits === 0 && (
              <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: "#EF444415", border: "1px solid #EF444430", fontSize: 13, color: "#FCA5A5" }}>
                ⚠️ All credits consumed by videos. Consider upgrading your package for ad budget.
              </div>
            )}
          </GlowCard>
        </div>
      </section>

      {/* ─── PACKAGES COMMAND CENTER ─── */}
      <section id="packages" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader tag="Command Center" title="Choose Your Mission Level" subtitle="4 tiers designed for every business stage — from starter to market dominator" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {PACKAGES.map((pkg) => (
            <GlowCard key={pkg.name} color={pkg.color} style={{
              border: pkg.popular ? `2px solid ${pkg.color}` : undefined,
              position: "relative",
            }}>
              {pkg.popular && (
                <div style={{
                  position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)",
                  background: pkg.color, color: "white", fontSize: 11, fontWeight: 700,
                  padding: "4px 16px", borderRadius: "0 0 8px 8px", letterSpacing: 1,
                }}>MOST POPULAR</div>
              )}
              <div style={{ textAlign: "center", padding: pkg.popular ? "12px 0 0" : "0" }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>{pkg.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: pkg.color }}>{pkg.name}</h3>
                <div style={{ fontSize: 36, fontWeight: 900, color: COLORS.text, margin: "12px 0 4px" }}>
                  RM{pkg.monthly}
                </div>
                <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 20 }}>/month × 12 months</div>

                <div style={{ background: COLORS.dark, borderRadius: 12, padding: 16, marginBottom: 16 }}>
                  {[
                    { label: "Ad Credits", value: pkg.credits.toLocaleString(), color: COLORS.cyan },
                    { label: "12-Month Total", value: `RM${(pkg.monthly * 12).toLocaleString()}`, color: COLORS.textMuted },
                    { label: "Mgmt Fee (30%)", value: `RM${(pkg.monthly * 12 - pkg.credits).toLocaleString()}`, color: "#F59E0B" },
                    { label: "Max Videos", value: Math.floor(pkg.credits / 680).toString(), color: "#A855F7" },
                  ].map((row) => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${COLORS.darkBorder}30` }}>
                      <span style={{ fontSize: 13, color: COLORS.textMuted }}>{row.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: row.color }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <button className="btn-primary" style={{
                  width: "100%", padding: "12px",
                  background: pkg.popular ? `linear-gradient(135deg, ${pkg.color}, #FF8C00)` : COLORS.darkBorder,
                  color: pkg.popular ? "white" : COLORS.text,
                }}>
                  Select {pkg.name}
                </button>
              </div>
            </GlowCard>
          ))}
        </div>

        {/* Platforms */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 40 }}>
          {PLATFORMS.map((p) => (
            <div key={p.name} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "16px 20px", borderRadius: 12,
              background: COLORS.darkCard, border: `1px solid ${COLORS.darkBorder}`,
            }}>
              <span style={{ fontSize: 28 }}>{p.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* What's included */}
        <GlowCard color={COLORS.primary} style={{ marginTop: 32 }}>
          <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: COLORS.cyan }}>✅ Included in All Packages</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {[
              "Dedicated ICDL-certified campaign manager",
              "Professional graphic designer",
              "Expert copywriter",
              "Marketing report & analysis",
              "Multi-platform ad placement",
              "12-month instalment plan",
            ].map((item) => (
              <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 14, color: COLORS.textMuted }}>
                <span style={{ color: "#4ADE80", fontWeight: 700, flexShrink: 0 }}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </GlowCard>
      </section>

      {/* ─── ALL SOLUTIONS ─── */}
      <section id="solutions" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader tag="Full Ecosystem" title="Complete Unifi Business Solutions" subtitle="Everything your business needs — connectivity, digital tools, entertainment and financial support" />

        {SOLUTIONS.map((cat) => (
          <div key={cat.cat} style={{ marginBottom: 40 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.orange, marginBottom: 16, paddingBottom: 8, borderBottom: `1px solid ${COLORS.darkBorder}` }}>
              {cat.cat}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
              {cat.items.map((item) => (
                <div key={item.name} style={{
                  padding: "16px 18px", borderRadius: 12,
                  background: COLORS.darkCard, border: `1px solid ${COLORS.darkBorder}`,
                  transition: "all 0.2s ease", cursor: "pointer",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.primary + "60"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.darkBorder; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>{item.desc}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.orange }}>{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: "80px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, ${COLORS.primary}15 0%, transparent 60%)` }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 900, marginBottom: 16 }}>
            Ready to <span style={{ color: COLORS.orange }}>Dominate</span> Your Market?
          </h2>
          <p style={{ color: COLORS.textMuted, fontSize: 17, marginBottom: 32, lineHeight: 1.7 }}>
            Start with as low as RM100/month. Get a dedicated team of experts running your campaigns across 4+ platforms.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ animation: "glow 2s infinite", fontSize: 18, padding: "16px 40px" }}>
              Start My Campaign
            </button>
          </div>
          <div style={{ marginTop: 20, fontSize: 13, color: COLORS.textMuted }}>
            Valid SSM registration required • 12-month minimum subscription • No hidden fees
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ padding: "32px 24px", borderTop: `1px solid ${COLORS.darkBorder}`, textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.primary})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: "white" }}>U</div>
          <span style={{ fontWeight: 700, fontSize: 15, color: COLORS.text }}>unifi <span style={{ color: COLORS.orange }}>Digital Marketing Solution</span></span>
        </div>
        <p style={{ fontSize: 12, color: COLORS.textMuted }}>
          A product by Unifi Business (TM Technology Services Sdn. Bhd.) • Authorized reseller site
        </p>
        <p style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 8 }}>
          Prices exclude 6% SST • Ad credits are non-transferable • Campaign languages: Bahasa Melayu & English
        </p>
      </footer>
    </div>
  );
}
