import { useTheme, Icons as I, Card, SectionLabel, WaBtn, PlanCard, PageHero } from "../theme";

const UB = { blue:"#0033A1", sky:"#00A3E0", orange:"#FF6B00", green:"#00B67A", red:"#E5002B" };

const PLANS = [
  {name:"Uni5G 39",speed:"50GB 5G/4G",price:"39",highlight:"No contract"},
  {name:"Uni5G 69",speed:"500GB 5G/4G",price:"69",highlight:"Best Value"},
  {name:"Uni5G 99",speed:"100GB+ 5G/4G",price:"99",highlight:"Device bundle"},
];
const FAMILY = [
  {name:"Family 129",speed:"150GB+ · 1 free line",price:"129"},
  {name:"Family 159",speed:"200GB+ · 2 free lines",price:"159",highlight:"Popular"},
  {name:"Family 189",speed:"250GB+ · 3 free lines",price:"189"},
];

export default function Mobile() {
  const T = useTheme();
  return (
    <>
      <PageHero icon={I.phone(T.primary,28)} tag="Mobile & 5G" title="Unifi Mobile Plans" subtitle="5G data from RM39/mo. Family plans with free extra lines. Free 5G phones with device bundles." />
      <section style={{padding:"0 24px 40px",maxWidth:900,margin:"0 auto"}}>
        <SectionLabel text="Individual Plans" />
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14,marginBottom:32}}>
          {PLANS.map(p=><PlanCard key={p.name} plan={p} popular={p.highlight} />)}
        </div>

        <SectionLabel text="Family Plans" />
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14,marginBottom:12}}>
          {FAMILY.map(p=><PlanCard key={p.name} plan={p} popular={p.highlight} />)}
        </div>
        <p style={{fontSize:12,color:T.muted,textAlign:"center",marginBottom:32}}>Each free line gets 30GB. Add more Supplementary lines at RM39/mo (max 5 lines total).</p>

        <Card hover={false} style={{border:`2px solid ${UB.green}`,marginBottom:32}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:20,alignItems:"center"}}>
            <div style={{flex:"1 1 300px"}}>
              <div style={{display:"inline-block",padding:"4px 10px",borderRadius:6,background:UB.green+"12",color:UB.green,fontSize:11,fontWeight:700,marginBottom:8}}>FREE 5G PHONE</div>
              <h3 style={{fontSize:20,fontWeight:800,marginBottom:6}}>Get a free 5G phone with Uni5G</h3>
              <p style={{fontSize:14,color:T.muted,lineHeight:1.6,marginBottom:16}}>Device bundles on Uni5G 69 and above. Free 5G phone, subject to stock &amp; eligibility. 24-month contract.</p>
              <WaBtn text="Check Free Phone Options" msg="I want to check which free 5G phone I can get with Uni5G." utm="free_phone" />
            </div>
          </div>
        </Card>

        <p style={{textAlign:"center",fontSize:11,color:T.muted,marginTop:20}}>Hotspot uses your data quota. Advance payment may apply. Prices exclude 6% SST.</p>
      </section>
      <section style={{padding:"40px 24px 80px",textAlign:"center"}}>
        <WaBtn text="Check My Eligibility" msg="I want to check my eligibility for Uni5G plans and a free 5G phone." utm="mobile_page" />
      </section>
    </>
  );
}
