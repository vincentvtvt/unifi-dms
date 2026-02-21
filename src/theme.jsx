import { useState, useEffect, createContext, useContext } from "react";

export const LIGHT = {
  bg:"#FFFFFF",card:"#FFFFFF",border:"#E5E7EB",text:"#1A1A2E",muted:"#6B7280",
  primary:"#1800E7",accent:"#FF5E00",sub:"#F8F9FC",heroBg:"#F0F2FF",
  logo:"/ub-logo-blue.png",navBg:"rgba(255,255,255,0.95)",navShadow:"0 1px 3px rgba(0,0,0,0.06)",
};
export const DARK = {
  bg:"#0F1629",card:"#1A2240",border:"#2A3456",text:"#F0F2FF",muted:"#8B95B0",
  primary:"#99B6FF",accent:"#FF5E00",sub:"#141C33",heroBg:"#111B30",
  logo:"/ub-logo-white.png",navBg:"rgba(15,22,41,0.95)",navShadow:"0 1px 3px rgba(0,0,0,0.3)",
};
export const WA = "601113115950";
export const waL = (m) => `https://wa.me/${WA}?text=${encodeURIComponent(m)}`;

const ThemeCtx = createContext();
export const useTheme = () => useContext(ThemeCtx);
export const useToggleTheme = () => useContext(ThemeCtx).__toggle;

export function ThemeProvider({ children }) {
  const [dk,setDk] = useState(false);
  useEffect(()=>{
    const m=window.matchMedia("(prefers-color-scheme: dark)");
    setDk(m.matches);
    const h=e=>setDk(e.matches);
    m.addEventListener("change",h);
    return()=>m.removeEventListener("change",h);
  },[]);
  const val = dk ? { ...DARK, __toggle:()=>setDk(!dk), __dk:dk } : { ...LIGHT, __toggle:()=>setDk(!dk), __dk:dk };
  return <ThemeCtx.Provider value={val}>{children}</ThemeCtx.Provider>;
}

/* ─── SVG ICONS ─── */
export const Icons = {
  arrow: (c="#1800E7",s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  check: (c="#059669",s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>,
  x: (c="#DC2626",s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  play: (c="#FF5E00",s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M8 5v14l11-7z"/></svg>,
  star: (c="#F59E0B",s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  users: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  target: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  trending: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  shield: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  zap: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z"/></svg>,
  video: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="3" width="15" height="14" rx="2"/><polygon points="23 7 17 12 23 17 23 7"/></svg>,
  globe: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  chart: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="18" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="2" y="13" width="4" height="8"/></svg>,
  phone: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  cloud: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>,
  wifi: (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/></svg>,
  chevDown: (c,s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>,
  sun: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  moon: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
};

/* ─── PARTNER LOGOS as SVG ─── */
export const PartnerLogos = ({T}) => {
  const c = T.muted;
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:36,flexWrap:"wrap",opacity:0.6}}>
      {/* Facebook */}
      <svg width="100" height="24" viewBox="0 0 512 106" fill={c}><path d="M19.6 106V57.6H0V38.2h19.6V23c0-19 11.7-29.4 28.8-29.4 8.2 0 15.2.6 17.3.9v19.9h-11.8c-9.3 0-11.1 4.4-11.1 10.9v14h22.2l-2.9 19.4H42.8V106H19.6zm88.3-67.8c-18.5 0-33.5 15-33.5 33.5s15 33.5 33.5 33.5 33.5-15 33.5-33.5-15-33.5-33.5-33.5zm0 55.3c-12 0-21.8-9.8-21.8-21.8s9.8-21.8 21.8-21.8 21.8 9.8 21.8 21.8-9.8 21.8-21.8 21.8z"/><text x="160" y="80" fontFamily="sans-serif" fontSize="72" fontWeight="700">Facebook</text></svg>
      {/* Google */}
      <svg width="80" height="28" viewBox="0 0 272 92" fill={c}><text x="0" y="72" fontFamily="sans-serif" fontSize="78" fontWeight="500">Google</text></svg>
      {/* TikTok */}
      <svg width="72" height="22" viewBox="0 0 250 70" fill={c}><text x="0" y="56" fontFamily="sans-serif" fontSize="64" fontWeight="700">TikTok</text></svg>
      {/* Instagram */}
      <svg width="90" height="22" viewBox="0 0 320 70" fill={c}><text x="0" y="56" fontFamily="sans-serif" fontSize="60" fontWeight="500">Instagram</text></svg>
      {/* Rev Media */}
      <svg width="85" height="22" viewBox="0 0 300 70" fill={c}><text x="0" y="56" fontFamily="sans-serif" fontSize="58" fontWeight="600">Rev Media</text></svg>
    </div>
  );
};

/* ─── REUSABLE COMPONENTS ─── */
export const Card = ({children,color,style={},hover=true}) => {
  const T = useTheme();
  const c = color || T.border;
  return (
    <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:28,position:"relative",overflow:"hidden",transition:"all 0.25s ease",boxShadow:"0 1px 3px rgba(0,0,0,0.04)",...style}}
      onMouseEnter={hover?e=>{e.currentTarget.style.borderColor=c;e.currentTarget.style.boxShadow=`0 8px 30px rgba(0,0,0,0.08)`;e.currentTarget.style.transform="translateY(-3px)";}:undefined}
      onMouseLeave={hover?e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.04)";e.currentTarget.style.transform="translateY(0)";}:undefined}
    >{children}</div>
  );
};

export const SectionLabel = ({text}) => {
  const T = useTheme();
  return <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:8,background:T.primary+"0A",color:T.primary,fontSize:12,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:12}}><span style={{width:6,height:6,borderRadius:"50%",background:T.primary}} />{text}</div>;
};

