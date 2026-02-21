import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useTheme, ThemeProvider, Icons, PartnerLogos, Card, SectionLabel, WaBtn, PrimaryBtn, FloatingWA, Nav, Footer, waL, globalStyles } from "./theme";
import Broadband from "./pages/Broadband";
import AirBiz from "./pages/AirBiz";
import Mobile from "./pages/Mobile";
import CloudStorage from "./pages/CloudStorage";

const PKG = [
  { name:"Standard",label:"Awareness",mo:100,cr:840,color:"#4A90D9",camp:"1.5 – 2 months",plat:["Facebook","Google Ads","Instagram","TikTok"],desc:"Reach new audiences across 4 platforms with a dedicated campaign team.",team:["Campaign Manager","Graphic Designer","Copywriter","TikTok ad setup"],vid:false },
  { name:"Premium",label:"Engagement",mo:200,cr:1680,color:"#5B8DEF",camp:"Up to 3 months",plat:["Facebook","Google Ads","TikTok","Rev Media"],desc:"Build customer interaction and loyalty with video content included.",team:["Campaign Manager","Graphic Designer","Copywriter","Video production (680 credits)"],vid:true },
  { name:"Prime",label:"Sales Conversion",mo:450,cr:3500,color:"#FF5E00",camp:"5 – 6 months",plat:["Facebook","Google Ads","TikTok","Rev Media"],desc:"Convert leads into paying customers with extended campaign reach.",team:["Campaign Manager","Graphic Designer","Copywriter","Video production (680 credits)"],vid:true },
  { name:"Pro",label:"2x Sales Conversion",mo:900,cr:7000,color:"#FF3D00",pop:true,camp:"Up to 12 months",plat:["Facebook","Google Ads","TikTok","Rev Media"],desc:"Maximum impact. 12-month campaign with the largest credit pool.",team:["Campaign Manager","Graphic Designer","Copywriter","Video production (680 credits)"],vid:true },
];

