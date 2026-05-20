import { useTheme, Icons as I, Card, SectionLabel, WaBtn, PlanCard, PageHero } from "../theme";

const UB = { blue:"#0033A1", sky:"#00A3E0", orange:"#FF6B00", green:"#00B67A", red:"#E5002B" };

const PLANS = [
  {name:"Uni5G 39",speed:"SIM Only",price:"39",highlight:"RM1.30/day"},
  {name:"Uni5G 69",speed:"Unlimited 5G",price:"69",highlight:"Best Value"},
  {name:"Unifi Air 99",speed:"Wireless BB",price:"99",highlight:"Free Router"},
];
const PHONES = ["OPPO A6t 5G","nubia Neo 3 5G","REDMI 15C 5G","Samsung Galaxy A17 5G","HONOR 400 Smart 5G"];

export default function Mobile() {
  const T = useTheme();
  return (
    <>
      <PageHero icon={I.phone(T.primary,28)} tag="Mobile & 5G" title="Unifi Mobile Plans" subtitle="5G data from RM39/mo. Free 5G smartphone for existing Unifi customers." />
      <section style={{padding:"0 24px 40px",maxWidth:900,margin:"0 auto"}}>
        <SectionLabel text="5G Plans" />
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14,marginBottom:32}}>
          {PLANS.map(p=><PlanCard key={p.name} plan={p} popular={p.highlight} />)}
        </div>

        <Card hover={false} style={{border:`2px solid ${UB.green}`,marginBottom:32}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:20,alignItems:"center"}}>
            <div style={{flex:"1 1 300px"}}>
              <div style={{display:"inline-block",padding:"4px 10px",borderRadius:6,background:UB.green+"12",color:UB.green,fontSize:11,fontWeight:700,marginBottom:8}}>FREE SMARTPHONE PROMO</div>
              <h3 style={{fontSize:20,fontWeight:800,marginBottom:6}}>Uni5G RM99 → Pay only RM69/mo</h3>
              <p style={{fontSize:14,color:T.muted,lineHeight:1.6,marginBottom:12}}>RM30 rebate for existing Unifi customers. Unlimited 5G + 100GB hotspot + free 5G phone. 24-month contract.</p>
              <div style={{fontSize:13,fontWeight:600,marginBottom:8}}>Choose your free phone:</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>
                {PHONES.map(p=><span key={p} style={{padding:"5px 10px",borderRadius:6,background:T.sub,border:`1px solid ${T.border}`,fontSize:11,fontWeight:500}}>{p}</span>)}
              </div>
              <WaBtn text="Claim Free Phone" msg="Hi, I'm an existing Unifi customer. I'd like to claim the free smartphone promo with Uni5G RM99 (RM69 with rebate)." utm="free_phone" />
            </div>
          </div>
        </Card>

        <Card hover={false} style={{background:T.sub}}>
          <h4 style={{fontSize:15,fontWeight:700,marginBottom:8}}>Who's eligible for the free phone?</h4>
          <div style={{fontSize:13,color:T.muted,lineHeight:1.8}}>
            {[
              "Existing Unifi Mobile (Uni5G) customer → directly eligible",
              "Existing Unifi Home + Mobile → directly eligible",
              "Existing Unifi Home only → sign up 1 new Uni5G line to qualify",
              "No Unifi at all → sign up Uni5G first, 6 months on-time payment, then eligible",
            ].map(r=><div key={r} style={{display:"flex",gap:6,marginBottom:4}}>{I.check(UB.green,13)}<span>{r}</span></div>)}
          </div>
        </Card>

        <p style={{textAlign:"center",fontSize:11,color:T.muted,marginTop:20}}>Advance payment required on same day. Prices exclude 6% SST.</p>
      </section>
      <section style={{padding:"40px 24px 80px",textAlign:"center"}}>
        <WaBtn text="Check My Eligibility" msg="Hi, I'd like to check if I'm eligible for the Unifi free smartphone promo. Can you help?" utm="mobile_page" />
      </section>
    </>
  );
}
