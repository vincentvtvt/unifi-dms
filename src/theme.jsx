import { useState, useEffect, createContext, useContext } from "react";

export const DARK = {
  bg:"#0A1628",card:"#111D33",border:"#1E303E",text:"#E8F0FE",muted:"#8BA3C7",primary:"#99B6FF",
  logo:"/ub-logo-white.png",navBg:"#0A1628E8",particleAlpha:"60",sub:"#0D1825",
};
export const LIGHT = {
  bg:"#F5F7FB",card:"#FFFFFF",border:"#E0E6EF",text:"#0A1628",muted:"#5A6A80",primary:"#1800E7",
  logo:"/ub-logo-blue.png",navBg:"#FFFFFFEA",particleAlpha:"35",sub:"#F0F3F8",
};
export const B = { orange:"#FF5E00", cyan:"#99B6FF" };
export const WA = "601113115950";
export const waL = (m) => `https://wa.me/${WA}?text=${encodeURIComponent(m)}`;

const ThemeCtx = createContext();
export const useTheme = () => useContext(ThemeCtx);

export function ThemeProvider({ children }) {
  const [dk,setDk] = useState(true);
  useEffect(()=>{
    const m=window.matchMedia("(prefers-color-scheme: dark)");
    setDk(m.matches);
    const h=e=>setDk(e.matches);
    m.addEventListener("change",h);
    return()=>m.removeEventListener("change",h);
  },[]);
  return <ThemeCtx.Provider value={dk?DARK:LIGHT}>{children}</ThemeCtx.Provider>;
}

export const Card = ({children,color,style={}}) => {
  const T = useTheme();
  const c = color || T.primary;
  return (
    <div style={{background:T.card,border:`1px solid ${c}20`,borderRadius:16,padding:24,position:"relative",overflow:"hidden",transition:"all 0.3s ease",...style}}
      onMouseEnter={e=>{e.currentTarget.style.borderColor=c+"60";e.currentTarget.style.boxShadow=`0 0 25px ${c}12`;e.currentTarget.style.transform="translateY(-2px)";}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor=c+"20";e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}
    >{children}</div>
  );
};

export const Tag = ({t}) => (
  <div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,border:`1px solid ${B.orange}35`,color:B.orange,fontSize:12,fontWeight:600,letterSpacing:2,textTransform:"uppercase",marginBottom:14,background:B.orange+"08"}}>{t}</div>
);

export const WaBtn = ({text,msg,style={},sm=false,ico=false}) => (
  <a href={waL(msg)} target="_blank" rel="noopener noreferrer"
    style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:ico?0:8,textDecoration:"none",background:"linear-gradient(135deg,#25D366,#128C7E)",color:"white",border:"none",padding:ico?"8px":sm?"10px 20px":"14px 32px",borderRadius:ico?10:12,fontSize:sm?13:16,fontWeight:600,cursor:"pointer",transition:"all 0.3s ease",boxShadow:"0 4px 15px #25D36630",minWidth:ico?38:undefined,minHeight:ico?38:undefined,...style}}
    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 25px #25D36650";}}
    onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 15px #25D36630";}}
  >{ico?<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>:<>💬 {text}</>}</a>
);

