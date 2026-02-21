import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useTheme, ThemeProvider, B, Card, Tag, WaBtn, OBtn, Nav, Footer, waL, globalStyles } from "./theme";
import Broadband from "./pages/Broadband";
import AirBiz from "./pages/AirBiz";
import Mobile from "./pages/Mobile";
import CloudStorage from "./pages/CloudStorage";

const PKG = [
  { name:"Standard", label:"Awareness", mo:100, cr:840, color:"#4A90D9", icon:"⚡", camp:"1.5 - 2 months", plat:"Facebook, Google Ads, Instagram, TikTok", desc:"Perfect for businesses ready to scale their reach across multiple platforms.", team:["Dedicated Campaign Manager","Graphic Design","Copywriter","TikTok (Purely ad setting)"], vid:false },
  { name:"Premium", label:"Engagement", mo:200, cr:1680, color:"#5B8DEF", icon:"🚀", camp:"Up to 3 months", plat:"Facebook, Google Ads, TikTok, Rev Media", desc:"Ideal for building customer interaction and loyalty.", team:["Dedicated Campaign Manager","Graphic Design","Copywriter","Video as a service (680 ad credit)"], vid:true },
  { name:"Prime", label:"Sales Conversion", mo:450, cr:3500, color:"#FF5E00", icon:"🔥", camp:"5 - 6 months", plat:"Facebook, Google Ads, TikTok, Rev Media", desc:"Great for converting leads and boosting revenue.", team:["Dedicated Campaign Manager","Graphic Design","Copywriter","Video as a service (680 ad credit)"], vid:true },
  { name:"Pro", label:"2x Sales Conversion", mo:900, cr:7000, color:"#FF3D00", icon:"💎", pop:true, camp:"Up to 12 months", plat:"Facebook, Google Ads, TikTok, Rev Media", desc:"Double up the effectiveness of your campaign to maximise your returns.", team:["Dedicated Campaign Manager","Graphic Design","Copywriter","Video as a service (680 ad credit)"], vid:true },
];

const STORIES = [
  { icon:"🍜", title:"From Warung to Nationwide", bef:"A Kelantan food business only sold locally at Pasar Siti Khadijah.", aft:"Targeted Facebook & Instagram ads boosted sales by 49% in one campaign cycle.", tag:"Standard Pack", color:"#4A90D9" },
  { icon:"🏡", title:"Property Agent Goes Digital", bef:"Relied on walk-ins and word of mouth. Leads were slow.", aft:"Google Ads + TikTok video drove 3x more qualified leads. Closed 5 extra units in 3 months.", tag:"Prime Pack", color:B.orange },
  { icon:"🎨", title:"Sabah Artisan Goes Global", bef:"Rural craft business with zero online presence.", aft:"Expanded reach nationwide. Sales surged 165% across Facebook and Rev Media.", tag:"Premium Pack", color:"#99B6FF" },
  { icon:"🏢", title:"Service Company Dominates Search", bef:"Pest control only served northern states. Relied on flyers.", aft:"12-month Google + Facebook strategy doubled sales and expanded to new states.", tag:"Pro Pack", color:"#FF3D00" },
];

const SOLS = [
  { cat:"🌐 Connectivity", items:[
    { n:"Business Broadband", p:"From RM129/mo", d:"Up to 2Gbps, WiFi 6/7 mesh, free DECT phone", i:"🌐", link:"/broadband" },
    { n:"UNI5G Business Mobile", p:"From RM39/mo", d:"Unlimited 5G, free Samsung flagship smartphone", i:"📶", link:"/mobile" },
    { n:"Unifi Air Biz 5G", p:"From RM99/mo", d:"Wireless 5G, plug-and-play, free router", i:"📡", link:"/air-biz" },
  ]},
  { cat:"💡 Digital Solutions", items:[
    { n:"Cloud Storage", p:"From RM11/mo", d:"500GB-5TB, TM Tier-3 data centres, FREE plan available", i:"☁️", link:"/cloud-storage" },
    { n:"eCommerce Hub", p:"From RM49/mo", d:"Manage all online stores, built-in payment", i:"🛒" },
    { n:"Kaspersky Security", p:"From RM30/mo", d:"Ransomware, fraud & data theft protection", i:"🔒" },
    { n:"Go Bookit", p:"From RM3.30/day", d:"Self-service appointment scheduling", i:"📅" },
    { n:"Cari @ Unifi", p:"FREE", d:"Business marketplace listing", i:"📍" },
    { n:"Rtist Platform", p:"Contact us", d:"18,000+ verified creative talents", i:"🎨" },
  ]},
  { cat:"🎬 Entertainment & Bundles", items:[
    { n:"Hospitality TV", p:"Contact us", d:"Integrated entertainment for premises", i:"📺" },
    { n:"Biz Fun Pack", p:"RM70/mo", d:"20 premium channels", i:"🎬" },
    { n:"Go Niaga + Maybank", p:"Bundle pricing", d:"Mobile + QRPay + financing up to RM500K", i:"🏦" },
    { n:"IMPAK BIZ", p:"FREE", d:"Digital maturity assessment", i:"📊" },
  ]},
];

