import { useTheme, Icons, Card, WaBtn, PageHero, PlanCard, SpecTable } from "../theme";

const PLANS=[
  {name:"Basic",price:"11",contract:"Monthly"},
  {name:"Basic Plus",price:"17",contract:"Monthly"},
  {name:"Standard",price:"32",contract:"Monthly",highlight:"Recommended"},
  {name:"Advance",price:"52",contract:"Monthly"},
  {name:"Enterprise",price:"95",contract:"Monthly"},
  {name:"Freemium",price:"FREE",contract:"Monthly"},
];
const SPECS=[
  {label:"Users",values:["Up to 2","Up to 2","Up to 3","Up to 5","Up to 10","1"]},
  {label:"Storage",values:["500GB","1TB","1.5TB","3TB","5TB","15GB"]},
  {label:"Media Compatibility",values:["✓","✓","✓","✓","✓","✓"]},
  {label:"Enterprise Security",values:["✓","✓","✓","✓","✓","✓"]},
  {label:"Local Data Residency",values:["✓","✓","✓","✓","✓","✓"]},
  {label:"Storage Upgrade (1TB/RM25)",values:["✓","✓","✓","✓","✓","-"]},
  {label:"Add Users (5/RM10)",values:["✓","✓","✓","✓","✓","-"]},
];

export default function CloudStorage() {
  const T = useTheme();
  return (
    <>
      <PageHero icon={Icons.cloud(T.primary,28)} tag="Digital Solutions" title="Unifi Cloud Storage" subtitle="Secure cloud hosted in TM Tier-3 data centres. Enterprise security with local data residency." />
      <section style={{padding:"0 24px 60px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:12,marginBottom:24}}>
          {PLANS.map((p,i)=><PlanCard key={p.name} plan={p} popular={p.highlight} color={i===4?"#FF3D00":i===5?"#059669":undefined} />)}
        </div>
        <Card hover={false}><h3 style={{fontSize:17,fontWeight:700,marginBottom:4}}>Plan Comparison</h3><SpecTable specs={SPECS} plans={PLANS} /></Card>
        <div style={{marginTop:24,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:16}}>
          <Card style={{padding:20}}><div style={{display:"flex",alignItems:"center",gap:10}}>{Icons.shield(T.primary,20)}<div><h4 style={{fontSize:15,fontWeight:700}}>Enterprise Security</h4><p style={{fontSize:13,color:T.muted,marginTop:4}}>Encryption at rest and in transit. TM certified data centres.</p></div></div></Card>
          <Card style={{padding:20}}><div style={{display:"flex",alignItems:"center",gap:10}}>{Icons.globe("#059669",20)}<div><h4 style={{fontSize:15,fontWeight:700}}>Local Data Residency</h4><p style={{fontSize:13,color:T.muted,marginTop:4}}>Data stays in Malaysia. Compliant with local regulations.</p></div></div></Card>
        </div>
      </section>
      <section style={{padding:"40px 24px 80px",textAlign:"center"}}>
        <WaBtn text="Get Cloud Storage" msg="Hi, I'm interested in Unifi Cloud Storage. Please help me choose the right plan." />
      </section>
    </>
  );
}