export const OBtn = ({text,onClick,style={}}) => (
  <button onClick={onClick} style={{background:"linear-gradient(135deg,#FF5E00,#FF8C00)",color:"white",border:"none",padding:"14px 32px",borderRadius:12,fontSize:16,fontWeight:600,cursor:"pointer",transition:"all 0.3s ease",fontFamily:"'Outfit',sans-serif",...style}}
    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 25px ${B.orange}40`;}}
    onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}
  >{text}</button>
);

export const Nav = () => {
  const T = useTheme();
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:T.navBg,backdropFilter:"blur(20px)",borderBottom:`1px solid ${T.border}40`,padding:"10px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <a href="/"><img src={T.logo} alt="Unifi Business" style={{height:36,cursor:"pointer"}} /></a>
      <WaBtn ico msg="Hi, I'm interested in Unifi Digital Marketing Solution. Please help me choose the right package." />
    </nav>
  );
};

export const Footer = () => {
  const T = useTheme();
  return (
    <footer style={{padding:"28px 24px",borderTop:`1px solid ${T.border}`,textAlign:"center"}}>
      <a href="/"><img src={T.logo} alt="Unifi Business" style={{height:32,marginBottom:10}} /></a>
      <p style={{fontSize:12,color:T.muted}}>Authorized Reseller: <span style={{fontWeight:600,color:T.text}}>Synergy Spark Sdn Bhd</span> (1221398-T)</p>
      <p style={{fontSize:11,color:T.muted,marginTop:4}}>Unifi Digital Marketing Solution</p>
      <p style={{fontSize:11,color:T.muted,marginTop:6}}>Prices exclude 6% SST • Ad credits non-transferable • BM & English</p>
    </footer>
  );
};

export const PageHero = ({icon,title,subtitle,tag}) => {
  const T = useTheme();
  return (
    <section style={{padding:"100px 24px 40px",textAlign:"center",maxWidth:700,margin:"0 auto"}}>
      <div style={{fontSize:48,marginBottom:12}}>{icon}</div>
      <Tag t={tag} />
      <h1 style={{fontSize:"clamp(28px,5vw,44px)",fontWeight:900,lineHeight:1.1,marginBottom:12}}>{title}</h1>
      <p style={{color:T.muted,fontSize:16,lineHeight:1.7}}>{subtitle}</p>
      <a href="/" style={{display:"inline-block",marginTop:16,color:T.primary,fontSize:13,fontWeight:600,textDecoration:"none"}}>← Back to Home</a>
    </section>
  );
};

export const PlanCard = ({plan,popular,color}) => {
  const T = useTheme();
  const c = color || B.orange;
  return (
    <Card color={c} style={{border:popular?`2px solid ${c}`:undefined,textAlign:"center",minWidth:200}}>
      {popular&&<div style={{position:"absolute",top:-1,left:"50%",transform:"translateX(-50%)",background:c,color:"white",fontSize:10,fontWeight:700,padding:"3px 14px",borderRadius:"0 0 8px 8px",letterSpacing:1}}>{popular}</div>}
      <div style={{paddingTop:popular?10:0}}>
        <h3 style={{fontSize:18,fontWeight:800,marginBottom:4}}>{plan.name}</h3>
        {plan.speed&&<div style={{fontSize:13,color:T.muted,marginBottom:8}}>{plan.speed}</div>}
        <div style={{fontSize:38,fontWeight:900,margin:"8px 0 2px"}}><span style={{fontSize:14,fontWeight:500,color:T.muted}}>RM</span>{plan.price}</div>
        <div style={{fontSize:12,color:T.muted,marginBottom:16}}>/month{plan.contract?` • ${plan.contract}`:""}</div>
        {plan.highlight&&<div style={{background:B.orange+"10",border:`1px solid ${B.orange}30`,borderRadius:8,padding:"8px 12px",marginBottom:14,fontSize:12,color:B.orange,fontWeight:600}}>{plan.highlight}</div>}
        <WaBtn text="I'm Interested" msg={`Hi, I'm interested in Unifi Business *${plan.name}*${plan.speed?` (${plan.speed})`:""} at RM${plan.price}/month. Please proceed with my subscription.`} sm style={{width:"100%",justifyContent:"center"}} />
      </div>
    </Card>
  );
};

export const SpecTable = ({specs,plans}) => {
  const T = useTheme();
  return (
    <div style={{overflowX:"auto",marginTop:32}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
        <thead>
          <tr style={{borderBottom:`2px solid ${T.border}`}}>
            <th style={{textAlign:"left",padding:"12px 16px",color:T.muted,fontWeight:600,minWidth:140}}>Feature</th>
            {plans.map(p=><th key={p.name} style={{textAlign:"center",padding:"12px 8px",color:T.text,fontWeight:700,minWidth:120}}>{p.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {specs.map((spec,i)=>(
            <tr key={spec.label} style={{borderBottom:`1px solid ${T.border}30`,background:i%2===0?T.sub:"transparent"}}>
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
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;font-family:'Outfit',sans-serif}
  ::selection{background:${B.orange}40;color:white}
  ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:${T.bg}}::-webkit-scrollbar-thumb{background:${T.primary}40;border-radius:3px}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
  @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes glow{0%,100%{box-shadow:0 0 20px #25D36620}50%{box-shadow:0 0 40px #25D36640}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes scan{0%{top:0}100%{top:100%}}
  .fade-in{animation:slideUp 0.6s ease forwards}
  a{text-decoration:none}
  body{margin:0;padding:0}
`;
