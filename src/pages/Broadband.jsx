import { useState } from "react";
import { useTheme, Icons as I, Card, SectionLabel, WaBtn, PlanCard, SpecTable, PageHero } from "../theme";

const UB = { blue:"#0033A1", sky:"#00A3E0", orange:"#FF6B00", green:"#00B67A", red:"#E5002B", purple:"#7B2FBE" };

const HOME = [
  {name:"100Mbps Prime",speed:"100Mbps",price:"89",highlight:"FREE 3 Months"},
  {name:"300Mbps Prime",speed:"300Mbps",price:"129",highlight:"FREE 3 Months"},
  {name:"500Mbps Prime",speed:"500Mbps",price:"149",highlight:"FREE 3 Months"},
  {name:"1Gbps + Smart Home",speed:"1Gbps",price:"249",highlight:"AI Camera + Smart Hub"},
  {name:"2Gbps + Smart Home",speed:"2Gbps",price:"319",highlight:"Full Security Kit"},
];
const BIZ = [
  {name:"Biz 300Mbps",speed:"300Mbps",price:"139"},
  {name:"Biz 300Mbps + 43\" TV",speed:"300Mbps",price:"199",highlight:"FREE TV"},
  {name:"Biz 500Mbps + Mesh",speed:"500Mbps",price:"179",highlight:"Mesh WiFi"},
  {name:"Biz 500Mbps + 55\" TV",speed:"500Mbps",price:"239",highlight:"FREE TV"},
  {name:"Biz 800Mbps",speed:"800Mbps",price:"259",highlight:"RM70 Credit"},
  {name:"Biz 1Gbps",speed:"1Gbps",price:"319",highlight:"TV / iPad / Credit"},
  {name:"Biz 2Gbps",speed:"2Gbps",price:"369",highlight:"TV / iPad / Credit"},
];
const SWITCH = [
  {name:"100Mbps",speed:"100Mbps",price:"89",highlight:"FREE 6 Months"},
  {name:"300Mbps",speed:"300Mbps",price:"129",highlight:"FREE 6 Months"},
  {name:"500Mbps",speed:"500Mbps",price:"149",highlight:"FREE 6 Months"},
  {name:"1Gbps",speed:"1Gbps",price:"249",highlight:"FREE 6 Months"},
  {name:"300Mbps + 43\" TV",speed:"300Mbps",price:"139",highlight:"FREE TV"},
  {name:"500Mbps + iPad",speed:"500Mbps",price:"159",highlight:"FREE iPad 128GB"},
  {name:"500Mbps + 65\" TV",speed:"500Mbps",price:"169",highlight:"FREE 65\" TV"},
  {name:"1Gbps + 75\" TV",speed:"1Gbps",price:"269",highlight:"FREE 75\" TV"},
];
const ENTERTAIN = [
  {name:"100Mbps + TV Pack",speed:"100Mbps",price:"119",highlight:"6 Pack Choices"},
  {name:"300Mbps + TV Pack",speed:"300Mbps",price:"159",highlight:"6 Pack Choices"},
  {name:"500Mbps + TV Pack",speed:"500Mbps",price:"179",highlight:"6 Pack Choices"},
  {name:"100Mbps + TV Premium",speed:"100Mbps",price:"149",highlight:"HBO Max / Disney+"},
  {name:"300Mbps + TV Premium",speed:"300Mbps",price:"189",highlight:"HBO Max / Disney+"},
  {name:"100Mbps + Max",speed:"100Mbps",price:"114",highlight:"HBO & Cinemax"},
];

const TABS = [
  {id:"home",label:"Home Fibre",plans:HOME},
  {id:"biz",label:"Business",plans:BIZ},
  {id:"switch",label:"Switching Deals",plans:SWITCH},
  {id:"entertain",label:"With Entertainment",plans:ENTERTAIN},
];

export default function Broadband() {
  const T = useTheme();
  const [tab,setTab] = useState("home");
  const active = TABS.find(t=>t.id===tab);
  return (
    <>
      <PageHero icon={I.globe(T.primary,28)} tag="Broadband" title="Unifi Broadband Plans" subtitle="Home fibre from RM89/mo. Business fibre from RM139/mo. Free 3–6 months on selected plans." />
      <section style={{padding:"0 24px 60px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginBottom:28}}>
          {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"10px 18px",borderRadius:10,border:tab===t.id?`2px solid ${UB.blue}`:`1px solid ${T.border}`,background:tab===t.id?UB.blue:T.card,color:tab===t.id?"white":T.muted,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"}}>{t.label}</button>)}
        </div>
        {tab==="switch"&&<div style={{background:UB.green+"08",border:`1px solid ${UB.green}20`,borderRadius:10,padding:"12px 16px",marginBottom:20,fontSize:13,color:UB.green,fontWeight:500,textAlign:"center"}}>Competitor fibre/wireless broadband bill required as proof. Same address & same name.</div>}
        {tab==="entertain"&&<div style={{background:UB.purple+"08",border:`1px solid ${UB.purple}20`,borderRadius:10,padding:"12px 16px",marginBottom:20,fontSize:13,color:UB.purple,fontWeight:500,textAlign:"center"}}>TV Pack choices: Wira · Ying Xiong · Veeran · Kids · Sports · Max. Optional device add-on from RM26–70/mo.</div>}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(175px,1fr))",gap:12}}>
          {active.plans.map(p=><PlanCard key={p.name} plan={p} popular={p.highlight} />)}
        </div>
        <p style={{textAlign:"center",fontSize:11,color:T.muted,marginTop:20}}>Prices exclude 6% SST · Free installation for selected areas · Subject to coverage</p>
      </section>
      <section style={{padding:"40px 24px 80px",textAlign:"center"}}>
        <WaBtn text="Get Recommendation" msg="Hi, I'd like help choosing the right broadband plan for my needs." utm="broadband_page" />
      </section>
    </>
  );
}
