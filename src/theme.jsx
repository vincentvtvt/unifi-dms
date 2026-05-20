import { useState, useEffect, createContext, useContext } from "react";

export const LIGHT = {
  bg:"#FFFFFF",card:"#FFFFFF",border:"#E5E7EB",text:"#1A1A2E",muted:"#6B7280",
  primary:"#1800E7",accent:"#FF5E00",sub:"#F8F9FC",heroBg:"#F0F2FF",
  logo:"/ub-logo-blue.png",navBg:"rgba(255,255,255,0.95)",navShadow:"0 1px 3px rgba(0,0,0,0.06)",
  cardShadow:"0 1px 3px rgba(0,0,0,0.04)",cardHover:"0 8px 30px rgba(0,0,0,0.08)",
  floatShadow:"0 4px 20px rgba(0,0,0,0.1)",
};
/* ═══ WHATSAPP ROUND ROBIN ═══ */
const WA_NUMBERS = [
  "601113115950",  // Line 1 (main)
  "601155501315",  // Line 2 — REPLACE with real numbers
];
const getWA = () => WA_NUMBERS[Math.floor(Math.random() * WA_NUMBERS.length)];
export const WA = WA_NUMBERS[0];
export const waL = (m,utm="") => `https://wa.me/${getWA()}?text=${encodeURIComponent("Hi *UnifiBiz* "+m)}${utm?`&utm_source=unifibiz&utm_medium=${utm}`:""}`;

const ThemeCtx = createContext();
export const useTheme = () => useContext(ThemeCtx);

export function ThemeProvider({ children }) {
  return <ThemeCtx.Provider value={LIGHT}>{children}</ThemeCtx.Provider>;
}

