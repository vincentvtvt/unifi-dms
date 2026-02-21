import { useState } from "react";
import { useTheme, Icons, Card, SectionLabel, WaBtn, PlanCard, SpecTable, PageHero } from "../theme";

const TM=[
  {name:"Biz Fibre 100Mbps",speed:"100Mbps",price:"129",contract:"24 months",highlight:"Best Value"},
  {name:"Biz Fibre 300Mbps",speed:"300Mbps",price:"199",contract:"24 months",highlight:"Recommended"},
  {name:"Biz Fibre 500Mbps",speed:"500Mbps",price:"239",contract:"24 months",highlight:"Best for Productivity"},
  {name:"Biz Fibre 1Gbps",speed:"1Gbps",price:"319",contract:"24 months",highlight:"High Performance"},
  {name:"Biz Fibre 2Gbps",speed:"2Gbps",price:"369",contract:"24 months",highlight:"Ultimate Power"},
];
const NTM=[
  {name:"Biz Fibre 300Mbps",speed:"300Mbps",price:"199",contract:"36 months",highlight:"Most Popular"},
  {name:"Biz Fibre 500Mbps",speed:"500Mbps",price:"239",contract:"36 months",highlight:"Best for Productivity"},
  {name:"Biz Fibre 1Gbps",speed:"1Gbps",price:"319",contract:"36 months",highlight:"Recommended"},
  {name:"Biz Fibre 2Gbps",speed:"2Gbps",price:"369",contract:"36 months",highlight:"Ultimate Power"},
];
const TMS=[
  {label:"User",values:["Micro Office (2-3 users)","Small Office (6 users, 10 devices)","Virtual Office (10 heavy users)","Large Premise (10 power users)","Large Premise (ultimate)"]},
  {label:"Free Call Plan",values:["SVP50","SVP50","SVP70","SVP70","SVP70"]},
  {label:"Free Router",values:["WiFi 6 Combo","WiFi 6 Combo","WiFi 6 Combo","WiFi 7 Combo","WiFi 7 Combo"]},
  {label:"Mesh WiFi",values:["-","WiFi 6","WiFi 6","WiFi 7","WiFi 7"]},
  {label:"5G Backup",values:["RM30/mth","RM30/mth","RM30/mth","FREE","FREE"]},
  {label:"Restoration",values:["24 hrs","24 hrs","24 hrs","12 biz hrs","12 biz hrs"]},
];
const NTMS=[
  {label:"User",values:["Small Office (6 users)","Virtual Office (10 users)","Large Premise (10 users)","Large Premise (ultimate)"]},
  {label:"Voice",values:["20 sen/min","20 sen/min","20 sen/min","20 sen/min"]},
  {label:"Free Router",values:["WiFi 6 Combo","WiFi 6 Combo","WiFi 7 Combo","WiFi 7 Combo"]},
  {label:"5G Backup",values:["RM30/mth","RM30/mth","RM30/mth","RM30/mth"]},
  {label:"Restoration",values:["24 hrs","24 hrs","12 biz hrs","12 biz hrs"]},
  {label:"Contract",values:["36 months","36 months","36 months","36 months"]},
];

export default function Broadband() {
  const T = useTheme();
  const [tab,setTab]=useState("tm");
  const plans=tab==="tm"?TM:NTM;
  const specs=tab==="tm"?TMS:NTMS;
  return (
    <>
      <PageHero icon={Icons.globe(T.primary,28)} tag="Connectivity" title="Unifi Business Broadband" subtitle="Reliable fibre broadband with free router, DECT phone & business call plan. Up to 2Gbps with 24/7 support." />
      <section style={{padding:"0 24px 60px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:32}}>
          {[["tm","TM Customers"],["nontm","Non-TM Customers"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{padding:"10px 24px",borderRadius:10,border:`1px solid ${tab===k?T.accent:T.border}`,background:tab===k?T.accent+"0A":"transparent",color:tab===k?T.accent:T.muted,fontWeight:600,fontSize:14,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"}}>{l}</button>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:`repeat(auto-fit,minmax(180px,1fr))`,gap:14,marginBottom:24}}>
          {plans.map((p,i)=><PlanCard key={p.name+tab} plan={p} popular={p.highlight} color={i>=plans.length-2?T.accent:undefined} />)}
        </div>
        <Card hover={false}><h3 style={{fontSize:17,fontWeight:700,marginBottom:4,color:T.text}}>Detailed Comparison</h3><SpecTable specs={specs} plans={plans} /></Card>
        <p style={{textAlign:"center",fontSize:12,color:T.muted,marginTop:16}}>Prices exclude 6% SST · Free installation for selected areas · Subject to coverage</p>
      </section>
      <section style={{padding:"40px 24px 80px",textAlign:"center"}}>
        <WaBtn text="Get Recommendation" msg="Hi, I'm interested in Unifi Business Broadband. Please help me choose the right plan." />
      </section>
    </>
  );
}
