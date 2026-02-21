import { useTheme, B, Card, WaBtn, Nav, Footer, PageHero, PlanCard, SpecTable, globalStyles } from "../theme";

const PLANS = [
  { name:"Basic", price:"11", contract:"Monthly" },
  { name:"Basic Plus", price:"17", contract:"Monthly" },
  { name:"Standard", price:"32", contract:"Monthly", highlight:"Recommended" },
  { name:"Advance", price:"52", contract:"Monthly" },
  { name:"Enterprise", price:"95", contract:"Monthly" },
  { name:"Freemium", price:"FREE", contract:"Monthly" },
];

const SPECS = [
  { label:"Users", values:["Up to 2","Up to 2","Up to 3","Up to 5","Up to 10","1"] },
  { label:"Storage", values:["500GB","1TB","1.5TB","3TB","5TB","15GB"] },
  { label:"Media Compatibility", values:["✓","✓","✓","✓","✓","✓"] },
  { label:"Enterprise Security", values:["✓","✓","✓","✓","✓","✓"] },
  { label:"Local Data Residency", values:["✓","✓","✓","✓","✓","✓"] },
  { label:"Storage Upgrade (1TB for RM25/mth)", values:["✓","✓","✓","✓","✓","-"] },
  { label:"Add Users (5 users for RM10/mth)", values:["✓","✓","✓","✓","✓","-"] },
];

export default function CloudStorage() {
  const T = useTheme();
  return (
    <div style={{fontFamily:"'Outfit',sans-serif",background:T.bg,color:T.text,minHeight:"100vh"}}>
      <style>{globalStyles(T)}</style>
      <Nav />
      <PageHero icon="☁️" tag="Digital Solutions" title="Unifi Cloud Storage" subtitle="Secure cloud storage hosted in TM's Tier-3 certified data centres. Enterprise-grade security with local data residency in Malaysia." />

      <section style={{padding:"0 24px 60px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:14,marginBottom:32}}>
          {PLANS.map((p,i)=><PlanCard key={p.name} plan={p} popular={p.highlight} color={i===4?"#FF3D00":i===5?"#059669":undefined} />)}
        </div>

        <Card>
          <h3 style={{fontSize:18,fontWeight:700,marginBottom:8}}>📋 Plan Comparison</h3>
          <SpecTable specs={SPECS} plans={PLANS} />
        </Card>

        <div style={{marginTop:32,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:16}}>
          <Card color={T.primary}>
            <h3 style={{fontSize:16,fontWeight:700,marginBottom:12}}>🔒 Enterprise Security</h3>
            <p style={{fontSize:14,color:T.muted,lineHeight:1.7}}>All plans include enterprise-level security with encryption at rest and in transit. Your data stays safe in TM's certified Malaysian data centres.</p>
          </Card>
          <Card color="#059669">
            <h3 style={{fontSize:16,fontWeight:700,marginBottom:12}}>🇲🇾 Local Data Residency</h3>
            <p style={{fontSize:14,color:T.muted,lineHeight:1.7}}>Data stored locally in Malaysia's Tier-3 data centres. Compliant with local data regulations — your business data never leaves the country.</p>
          </Card>
        </div>

        <p style={{textAlign:"center",fontSize:12,color:T.muted,marginTop:16}}>* Prices exclude 6% SST • For TM Customers • Freemium plan limited to 15GB & 1 user</p>
      </section>

      <section style={{padding:"40px 24px 80px",textAlign:"center"}}>
        <WaBtn text="Get Cloud Storage" msg="Hi, I'm interested in Unifi Cloud Storage. Please help me choose the right plan for my business." />
      </section>
      <Footer />
    </div>
  );
}