const QZ = [
  { q:"What's your primary business goal?", o:[{l:"Build brand awareness",s:[3,1,0,0]},{l:"Engage & build loyalty",s:[0,3,1,0]},{l:"Generate leads & sales",s:[0,0,3,1]},{l:"Dominate my market",s:[0,0,1,3]}] },
  { q:"Do you need video content?", o:[{l:"No, images are enough",s:[3,1,0,0]},{l:"Maybe 1 video",s:[0,3,1,0]},{l:"Yes, 2-3 videos",s:[0,0,3,1]},{l:"Full video strategy",s:[0,0,0,3]}] },
  { q:"How long should your campaign run?", o:[{l:"1-2 months test run",s:[3,1,0,0]},{l:"3 months",s:[0,3,1,0]},{l:"6 months serious push",s:[0,0,3,1]},{l:"Full year domination",s:[0,0,0,3]}] },
  { q:"What's your monthly comfort level?", o:[{l:"Under RM150",s:[3,1,0,0]},{l:"RM150 - RM300",s:[0,3,1,0]},{l:"RM300 - RM600",s:[0,0,3,1]},{l:"RM600+",s:[0,0,1,3]}] },
];

const Particles = () => {
  const T = useTheme();
  const ref = useRef(null);
  useEffect(()=>{
    const c=ref.current;if(!c) return;
    const ctx=c.getContext("2d");let id;let ps=[];
    const rs=()=>{c.width=c.offsetWidth;c.height=c.offsetHeight;};
    rs();window.addEventListener("resize",rs);
    for(let i=0;i<50;i++) ps.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-0.5)*0.4,vy:(Math.random()-0.5)*0.4,r:Math.random()*2+0.5,cl:Math.random()>0.5?B.cyan:T.primary});
    const dr=()=>{
      ctx.clearRect(0,0,c.width,c.height);
      ps.forEach((p,i)=>{
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0||p.x>c.width)p.vx*=-1;if(p.y<0||p.y>c.height)p.vy*=-1;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=p.cl+T.particleAlpha;ctx.fill();
        ps.slice(i+1).forEach(p2=>{const d=Math.sqrt((p.x-p2.x)**2+(p.y-p2.y)**2);if(d<100){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p2.x,p2.y);ctx.strokeStyle=T.primary+Math.floor((1-d/100)*20).toString(16).padStart(2,"0");ctx.lineWidth=0.5;ctx.stroke();}});
      });
      id=requestAnimationFrame(dr);
    };
    dr();
    return()=>{cancelAnimationFrame(id);window.removeEventListener("resize",rs);};
  },[T]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}} />;
};

