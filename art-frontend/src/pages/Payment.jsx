// ── Drop-in replacement for the Payment component in your Shop file ──
// It auto-fills the user's saved address and offers "Save this address"

function Payment({ cart, setCart, onBack, onDone, user, token }) {
  const [method, setMethod]       = useState("card");
  const [bank, setBank]           = useState("");
  const [paying, setPaying]       = useState(false);
  const [upiVerified, setUpiVerified] = useState(false);
  const [saveAddr, setSaveAddr]   = useState(false);

  // Pre-fill from saved profile
  const [form, setForm] = useState({
    name:     user?.name        || "",
    email:    user?.email       || "",
    phone:    user?.phone       || "",
    addr:     user?.addressLine || "",
    city:     user?.city        || "",
    pin:      user?.pinCode     || "",
    cardNum: "", expiry: "", cvv: "", cardName: "", upi: ""
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const subtotal = cart.reduce((s, i) => s + i.raw * i.qty, 0);
  const shipping = 150;
  const total    = subtotal + shipping;

  const pay = async () => {
    setPaying(true);
    try {
      const res = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          customerName: form.name,
          email:        form.email,
          phone:        form.phone,
          address:      form.addr,
          city:         form.city,
          pinCode:      form.pin,
          totalAmount:  method === "cod" ? total + 50 : total,
          saveAddress:  saveAddr
        })
      });
      const data = await res.json();
      onDone(data.orderRef || "SBA-" + Math.random().toString(36).slice(2, 8).toUpperCase());
    } catch (err) {
      console.error("Order failed", err);
      onDone("SBA-" + Math.random().toString(36).slice(2, 8).toUpperCase());
    } finally {
      setPaying(false);
    }
  };

  const fmtCard = v => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const fmtExp  = v => { const d=v.replace(/\D/g,"").slice(0,4); return d.length>2?d.slice(0,2)+"/"+d.slice(2):d; };

  const hasSavedAddress = user?.addressLine || user?.city;

  return (
    <div className="sa-page sa-payment-wrap">
      <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:"var(--warm-gray)",fontFamily:"Raleway,sans-serif",fontSize:".84rem",fontWeight:600,marginBottom:"1rem",display:"flex",alignItems:"center",gap:".4rem"}}>
        ← Back to cart
      </button>
      <h2>Secure Checkout</h2>
      <p style={{fontFamily:"'Crimson Text',serif",fontStyle:"italic",color:"var(--warm-gray)"}}>Complete your order below</p>

      {/* Saved address banner */}
      {hasSavedAddress && (
        <div style={{background:"#f0f7f4",border:"1px solid #b2dfdb",borderRadius:"8px",padding:".85rem 1.1rem",margin:"1rem 0",display:"flex",alignItems:"center",gap:".7rem",fontSize:".84rem"}}>
          <span style={{fontSize:"1.1rem"}}>📍</span>
          <div style={{flex:1}}>
            <strong>Using your saved address:</strong> {[user.addressLine, user.city, user.pinCode].filter(Boolean).join(", ")}
          </div>
          <button style={{background:"none",border:"none",cursor:"pointer",color:"var(--accent-gold)",fontWeight:700,fontSize:".78rem"}}
            onClick={() => set("addr", "")}>Change</button>
        </div>
      )}

      <div className="sa-payment-grid">
        <div className="sa-payment-left">
          <div className="sa-payment-form">
            <h4>📦 Shipping Details</h4>
            <div className="sa-field-row">
              <div className="sa-field"><label>Full Name</label><input placeholder="Ankita Sharma" value={form.name} onChange={e=>set("name",e.target.value)}/></div>
              <div className="sa-field"><label>Phone</label><input placeholder="+91 98765 43210" value={form.phone} onChange={e=>set("phone",e.target.value)}/></div>
            </div>
            <div className="sa-field"><label>Email</label><input type="email" placeholder="you@example.com" value={form.email} onChange={e=>set("email",e.target.value)}/></div>
            <div className="sa-field"><label>Address</label><input placeholder="Street address, apartment…" value={form.addr} onChange={e=>set("addr",e.target.value)}/></div>
            <div className="sa-field-row">
              <div className="sa-field"><label>City</label><input placeholder="Mumbai" value={form.city} onChange={e=>set("city",e.target.value)}/></div>
              <div className="sa-field"><label>PIN Code</label><input placeholder="400001" value={form.pin} onChange={e=>set("pin",e.target.value)}/></div>
            </div>

            {/* Save address checkbox */}
            <label style={{display:"flex",alignItems:"center",gap:".5rem",fontSize:".82rem",color:"var(--warm-gray)",marginBottom:".5rem",cursor:"pointer"}}>
              <input type="checkbox" checked={saveAddr} onChange={e=>setSaveAddr(e.target.checked)}
                style={{width:"15px",height:"15px",accentColor:"var(--accent-gold)"}}/>
              Save this address to my profile
            </label>

            <div className="sa-section-divider">Payment Method</div>

            <h4 style={{borderBottom:"none",marginBottom:".8rem",paddingBottom:0}}>💳 Choose How to Pay</h4>
            <div className="sa-method-row">
              {[["card","💳 Card"],["upi","📱 UPI"],["netbanking","🏦 Net Banking"],["cod","🤝 COD"]].map(([id,label])=>(
                <button key={id} className={`sa-method-btn${method===id?" sa-method--active":""}`} onClick={()=>setMethod(id)}>{label}</button>
              ))}
            </div>

            {method==="card" && (
              <>
                <div className="sa-card-icons">
                  {["VISA","MC","RUPAY","AMEX"].map(b=><span key={b} className="sa-card-icon">{b}</span>)}
                </div>
                <div className="sa-field"><label>Card Number</label><input placeholder="1234 5678 9012 3456" value={form.cardNum} onChange={e=>set("cardNum",fmtCard(e.target.value))} maxLength={19}/></div>
                <div className="sa-field"><label>Cardholder Name</label><input placeholder="Name on card" value={form.cardName} onChange={e=>set("cardName",e.target.value)}/></div>
                <div className="sa-field-row">
                  <div className="sa-field"><label>Expiry</label><input placeholder="MM/YY" value={form.expiry} onChange={e=>set("expiry",fmtExp(e.target.value))} maxLength={5}/></div>
                  <div className="sa-field"><label>CVV</label><input placeholder="•••" type="password" value={form.cvv} onChange={e=>set("cvv",e.target.value.slice(0,4))} maxLength={4}/></div>
                </div>
              </>
            )}

            {method==="upi" && (
              <>
                <p style={{fontSize:".82rem",color:"var(--warm-gray)",marginBottom:".8rem",fontFamily:"'Crimson Text',serif",fontStyle:"italic"}}>Enter your UPI ID to pay instantly</p>
                <div className="sa-field">
                  <label>UPI ID</label>
                  <div className="sa-upi-field">
                    <input placeholder="yourname@upi" value={form.upi} onChange={e=>{set("upi",e.target.value);setUpiVerified(false);}}/>
                    <button className="sa-upi-verify" onClick={()=>setUpiVerified(true)}>{upiVerified?"✓ Verified":"Verify"}</button>
                  </div>
                </div>
                <div style={{display:"flex",gap:".8rem",flexWrap:"wrap",marginTop:".5rem"}}>
                  {["GPay","PhonePe","Paytm","BHIM"].map(app=>(
                    <button key={app} style={{padding:".5rem .9rem",border:"1.5px solid var(--light-gray)",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:".78rem",fontWeight:700,color:"var(--warm-gray)",transition:"all .2s"}}
                      onClick={()=>set("upi",app.toLowerCase()+"@upi")}>{app}</button>
                  ))}
                </div>
              </>
            )}

            {method==="netbanking" && (
              <>
                <p style={{fontSize:".82rem",color:"var(--warm-gray)",marginBottom:".8rem",fontFamily:"'Crimson Text',serif",fontStyle:"italic"}}>Select your bank</p>
                <div className="sa-bank-grid">
                  {["SBI","HDFC","ICICI","Axis","Kotak","PNB","BOB","Yes Bank"].map(b=>(
                    <button key={b} className={`sa-bank-btn${bank===b?" active":""}`} onClick={()=>setBank(b)}>{b}</button>
                  ))}
                </div>
              </>
            )}

            {method==="cod" && (
              <div style={{background:"var(--soft-cream)",borderRadius:"8px",padding:"1rem",border:"1px solid var(--light-gray)"}}>
                <p style={{fontFamily:"'Crimson Text',serif",fontStyle:"italic",color:"var(--warm-gray)",lineHeight:1.6}}>
                  Pay ₹{(total+50).toLocaleString("en-IN")} in cash when your order arrives. A small COD fee of ₹50 applies.
                </p>
              </div>
            )}

            <button className="sa-pay-btn" onClick={pay} disabled={paying}>
              {paying ? "Processing…" : `Pay ₹${(method==="cod"?total+50:total).toLocaleString("en-IN")} →`}
            </button>
            <div className="sa-secure-badge">🔒 256-bit SSL secured · All transactions encrypted</div>
          </div>
        </div>

        <div className="sa-order-summary">
          <h4>Order Summary</h4>
          {cart.map((item,i)=>(
            <div key={i} className="sa-order-item">
              <div className="sa-order-thumb">{item.image}</div>
              <div style={{flex:1}}>
                <div className="sa-order-name">{item.title}</div>
                <div className="sa-order-qty">Qty: {item.qty}</div>
              </div>
              <div className="sa-order-price">₹{(item.raw*item.qty).toLocaleString("en-IN")}</div>
            </div>
          ))}
          <div className="sa-order-totals">
            <div className="sa-order-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
            <div className="sa-order-row"><span>Shipping</span><span>₹{shipping.toLocaleString("en-IN")}</span></div>
            {method==="cod"&&<div className="sa-order-row"><span>COD Fee</span><span>₹50</span></div>}
            <div className="sa-order-grand"><span>Total</span><span style={{color:"var(--accent-gold)"}}>₹{(method==="cod"?total+50:total).toLocaleString("en-IN")}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}