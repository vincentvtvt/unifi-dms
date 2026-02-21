import { useState } from "react";
import { useTheme, B, Card, Tag, WaBtn, Nav, Footer, PageHero, PlanCard, SpecTable, globalStyles } from "../theme";

const TM_PLANS = [
  { name:"Biz Fibre 100Mbps", speed:"100Mbps", price:"129", contract:"24 months", highlight:"Best Value" },
  { name:"Biz Fibre 300Mbps", speed:"300Mbps", price:"199", contract:"24 months", highlight:"Recommended" },
  { name:"Biz Fibre 500Mbps", speed:"500Mbps", price:"239", contract:"24 months", highlight:"Best for Productivity" },
  { name:"Biz Fibre 1Gbps", speed:"1Gbps", price:"319", contract:"24 months", highlight:"High Performance" },
  { name:"Biz Fibre 2Gbps", speed:"2Gbps", price:"369", contract:"24 months", highlight:"Ultimate Power" },
];

const NONTM_PLANS = [
  { name:"Biz Fibre 300Mbps", speed:"300Mbps", price:"199", contract:"36 months", highlight:"Most Popular" },
  { name:"Biz Fibre 500Mbps", speed:"500Mbps", price:"239", contract:"36 months", highlight:"Best for Productivity" },
  { name:"Biz Fibre 1Gbps", speed:"1Gbps", price:"319", contract:"36 months", highlight:"Recommended" },
  { name:"Biz Fibre 2Gbps", speed:"2Gbps", price:"369", contract:"36 months", highlight:"Ultimate Power" },
];

const TM_SPECS = [
  { label:"User", values:["Flexible Micro Office (2-3 users, 5 devices)","Small Outlet / NGO Office (6 users, 10 devices)","Virtual Office / Shop (10 heavy users)","Larger Business Premise (10 power users)","Larger Business Premise (10 power users, ultimate)"] },
  { label:"Usage", values:["Basic browsing, email, POS, light video calls","Video calls, cloud storage, SaaS apps","Heavy file sharing, multi-device, cloud systems","Large files, high traffic WiFi, real-time collab","Ultra-heavy cloud, servers, 4K/8K, high device density"] },
  { label:"Free Business Call Plan", values:["SVP50","SVP50","SVP70","SVP70","SVP70"] },
  { label:"Free DECT Phone", values:["✓","✓","✓","✓","✓"] },
  { label:"Free Router", values:["Wi-Fi 6 Combo Box","Wi-Fi 6 Combo Box","Wi-Fi 6 Combo Box","Wi-Fi 7 Combo Box","Wi-Fi 7 Combo Box"] },
  { label:"Mesh WiFi", values:["-","WiFi 6 Mesh","WiFi 6 Mesh","WiFi 7 Mesh","WiFi 7 Mesh"] },
  { label:"Biz 5G Wireless Backup", values:["RM30/mth add-on","RM30/mth add-on","RM30/mth add-on","FREE","FREE"] },
  { label:"Restoration", values:["24 hours","24 hours","24 hours","12 business hours","12 business hours"] },
  { label:"Contract Period", values:["24 months","24 months","24 months","24 months","24 months"] },
];

const NONTM_SPECS = [
  { label:"User", values:["Small Outlet / NGO Office (6 users, 10 devices)","Virtual Office / Shop (10 heavy users)","Larger Business Premise (10 power users)","Larger Business Premise (10 power users, ultimate)"] },
  { label:"Voice (Pay per use)", values:["20 cent/min","20 cent/min","20 cent/min","20 cent/min"] },
  { label:"Free Router", values:["Wi-Fi 6 Combo Box","Wi-Fi 6 Combo Box","Wi-Fi 7 Combo Box","Wi-Fi 7 Combo Box"] },
  { label:"Biz 5G Wireless Backup", values:["RM30/mth add-on","RM30/mth add-on","RM30/mth add-on","RM30/mth add-on"] },
  { label:"Restoration", values:["24 hours","24 hours","12 business hours","12 business hours"] },
  { label:"Contract Period", values:["36 months","36 months","36 months","36 months"] },
];

export default function Broadband() {
  const T = useTheme();
  const [tab,setTab] = useState("tm");
  const plans = tab === "tm" ? TM_PLANS : NONTM_PLANS;
  const specs = tab === "tm" ? TM_SPECS : NONTM_SPECS;

  return (
    <div style={{fontFamily:"'Outfit',sans-serif",background:T.bg,color:T.text,minHeight:"100vh"}}>
      <style>{globalStyles(T)}</style>
      <Nav />
      <PageHero icon="🌐" tag="Connectivity" title="Unifi Business Broadband" subtitle="Reliable broadband plans with free router, DECT phone & business call plan. Up to 2Gbps speeds with 24/7 support." />

      <section style={{padding:"0 24px 60px",maxWidth:1100,margin:"0 auto"}}>
        {/* Tab toggle */}
        <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:32}}>
          {[["tm","TM Customers"],["nontm","Non-TM Customers"]].map(([k,label])=>(
            <button key={k} onClick={()=>setTab(k)}
              style={{padding:"10px 24px",borderRadius:10,border:`1px solid ${tab===k?B.orange:T.border}`,background:tab===k?B.orange+"15":"transparent",color:tab===k?B.orange:T.muted,fontWeight:600,fontSize:14,cursor:"pointer",fontFamily:"'Outfit',sans-serif",transition:"all 0.2s"}}>
              {label}
            </button>
          ))}
        </div>

        {/* Plan cards */}
        <div style={{display:"grid",gridTemplateColumns:`repeat(auto-fit,minmax(180px,1fr))`,gap:16,marginBottom:16}}>
          {plans.map((p,i)=><PlanCard key={p.name+tab} plan={p} popular={p.highlight} color={i===plans.length-1?"#FF3D00":i>=plans.length-2?B.orange:undefined} />)}
        </div>

        {/* Spec table */}
        <Card>
          <h3 style={{fontSize:18,fontWeight:700,marginBottom:8}}>📋 Detailed Comparison</h3>
          <SpecTable specs={specs} plans={plans} />
        </Card>

        <p style={{textAlign:"center",fontSize:12,color:T.muted,marginTop:16}}>* Prices exclude 6% SST • Free installation for selected areas • Subject to coverage</p>
      </section>

      <section style={{padding:"40px 24px 80px",textAlign:"center"}}>
        <h2 style={{fontSize:24,fontWeight:800,marginBottom:12}}>Need Help Choosing?</h2>
        <p style={{color:T.muted,fontSize:15,marginBottom:20}}>Tell us about your business and we'll recommend the perfect broadband plan.</p>
        <WaBtn text="Get Recommendation" msg="Hi, I'm interested in Unifi Business Broadband. Can you help me choose the right plan for my business?" />
      </section>

      <Footer />
    </div>
  );
}
