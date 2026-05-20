import { useTheme, Icons as I, Card, WaBtn, PageHero } from "../theme";

const UB = { blue:"#0033A1", sky:"#00A3E0", green:"#00B67A" };

export default function AirBiz() {
  const T = useTheme();
  return (
    <>
      <PageHero icon={I.wifi(T.primary,28)} tag="Wireless Broadband" title="Unifi Air & Uni5G" subtitle="No wiring needed. Plug in and go online in minutes. Perfect for new outlets, pop-ups, or areas without fibre." />
      <section style={{padding:"0 24px 40px",maxWidth:700,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginBottom:32}}>
          {[
            {name:"Uni5G 39",price:"39",feat:["30GB 5G/4G data","Add RM1 for 200GB extra","No contract"]},
            {name:"Uni5G 69",price:"69",feat:["Unlimited 5G/4G","60GB hotspot","No contract"],pop:"Best Value"},
            {name:"Unifi Air 99",price:"99",feat:["Unlimited data","Free 5G router","24-month contract"],pop:"With Router"},
          ].map(p=>(
            <Card key={p.name} color={p.pop?UB.blue:undefined} style={{textAlign:"center",border:p.pop?`2px solid ${UB.blue}`:undefined}}>
              {p.pop&&<div style={{position:"absolute",top:0,left:0,right:0,background:UB.blue,color:"white",fontSize:10,fontWeight:700,padding:"4px 0"}}>{p.pop}</div>}
              <div style={{paddingTop:p.pop?14:0}}>
                <h3 style={{fontSize:16,fontWeight:700}}>{p.name}</h3>
                <div style={{fontSize:34,fontWeight:800,margin:"8px 0"}}><span style={{fontSize:13,color:T.muted}}>RM</span>{p.price}</div>
                <div style={{fontSize:11,color:T.muted,marginBottom:12}}>/month</div>
                {p.feat.map(f=><div key={f} style={{fontSize:12,color:T.muted,padding:"2px 0",display:"flex",alignItems:"center",gap:5,justifyContent:"center"}}>{I.check(UB.green,12)}{f}</div>)}
                <WaBtn text="Apply" msg={`I want to apply for *${p.name}* (RM${p.price}/mo).`} utm={`air_${p.price}`} sm style={{width:"100%",justifyContent:"center",marginTop:14,fontSize:12}} />
              </div>
            </Card>
          ))}
        </div>

        <Card hover={false}>
          <h4 style={{fontSize:15,fontWeight:700,marginBottom:12}}>Fibre vs Wireless — which is better?</h4>
          <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr style={{borderBottom:`2px solid ${T.border}`}}><th style={{textAlign:"left",padding:"10px 12px",color:T.muted}}></th><th style={{textAlign:"center",padding:"10px",fontWeight:700}}>Fibre</th><th style={{textAlign:"center",padding:"10px",fontWeight:700}}>Wireless 5G</th></tr></thead>
            <tbody>
              {[["Installation","3–7 days","Instant"],["Stability","Best","Coverage-dependent"],["Portability","No","Yes"],["Speed","Up to 2Gbps","Up to 1Gbps"],["Best for","Permanent location","Flexibility / backup"]].map(([f,a,b],i)=>
                <tr key={f} style={{borderBottom:`1px solid ${T.border}40`,background:i%2===0?T.sub:"transparent"}}><td style={{padding:"10px 12px",color:T.muted,fontWeight:500}}>{f}</td><td style={{padding:"10px",textAlign:"center"}}>{a}</td><td style={{padding:"10px",textAlign:"center"}}>{b}</td></tr>
              )}
            </tbody>
          </table></div>
        </Card>
      </section>
      <section style={{padding:"40px 24px 80px",textAlign:"center"}}>
        <WaBtn text="Get Wireless Broadband" msg="I want to apply for Unifi wireless broadband (Uni5G / Unifi Air)." utm="air_page" />
      </section>
    </>
  );
}
