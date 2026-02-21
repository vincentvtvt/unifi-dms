import { useTheme, B, Card, WaBtn, Nav, Footer, PageHero, PlanCard, SpecTable, globalStyles } from "../theme";

const PLANS = [
  { name:"Unifi Air Biz 5G 99", speed:"5G Wireless", price:"99", contract:"24 months (device) / No contract (SIM only)", highlight:"Recommended" },
  { name:"Unifi Air Biz 5G 149", speed:"5G Wireless", price:"149", contract:"24 months (device) / No contract (SIM only)" },
];

const SPECS = [
  { label:"FREE Device", values:["5G Router (Wi-Fi 6) or 5G Mi-Fi","5G Router (Wi-Fi 6)"] },
  { label:"Network", values:["Unlimited 5G Data (FUP applies)","Unlimited 5G Data (no data caps)"] },
  { label:"Connectivity", values:["Up to 5 devices","Up to 10 devices"] },
  { label:"Upfront Payment", values:["RM99","RM149"] },
  { label:"Contract", values:["With Device – 24 months\nSIM Only – No Contract","With Device – 24 months\nSIM Only – No Contract"] },
];

export default function AirBiz() {
  const T = useTheme();
  return (
    <div style={{fontFamily:"'Outfit',sans-serif",background:T.bg,color:T.text,minHeight:"100vh"}}>
      <style>{globalStyles(T)}</style>
      <Nav />
      <PageHero icon="📡" tag="Wireless Connectivity" title="Unifi Air Biz 5G" subtitle="Reliable wireless 5G broadband — plug-and-play, no wiring needed. Perfect for shops, pop-ups, and offices without fibre coverage." />

      <section style={{padding:"0 24px 60px",maxWidth:700,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,marginBottom:32}}>
          {PLANS.map((p,i)=><PlanCard key={p.name} plan={p} popular={p.highlight} color={i===0?B.orange:undefined} />)}
        </div>

        <Card>
          <h3 style={{fontSize:18,fontWeight:700,marginBottom:8}}>📋 Plan Comparison</h3>
          <SpecTable specs={SPECS} plans={PLANS} />
        </Card>

        <div style={{marginTop:32}}>
          <Card color={B.orange}>
            <h3 style={{fontSize:16,fontWeight:700,marginBottom:12}}>💡 Why Air Biz?</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16}}>
              {[
                {i:"📦",t:"Plug & Play",d:"No wiring, no drilling. Set up in minutes."},
                {i:"🔄",t:"Portable",d:"Move your connection when your business moves."},
                {i:"📶",t:"5G Speeds",d:"Blazing fast wireless with unlimited data."},
                {i:"🛡️",t:"Backup Ready",d:"Great as primary or backup internet line."},
              ].map(f=>(
                <div key={f.t} style={{padding:12,background:T.sub,borderRadius:10}}>
                  <span style={{fontSize:24}}>{f.i}</span>
                  <div style={{fontWeight:600,fontSize:13,marginTop:6}}>{f.t}</div>
                  <div style={{fontSize:12,color:T.muted,marginTop:2}}>{f.d}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <p style={{textAlign:"center",fontSize:12,color:T.muted,marginTop:16}}>* Prices exclude 6% SST • Subject to 5G coverage area</p>
      </section>

      <section style={{padding:"40px 24px 80px",textAlign:"center"}}>
        <WaBtn text="Get Air Biz 5G" msg="Hi, I'm interested in Unifi Air Biz 5G wireless broadband. Please help me choose the right plan." />
      </section>
      <Footer />
    </div>
  );
}
