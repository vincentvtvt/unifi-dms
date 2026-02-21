import { useTheme, B, Card, WaBtn, Nav, Footer, PageHero, PlanCard, SpecTable, globalStyles } from "../theme";

const PLANS = [
  { name:"UNI5G Business 39", speed:"5G Mobile", price:"39", contract:"24 months (device) / No contract (SIM only)" },
  { name:"UNI5G Business 69", speed:"5G Mobile", price:"69", contract:"24 months (device) / No contract (SIM only)", highlight:"Exclusive Offer" },
  { name:"UNI5G Business 99", speed:"5G Mobile", price:"99", contract:"24 months (device) / No contract (SIM only)", highlight:"Exclusive Offer" },
];

const SPECS = [
  { label:"Special Offer", values:["230GB high-speed data (30GB 5G/4G + 100GB 5G/4G + 100GB 5G for RM1)","From RM69 with FREE Samsung Flagship 5G Smartphone","From RM99 with FREE Samsung Flagship 5G Smartphone"] },
  { label:"Data", values:["30GB (5G & 4G)","Unlimited 5G + 60GB 4G","Unlimited Data (5G & 4G)"] },
  { label:"Hotspot", values:["30GB","60GB","100GB"] },
  { label:"Calls", values:["Unlimited","Unlimited","Unlimited"] },
  { label:"SMS", values:["RM0.15/SMS","RM0.15/SMS","RM0.15/SMS"] },
  { label:"Add-On Extra Data", values:["10GB for RM10 / 50GB for RM45","10GB for RM10 / 50GB for RM45","10GB for RM10 / 50GB for RM45"] },
];

export default function Mobile() {
  const T = useTheme();
  return (
    <div style={{fontFamily:"'Outfit',sans-serif",background:T.bg,color:T.text,minHeight:"100vh"}}>
      <style>{globalStyles(T)}</style>
      <Nav />
      <PageHero icon="📶" tag="Business Mobile" title="UNI5G Business Plans" subtitle="Unlimited 5G mobile plans with free flagship smartphones. Keep your team connected everywhere." />

      <section style={{padding:"0 24px 60px",maxWidth:900,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16,marginBottom:32}}>
          {PLANS.map((p,i)=><PlanCard key={p.name} plan={p} popular={p.highlight} color={i===2?"#FF3D00":i===1?B.orange:undefined} />)}
        </div>

        <Card>
          <h3 style={{fontSize:18,fontWeight:700,marginBottom:8}}>📋 Plan Comparison</h3>
          <SpecTable specs={SPECS} plans={PLANS} />
        </Card>

        <div style={{marginTop:32}}>
          <Card color={B.orange}>
            <h3 style={{fontSize:16,fontWeight:700,marginBottom:12}}>📱 FREE Samsung 5G Smartphones</h3>
            <p style={{fontSize:14,color:T.muted,lineHeight:1.7}}>
              UNI5G Business 69 and 99 plans come with a <span style={{color:B.orange,fontWeight:700}}>FREE Samsung Flagship 5G Smartphone</span>. Get the latest device at no extra cost with a 24-month contract. SIM-only options available with no contract commitment.
            </p>
          </Card>
        </div>

        <p style={{textAlign:"center",fontSize:12,color:T.muted,marginTop:16}}>* Prices exclude 6% SST • Device subject to availability • Fair Usage Policy applies</p>
      </section>

      <section style={{padding:"40px 24px 80px",textAlign:"center"}}>
        <WaBtn text="Get UNI5G Business" msg="Hi, I'm interested in UNI5G Business mobile plan. Please help me choose the right plan for my business." />
      </section>
      <Footer />
    </div>
  );
}