const STORIES = [
  { title:"Kelantan Food Business",bef:"Sold locally at Pasar Siti Khadijah only.",aft:"Targeted Facebook & Instagram ads boosted sales by 49% in one cycle.",tag:"Standard Pack",metric:"+49%",metricLabel:"Sales Growth",img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=260&fit=crop" },
  { title:"Property Agent",bef:"Relied on walk-ins. Leads were slow and expensive.",aft:"Google + TikTok video drove 3x more qualified leads in 3 months.",tag:"Prime Pack",metric:"3x",metricLabel:"Lead Volume",img:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=260&fit=crop" },
  { title:"Boutique Café Chain",bef:"Single outlet in PJ. Struggled to attract new customers beyond walk-ins.",aft:"Instagram + Facebook ads drove 2x foot traffic. Opened 2nd branch within 6 months.",tag:"Premium Pack",metric:"2x",metricLabel:"Foot Traffic",img:"https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=260&fit=crop" },
  { title:"Pest Control Service",bef:"Only northern states. Marketing limited to flyers.",aft:"12-month Google + Facebook strategy doubled sales, expanded to new states.",tag:"Pro Pack",metric:"2x",metricLabel:"Revenue Doubled",img:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=260&fit=crop" },
];

const SOLS = [
  { cat:"Connectivity",icon:Icons.wifi,items:[
    { n:"Business Broadband",p:"From RM129/mo",d:"Up to 2Gbps fibre with WiFi 6/7",icon:Icons.globe,link:"/broadband" },
    { n:"UNI5G Business Mobile",p:"From RM39/mo",d:"Unlimited 5G with free smartphone",icon:Icons.phone,link:"/mobile" },
    { n:"Unifi Air Biz 5G",p:"From RM99/mo",d:"Wireless 5G, plug-and-play",icon:Icons.wifi,link:"/air-biz" },
  ]},
  { cat:"Digital Solutions",icon:Icons.cloud,items:[
    { n:"Cloud Storage",p:"From RM11/mo",d:"500GB–5TB with local data residency",icon:Icons.cloud,link:"/cloud-storage" },
    { n:"eCommerce Hub",p:"From RM49/mo",d:"All-in-one online store management",icon:Icons.chart },
    { n:"Kaspersky Security",p:"From RM30/mo",d:"Business-grade cybersecurity",icon:Icons.shield },
  ]},
];

const QZ = [
  { q:"What's your primary business goal?", o:[{l:"Build brand awareness",s:[3,1,0,0]},{l:"Engage & build loyalty",s:[0,3,1,0]},{l:"Generate leads & sales",s:[0,0,3,1]},{l:"Dominate my market",s:[0,0,1,3]}] },
  { q:"Do you need video content?", o:[{l:"No, images are enough",s:[3,1,0,0]},{l:"Maybe one video",s:[0,3,1,0]},{l:"Yes, 2–3 videos",s:[0,0,3,1]},{l:"Full video strategy",s:[0,0,0,3]}] },
  { q:"How long should your campaign run?", o:[{l:"1–2 months test",s:[3,1,0,0]},{l:"3 months",s:[0,3,1,0]},{l:"6 months serious push",s:[0,0,3,1]},{l:"Full year commitment",s:[0,0,0,3]}] },
  { q:"Monthly budget comfort?", o:[{l:"Under RM150",s:[3,1,0,0]},{l:"RM150 – RM300",s:[0,3,1,0]},{l:"RM300 – RM600",s:[0,0,3,1]},{l:"RM600+",s:[0,0,1,3]}] },
];

function Home() {
  const T = useTheme();
  const navigate = useNavigate();
  const [qs,setQs]=useState(-1);
  const [sc,setSc]=useState([0,0,0,0]);
  const [qr,setQr]=useState(null);
  const [rb,setRb]=useState(1);
  const [rv,setRv]=useState(0);
  const [expandSol,setExpandSol]=useState(0);
  const [ep,setEp]=useState(null);

  const qa=(s)=>{const n=sc.map((v,i)=>v+s[i]);setSc(n);if(qs+1>=QZ.length)setQr(n.indexOf(Math.max(...n)));else setQs(qs+1);};
  const rp=PKG[rb];const vc=rv*680;const rem=Math.max(0,rp.cr-vc);
  const scr=(id)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section style={{background:T.heroBg,padding:"100px 24px 64px",position:"relative",overflow:"hidden"}}>
        {/* Subtle geometric accent */}
        <div style={{position:"absolute",top:-100,right:-100,width:400,height:400,borderRadius:"50%",background:T.primary+"06",pointerEvents:"none"}} />
        <div style={{position:"absolute",bottom:-80,left:-60,width:300,height:300,borderRadius:"50%",background:T.accent+"06",pointerEvents:"none"}} />

        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",flexWrap:"wrap",gap:48,alignItems:"center"}}>
          {/* Left */}
          <div className="fade-up" style={{flex:"1 1 440px",maxWidth:540}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 14px",borderRadius:8,background:T.accent+"0D",border:`1px solid ${T.accent}20`,marginBottom:20}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:T.accent}} />
              <span style={{fontSize:12,fontWeight:600,color:T.accent}}>Malaysia's First Instalment-Based Marketing</span>
            </div>
            <h1 style={{fontSize:"clamp(32px,4.5vw,52px)",fontWeight:800,lineHeight:1.12,marginBottom:16,color:T.text,letterSpacing:"-0.02em"}}>
              Grow your business with<br/><span style={{color:T.accent,fontSize:"clamp(38px,5.5vw,64px)"}}>Digital Marketing</span><br/>that actually works.
            </h1>
            <p style={{fontSize:17,color:T.muted,lineHeight:1.7,marginBottom:28,maxWidth:460}}>
              A dedicated campaign manager, designer & copywriter run your ads across Facebook, Google, TikTok & Rev Media — from just RM100/month.
            </p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:32}}>
              <PrimaryBtn text="Find My Package" onClick={()=>{setQs(0);setSc([0,0,0,0]);setQr(null);scr("advisor");}} />
              <a href="#packages" onClick={e=>{e.preventDefault();scr("packages");}} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"14px 24px",borderRadius:10,border:`1px solid ${T.border}`,color:T.text,fontSize:15,fontWeight:600,transition:"all 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=T.primary;e.currentTarget.style.color=T.primary;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.text;}}
              >View Plans {Icons.arrow(T.primary,16)}</a>
            </div>
            {/* Trust strip */}
            <div className="hero-stats" style={{display:"flex",alignItems:"center",gap:16,fontSize:12,color:T.muted,flexWrap:"wrap"}}>
              <div style={{display:"flex",alignItems:"center",gap:4}}>{Icons.shield(T.primary,16)}<span>SSM Registered</span></div>
              <span style={{color:T.border}}>|</span>
              <div style={{display:"flex",alignItems:"center",gap:4}}>{Icons.check("#059669",16)}<span>Official Unifi Reseller</span></div>
              <span style={{color:T.border}}>|</span>
              <div style={{display:"flex",alignItems:"center",gap:4}}>{Icons.users(T.primary,16)}<span>500+ SMEs Served</span></div>
            </div>
          </div>
          {/* Right - Hero visual */}
          <div className="fade-up-d2" style={{flex:"1 1 380px",position:"relative"}}>
            <div style={{background:`linear-gradient(135deg, ${T.primary}12, ${T.accent}08)`,borderRadius:20,padding:32,position:"relative",overflow:"hidden"}}>
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&h=380&fit=crop" alt="Malaysian business team" style={{width:"100%",borderRadius:14,objectFit:"cover",display:"block"}} onError={e=>{e.target.style.opacity="0";}} />
              {/* Floating stat cards */}
              <div style={{position:"absolute",top:16,right:16,background:T.card,borderRadius:10,padding:"10px 14px",boxShadow:T.floatShadow,display:"flex",alignItems:"center",gap:8}}>
                {Icons.trending("#059669",18)}
                <div><div style={{fontSize:16,fontWeight:800,color:"#059669"}}>+49%</div><div style={{fontSize:10,color:T.muted}}>Avg. Sales Boost</div></div>
              </div>
              <div style={{position:"absolute",bottom:16,left:16,background:T.card,borderRadius:10,padding:"10px 14px",boxShadow:T.floatShadow,display:"flex",alignItems:"center",gap:8}}>
                {Icons.zap(T.accent,18)}
                <div><div style={{fontSize:16,fontWeight:800,color:T.text}}>4 Platforms</div><div style={{fontSize:10,color:T.muted}}>Simultaneous Campaigns</div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner logos */}
        <div style={{maxWidth:800,margin:"48px auto 0",textAlign:"center"}}>
          <p style={{fontSize:11,color:T.muted,marginBottom:14,fontWeight:500,letterSpacing:1,textTransform:"uppercase"}}>Your ads run on these platforms</p>
          <PartnerLogos T={T} />
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{padding:"80px 24px",maxWidth:1000,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <SectionLabel text="How It Works" />
          <h2 style={{fontSize:"clamp(26px,3.5vw,38px)",fontWeight:800,color:T.text}}>Three steps to launch your campaign</h2>
        </div>
        <div className="steps-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2,background:T.border,borderRadius:16,overflow:"hidden"}}>
          {[
            {n:"01",icon:Icons.target,t:"Choose Your Pack",d:"Select from Standard to Pro. Pay monthly over 12 months — no upfront cost."},
            {n:"02",icon:Icons.users,t:"We Handle Everything",d:"Your dedicated team creates strategy, designs, copy, and launches campaigns."},
            {n:"03",icon:Icons.chart,t:"Watch Results Flow",d:"Track real-time performance through reports. We optimise for maximum ROI."},
          ].map((s,i)=>(
            <div key={s.n} className={`fade-up-d${i+1}`} style={{background:T.card,padding:36,textAlign:"center"}}>
              <div style={{width:48,height:48,borderRadius:12,background:i===1?T.accent+"0D":T.primary+"0A",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>
                {s.icon(i===1?T.accent:T.primary,22)}
              </div>
              <div style={{fontSize:11,fontWeight:700,color:T.accent,letterSpacing:2,marginBottom:8}}>STEP {s.n}</div>
              <h3 style={{fontSize:18,fontWeight:700,marginBottom:8,color:T.text}}>{s.t}</h3>
              <p style={{fontSize:14,color:T.muted,lineHeight:1.6}}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PACKAGES ═══ */}
      <section id="packages" style={{padding:"80px 24px",background:T.sub}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <SectionLabel text="DMS Packages" />
            <h2 style={{fontSize:"clamp(26px,3.5vw,38px)",fontWeight:800,color:T.text}}>Choose your growth plan</h2>
            <p style={{color:T.muted,fontSize:15,marginTop:8}}>Every plan includes a dedicated 3-person team · 12-month instalment · No upfront fees</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(248px,1fr))",gap:16}}>
            {PKG.map((p,i)=>(
              <Card key={p.name} color={p.color} style={{border:p.pop?`2px solid ${p.color}`:`1px solid ${T.border}`,padding:0,overflow:"hidden"}}>
                {p.pop&&<div style={{background:p.color,color:"white",textAlign:"center",fontSize:11,fontWeight:700,padding:"6px 0",letterSpacing:1}}>MOST POPULAR</div>}
                <div style={{padding:24,textAlign:"center"}}>
                  <div style={{display:"inline-block",padding:"4px 10px",borderRadius:6,background:p.color+"0D",color:p.color,fontSize:11,fontWeight:700,letterSpacing:0.5,marginBottom:8}}>{p.label.toUpperCase()}</div>
                  <h3 style={{fontSize:20,fontWeight:800,color:T.text}}>{p.name} Pack</h3>
                  <div style={{fontSize:42,fontWeight:800,margin:"10px 0 2px",color:T.text,letterSpacing:"-0.02em"}}><span style={{fontSize:16,fontWeight:500,color:T.muted}}>RM</span>{p.mo}</div>
                  <div style={{fontSize:13,color:T.muted,marginBottom:18}}>/month × 12 months</div>

                  <div style={{background:T.sub,borderRadius:10,padding:14,marginBottom:14,textAlign:"left"}}>
                    {[
                      ["Ad Credits",p.cr.toLocaleString(),T.primary,Icons.zap],
                      ["Campaign Duration",p.camp,T.text,Icons.target],
                      ["Video",p.vid?"Redeemable (680/video)":"Not included",p.vid?"#059669":"#DC2626",Icons.video],
                    ].map(([l,v,c,ic])=>(
                      <div key={l} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${T.border}30`,fontSize:13}}>
                        <span style={{display:"flex",alignItems:"center",gap:6,color:T.muted}}>{ic(T.muted,14)}{l}</span>
                        <span style={{fontWeight:600,color:c}}>{v}</span>
                      </div>
                    ))}
                  </div>

                  <button onClick={()=>setEp(ep===i?null:i)} style={{background:"none",border:"none",color:T.primary,fontSize:12,fontWeight:600,cursor:"pointer",marginBottom:14,fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:4,margin:"0 auto 14px"}}
                  >{ep===i?"Show less":"View details"} {Icons.chevDown(T.primary,14)}</button>

                  {ep===i&&<div style={{textAlign:"left",background:T.sub,borderRadius:10,padding:14,marginBottom:14,animation:"fadeUp 0.3s ease"}}>
                    <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:8,letterSpacing:1}}>PLATFORMS</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                      {p.plat.map(pl=><span key={pl} style={{padding:"3px 10px",borderRadius:6,background:T.primary+"0A",color:T.primary,fontSize:11,fontWeight:600}}>{pl}</span>)}
                    </div>
                    <div style={{fontSize:11,fontWeight:700,color:T.accent,marginBottom:8,letterSpacing:1}}>YOUR DEDICATED TEAM</div>
                    {p.team.map(e=><div key={e} style={{fontSize:12,color:T.muted,padding:"3px 0",display:"flex",alignItems:"center",gap:6}}>{Icons.check("#059669",14)}{e}</div>)}
                  </div>}

                  <WaBtn text={`Get ${p.name}`} msg={`Hi, I'm interested in Unifi Digital Marketing Solution *${p.name} Pack* (RM${p.mo}/month, ${p.cr} ad credits, ${p.camp} campaign). Please proceed with my subscription.`} sm style={{width:"100%",justifyContent:"center"}} />
                </div>
              </Card>
            ))}
          </div>
          <p style={{textAlign:"center",fontSize:12,color:T.muted,marginTop:20}}>Prices exclude 6% SST · 30% management fee front-loaded · Languages: BM & English</p>
        </div>
      </section>

      {/* ═══ SMART PACKAGE FINDER ═══ */}
      <section id="advisor" style={{padding:"80px 24px",maxWidth:640,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <SectionLabel text="Smart Package Finder" />
          <h2 style={{fontSize:"clamp(26px,3.5vw,38px)",fontWeight:800,color:T.text}}>Not sure which pack?</h2>
          <p style={{color:T.muted,fontSize:15,marginTop:8}}>Answer 4 quick questions and we'll match you to the perfect plan.</p>
        </div>
        <Card hover={false} style={{border:`1px solid ${T.border}`,padding:32}}>
          {qs===-1&&!qr&&(
            <div style={{textAlign:"center",padding:"24px 0"}}>
              <div style={{width:64,height:64,borderRadius:16,background:T.accent+"0D",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>
                {Icons.target(T.accent,28)}
              </div>
              <h3 style={{fontSize:20,fontWeight:700,marginBottom:8,color:T.text}}>Find your perfect match</h3>
              <p style={{color:T.muted,marginBottom:24,fontSize:14}}>Takes less than 30 seconds.</p>
              <PrimaryBtn text="Start Now" onClick={()=>setQs(0)} />
            </div>
          )}
          {qs>=0&&!qr&&(
            <div>
              <div style={{display:"flex",gap:4,marginBottom:24}}>
                {QZ.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=qs?T.accent:T.border,transition:"background 0.3s"}} />)}
              </div>
              <div style={{fontSize:11,fontWeight:700,color:T.accent,letterSpacing:1,marginBottom:6}}>QUESTION {qs+1} OF {QZ.length}</div>
              <h3 style={{fontSize:18,fontWeight:700,marginBottom:18,color:T.text}}>{QZ[qs].q}</h3>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {QZ[qs].o.map((o,i)=>(
                  <button key={i} onClick={()=>qa(o.s)}
                    style={{background:T.sub,border:`1px solid ${T.border}`,padding:"14px 18px",borderRadius:10,cursor:"pointer",transition:"all 0.2s",color:T.text,textAlign:"left",fontSize:14,fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:10}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=T.accent;e.currentTarget.style.background=T.accent+"08";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.background=T.sub;}}
                  ><span style={{width:24,height:24,borderRadius:6,background:T.accent+"0D",color:T.accent,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{String.fromCharCode(65+i)}</span>{o.l}</button>
                ))}
              </div>
            </div>
          )}
          {qr!==null&&(()=>{const p=PKG[qr];return(
            <div style={{textAlign:"center",padding:"16px 0"}}>
              <div style={{width:48,height:48,borderRadius:12,background:"#059669"+"12",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:12}}>{Icons.check("#059669",24)}</div>
              <div style={{fontSize:12,fontWeight:700,color:"#059669",letterSpacing:1,marginBottom:6}}>PERFECT MATCH FOUND</div>
              <h3 style={{fontSize:24,fontWeight:800,marginBottom:4,color:T.text}}>{p.name} Pack</h3>
              <div style={{display:"inline-block",padding:"3px 10px",borderRadius:6,background:p.color+"0D",color:p.color,fontSize:11,fontWeight:700,marginBottom:14}}>{p.label}</div>
              <p style={{color:T.muted,marginBottom:20,fontSize:14,maxWidth:400,margin:"0 auto 20px"}}>{p.desc}</p>
              <div style={{display:"flex",justifyContent:"center",gap:32,marginBottom:24}}>
                <div><div style={{fontSize:22,fontWeight:800,color:T.accent}}>RM{p.mo}</div><div style={{fontSize:11,color:T.muted}}>/month</div></div>
                <div><div style={{fontSize:22,fontWeight:800,color:T.primary}}>{p.cr.toLocaleString()}</div><div style={{fontSize:11,color:T.muted}}>Credits</div></div>
                <div><div style={{fontSize:22,fontWeight:800,color:"#059669"}}>{p.camp}</div><div style={{fontSize:11,color:T.muted}}>Campaign</div></div>
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                <WaBtn text={`Get ${p.name} Pack`} msg={`Hi, I'm interested in Unifi Digital Marketing Solution *${p.name} Pack* (RM${p.mo}/month, ${p.cr} ad credits). The Smart Package Finder recommended this for my business. Please proceed.`} />
                <button onClick={()=>{setQs(-1);setSc([0,0,0,0]);setQr(null);}} style={{background:"none",border:`1px solid ${T.border}`,color:T.muted,padding:"12px 20px",borderRadius:10,fontSize:14,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>Retake Quiz</button>
              </div>
            </div>
          );})()}
        </Card>
      </section>

      {/* ═══ ROI SIMULATOR ═══ */}
      <section style={{padding:"80px 24px",background:T.sub}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:32}}>
            <SectionLabel text="ROI Simulator" />
            <h2 style={{fontSize:"clamp(26px,3.5vw,38px)",fontWeight:800,color:T.text}}>See your potential results</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:20}}>
            <Card hover={false}>
              <h4 style={{fontSize:13,fontWeight:700,color:T.primary,letterSpacing:1,marginBottom:20}}>CONFIGURE</h4>
              <div style={{marginBottom:24}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:12,alignItems:"baseline"}}>
                  <span style={{fontSize:14,color:T.muted}}>Package</span>
                  <span style={{fontSize:17,fontWeight:800,color:T.accent}}>{rp.name} — RM{rp.mo}/mo</span>
                </div>
                <input type="range" min={0} max={3} step={1} value={rb} onChange={e=>{setRb(+e.target.value);setRv(0);}}
                  style={{WebkitAppearance:"none",width:"100%",height:4,borderRadius:2,outline:"none",cursor:"pointer",background:`linear-gradient(to right,${T.primary},${T.accent})`}} />
                <div style={{display:"flex",justifyContent:"space-between",marginTop:8}}>
                  {PKG.map((p,i)=><button key={p.name} onClick={()=>{setRb(i);setRv(0);}} style={{background:rb===i?T.accent+"10":"transparent",border:`1px solid ${rb===i?T.accent:T.border}`,color:rb===i?T.accent:T.muted,padding:"4px 10px",borderRadius:6,fontSize:11,cursor:"pointer",fontWeight:600,fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"}}>{p.name}</button>)}
                </div>
              </div>
              {rp.vid?<div style={{marginBottom:20}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><span style={{fontSize:14,color:T.muted}}>Videos</span><span style={{fontSize:17,fontWeight:800,color:T.primary}}>{rv}</span></div>
                <input type="range" min={0} max={Math.floor(rp.cr/680)} step={1} value={rv} onChange={e=>setRv(+e.target.value)}
                  style={{WebkitAppearance:"none",width:"100%",height:4,borderRadius:2,outline:"none",cursor:"pointer",background:`linear-gradient(to right,${T.primary},${T.accent})`}} />
                <div style={{fontSize:11,color:T.muted,marginTop:4}}>Each video redeems 680 ad credits</div>
              </div>:<div style={{padding:"12px 16px",background:T.sub,borderRadius:8,fontSize:13,color:T.muted,marginBottom:16}}>Video not available on Standard pack.</div>}
              <div>
                <div style={{fontSize:12,color:T.muted,marginBottom:8}}>Credit allocation</div>
                <div style={{height:10,borderRadius:5,background:T.border+"60",overflow:"hidden",display:"flex"}}>
                  {vc>0&&<div style={{width:`${(vc/rp.cr)*100}%`,background:"linear-gradient(90deg,#EF4444,#F97316)",transition:"width 0.4s"}} />}
                  <div style={{width:`${(rem/rp.cr)*100}%`,background:`linear-gradient(90deg,${T.primary},${T.accent})`,transition:"width 0.4s"}} />
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:6,fontSize:11,color:T.muted}}>
                  <span style={{display:"flex",alignItems:"center",gap:4}}>{Icons.video(T.muted,12)} Video: {vc}</span>
                  <span style={{display:"flex",alignItems:"center",gap:4}}>{Icons.trending(T.muted,12)} Ads: {rem}</span>
                </div>
              </div>
            </Card>
            <Card hover={false}>
              <h4 style={{fontSize:13,fontWeight:700,color:T.accent,letterSpacing:1,marginBottom:20}}>PROJECTED RESULTS</h4>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {[["Total Credits",rp.cr.toLocaleString(),T.primary],["For Ads",rem.toLocaleString(),rem>0?"#059669":"#DC2626"],["Est. Impressions",(rem*120).toLocaleString(),T.primary],["Est. Clicks",Math.round(rem*3.5).toLocaleString(),T.accent],["Est. Leads",Math.round(rem*0.15).toLocaleString(),"#7C3AED"],["Max Videos",rp.vid?Math.floor(rp.cr/680).toString():"N/A","#D97706"]].map(([l,v,c])=>
                  <div key={l} style={{padding:14,background:T.sub,borderRadius:10,border:`1px solid ${T.border}50`}}>
                    <div style={{fontSize:24,fontWeight:800,color:c,letterSpacing:"-0.02em"}}>{v}</div>
                    <div style={{fontSize:11,color:T.muted,marginTop:2}}>{l}</div>
                  </div>
                )}
              </div>
              <WaBtn text="I'm Interested in This Plan" msg={`Hi, I'm interested in Unifi Digital Marketing Solution *${rp.name} Pack* (RM${rp.mo}/month)${rv>0?`, with ${rv} video(s)`:``}. Estimated ${Math.round(rem*0.15)} leads with ${rem} ad credits. Please proceed.`} sm style={{width:"100%",justifyContent:"center",marginTop:16}} />
            </Card>
          </div>
        </div>
      </section>

      {/* ═══ SUCCESS STORIES ═══ */}
      <section style={{padding:"80px 24px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <SectionLabel text="Success Stories" />
          <h2 style={{fontSize:"clamp(26px,3.5vw,38px)",fontWeight:800,color:T.text}}>Real results from Malaysian businesses</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:18}}>
          {STORIES.map(s=>(
            <Card key={s.title} style={{padding:0,overflow:"hidden"}}>
              <div style={{height:160,background:`linear-gradient(135deg, ${T.primary}20, ${T.accent}15)`,position:"relative",overflow:"hidden"}}>
                <img src={s.img} alt={s.title} style={{width:"100%",height:"100%",objectFit:"cover",position:"relative",zIndex:1}} onError={e=>{e.target.style.opacity="0";}} />
                <div style={{position:"absolute",top:12,left:12,background:T.card,borderRadius:8,padding:"6px 10px",fontSize:11,fontWeight:700,color:T.accent,boxShadow:T.floatShadow}}>{s.tag}</div>
                <div style={{position:"absolute",bottom:12,right:12,background:T.card,borderRadius:10,padding:"8px 14px",boxShadow:T.floatShadow,textAlign:"center"}}>
                  <div style={{fontSize:22,fontWeight:800,color:"#059669"}}>{s.metric}</div>
                  <div style={{fontSize:9,color:T.muted,fontWeight:600}}>{s.metricLabel}</div>
                </div>
              </div>
              <div style={{padding:20}}>
                <h3 style={{fontSize:16,fontWeight:700,marginBottom:10,color:T.text}}>{s.title}</h3>
                <div style={{fontSize:13,marginBottom:6,display:"flex",alignItems:"flex-start",gap:6}}>
                  {Icons.x("#DC2626",14)}
                  <span style={{color:T.muted}}>{s.bef}</span>
                </div>
                <div style={{fontSize:13,display:"flex",alignItems:"flex-start",gap:6}}>
                  {Icons.check("#059669",14)}
                  <span style={{color:T.text}}>{s.aft}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ═══ MORE SOLUTIONS ═══ */}
      <section style={{padding:"80px 24px",background:T.sub}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <SectionLabel text="Unifi Business Ecosystem" />
            <h2 style={{fontSize:"clamp(26px,3.5vw,38px)",fontWeight:800,color:T.text}}>Complete business solutions</h2>
          </div>
          {SOLS.map((cat,idx)=>(
            <div key={cat.cat} style={{marginBottom:24}}>
              <button onClick={()=>setExpandSol(expandSol===idx?null:idx)}
                style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 20px",background:T.card,border:`1px solid ${T.border}`,borderRadius:expandSol===idx?"12px 12px 0 0":"12px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=T.primary;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;}}
              >
                <span style={{display:"flex",alignItems:"center",gap:10,fontSize:16,fontWeight:700,color:T.text}}>
                  {cat.icon(T.primary,20)}{cat.cat}
                </span>
                <div style={{transition:"transform 0.3s",transform:expandSol===idx?"rotate(180deg)":"rotate(0)"}}>{Icons.chevDown(T.muted,18)}</div>
              </button>
              {expandSol===idx&&(
                <div style={{border:`1px solid ${T.border}`,borderTop:"none",borderRadius:"0 0 12px 12px",padding:16,display:"flex",flexDirection:"column",gap:10,animation:"fadeUp 0.3s ease",background:T.card}}>
                  {cat.items.map(it=>(
                    <div key={it.n}
                      style={{padding:18,borderRadius:10,border:`1px solid ${T.border}`,background:T.sub,transition:"all 0.2s",display:"flex",alignItems:"center",justifyContent:"space-between",gap:14}}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor=T.primary;e.currentTarget.style.boxShadow=T.cardHover;}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.boxShadow="none";}}
                    >
                      <div style={{display:"flex",alignItems:"center",gap:12,flex:1,minWidth:0}}>
                        <div style={{width:36,height:36,borderRadius:10,background:T.primary+"0A",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{it.icon(T.primary,18)}</div>
                        <div style={{minWidth:0}}>
                          <div style={{fontWeight:700,fontSize:14,color:T.text}}>{it.n}</div>
                          <div style={{fontSize:12,color:T.muted,lineHeight:1.4,marginTop:2}}>{it.d}</div>
                          <div style={{fontSize:12,fontWeight:700,color:T.accent,marginTop:2}}>{it.p}</div>
                        </div>
                      </div>
                      {it.link?
                        <button onClick={()=>navigate(it.link)} style={{flexShrink:0,padding:"8px 16px",borderRadius:8,border:`1px solid ${T.primary}`,background:T.primary+"0A",color:T.primary,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:5,transition:"all 0.2s",whiteSpace:"nowrap"}}
                          onMouseEnter={e=>{e.currentTarget.style.background=T.primary;e.currentTarget.style.color="white";}}
                          onMouseLeave={e=>{e.currentTarget.style.background=T.primary+"0A";e.currentTarget.style.color=T.primary;}}
                        >View Plans {Icons.arrow("currentColor",13)}</button>
                        :<button onClick={()=>window.open(waL(`Hi, I'm interested in Unifi Business *${it.n}* (${it.p}). Please proceed.`),"_blank")} style={{flexShrink:0,padding:"8px 16px",borderRadius:8,border:`1px solid #25D366`,background:"#25D36610",color:"#25D366",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:5,transition:"all 0.2s",whiteSpace:"nowrap"}}
                          onMouseEnter={e=>{e.currentTarget.style.background="#25D366";e.currentTarget.style.color="white";}}
                          onMouseLeave={e=>{e.currentTarget.style.background="#25D36610";e.currentTarget.style.color="#25D366";}}
                        >Enquire</button>
                      }
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section style={{padding:"80px 24px",background:`linear-gradient(135deg, ${T.primary}08, ${T.accent}06)`,textAlign:"center"}}>
        <div style={{maxWidth:520,margin:"0 auto"}}>
          <SectionLabel text="Get Started" />
          <h2 style={{fontSize:"clamp(28px,4vw,42px)",fontWeight:800,marginBottom:14,color:T.text}}>Ready to grow your business?</h2>
          <p style={{color:T.muted,fontSize:16,marginBottom:28,lineHeight:1.7}}>Join 500+ Malaysian SMEs already running campaigns across Facebook, Google, TikTok & Rev Media.</p>
          <WaBtn text="Start My Campaign" msg="Hi, I'm interested in Unifi Digital Marketing Solution. I'd like to get started — please help me choose the right package." style={{fontSize:16,padding:"16px 32px"}} />
          <div style={{marginTop:16,fontSize:12,color:T.muted}}>SSM registration required · 12-month subscription · No hidden fees</div>
        </div>
      </section>
    </>
  );
}

function Layout({ children }) {
  const T = useTheme();
  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",background:T.bg,color:T.text,minHeight:"100vh"}}>
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