function Home() {
  const T = useTheme();
  const navigate = useNavigate();
  const [qs,setQs]=useState(-1);
  const [sc,setSc]=useState([0,0,0,0]);
  const [qr,setQr]=useState(null);
  const [rb,setRb]=useState(1);
  const [rv,setRv]=useState(0);
  const [es,setEs]=useState(null);
  const [ep,setEp]=useState(null);
  const [tt,setTt]=useState("");
  const ht="Find Your Perfect Unifi Digital Marketing Package";

  useEffect(()=>{let i=0;const iv=setInterval(()=>{setTt(ht.slice(0,i+1));i++;if(i>=ht.length)clearInterval(iv);},50);return()=>clearInterval(iv);},[]);

  const qa=(s)=>{const n=sc.map((v,i)=>v+s[i]);setSc(n);if(qs+1>=QZ.length)setQr(n.indexOf(Math.max(...n)));else setQs(qs+1);};
  const rp=PKG[rb];const vc=rv*680;const rem=Math.max(0,rp.cr-vc);
  const scr=(id)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return (
    <>
      {/* HERO */}
      <section id="hero" style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px 24px 60px",overflow:"hidden"}}>
        <Particles />
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 30% 50%,${T.primary}0A 0%,transparent 60%),radial-gradient(ellipse at 70% 80%,${B.orange}06 0%,transparent 50%)`}} />
        <div style={{position:"relative",zIndex:1,textAlign:"center",maxWidth:780,width:"100%"}} className="fade-in">
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 18px",borderRadius:20,border:`1px solid ${B.cyan}30`,background:B.cyan+"08",marginBottom:24,fontSize:13,color:T.primary,fontWeight:500}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:T.primary,animation:"pulse 2s infinite"}} />
            Malaysia's First Instalment-Based Marketing Plan
          </div>
          <h1 style={{fontSize:"clamp(32px,6vw,56px)",fontWeight:900,lineHeight:1.1,marginBottom:20}}>{tt}<span style={{animation:"pulse 1s infinite",color:B.orange}}>|</span></h1>
          <p style={{fontSize:"clamp(15px,2.2vw,18px)",color:T.muted,maxWidth:580,margin:"0 auto 32px",lineHeight:1.7}}>
            Get a dedicated campaign manager, graphic designer & copywriter — running your ads across Facebook, Google, TikTok & Rev Media. Starting from just <span style={{color:B.orange,fontWeight:700}}>RM100/month</span>.
          </p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <OBtn text="🔍 Find My Package" onClick={()=>{setQs(0);setSc([0,0,0,0]);setQr(null);scr("advisor");}} />
            <WaBtn text="Talk to Us" msg="Hi, I'm interested in Unifi Digital Marketing Solution. I'd like to find out which package suits my business best." />
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:48,marginTop:56,flexWrap:"wrap"}}>
            {[{l:"Ad Platforms",v:"4+",c:T.primary},{l:"Max Ad Credits",v:"7,000",c:B.orange},{l:"From",v:"RM100/mo",c:T.primary},{l:"Campaign",v:"Up to 12mo",c:"#059669"}].map(s=>
              <div key={s.l} style={{textAlign:"center"}}><div style={{fontSize:26,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:12,color:T.muted,marginTop:4}}>{s.l}</div></div>
            )}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{padding:"60px 24px",maxWidth:900,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}><Tag t="How It Works" /><h2 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:800}}>3 Simple Steps to Launch</h2></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:20}}>
          {[{s:"01",i:"📋",t:"Choose Your Pack",d:"Pick from Standard to Pro based on your goals and budget. Pay monthly over 12 months."},{s:"02",i:"🎯",t:"We Handle Everything",d:"Your dedicated team creates strategy, designs, copy, and launches campaigns for you."},{s:"03",i:"📈",t:"Watch Results Flow",d:"Track performance through reports. Your campaign manager optimises for maximum results."}].map(s=>
            <Card key={s.s} color={T.primary}><div style={{fontSize:11,fontWeight:700,color:B.orange,marginBottom:8,letterSpacing:2}}>STEP {s.s}</div><div style={{fontSize:32,marginBottom:10}}>{s.i}</div><h3 style={{fontSize:18,fontWeight:700,marginBottom:8}}>{s.t}</h3><p style={{fontSize:14,color:T.muted,lineHeight:1.6}}>{s.d}</p></Card>
          )}
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" style={{padding:"80px 24px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}><Tag t="DMS Packages" /><h2 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:800}}>Choose Your Growth Plan</h2><p style={{color:T.muted,fontSize:15,marginTop:8}}>All plans include a dedicated team + 12-month instalment</p></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:18}}>
          {PKG.map((p,i)=>
            <Card key={p.name} color={p.color} style={{border:p.pop?`2px solid ${p.color}`:undefined}}>
              {p.pop&&<div style={{position:"absolute",top:-1,left:"50%",transform:"translateX(-50%)",background:p.color,color:"white",fontSize:10,fontWeight:700,padding:"3px 14px",borderRadius:"0 0 8px 8px",letterSpacing:1}}>MOST POPULAR</div>}
              <div style={{textAlign:"center",paddingTop:p.pop?10:0}}>
                <div style={{display:"inline-block",padding:"4px 12px",borderRadius:6,background:p.color+"12",color:p.color,fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:8}}>{p.label.toUpperCase()}</div>
                <h3 style={{fontSize:22,fontWeight:800}}>{p.name} Pack</h3>
                <div style={{fontSize:40,fontWeight:900,margin:"12px 0 2px"}}><span style={{fontSize:16,fontWeight:500,color:T.muted}}>RM</span>{p.mo}</div>
                <div style={{fontSize:13,color:T.muted,marginBottom:16}}>/month × 12 months</div>
                <div style={{background:T.sub,borderRadius:12,padding:14,marginBottom:14,textAlign:"left"}}>
                  {[["Ad Credits",p.cr.toLocaleString(),T.primary],["Campaign",p.camp,T.text],["Video",p.vid?"✅ Redeemable (680/video)":"❌ Not included",p.vid?"#059669":T.muted],["Max Videos",p.vid?Math.floor(p.cr/680).toString():"—","#7C3AED"]].map(([l,v,c])=>
                    <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${T.border}30`,fontSize:13}}><span style={{color:T.muted}}>{l}</span><span style={{fontWeight:600,color:c}}>{v}</span></div>
                  )}
                </div>
                <button onClick={()=>setEp(ep===i?null:i)} style={{background:"none",border:`1px solid ${T.border}`,color:T.muted,fontSize:12,padding:"6px 14px",borderRadius:8,cursor:"pointer",marginBottom:12,fontFamily:"'Outfit',sans-serif",transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=p.color;e.currentTarget.style.color=p.color;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.muted;}}
                >{ep===i?"Less ▲":"Details ▼"}</button>
                {ep===i&&<div style={{textAlign:"left",background:T.sub,borderRadius:10,padding:12,marginBottom:12,animation:"slideUp 0.3s ease"}}>
                  <div style={{fontSize:11,color:B.orange,fontWeight:600,marginBottom:6,letterSpacing:1}}>PLATFORMS</div>
                  <p style={{fontSize:13,color:T.muted,marginBottom:10}}>{p.plat}</p>
                  <div style={{fontSize:11,color:B.orange,fontWeight:600,marginBottom:6,letterSpacing:1}}>YOUR TEAM</div>
                  {p.team.map(e=><div key={e} style={{fontSize:12,color:T.muted,padding:"2px 0"}}>✓ {e}</div>)}
                </div>}
                <WaBtn text={`Get ${p.name}`} msg={`Hi, I'm interested in Unifi Digital Marketing Solution *${p.name} Pack* (RM${p.mo}/month, ${p.cr} ad credits, ${p.camp} campaign). Please proceed with my subscription.`} sm style={{width:"100%",justifyContent:"center"}} />
              </div>
            </Card>
          )}
        </div>
        <p style={{textAlign:"center",fontSize:12,color:T.muted,marginTop:16}}>* Prices exclude 6% SST • 30% management fee front-loaded • Languages: BM & English</p>
      </section>

      {/* SMART PACKAGE FINDER */}
      <section id="advisor" style={{padding:"80px 24px",maxWidth:650,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:32}}><Tag t="Smart Package Finder" /><h2 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:800}}>Not Sure Which Pack?</h2><p style={{color:T.muted,fontSize:15,marginTop:8}}>4 quick questions — we'll recommend the best fit</p></div>
        <Card color={B.orange}>
          <div style={{position:"absolute",left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${B.cyan}25,transparent)`,animation:"scan 3s linear infinite",pointerEvents:"none"}} />
          {qs===-1&&!qr&&<div style={{textAlign:"center",padding:"32px 0"}}><div style={{fontSize:48,marginBottom:12,animation:"float 3s ease-in-out infinite"}}>🤖</div><h3 style={{fontSize:20,fontWeight:700,marginBottom:10}}>Ready for a Quick Analysis?</h3><p style={{color:T.muted,marginBottom:20,fontSize:14}}>4 questions. 30 seconds. Your perfect package revealed.</p><OBtn text="Start Analysis" onClick={()=>setQs(0)} /></div>}
          {qs>=0&&!qr&&<div>
            <div style={{display:"flex",gap:4,marginBottom:20}}>{QZ.map((_,i)=><div key={i} style={{flex:1,height:4,borderRadius:2,background:i<=qs?B.orange:T.border,transition:"background 0.3s"}} />)}</div>
            <div style={{fontSize:11,color:B.orange,fontWeight:600,marginBottom:6,letterSpacing:1}}>QUESTION {qs+1}/{QZ.length}</div>
            <h3 style={{fontSize:18,fontWeight:700,marginBottom:16}}>{QZ[qs].q}</h3>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>{QZ[qs].o.map((o,i)=><button key={i} className="qo" onClick={()=>qa(o.s)}><span style={{color:B.orange,marginRight:10,fontWeight:700}}>0{i+1}</span>{o.l}</button>)}</div>
          </div>}
          {qr!==null&&(()=>{const p=PKG[qr];return(
            <div style={{textAlign:"center",padding:"16px 0"}}>
              <div style={{fontSize:13,color:T.primary,fontWeight:600,marginBottom:8,letterSpacing:1}}>⚡ PERFECT MATCH FOUND</div>
              <h3 style={{fontSize:26,fontWeight:800,marginBottom:4}}><span style={{color:p.color}}>{p.icon} {p.name} Pack</span></h3>
              <div style={{display:"inline-block",padding:"3px 12px",borderRadius:6,background:p.color+"12",color:p.color,fontSize:11,fontWeight:700,marginBottom:16}}>{p.label}</div>
              <p style={{color:T.muted,marginBottom:20,fontSize:14}}>{p.desc}</p>
              <div style={{display:"flex",justifyContent:"center",gap:28,marginBottom:24,flexWrap:"wrap"}}>
                <div><div style={{fontSize:22,fontWeight:800,color:B.orange}}>RM{p.mo}</div><div style={{fontSize:11,color:T.muted}}>/month</div></div>
                <div><div style={{fontSize:22,fontWeight:800,color:T.primary}}>{p.cr.toLocaleString()}</div><div style={{fontSize:11,color:T.muted}}>Ad Credits</div></div>
                <div><div style={{fontSize:22,fontWeight:800,color:"#059669"}}>{p.camp}</div><div style={{fontSize:11,color:T.muted}}>Campaign</div></div>
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                <WaBtn text={`Get ${p.name} Pack`} msg={`Hi, I'm interested in Unifi Digital Marketing Solution *${p.name} Pack* (RM${p.mo}/month, ${p.cr} ad credits). The Smart Package Finder recommended this package for my business. Please proceed with my subscription.`} />
                <button onClick={()=>{setQs(-1);setSc([0,0,0,0]);setQr(null);}} style={{background:"none",border:`1px solid ${T.border}`,color:T.muted,padding:"12px 24px",borderRadius:12,fontSize:14,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Retake</button>
              </div>
            </div>
          );})()}
        </Card>
      </section>

      {/* ROI SIMULATOR */}
      <section id="simulator" style={{padding:"80px 24px",maxWidth:900,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:32}}><Tag t="ROI Simulator" /><h2 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:800}}>Simulate Your Campaign</h2></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20}}>
          <Card color={T.primary}>
            <h4 style={{fontSize:13,fontWeight:600,color:T.primary,marginBottom:18,letterSpacing:1}}>⚙️ CONFIGURE</h4>
            <div style={{marginBottom:24}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span style={{fontSize:14,color:T.muted}}>Package</span><span style={{fontSize:16,fontWeight:800,color:B.orange}}>{rp.name} — RM{rp.mo}/mo</span></div>
              <input type="range" className="rs" min={0} max={3} step={1} value={rb} onChange={e=>{setRb(+e.target.value);setRv(0);}} />
              <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>{PKG.map((p,i)=><button key={p.name} onClick={()=>{setRb(i);setRv(0);}} style={{background:rb===i?B.orange+"18":"transparent",border:`1px solid ${rb===i?B.orange:T.border}`,color:rb===i?B.orange:T.muted,padding:"3px 8px",borderRadius:6,fontSize:10,cursor:"pointer",fontWeight:600,fontFamily:"'Outfit',sans-serif"}}>{p.name}</button>)}</div>
            </div>
            {rp.vid?<div style={{marginBottom:20}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span style={{fontSize:14,color:T.muted}}>Videos</span><span style={{fontSize:16,fontWeight:800,color:T.primary}}>{rv}</span></div>
              <input type="range" className="rs" min={0} max={Math.floor(rp.cr/680)} step={1} value={rv} onChange={e=>setRv(+e.target.value)} />
              <div style={{fontSize:11,color:T.muted,marginTop:4}}>Each video = 680 ad credits</div>
            </div>:<p style={{fontSize:13,color:T.muted,fontStyle:"italic",marginBottom:16}}>Video not available on Standard.</p>}
            <div>
              <div style={{fontSize:12,color:T.muted,marginBottom:6}}>Credit Allocation</div>
              <div style={{height:16,borderRadius:8,background:T.border,overflow:"hidden",display:"flex"}}>
                {vc>0&&<div style={{width:`${(vc/rp.cr)*100}%`,background:"linear-gradient(90deg,#DC2626,#EF4444)",transition:"width 0.4s"}} />}
                <div style={{width:`${(rem/rp.cr)*100}%`,background:`linear-gradient(90deg,${T.primary},${B.cyan})`,transition:"width 0.4s"}} />
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:4,fontSize:11,color:T.muted}}><span>🎬 Video: {vc}</span><span>📢 Ads: {rem}</span></div>
            </div>
          </Card>
          <Card color={B.orange}>
            <h4 style={{fontSize:13,fontWeight:600,color:B.orange,marginBottom:18,letterSpacing:1}}>📊 PROJECTED RESULTS</h4>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[["Total Credits",rp.cr.toLocaleString(),T.primary],["For Ads",rem.toLocaleString(),rem>0?"#059669":"#DC2626"],["Est. Impressions",(rem*120).toLocaleString(),T.primary],["Est. Clicks",Math.round(rem*3.5).toLocaleString(),B.orange],["Est. Leads",Math.round(rem*0.15).toLocaleString(),"#7C3AED"],["Max Videos",rp.vid?Math.floor(rp.cr/680).toString():"N/A","#D97706"]].map(([l,v,c])=>
                <div key={l} style={{padding:12,background:T.sub,borderRadius:10,border:`1px solid ${T.border}30`}}><div style={{fontSize:22,fontWeight:800,color:c}}>{v}</div><div style={{fontSize:11,color:T.muted,marginTop:2}}>{l}</div></div>
              )}
            </div>
            <WaBtn text="I'm Interested" msg={`Hi, I'm interested in Unifi Digital Marketing Solution *${rp.name} Pack* (RM${rp.mo}/month)${rv>0?`, with ${rv} video(s) in ROI Simulator`:``}. Estimated ${Math.round(rem*0.15)} leads with ${rem} ad credits for ads. Please proceed with my subscription.`} sm style={{width:"100%",justifyContent:"center",marginTop:16}} />
          </Card>
        </div>
      </section>

      {/* STORIES */}
      <section id="stories" style={{padding:"80px 24px",maxWidth:900,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}><Tag t="Success Stories" /><h2 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:800}}>Real Results from Real Businesses</h2></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:18}}>
          {STORIES.map(s=>
            <Card key={s.title} color={s.color}>
              <div style={{fontSize:36,marginBottom:10}}>{s.icon}</div>
              <div style={{display:"inline-block",padding:"3px 10px",borderRadius:6,background:s.color+"12",color:s.color,fontSize:10,fontWeight:700,letterSpacing:1,marginBottom:10}}>{s.tag.toUpperCase()}</div>
              <h3 style={{fontSize:17,fontWeight:700,marginBottom:12}}>{s.title}</h3>
              <div style={{fontSize:13,color:"#DC2626",marginBottom:6}}>❌ Before: <span style={{color:T.muted}}>{s.bef}</span></div>
              <div style={{fontSize:13,color:"#059669"}}>✅ After: <span style={{color:T.text}}>{s.aft}</span></div>
            </Card>
          )}
        </div>
      </section>

      {/* SOLUTIONS - links to sub-pages */}
      <section id="solutions" style={{padding:"80px 24px",maxWidth:900,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:32}}><Tag t="Full Ecosystem" /><h2 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:800}}>More Unifi Business Solutions</h2></div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {SOLS.map((c,idx)=>
            <div key={c.cat} style={{border:`1px solid ${T.border}`,borderRadius:14,overflow:"hidden",background:T.card}}>
              <button onClick={()=>setEs(es===idx?null:idx)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",background:"none",border:"none",color:T.text,fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>
                <span>{c.cat}</span><span style={{color:B.orange,fontSize:14,transition:"transform 0.3s",transform:es===idx?"rotate(180deg)":"rotate(0)"}}>▼</span>
              </button>
              {es===idx&&<div style={{padding:"0 16px 16px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10,animation:"slideUp 0.3s ease"}}>
                {c.items.map(it=>{
                  const hasPage = !!it.link;
                  const Wrapper = hasPage ? "a" : "a";
                  return (
                    <div key={it.n}
                      onClick={()=>hasPage ? navigate(it.link) : window.open(waL(`Hi, I'm interested in Unifi Business *${it.n}* (${it.p}). Please proceed with my subscription.`),"_blank")}
                      style={{padding:"14px 16px",borderRadius:10,background:T.sub,border:`1px solid ${T.border}30`,transition:"all 0.2s",display:"block",color:T.text,cursor:"pointer"}}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor=T.primary+"50";e.currentTarget.style.transform="translateY(-2px)";}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border+"30";e.currentTarget.style.transform="translateY(0)";}}
                    >
                      <span style={{fontSize:22}}>{it.i}</span>
                      <div style={{fontWeight:600,fontSize:13,marginTop:6,marginBottom:2}}>{it.n}</div>
                      <div style={{fontSize:11,color:T.muted,marginBottom:6}}>{it.d}</div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <span style={{fontSize:12,fontWeight:700,color:B.orange}}>{it.p}</span>
                        {hasPage&&<span style={{fontSize:11,color:T.primary,fontWeight:600}}>View Plans →</span>}
                      </div>
                    </div>
                  );
                })}
              </div>}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"80px 24px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at center,${T.primary}08 0%,transparent 60%)`}} />
        <div style={{position:"relative",zIndex:1,maxWidth:550,margin:"0 auto"}}>
          <div style={{fontSize:48,marginBottom:14}}>🚀</div>
          <h2 style={{fontSize:"clamp(26px,5vw,38px)",fontWeight:900,marginBottom:14}}>Ready to <span style={{color:B.orange}}>Grow</span>?</h2>
          <p style={{color:T.muted,fontSize:16,marginBottom:28,lineHeight:1.7}}>Start from RM100/month. Your dedicated marketing team is one message away.</p>
          <WaBtn text="Start My Campaign Now" msg="Hi, I'm interested in Unifi Digital Marketing Solution. I'd like to get started — please help me choose the right package for my business." style={{animation:"glow 2s infinite",fontSize:18,padding:"16px 36px"}} />
          <div style={{marginTop:16,fontSize:12,color:T.muted}}>Valid SSM registration required • 12-month subscription • No hidden fees</div>
        </div>
      </section>
    </>
  );
}

function Layout({ children }) {
  const T = useTheme();
  return (
    <div style={{fontFamily:"'Outfit',sans-serif",background:T.bg,color:T.text,minHeight:"100vh",transition:"background 0.3s,color 0.3s"}}>
      <style>{globalStyles(T)+`
        .qo{background:${T.card};border:1px solid ${T.border};padding:14px 18px;border-radius:12px;cursor:pointer;transition:all 0.2s;color:${T.text};text-align:left;font-size:15px;width:100%;font-family:'Outfit',sans-serif}
        .qo:hover{border-color:${B.orange};background:${B.orange}0D;transform:translateX(4px)}
        .rs{-webkit-appearance:none;width:100%;height:6px;border-radius:3px;outline:none;cursor:pointer;background:linear-gradient(to right,${T.primary},${B.orange})}
        .rs::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:${B.orange};border:3px solid ${T.bg};box-shadow:0 0 10px ${B.orange}60}
      `}</style>
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
        <Route path="/broadband" element={<Broadband />} />
        <Route path="/air-biz" element={<AirBiz />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/cloud-storage" element={<CloudStorage />} />
      </Routes>
    </ThemeProvider>
  );
}
