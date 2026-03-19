import React, { useState, useEffect } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Architects+Daughter&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Raleway:wght@300;400;500;600;700&display=swap');

  :root {
    --ink-black: #1a1a1a; --paper-white: #fdfdf9; --warm-gray: #736b5e;
    --light-gray: #e8e6df; --accent-gold: #b8956a; --sketch-blue: #4a6670; --soft-cream: #f5f3ed;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Raleway', sans-serif; color: var(--ink-black); background: var(--paper-white); line-height: 1.7; -webkit-font-smoothing: antialiased; overflow-x: hidden; }

  .sa-page { animation: saFade .4s ease both; }
  @keyframes saFade { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }

  .sa-shop-header { background: var(--soft-cream); padding: 2.5rem 2rem 1.2rem; text-align: center; border-bottom: 1px solid var(--light-gray); }
  .sa-shop-header h2 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 300; margin-bottom: .3rem; }
  .sa-subtitle { font-family: 'Crimson Text', serif; color: var(--warm-gray); font-size: 1.02rem; font-style: italic; }

  .sa-filters { display: flex; justify-content: center; flex-wrap: wrap; gap: .8rem; margin: 1.2rem 0 1.8rem; }
  .sa-chip { padding: .6rem 1.2rem; background: white; border: 2px solid var(--light-gray); cursor: pointer; transition: all .22s; font-weight: 600; color: var(--warm-gray); border-radius: 30px; font-size: .78rem; text-transform: uppercase; }
  .sa-chip:hover, .sa-chip.sa-chip--active { background: var(--ink-black); color: white; border-color: var(--ink-black); transform: translateY(-3px); }

  .sa-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.2rem; padding: 0 2rem 3rem; max-width: 1400px; margin: 0 auto; }
  .sa-card { background: white; border: 1px solid var(--light-gray); border-radius: 10px; overflow: hidden; transition: all .3s; cursor: pointer; position: relative; }
  .sa-card:hover { border-color: var(--accent-gold); box-shadow: 0 18px 45px rgba(0,0,0,0.09); transform: translateY(-8px); }
  .sa-card-img { aspect-ratio: 4/5; background: linear-gradient(135deg, var(--soft-cream), var(--light-gray)); display: flex; align-items: center; justify-content: center; color: var(--warm-gray); font-family: 'Architects Daughter', cursive; font-size: .95rem; position: relative; overflow: hidden; }
  .sa-card-img::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 55%, rgba(26,26,26,0.55)); opacity: 0; transition: opacity .35s; }
  .sa-card:hover .sa-card-img::after { opacity: 1; }
  .sa-badge { position: absolute; top: 1rem; right: 1rem; z-index: 2; background: var(--accent-gold); color: white; padding: .35rem .75rem; font-size: .68rem; font-weight: 700; letter-spacing: .8px; border-radius: 6px; font-family: 'Raleway', sans-serif; text-transform: uppercase; }
  .sa-wishlist { position: absolute; top: 1rem; left: 1rem; z-index: 2; width: 32px; height: 32px; border-radius: 50%; background: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: all .22s; }
  .sa-wishlist:hover { transform: scale(1.15); background: #fff0f0; }
  .sa-wishlist.sa-wishlist--active { color: #e74c3c; }
  .sa-info { padding: 1.1rem 1.2rem 1.4rem; }
  .sa-title { font-family: 'Cormorant Garamond', serif; font-size: 1.12rem; font-weight: 600; margin-bottom: .25rem; }
  .sa-size { color: var(--warm-gray); font-size: .84rem; margin-bottom: .6rem; }
  .sa-row { display: flex; align-items: center; justify-content: space-between; gap: .6rem; }
  .sa-price { font-weight: 700; font-size: 1.05rem; color: var(--accent-gold); }
  .sa-buy { padding: .55rem 1.15rem; border: none; border-radius: 6px; background: var(--ink-black); color: white; font-family: 'Raleway', sans-serif; font-size: .75rem; font-weight: 700; letter-spacing: .8px; text-transform: uppercase; cursor: pointer; transition: all .28s; white-space: nowrap; }
  .sa-buy:hover { background: var(--sketch-blue); transform: translateY(-2px); }
  .sa-buy.sa-buy--added { background: #2e7d52; }

  .sa-cart-bar { max-width: 1400px; margin: 0 auto; padding: 1rem 2rem .2rem; display: flex; justify-content: flex-end; }
  .sa-cart-btn { display: flex; align-items: center; gap: .5rem; background: white; border: 2px solid var(--light-gray); border-radius: 30px; padding: .5rem 1.1rem; cursor: pointer; font-family: 'Raleway', sans-serif; font-size: .8rem; font-weight: 700; color: var(--warm-gray); transition: all .22s; }
  .sa-cart-btn:hover { border-color: var(--accent-gold); color: var(--accent-gold); }
  .sa-cart-count { background: var(--accent-gold); color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: .72rem; }

  .sa-toast { position: fixed; bottom: 2rem; right: 2rem; z-index: 9999; background: var(--ink-black); color: white; padding: 1rem 1.6rem; border-radius: 10px; font-size: .9rem; font-weight: 600; box-shadow: 0 12px 40px rgba(0,0,0,0.2); animation: saSlideUp .35s ease both; display: flex; align-items: center; gap: .8rem; }
  @keyframes saSlideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
  .sa-toast span { color: var(--accent-gold); font-size: 1.2rem; }

  .sa-overlay { position: fixed; top: 60px; left: 0; right: 0; bottom: 0; background: rgba(26,26,26,0.5); z-index: 1000; animation: saFade .25s ease both; }
  .sa-drawer { position: fixed; top: 60px; right: 0; bottom: 0; width: 420px; max-width: 95vw; background: var(--paper-white); z-index: 1001; display: flex; flex-direction: column; box-shadow: -20px 0 60px rgba(0,0,0,0.15); animation: saDrawer .3s ease both; }
  @keyframes saDrawer { from { transform: translateX(100%); } to { transform: none; } }
  .sa-drawer-head { display: flex; align-items: center; justify-content: space-between; padding: 1.4rem 1.6rem; border-bottom: 1px solid var(--light-gray); background: white; }
  .sa-drawer-head h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; }
  .sa-drawer-close { background: none; border: none; font-size: 1.4rem; cursor: pointer; color: var(--warm-gray); padding: .2rem .5rem; border-radius: 4px; transition: all .2s; }
  .sa-drawer-close:hover { background: var(--soft-cream); color: var(--ink-black); }
  .sa-drawer-body { flex: 1; overflow-y: auto; padding: 1rem 1.6rem; }
  .sa-drawer-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem; color: var(--warm-gray); }
  .sa-drawer-empty p { font-family: 'Crimson Text', serif; font-style: italic; font-size: 1.05rem; }

  .sa-cart-item { display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--light-gray); align-items: center; }
  .sa-cart-thumb { width: 64px; height: 64px; border-radius: 8px; background: linear-gradient(135deg, var(--soft-cream), var(--light-gray)); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; flex-shrink: 0; border: 1px solid var(--light-gray); }
  .sa-cart-meta { flex: 1; }
  .sa-cart-name { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-weight: 600; margin-bottom: .15rem; }
  .sa-cart-sz { font-size: .78rem; color: var(--warm-gray); margin-bottom: .3rem; }
  .sa-cart-price { font-weight: 700; color: var(--accent-gold); font-size: .95rem; }
  .sa-cart-qty { display: flex; align-items: center; gap: .5rem; margin-top: .4rem; }
  .sa-qty-btn { width: 26px; height: 26px; border-radius: 50%; border: 1.5px solid var(--light-gray); background: white; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; transition: all .2s; color: var(--ink-black); font-weight: 700; }
  .sa-qty-btn:hover { border-color: var(--accent-gold); color: var(--accent-gold); }
  .sa-qty-num { font-weight: 700; font-size: .9rem; min-width: 20px; text-align: center; }
  .sa-cart-remove { background: none; border: none; cursor: pointer; color: var(--warm-gray); font-size: .8rem; padding: .25rem .5rem; border-radius: 4px; transition: all .2s; text-transform: uppercase; letter-spacing: .5px; font-weight: 600; }
  .sa-cart-remove:hover { background: #fff0f0; color: #e74c3c; }

  .sa-drawer-foot { padding: 1.2rem 1.6rem; border-top: 1px solid var(--light-gray); background: white; }
  .sa-cart-summary { margin-bottom: 1rem; }
  .sa-summary-row { display: flex; justify-content: space-between; font-size: .88rem; color: var(--warm-gray); margin-bottom: .4rem; }
  .sa-summary-total { display: flex; justify-content: space-between; font-weight: 700; font-size: 1.05rem; color: var(--ink-black); padding-top: .6rem; border-top: 1px solid var(--light-gray); margin-top: .4rem; }
  .sa-checkout-btn { width: 100%; padding: .95rem; border: 2px solid var(--ink-black); border-radius: 8px; background: var(--ink-black); color: white; font-family: 'Raleway', sans-serif; font-size: .86rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; transition: all .3s; }
  .sa-checkout-btn:hover { background: var(--sketch-blue); border-color: var(--sketch-blue); transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,0,0,0.14); }
  .sa-continue-btn { width: 100%; padding: .75rem; border: 2px solid var(--light-gray); border-radius: 8px; background: transparent; color: var(--warm-gray); font-family: 'Raleway', sans-serif; font-size: .82rem; font-weight: 600; letter-spacing: .5px; text-transform: uppercase; cursor: pointer; transition: all .22s; margin-top: .6rem; }
  .sa-continue-btn:hover { border-color: var(--ink-black); color: var(--ink-black); }

  /* PAYMENT */
  .sa-payment-wrap { max-width: 960px; margin: 0 auto; padding: 2.5rem 2rem 4rem; }
  .sa-payment-wrap h2 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 300; margin-bottom: .3rem; }
  .sa-payment-grid { display: grid; grid-template-columns: 1fr 340px; gap: 2.5rem; margin-top: 1.8rem; align-items: start; }
  .sa-payment-left { display: flex; flex-direction: column; gap: 0; }
  .sa-payment-form { background: white; border: 1px solid var(--light-gray); border-radius: 10px; padding: 1.8rem; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
  .sa-section-divider { display: flex; align-items: center; gap: 1rem; margin: 1.4rem 0; color: var(--warm-gray); font-size: .72rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
  .sa-section-divider::before, .sa-section-divider::after { content: ''; flex: 1; height: 1px; background: var(--light-gray); }
  .sa-payment-form h4 { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 600; margin-bottom: 1.1rem; padding-bottom: .6rem; border-bottom: 1px solid var(--light-gray); }
  .sa-field { display: flex; flex-direction: column; margin-bottom: 1rem; }
  .sa-field label { font-size: .75rem; font-weight: 700; letter-spacing: .6px; text-transform: uppercase; margin-bottom: .4rem; color: var(--ink-black); }
  .sa-field input, .sa-field select { padding: .85rem 1rem; border: 1.5px solid var(--light-gray); background: var(--soft-cream); border-radius: 6px; font-family: 'Raleway', sans-serif; font-size: .9rem; color: var(--ink-black); transition: all .18s; }
  .sa-field input:focus, .sa-field select:focus { outline: none; border-color: var(--accent-gold); background: white; }
  .sa-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: .8rem; }
  .sa-method-row { display: flex; gap: .6rem; margin-bottom: 1.2rem; flex-wrap: wrap; }
  .sa-method-btn { flex: 1; min-width: 80px; padding: .65rem; border: 2px solid var(--light-gray); border-radius: 8px; background: white; cursor: pointer; font-family: 'Raleway', sans-serif; font-size: .78rem; font-weight: 700; color: var(--warm-gray); transition: all .2s; text-align: center; }
  .sa-method-btn:hover { border-color: var(--accent-gold); color: var(--accent-gold); }
  .sa-method-btn.sa-method--active { border-color: var(--ink-black); background: var(--ink-black); color: white; }
  .sa-card-icons { display: flex; gap: .5rem; margin-bottom: 1rem; }
  .sa-card-icon { padding: .3rem .6rem; border: 1px solid var(--light-gray); border-radius: 4px; font-size: .7rem; font-weight: 700; color: var(--warm-gray); background: white; }

  .sa-order-summary { background: var(--soft-cream); border: 1px solid var(--light-gray); border-radius: 10px; padding: 1.4rem; }
  .sa-order-summary h4 { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; font-weight: 600; margin-bottom: 1rem; padding-bottom: .5rem; border-bottom: 1px solid var(--light-gray); }
  .sa-order-item { display: flex; gap: .8rem; margin-bottom: .9rem; align-items: center; }
  .sa-order-thumb { width: 46px; height: 46px; border-radius: 6px; background: white; border: 1px solid var(--light-gray); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; }
  .sa-order-name { font-size: .88rem; font-weight: 600; margin-bottom: .1rem; }
  .sa-order-qty { font-size: .78rem; color: var(--warm-gray); }
  .sa-order-price { font-size: .9rem; font-weight: 700; color: var(--accent-gold); margin-left: auto; flex-shrink: 0; }
  .sa-order-totals { border-top: 1px solid var(--light-gray); margin-top: .8rem; padding-top: .8rem; }
  .sa-order-row { display: flex; justify-content: space-between; font-size: .85rem; color: var(--warm-gray); margin-bottom: .35rem; }
  .sa-order-grand { display: flex; justify-content: space-between; font-weight: 700; font-size: 1.05rem; margin-top: .5rem; padding-top: .5rem; border-top: 1px solid var(--light-gray); }

  .sa-pay-btn { width: 100%; padding: 1rem; border: none; border-radius: 8px; background: var(--accent-gold); color: white; font-family: 'Raleway', sans-serif; font-size: .9rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; transition: all .3s; margin-top: 1.4rem; }
  .sa-pay-btn:hover:not(:disabled) { background: #a07c55; transform: translateY(-3px); box-shadow: 0 14px 35px rgba(184,149,106,0.35); }
  .sa-pay-btn:disabled { opacity: .7; cursor: not-allowed; }

  .sa-success-page { display: flex; align-items: center; justify-content: center; min-height: 70vh; padding: 3rem 2rem; }
  .sa-success-card { background: white; border-radius: 14px; padding: 3.5rem 2.5rem; text-align: center; max-width: 460px; width: 100%; border: 1px solid var(--light-gray); box-shadow: 0 28px 70px rgba(0,0,0,0.08); }
  .sa-success-icon { font-size: 3.5rem; margin-bottom: 1rem; }
  .sa-success-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 600; margin-bottom: .5rem; }
  .sa-success-card p { color: var(--warm-gray); font-family: 'Crimson Text', serif; font-style: italic; font-size: 1rem; margin-bottom: 1.5rem; line-height: 1.6; }
  .sa-success-ref { background: var(--soft-cream); border-radius: 6px; padding: .6rem 1rem; display: inline-block; font-size: .82rem; font-weight: 700; color: var(--accent-gold); letter-spacing: 1px; margin-bottom: 1.5rem; }
  .sa-btn-primary { padding: .9rem 2rem; border: 2px solid var(--ink-black); border-radius: 6px; background: var(--ink-black); color: white; font-family: 'Raleway', sans-serif; font-size: .86rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; transition: all .3s; }
  .sa-btn-primary:hover { background: var(--sketch-blue); border-color: var(--sketch-blue); transform: translateY(-3px); }

  .sa-upi-field { display: flex; gap: .6rem; }
  .sa-upi-field input { flex: 1; }
  .sa-upi-verify { padding: .85rem 1.1rem; border: 2px solid var(--accent-gold); border-radius: 6px; background: transparent; color: var(--accent-gold); font-family: 'Raleway', sans-serif; font-size: .78rem; font-weight: 700; cursor: pointer; white-space: nowrap; transition: all .22s; }
  .sa-upi-verify:hover { background: var(--accent-gold); color: white; }
  .sa-bank-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; }
  .sa-bank-btn { padding: .65rem; border: 1.5px solid var(--light-gray); border-radius: 6px; background: white; cursor: pointer; font-size: .78rem; font-weight: 600; color: var(--warm-gray); transition: all .2s; text-align: center; }
  .sa-bank-btn:hover, .sa-bank-btn.active { border-color: var(--accent-gold); color: var(--accent-gold); background: rgba(184,149,106,0.06); }
  .sa-secure-badge { display: flex; align-items: center; justify-content: center; gap: .4rem; font-size: .75rem; color: var(--warm-gray); margin-top: .8rem; }

  .sa-addr-banner { background: #f0f7f4; border: 1px solid #b2dfdb; border-radius: 8px; padding: .85rem 1.1rem; margin-bottom: 1.2rem; display: flex; align-items: center; gap: .7rem; font-size: .84rem; }
  .sa-addr-change { background: none; border: none; cursor: pointer; color: var(--accent-gold); font-weight: 700; font-size: .78rem; margin-left: auto; white-space: nowrap; }

  @media (max-width: 700px) {
    .sa-payment-grid { grid-template-columns: 1fr; }
    .sa-payment-left { order: 2; }
    .sa-order-summary { order: 1; }
    .sa-drawer { width: 100vw; }
  }
`;

function fmt(n) { return "₹" + n.toLocaleString("en-IN"); }

/* ══════════════════════════════════════
   CART DRAWER
══════════════════════════════════════ */
function CartDrawer({ cart, setCart, onClose, onCheckout }) {
  const updateQty = (idx, delta) => {
    setCart(c => {
      const next = [...c];
      next[idx] = { ...next[idx], qty: next[idx].qty + delta };
      if (next[idx].qty < 1) next.splice(idx, 1);
      return next;
    });
  };
  const remove = idx => setCart(c => c.filter((_, i) => i !== idx));
  const subtotal = cart.reduce((s, i) => s + i.raw * i.qty, 0);
  const shipping = subtotal > 0 ? 150 : 0;
  const total    = subtotal + shipping;

  return (
    <>
      <div className="sa-overlay" onClick={onClose}/>
      <div className="sa-drawer">
        <div className="sa-drawer-head">
          <h3>🛒 Your Cart <span style={{fontSize:".85rem",color:"var(--warm-gray)",fontFamily:"Raleway,sans-serif",fontWeight:400}}>({cart.length} item{cart.length!==1?"s":""})</span></h3>
          <button className="sa-drawer-close" onClick={onClose}>✕</button>
        </div>
        <div className="sa-drawer-body">
          {cart.length === 0 ? (
            <div className="sa-drawer-empty">
              <span style={{fontSize:"3rem"}}>🖋️</span>
              <p>Your cart is empty.</p>
              <p style={{fontSize:".82rem"}}>Add a sketch to get started.</p>
            </div>
          ) : cart.map((item, idx) => (
            <div key={idx} className="sa-cart-item">
              <div className="sa-cart-thumb">{item.image}</div>
              <div className="sa-cart-meta">
                <div className="sa-cart-name">{item.title}</div>
                <div className="sa-cart-sz">{item.size}</div>
                <div className="sa-cart-price">{fmt(item.raw)}</div>
                <div className="sa-cart-qty">
                  <button className="sa-qty-btn" onClick={() => updateQty(idx,-1)}>−</button>
                  <span className="sa-qty-num">{item.qty}</span>
                  <button className="sa-qty-btn" onClick={() => updateQty(idx,+1)}>+</button>
                  <button className="sa-cart-remove" onClick={() => remove(idx)}>Remove</button>
                </div>
              </div>
              <div style={{fontWeight:700,color:"var(--accent-gold)",fontSize:".95rem",flexShrink:0}}>{fmt(item.raw*item.qty)}</div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="sa-drawer-foot">
            <div className="sa-cart-summary">
              <div className="sa-summary-row"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
              <div className="sa-summary-row"><span>Shipping</span><span>{fmt(shipping)}</span></div>
              <div className="sa-summary-total"><span>Total</span><span>{fmt(total)}</span></div>
            </div>
            <button className="sa-checkout-btn" onClick={onCheckout}>Proceed to Checkout →</button>
            <button className="sa-continue-btn" onClick={onClose}>← Continue Shopping</button>
          </div>
        )}
      </div>
    </>
  );
}

/* ══════════════════════════════════════
   PAYMENT
══════════════════════════════════════ */
function Payment({ cart, setCart, onBack, onDone, user, token }) {
  const [method, setMethod]           = useState("card");
  const [bank, setBank]               = useState("");
  const [paying, setPaying]           = useState(false);
  const [upiVerified, setUpiVerified] = useState(false);
  const [saveAddr, setSaveAddr]       = useState(false);

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

  const hasSavedAddr = !!(user?.addressLine && user?.city);

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
      onDone(data.orderRef || ("SBA-" + Math.random().toString(36).slice(2,8).toUpperCase()));
    } catch (err) {
      console.error("Order failed", err);
      onDone("SBA-" + Math.random().toString(36).slice(2,8).toUpperCase());
    } finally {
      setPaying(false);
    }
  };

  const fmtCard = v => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const fmtExp  = v => { const d=v.replace(/\D/g,"").slice(0,4); return d.length>2?d.slice(0,2)+"/"+d.slice(2):d; };

  return (
    <div className="sa-page sa-payment-wrap">
      <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:"var(--warm-gray)",fontFamily:"Raleway,sans-serif",fontSize:".84rem",fontWeight:600,marginBottom:"1rem",display:"flex",alignItems:"center",gap:".4rem"}}>
        ← Back to cart
      </button>
      <h2>Secure Checkout</h2>
      <p style={{fontFamily:"'Crimson Text',serif",fontStyle:"italic",color:"var(--warm-gray)"}}>Complete your order below</p>

      <div className="sa-payment-grid">
        <div className="sa-payment-left">
          <div className="sa-payment-form">
            <h4>📦 Shipping Details</h4>

            {hasSavedAddr && (
              <div className="sa-addr-banner">
                <span>📍</span>
                <div style={{flex:1}}>
                  <strong>Saved address:</strong> {[user.addressLine, user.city, user.pinCode].filter(Boolean).join(", ")}
                </div>
                <button className="sa-addr-change"
                  onClick={() => setForm(f => ({ ...f, addr:"", city:"", pin:"" }))}>
                  Change
                </button>
              </div>
            )}

            <div className="sa-field-row">
              <div className="sa-field"><label>Full Name</label><input value={form.name} onChange={e=>set("name",e.target.value)} placeholder="Ankita Sharma"/></div>
              <div className="sa-field"><label>Phone</label><input value={form.phone} onChange={e=>set("phone",e.target.value)} placeholder="+91 98765 43210"/></div>
            </div>
            <div className="sa-field"><label>Email</label><input type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="you@example.com"/></div>
            <div className="sa-field"><label>Address</label><input value={form.addr} onChange={e=>set("addr",e.target.value)} placeholder="Street address, apartment…"/></div>
            <div className="sa-field-row">
              <div className="sa-field"><label>City</label><input value={form.city} onChange={e=>set("city",e.target.value)} placeholder="Mumbai"/></div>
              <div className="sa-field"><label>PIN Code</label><input value={form.pin} onChange={e=>set("pin",e.target.value)} placeholder="400001"/></div>
            </div>

            <label style={{display:"flex",alignItems:"center",gap:".5rem",fontSize:".82rem",color:"var(--warm-gray)",marginBottom:".4rem",cursor:"pointer"}}>
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

            {method==="card" && (<>
              <div className="sa-card-icons">{["VISA","MC","RUPAY","AMEX"].map(b=><span key={b} className="sa-card-icon">{b}</span>)}</div>
              <div className="sa-field"><label>Card Number</label><input placeholder="1234 5678 9012 3456" value={form.cardNum} onChange={e=>set("cardNum",fmtCard(e.target.value))} maxLength={19}/></div>
              <div className="sa-field"><label>Cardholder Name</label><input placeholder="Name on card" value={form.cardName} onChange={e=>set("cardName",e.target.value)}/></div>
              <div className="sa-field-row">
                <div className="sa-field"><label>Expiry</label><input placeholder="MM/YY" value={form.expiry} onChange={e=>set("expiry",fmtExp(e.target.value))} maxLength={5}/></div>
                <div className="sa-field"><label>CVV</label><input placeholder="•••" type="password" value={form.cvv} onChange={e=>set("cvv",e.target.value.slice(0,4))} maxLength={4}/></div>
              </div>
            </>)}

            {method==="upi" && (<>
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
                  <button key={app} style={{padding:".5rem .9rem",border:"1.5px solid var(--light-gray)",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:".78rem",fontWeight:700,color:"var(--warm-gray)"}}
                    onClick={()=>set("upi",app.toLowerCase()+"@upi")}>{app}</button>
                ))}
              </div>
            </>)}

            {method==="netbanking" && (<>
              <p style={{fontSize:".82rem",color:"var(--warm-gray)",marginBottom:".8rem",fontFamily:"'Crimson Text',serif",fontStyle:"italic"}}>Select your bank</p>
              <div className="sa-bank-grid">
                {["SBI","HDFC","ICICI","Axis","Kotak","PNB","BOB","Yes Bank"].map(b=>(
                  <button key={b} className={`sa-bank-btn${bank===b?" active":""}`} onClick={()=>setBank(b)}>{b}</button>
                ))}
              </div>
            </>)}

            {method==="cod" && (
              <div style={{background:"var(--soft-cream)",borderRadius:"8px",padding:"1rem",border:"1px solid var(--light-gray)"}}>
                <p style={{fontFamily:"'Crimson Text',serif",fontStyle:"italic",color:"var(--warm-gray)",lineHeight:1.6}}>
                  Pay {fmt(total+50)} in cash when your order arrives. A small COD fee of ₹50 applies.
                </p>
              </div>
            )}

            <button className="sa-pay-btn" onClick={pay} disabled={paying}>
              {paying ? "Processing…" : `Pay ${fmt(method==="cod"?total+50:total)} →`}
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
              <div className="sa-order-price">{fmt(item.raw*item.qty)}</div>
            </div>
          ))}
          <div className="sa-order-totals">
            <div className="sa-order-row"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
            <div className="sa-order-row"><span>Shipping</span><span>{fmt(shipping)}</span></div>
            {method==="cod"&&<div className="sa-order-row"><span>COD Fee</span><span>₹50</span></div>}
            <div className="sa-order-grand"><span>Total</span><span style={{color:"var(--accent-gold)"}}>{fmt(method==="cod"?total+50:total)}</span></div>
          </div>
          <div style={{marginTop:"1rem",padding:"1rem",background:"white",borderRadius:"8px",border:"1px solid var(--light-gray)"}}>
            <p style={{fontSize:".8rem",color:"var(--warm-gray)",lineHeight:1.6,fontFamily:"'Crimson Text',serif",fontStyle:"italic"}}>
              🚚 Free shipping on orders above ₹5,000 · Ships within 5–7 business days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SHOP
══════════════════════════════════════ */
function Shop({ user, token }) {
  const [products, setProducts]     = useState([]);
  const [filter, setFilter]         = useState("all");
  const [cart, setCart]             = useState([]);
  const [added, setAdded]           = useState({});
  const [wish, setWish]             = useState({});
  const [toast, setToast]           = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [screen, setScreen]         = useState("shop");
  const [orderRef, setOrderRef]     = useState("");

  // Load products
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data.map(p => ({
          id:    p.id,
          title: p.title,
          type:  p.type,
          size:  p.size,
          raw:   p.price,
          price: "₹" + p.price.toLocaleString("en-IN"),
          image: p.image || "🖼️",
          badge: p.badge || (p.type === "prints" ? "Print" : p.type === "originals" ? "Original" : "Custom")
        })));
      })
      .catch(err => console.error("Failed to load products:", err));
  }, []);

  // Load wishlist from DB on mount
  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:8080/api/wishlist", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        const map = {};
        (data || []).forEach(id => { map[id] = true; });
        setWish(map);
      })
      .catch(err => console.error("Failed to load wishlist:", err));
  }, [token]);

  // Toggle wishlist with DB sync
  const toggleWish = async (productId) => {
    const isWished = !!wish[productId];
    // Optimistic update
    setWish(w => ({ ...w, [productId]: !isWished }));
    try {
      await fetch(`http://localhost:8080/api/wishlist/${productId}`, {
        method: isWished ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });
    } catch (err) {
      // Rollback on failure
      setWish(w => ({ ...w, [productId]: isWished }));
      console.error("Wishlist update failed:", err);
    }
  };

  const visible = filter === "all" ? products : products.filter(p => p.type === filter);

  const addToCart = (p, key) => {
    setCart(c => {
      const existing = c.findIndex(i => i.title === p.title);
      if (existing >= 0) { const n=[...c]; n[existing]={...n[existing],qty:n[existing].qty+1}; return n; }
      return [...c, { ...p, qty: 1 }];
    });
    setAdded(a => ({ ...a, [key]: true }));
    setToast(p.title);
    setTimeout(() => setAdded(a => ({ ...a, [key]: false })), 1800);
    setTimeout(() => setToast(null), 2800);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  if (screen === "payment") return (
    <Payment
      cart={cart} setCart={setCart}
      onBack={() => setScreen("shop")}
      onDone={ref => { setOrderRef(ref); setScreen("success"); }}
      user={user}
      token={token}
    />
  );

  if (screen === "success") return (
    <div className="sa-page sa-success-page">
      <div className="sa-success-card">
        <div className="sa-success-icon">🎨</div>
        <h3>Order Confirmed!</h3>
        <div className="sa-success-ref">{orderRef}</div>
        <p>Thank you for collecting from Studio by Ankita. Your sketch will be carefully packaged and shipped within 5–7 business days.</p>
        <button className="sa-btn-primary" onClick={() => { setCart([]); setScreen("shop"); }}>Continue Shopping</button>
      </div>
    </div>
  );

  return (
    <div className="sa-page">
      <div className="sa-shop-header">
        <h2>Shop — Limited Prints &amp; Originals</h2>
        <p className="sa-subtitle">Archival prints, originals, and framed studies</p>
      </div>

      <div className="sa-cart-bar">
        <button className="sa-cart-btn" onClick={() => setDrawerOpen(true)}>
          🛒 Cart {cartCount > 0 && <span className="sa-cart-count">{cartCount}</span>}
        </button>
      </div>

      <div className="sa-filters">
        {[["all","All"],["prints","Prints"],["originals","Originals"],["commissions","Commissions"]].map(([val,label]) => (
          <div key={val} className={`sa-chip${filter===val?" sa-chip--active":""}`} onClick={() => setFilter(val)}>{label}</div>
        ))}
      </div>

      <div className="sa-grid">
        {visible.map((p, i) => (
          <div key={p.id || i} className="sa-card">
            <div className="sa-card-img">
              <button
                className={`sa-wishlist${wish[p.id] ? " sa-wishlist--active" : ""}`}
                onClick={() => toggleWish(p.id)}
                title="Wishlist"
              >
                {wish[p.id] ? "♥" : "♡"}
              </button>
              <span className="sa-badge">{p.badge}</span>
              <span style={{fontSize:"3.5rem"}}>{p.image}</span>
            </div>
            <div className="sa-info">
              <div className="sa-title">{p.title}</div>
              <div className="sa-size">{p.size}</div>
              <div className="sa-row">
                <span className="sa-price">{p.price}</span>
                <button className={`sa-buy${added[p.id]?" sa-buy--added":""}`} onClick={() => addToCart(p, p.id)}>
                  {added[p.id] ? "✓ Added" : "Buy Now"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {drawerOpen && (
        <CartDrawer cart={cart} setCart={setCart}
          onClose={() => setDrawerOpen(false)}
          onCheckout={() => { setDrawerOpen(false); setScreen("payment"); }}
        />
      )}
      {toast && <div className="sa-toast"><span>🛒</span> <strong>"{toast}"</strong> added to cart</div>}
    </div>
  );
}

/* ══════════════════════════════════════
   ROOT
══════════════════════════════════════ */
export default function StudioShop({ user, token }) {
  return (
    <>
      <style>{STYLES}</style>
      <Shop user={user} token={token} />
    </>
  );
}