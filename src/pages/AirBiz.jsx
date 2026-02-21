import { useTheme, Icons, Card, WaBtn, PageHero, PlanCard, SpecTable } from "../theme";

const PLANS=[
  {name:"Air Biz 5G 99",speed:"5G Wireless",price:"99",contract:"24 months",highlight:"Recommended"},
  {name:"Air Biz 5G 149",speed:"5G Wireless",price:"149",contract:"24 months"},
];
const SPECS=[
  {label:"FREE Device",values:["5G Router (WiFi 6) or Mi-Fi","5G Router (WiFi 6)"]},
  {label:"Network",values:["Unlimited 5G (FUP)","Unlimited 5G (no cap)"]},
  {label:"Devices",values:["Up to 5","Up to 10"]},
  {label:"Upfront",values:["RM99","RM149"]},
  {label:"Contract",values:["24 months / No contract (SIM)","24 months / No contract (SIM)"]},
];

export default function AirBiz() {
  const T = useTheme();
  return (
    <>
      <PageHero icon={Icons.wifi(T.primary,28)} tag="Wireless Connectivity" title="Unifi Air Biz 5G" subtitle="Wireless 5G broadband — plug-and-play, no wiring needed. Perfect for shops, pop-ups, and offices without fibre." />
      <section style={{padding:"0 24px 60px",maxWidth:700,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,marginBottom:32}}>
          {PLANS.map(p=><PlanCard key={p.name} plan={p} popular={p.highlight} />)}
        </div>
        <Card hover={false}><h3 style={{fontSize:17,fontWeight:700,marginBottom:4}}>Plan Comparison</h3><SpecTable specs={SPECS} plans={PLANS} /></Card>
        <div style={{marginTop:32,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14}}>
          {[{i:Icons.zap,t:"Plug & Play",d:"No wiring. Set up in minutes."},{i:Icons.globe,t:"Portable",d:"Move when your business moves."},{i:Icons.wifi,t:"5G Speeds",d:"Blazing fast unlimited data."},{i:Icons.shield,t:"Backup Ready",d:"Primary or backup line."}].map(f=>(
            <Card key={f.t} style={{padding:18,textAlign:"center"}}>
              <div style={{width:40,height:40,borderRadius:10,background:T.primary+"0A",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:10}}>{f.i(T.primary,18)}</div>
              <div style={{fontWeight:700,fontSize:14,color:T.text}}>{f.t}</div>
              <div style={{fontSize:12,color:T.muted,marginTop:4}}>{f.d}</div>
            </Card>
          ))}
        </div>
      </section>
      <section style={{padding:"40px 24px 80px",textAlign:"center"}}>
        <WaBtn text="Get Air Biz 5G" msg="Hi, I'm interested in Unifi Air Biz 5G. Please help me choose the right plan." />
      </section>
    </>
  );
}