/* ─── SVG ICONS ─── */
export const Icons = {
  arrow:(c="#1800E7",s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  check:(c="#059669",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>,
  x:(c="#DC2626",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  users:(c,s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  target:(c,s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  trending:(c,s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  shield:(c,s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  zap:(c,s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z"/></svg>,
  video:(c,s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="3" width="15" height="14" rx="2"/><polygon points="23 7 17 12 23 17 23 7"/></svg>,
  globe:(c,s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  chart:(c,s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="18" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="2" y="13" width="4" height="8"/></svg>,
  phone:(c,s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  cloud:(c,s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>,
  wifi:(c,s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/></svg>,
  home:(c,s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  building:(c,s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><rect x="4" y="2" width="16" height="20"/><path d="M9 22V12h6v10M8 6h.01M16 6h.01M8 10h.01M16 10h.01"/></svg>,
  megaphone:(c,s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  chevDown:(c,s=16)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>,
  map:(c,s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  clock:(c,s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  msg:(c,s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
  sun:(s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  moon:(s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
  menu:(c,s=22)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close:(c,s=22)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};
export const I = Icons; // alias

/* ─── REUSABLE ─── */
export const PartnerLogos = ({T}) => {
  const c=T.muted;
  return <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:32,flexWrap:"wrap",opacity:0.55}}>
    {["Facebook","Google Ads","TikTok","Instagram","Rev Media"].map(n=><span key={n} style={{fontSize:15,fontWeight:700,color:c,letterSpacing:"-0.02em",whiteSpace:"nowrap"}}>{n}</span>)}
  </div>;
};

export const Card = ({children,color,style={},hover=true}) => {
  const T=useTheme();const c=color||T.border;
  return <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:24,position:"relative",overflow:"hidden",transition:"all 0.25s ease",boxShadow:T.cardShadow,...style}}
    onMouseEnter={hover?e=>{e.currentTarget.style.borderColor=c;e.currentTarget.style.boxShadow=T.cardHover;e.currentTarget.style.transform="translateY(-3px)";}:undefined}
    onMouseLeave={hover?e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.boxShadow=T.cardShadow;e.currentTarget.style.transform="translateY(0)";}:undefined}
  >{children}</div>;
};
export const SectionLabel = ({text}) => {const T=useTheme();return<div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:8,background:T.primary+"0A",color:T.primary,fontSize:12,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:12}}><span style={{width:6,height:6,borderRadius:"50%",background:T.primary}}/>{text}</div>;};
export const WaBtn = ({text,msg,utm="",style={},sm=false}) => <a href={waL(msg,utm)} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,textDecoration:"none",background:"#25D366",color:"white",border:"none",padding:sm?"10px 18px":"14px 28px",borderRadius:10,fontSize:sm?13:15,fontWeight:600,cursor:"pointer",transition:"all 0.25s ease",boxShadow:"0 2px 8px rgba(37,211,102,0.25)",...style}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}><svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>{text}</a>;
export const PrimaryBtn = ({text,onClick,style={}}) => {const T=useTheme();return<button onClick={onClick} style={{background:T.accent,color:"white",border:"none",padding:"14px 28px",borderRadius:10,fontSize:15,fontWeight:600,cursor:"pointer",transition:"all 0.25s ease",fontFamily:"'DM Sans',sans-serif",boxShadow:`0 2px 8px ${T.accent}30`,...style}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}>{text}</button>;};

export const FloatingWA = () => <a href={waL("I want to know more about Unifi products.","sticky")} target="_blank" rel="noopener noreferrer" title="Chat with us" style={{position:"fixed",bottom:24,right:24,zIndex:999,width:56,height:56,borderRadius:28,background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(37,211,102,0.4)",cursor:"pointer",animation:"waPulse 3s infinite"}}><svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>;

const NAV_LINKS=[{l:"Home Fibre",h:"#solutions"},{l:"Business",h:"#solutions"},{l:"Mobile",h:"#solutions"},{l:"Marketing",h:"#dms-finder"},{l:"Coverage",h:"#coverage"}];
export const Nav = () => {
  const T=useTheme();const [open,setOpen]=useState(false);
  return <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:T.navBg,backdropFilter:"blur(16px)",boxShadow:T.navShadow,height:60}}>
    <div style={{maxWidth:1200,margin:"0 auto",padding:"0 20px",height:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <a href="/" style={{display:"flex",alignItems:"center"}}><img src={T.logo} alt="Unifi Business" style={{height:30}} /></a>
      <div className="nav-links" style={{display:"flex",alignItems:"center",gap:18}}>{NAV_LINKS.map(n=><a key={n.l} href={n.h} style={{color:T.muted,fontSize:13,fontWeight:500,textDecoration:"none",transition:"color 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.color=T.accent;}} onMouseLeave={e=>{e.currentTarget.style.color=T.muted;}}>{n.l}</a>)}</div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <WaBtn text="Contact" msg="I want to apply for a Unifi product." utm="nav" sm style={{fontSize:12,padding:"8px 14px"}} />
        <button className="nav-burger" onClick={()=>setOpen(!open)} style={{background:"none",border:"none",cursor:"pointer",display:"none",padding:4}}>{open?Icons.close(T.text):Icons.menu(T.text)}</button>
      </div>
    </div>
    {open&&<div style={{background:T.card,borderTop:`1px solid ${T.border}`,padding:16,display:"flex",flexDirection:"column",gap:12}}>{NAV_LINKS.map(n=><a key={n.l} href={n.h} onClick={()=>setOpen(false)} style={{color:T.text,fontSize:15,fontWeight:500,textDecoration:"none",padding:"8px 0"}}>{n.l}</a>)}</div>}
  </nav>;
};
export const Footer = () => {
  const T=useTheme();
  return <footer style={{padding:"48px 24px 28px",borderTop:`1px solid ${T.border}`,background:T.sub}}>
    <div style={{maxWidth:1000,margin:"0 auto",display:"flex",flexWrap:"wrap",gap:32,justifyContent:"space-between"}}>
      <div style={{minWidth:200}}><a href="/"><img src={T.logo} alt="Unifi Business" style={{height:26,marginBottom:10}} /></a><p style={{fontSize:12,color:T.muted}}>Your one-stop Unifi partner.<br/>All products. One WhatsApp.</p></div>
      <div style={{minWidth:160}}><div style={{fontSize:12,fontWeight:700,color:T.text,marginBottom:8}}>Products</div>{["Broadband","Mobile","Air Biz","Cloud Storage","DMS"].map(n=><a key={n} href={"/"+n.toLowerCase().replace(/\s/g,"-")} style={{display:"block",fontSize:12,color:T.muted,textDecoration:"none",padding:"3px 0"}}>{n}</a>)}</div>
      <div style={{minWidth:180}}><div style={{fontSize:12,fontWeight:700,color:T.text,marginBottom:8}}>Contact</div><p style={{fontSize:12,color:T.muted}}>WhatsApp: +60 11-1311 5950</p><p style={{fontSize:12,color:T.muted,marginTop:4}}>Available 24/7 via WhatsApp</p><p style={{fontSize:12,color:T.muted,marginTop:4}}>All 13 states + 3 FT</p></div>
    </div>
    <div style={{maxWidth:1000,margin:"24px auto 0",paddingTop:16,borderTop:`1px solid ${T.border}`,textAlign:"center"}}>
      <p style={{fontSize:12,color:T.muted,fontWeight:600}}>Authorized Reseller: Synergy Spark Sdn Bhd (SSM 1221398-T)</p>
      <p style={{fontSize:11,color:T.muted,marginTop:6}}>Prices exclude 6% SST · TM, Unifi are trademarks of Telekom Malaysia Berhad.</p>
    </div>
  </footer>;
};
export const PageHero = ({icon,title,subtitle,tag}) => {
  const T=useTheme();
  return <section style={{padding:"100px 24px 40px",textAlign:"center",maxWidth:700,margin:"0 auto"}}>
    <div style={{width:56,height:56,borderRadius:14,background:T.primary+"0D",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>{icon}</div>
    <SectionLabel text={tag} /><h1 style={{fontSize:"clamp(28px,5vw,42px)",fontWeight:800,lineHeight:1.15,marginBottom:12}}>{title}</h1>
    <p style={{color:T.muted,fontSize:16,lineHeight:1.7}}>{subtitle}</p>
    <a href="/" style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:16,color:T.primary,fontSize:13,fontWeight:600,textDecoration:"none"}}>{Icons.arrow(T.primary,14)} Back to Home</a>
  </section>;
};
export const PlanCard = ({plan,popular,color}) => {
  const T=useTheme();const c=color||T.accent;
  return <Card color={c} style={{border:popular?`2px solid ${c}`:`1px solid ${T.border}`,textAlign:"center",minWidth:160,padding:0,overflow:"hidden"}}>
    {popular&&<div style={{background:c,color:"white",fontSize:10,fontWeight:700,padding:"5px 0",letterSpacing:.5,textTransform:"uppercase"}}>{popular}</div>}
    <div style={{padding:18,paddingTop:popular?10:18}}>
      <h3 style={{fontSize:14,fontWeight:700}}>{plan.name}</h3>
      {plan.speed&&<div style={{fontSize:11,color:T.muted,marginTop:2}}>{plan.speed}</div>}
      <div style={{fontSize:32,fontWeight:800,margin:"6px 0 2px"}}><span style={{fontSize:12,color:T.muted}}>RM</span>{plan.price}</div>
      <div style={{fontSize:11,color:T.muted,marginBottom:12}}>/month</div>
      <WaBtn text="Apply" msg={`I want to apply for *${plan.name}*${plan.speed?` (${plan.speed})`:""} at RM${plan.price}/month.`} utm={`plan_${plan.name.replace(/\s/g,"_")}`} sm style={{width:"100%",justifyContent:"center",fontSize:11}} />
    </div>
  </Card>;
};
export const SpecTable = ({specs,plans}) => {
  const T=useTheme();
  return <div style={{overflowX:"auto",marginTop:16}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
    <thead><tr style={{borderBottom:`2px solid ${T.border}`}}><th style={{textAlign:"left",padding:"10px 12px",color:T.muted,fontWeight:600,minWidth:120}}>Feature</th>{plans.map(p=><th key={p.name} style={{textAlign:"center",padding:"10px 6px",color:T.text,fontWeight:700,minWidth:90}}>{p.speed||p.name}</th>)}</tr></thead>
    <tbody>{specs.map((s,i)=><tr key={s.label} style={{borderBottom:`1px solid ${T.border}40`,background:i%2===0?T.sub:"transparent"}}><td style={{padding:"8px 12px",color:T.muted,fontWeight:500}}>{s.label}</td>{s.values.map((v,j)=><td key={j} style={{padding:"8px 6px",textAlign:"center",color:v==="✓"?"#059669":v==="-"?T.muted:T.text,fontWeight:v==="✓"||v==="FREE"?700:400}}>{v}</td>)}</tr>)}</tbody>
  </table></div>;
};
export const globalStyles = (T) => `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;font-family:'DM Sans',sans-serif}
  ::selection{background:${T.primary}20;color:${T.text}}
  ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:${T.bg}}::-webkit-scrollbar-thumb{background:${T.border};border-radius:3px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes waPulse{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,0.4)}50%{box-shadow:0 4px 20px rgba(37,211,102,0.4),0 0 0 12px rgba(37,211,102,0.08)}}
  .fade-up{animation:fadeUp 0.6s ease forwards}
  .fade-up-d2{animation:fadeUp 0.6s ease 0.2s forwards;opacity:0}
  a{text-decoration:none}body{margin:0;padding:0;background:${T.bg};color:${T.text}}
  @media(max-width:768px){.nav-links{display:none!important}.nav-burger{display:flex!important}}
`;