export const WaBtn = ({text,msg,style={},sm=false}) => (
  <a href={waL(msg)} target="_blank" rel="noopener noreferrer"
    style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,textDecoration:"none",background:"#25D366",color:"white",border:"none",padding:sm?"10px 20px":"14px 28px",borderRadius:10,fontSize:sm?13:15,fontWeight:600,cursor:"pointer",transition:"all 0.25s ease",boxShadow:"0 2px 8px rgba(37,211,102,0.25)",...style}}
    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 6px 20px rgba(37,211,102,0.35)";}}
    onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 8px rgba(37,211,102,0.25)";}}
  ><svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>{text}</a>
);

export const PrimaryBtn = ({text,onClick,style={}}) => {
  const T = useTheme();
  return (
    <button onClick={onClick} style={{background:T.accent,color:"white",border:"none",padding:"14px 28px",borderRadius:10,fontSize:15,fontWeight:600,cursor:"pointer",transition:"all 0.25s ease",fontFamily:"'DM Sans',sans-serif",boxShadow:`0 2px 8px ${T.accent}30`,...style}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 6px 20px ${T.accent}40`;}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=`0 2px 8px ${T.accent}30`;}}
    >{text}</button>
  );
};

export const FloatingWA = () => (
  <a href={waL("Hi, I'm interested in Unifi Digital Marketing Solution. Please help me choose the right package.")} target="_blank" rel="noopener noreferrer"
    style={{position:"fixed",bottom:24,right:24,zIndex:999,width:56,height:56,borderRadius:28,background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(37,211,102,0.4)",transition:"all 0.3s ease",cursor:"pointer"}}
    onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.1)";e.currentTarget.style.boxShadow="0 6px 28px rgba(37,211,102,0.5)";}}
    onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 4px 20px rgba(37,211,102,0.4)";}}
  ><svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
);

export const Nav = () => {
  const T = useTheme();
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:T.navBg,backdropFilter:"blur(16px)",boxShadow:T.navShadow,padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",maxWidth:1200,margin:"0 auto",left:0,right:0}}>
      <a href="/" style={{display:"flex",alignItems:"center",gap:10}}>
        <img src={T.logo} alt="Unifi Business" style={{height:32}} />
      </a>
      <div style={{display:"flex",alignItems:"center",gap:16}}>
        <button onClick={T.__toggle} style={{background:"none",border:`1px solid ${T.border}`,borderRadius:8,padding:"6px 8px",cursor:"pointer",display:"flex",alignItems:"center",color:T.muted,transition:"all 0.2s"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=T.primary;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;}}
        >{T.__dk?Icons.sun():Icons.moon()}</button>
        <WaBtn text="Contact Us" msg="Hi, I'm interested in Unifi Digital Marketing Solution. Please help me choose the right package." sm />
      </div>
    </nav>
  );
};

export const Footer = () => {
  const T = useTheme();
  return (
    <footer style={{padding:"48px 24px 32px",borderTop:`1px solid ${T.border}`,background:T.sub,maxWidth:"100%"}}>
      <div style={{maxWidth:1000,margin:"0 auto",textAlign:"center"}}>
        <a href="/"><img src={T.logo} alt="Unifi Business" style={{height:28,marginBottom:16}} /></a>
        <div style={{display:"flex",justifyContent:"center",gap:24,marginBottom:16,flexWrap:"wrap",fontSize:13}}>
          <a href="/broadband" style={{color:T.muted,textDecoration:"none"}}>Broadband</a>
          <a href="/mobile" style={{color:T.muted,textDecoration:"none"}}>Mobile</a>
          <a href="/air-biz" style={{color:T.muted,textDecoration:"none"}}>Air Biz</a>
          <a href="/cloud-storage" style={{color:T.muted,textDecoration:"none"}}>Cloud Storage</a>
        </div>
        <p style={{fontSize:13,color:T.muted,fontWeight:600}}>Authorized Reseller: Synergy Spark Sdn Bhd (1221398-T)</p>
        <p style={{fontSize:11,color:T.muted,marginTop:8}}>Prices exclude 6% SST · Ad credits non-transferable · BM & English supported</p>
        <p style={{fontSize:11,color:T.muted,marginTop:4}}>TM, Unifi, and all related marks are trademarks of Telekom Malaysia Berhad.</p>
      </div>
    </footer>
  );
};

export const PageHero = ({icon,title,subtitle,tag}) => {
  const T = useTheme();
  return (
    <section style={{padding:"100px 24px 40px",textAlign:"center",maxWidth:700,margin:"0 auto"}}>
      <div style={{width:56,height:56,borderRadius:14,background:T.primary+"0D",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>{icon}</div>
      <SectionLabel text={tag} />
      <h1 style={{fontSize:"clamp(28px,5vw,42px)",fontWeight:800,lineHeight:1.15,marginBottom:12,color:T.text}}>{title}</h1>
      <p style={{color:T.muted,fontSize:16,lineHeight:1.7}}>{subtitle}</p>
      <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:16,color:T.primary,fontSize:13,fontWeight:600,textDecoration:"none"}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Back to Home
      </a>
    </section>
  );
};

export const PlanCard = ({plan,popular,color}) => {
  const T = useTheme();
  const c = color || T.accent;
  return (
    <Card color={c} style={{border:popular?`2px solid ${c}`:`1px solid ${T.border}`,textAlign:"center",minWidth:180}}>
      {popular&&<div style={{position:"absolute",top:0,left:0,right:0,background:c,color:"white",fontSize:11,fontWeight:700,padding:"5px 0",letterSpacing:0.5,textTransform:"uppercase"}}>{popular}</div>}
      <div style={{paddingTop:popular?16:0}}>
        <h3 style={{fontSize:17,fontWeight:700,marginBottom:4,color:T.text}}>{plan.name}</h3>
        {plan.speed&&<div style={{fontSize:12,color:T.muted,marginBottom:8}}>{plan.speed}</div>}
        <div style={{fontSize:36,fontWeight:800,margin:"8px 0 2px",color:T.text}}><span style={{fontSize:14,fontWeight:500,color:T.muted}}>RM</span>{plan.price}</div>
        <div style={{fontSize:12,color:T.muted,marginBottom:16}}>/month{plan.contract?` · ${plan.contract}`:""}</div>
        {plan.highlight&&!popular&&<div style={{background:T.accent+"0A",border:`1px solid ${T.accent}20`,borderRadius:8,padding:"6px 10px",marginBottom:12,fontSize:11,color:T.accent,fontWeight:600}}>{plan.highlight}</div>}
        <WaBtn text="I'm Interested" msg={`Hi, I'm interested in Unifi Business *${plan.name}*${plan.speed?` (${plan.speed})`:""} at RM${plan.price}/month. Please proceed with my subscription.`} sm style={{width:"100%",justifyContent:"center",fontSize:13}} />
      </div>
    </Card>
  );
};

export const SpecTable = ({specs,plans}) => {
  const T = useTheme();
  return (
    <div style={{overflowX:"auto",marginTop:20}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
        <thead>
          <tr style={{borderBottom:`2px solid ${T.border}`}}>
            <th style={{textAlign:"left",padding:"12px 16px",color:T.muted,fontWeight:600,minWidth:140}}>Feature</th>
            {plans.map(p=><th key={p.name} style={{textAlign:"center",padding:"12px 8px",color:T.text,fontWeight:700,minWidth:110}}>{p.speed||p.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {specs.map((spec,i)=>(
            <tr key={spec.label} style={{borderBottom:`1px solid ${T.border}40`,background:i%2===0?T.sub:"transparent"}}>
              <td style={{padding:"10px 16px",color:T.muted,fontWeight:500}}>{spec.label}</td>
              {spec.values.map((v,j)=>(
                <td key={j} style={{padding:"10px 8px",textAlign:"center",color:v==="✓"?"#059669":v==="✗"||v==="-"?T.muted:T.text,fontWeight:v==="✓"||v==="FREE"?700:400}}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const globalStyles = (T) => `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;font-family:'DM Sans',sans-serif}
  ::selection{background:${T.primary}20;color:${T.text}}
  ::-webkit-scrollbar{width:6px}
  ::-webkit-scrollbar-track{background:${T.bg}}
  ::-webkit-scrollbar-thumb{background:${T.border};border-radius:3px}
  ::-webkit-scrollbar-thumb:hover{background:${T.muted}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
  .fade-up{animation:fadeUp 0.6s ease forwards}
  .fade-up-d1{animation:fadeUp 0.6s ease 0.1s forwards;opacity:0}
  .fade-up-d2{animation:fadeUp 0.6s ease 0.2s forwards;opacity:0}
  .fade-up-d3{animation:fadeUp 0.6s ease 0.3s forwards;opacity:0}
  a{text-decoration:none}
  body{margin:0;padding:0;background:${T.bg};color:${T.text}}
  @media(max-width:768px){
    .hero-stats{flex-direction:column;gap:8px!important}
    .steps-grid{grid-template-columns:1fr!important}
  }
`;
