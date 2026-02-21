import { useTheme, Icons, Card, WaBtn, PageHero, PlanCard, SpecTable } from "../theme";

const PLANS=[
  {name:"UNI5G Business 39",speed:"5G Mobile",price:"39",contract:"24 months / No contract (SIM)"},
  {name:"UNI5G Business 69",speed:"5G Mobile",price:"69",contract:"24 months / No contract (SIM)",highlight:"Exclusive Offer"},
  {name:"UNI5G Business 99",speed:"5G Mobile",price:"99",contract:"24 months / No contract (SIM)",highlight:"Exclusive Offer"},
];
const SPECS=[
  {label:"Special Offer",values:["230GB data (30+100+100GB for RM1)","FREE Samsung Flagship 5G","FREE Samsung Flagship 5G"]},
  {label:"Data",values:["30GB (5G & 4G)","Unlimited 5G + 60GB 4G","Unlimited (5G & 4G)"]},
  {label:"Hotspot",values:["30GB","60GB","100GB"]},
  {label:"Calls",values:["Unlimited","Unlimited","Unlimited"]},
  {label:"SMS",values:["RM0.15/SMS","RM0.15/SMS","RM0.15/SMS"]},
  {label:"Add-On Data",values:["10GB RM10 / 50GB RM45","10GB RM10 / 50GB RM45","10GB RM10 / 50GB RM45"]},
];

export default function Mobile() {
  const T = useTheme();
  return (
    <>
      <PageHero icon={Icons.phone(T.primary,28)} tag="Business Mobile" title="UNI5G Business Plans" subtitle="Unlimited 5G mobile with free flagship smartphones. Keep your team connected everywhere." />
      <section style={{padding:"0 24px 60px",maxWidth:900,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16,marginBottom:32}}>
          {PLANS.map((p,i)=><PlanCard key={p.name} plan={p} popular={p.highlight} color={i===2?"#FF3D00":undefined} />)}
        </div>
        <Card hover={false}><h3 style={{fontSize:17,fontWeight:700,marginBottom:4}}>Plan Comparison</h3><SpecTable specs={SPECS} plans={PLANS} /></Card>
        <Card hover={false} style={{marginTop:20,background:T.accent+"06",border:`1px solid ${T.accent}15`}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            {Icons.phone(T.accent,24)}
            <div><h3 style={{fontSize:16,fontWeight:700,color:T.text}}>FREE Samsung 5G Smartphones</h3><p style={{fontSize:13,color:T.muted,marginTop:4}}>Business 69 and 99 plans include a free Samsung flagship with 24-month contract.</p></div>
          </div>
        </Card>
      </section>
      <section style={{padding:"40px 24px 80px",textAlign:"center"}}>
        <WaBtn text="Get UNI5G Business" msg="Hi, I'm interested in UNI5G Business mobile plan. Please help me choose." />
      </section>
    </>
  );
}
