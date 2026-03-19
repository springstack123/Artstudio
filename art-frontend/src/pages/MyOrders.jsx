import { useState, useEffect } from "react";

const STYLES = `
  .mo-page { animation: moFade .4s ease both; max-width: 900px; margin: 0 auto; padding: 2rem 2rem 4rem; }
  @keyframes moFade { from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;} }

  .mo-header { margin-bottom: 1.8rem; }
  .mo-header h2 { font-family:'Cormorant Garamond',serif; font-size:1.9rem; font-weight:300; margin-bottom:.2rem; }
  .mo-header p { font-family:'Crimson Text',serif; font-style:italic; color:var(--warm-gray,#736b5e); font-size:.97rem; }

  .mo-filters { display:flex; gap:.6rem; flex-wrap:wrap; margin-bottom:1.5rem; }
  .mo-chip { padding:.45rem 1rem; border:2px solid var(--light-gray,#e8e6df); border-radius:20px; background:white; cursor:pointer; font-family:'Raleway',sans-serif; font-size:.73rem; font-weight:700; text-transform:uppercase; letter-spacing:.5px; color:var(--warm-gray,#736b5e); transition:all .2s; }
  .mo-chip:hover, .mo-chip.active { background:var(--ink-black,#1a1a1a); color:white; border-color:var(--ink-black,#1a1a1a); }

  .mo-list { display:flex; flex-direction:column; gap:1rem; }
  .mo-card { background:white; border:1px solid var(--light-gray,#e8e6df); border-radius:10px; overflow:hidden; transition:box-shadow .25s; }
  .mo-card:hover { box-shadow:0 8px 30px rgba(0,0,0,0.07); }
  .mo-card-head { display:flex; align-items:center; justify-content:space-between; padding:.9rem 1.2rem; background:var(--soft-cream,#f5f3ed); border-bottom:1px solid var(--light-gray,#e8e6df); flex-wrap:wrap; gap:.5rem; }
  .mo-order-id { font-family:'Raleway',sans-serif; font-size:.75rem; font-weight:700; color:var(--warm-gray,#736b5e); letter-spacing:.5px; }
  .mo-order-date { font-size:.75rem; color:var(--warm-gray,#736b5e); }
  .mo-status { padding:.3rem .75rem; border-radius:20px; font-size:.68rem; font-weight:700; text-transform:uppercase; letter-spacing:.5px; }
  .mo-status.delivered { background:#e8f5e9; color:#2e7d52; }
  .mo-status.shipped   { background:#e3f2fd; color:#1565c0; }
  .mo-status.processing{ background:#fff8e1; color:#f57f17; }
  .mo-status.cancelled { background:#fce4ec; color:#c62828; }
  .mo-card-body { display:flex; gap:1rem; padding:1.1rem 1.2rem; align-items:flex-start; flex-wrap:wrap; }
  .mo-thumb { width:70px; height:70px; border-radius:8px; background:linear-gradient(135deg,var(--soft-cream,#f5f3ed),var(--light-gray,#e8e6df)); display:flex; align-items:center; justify-content:center; font-size:2rem; border:1px solid var(--light-gray,#e8e6df); flex-shrink:0; }
  .mo-info { flex:1; min-width:160px; }
  .mo-item-name { font-family:'Cormorant Garamond',serif; font-size:1.05rem; font-weight:600; margin-bottom:.15rem; }
  .mo-item-sub { font-size:.78rem; color:var(--warm-gray,#736b5e); margin-bottom:.3rem; }
  .mo-item-price { font-weight:700; color:var(--accent-gold,#b8956a); font-size:.92rem; }
  .mo-card-foot { display:flex; align-items:center; justify-content:space-between; padding:.75rem 1.2rem; border-top:1px solid var(--light-gray,#e8e6df); flex-wrap:wrap; gap:.5rem; }
  .mo-total { font-size:.85rem; font-weight:700; }
  .mo-total span { color:var(--accent-gold,#b8956a); }
  .mo-actions { display:flex; gap:.5rem; }
  .mo-btn { padding:.45rem .95rem; border-radius:6px; font-family:'Raleway',sans-serif; font-size:.72rem; font-weight:700; letter-spacing:.5px; text-transform:uppercase; cursor:pointer; transition:all .2s; border:2px solid var(--light-gray,#e8e6df); background:white; color:var(--warm-gray,#736b5e); }
  .mo-btn:hover { border-color:var(--ink-black,#1a1a1a); color:var(--ink-black,#1a1a1a); }
  .mo-btn.primary { background:var(--ink-black,#1a1a1a); color:white; border-color:var(--ink-black,#1a1a1a); }
  .mo-btn.primary:hover { background:var(--sketch-blue,#4a6670); border-color:var(--sketch-blue,#4a6670); }
  .mo-track { padding:.8rem 1.2rem 1.1rem; border-top:1px solid var(--light-gray,#e8e6df); }
  .mo-track-title { font-size:.72rem; font-weight:700; text-transform:uppercase; letter-spacing:.5px; color:var(--warm-gray,#736b5e); margin-bottom:.7rem; }
  .mo-track-steps { display:flex; position:relative; }
  .mo-track-steps::before { content:''; position:absolute; top:11px; left:11px; right:11px; height:2px; background:var(--light-gray,#e8e6df); z-index:0; }
  .mo-step { flex:1; display:flex; flex-direction:column; align-items:center; position:relative; z-index:1; }
  .mo-step-dot { width:22px; height:22px; border-radius:50%; border:2px solid var(--light-gray,#e8e6df); background:white; display:flex; align-items:center; justify-content:center; font-size:.6rem; margin-bottom:.35rem; transition:all .2s; }
  .mo-step.done .mo-step-dot { background:var(--accent-gold,#b8956a); border-color:var(--accent-gold,#b8956a); color:white; }
  .mo-step.current .mo-step-dot { background:var(--sketch-blue,#4a6670); border-color:var(--sketch-blue,#4a6670); color:white; box-shadow:0 0 0 4px rgba(74,102,112,0.18); }
  .mo-step-label { font-size:.64rem; font-weight:700; text-transform:uppercase; letter-spacing:.4px; color:var(--warm-gray,#736b5e); text-align:center; }
  .mo-step.done .mo-step-label, .mo-step.current .mo-step-label { color:var(--ink-black,#1a1a1a); }

  .mo-empty { text-align:center; padding:5rem 2rem; }
  .mo-empty-icon { font-size:3.5rem; margin-bottom:1rem; }
  .mo-empty h3 { font-family:'Cormorant Garamond',serif; font-size:1.6rem; font-weight:300; margin-bottom:.5rem; color:var(--ink-black,#1a1a1a); }
  .mo-empty p { font-family:'Crimson Text',serif; font-style:italic; color:var(--warm-gray,#736b5e); font-size:1rem; margin-bottom:1.4rem; }
  .mo-empty-btn { display:inline-block; padding:.75rem 1.8rem; border:2px solid var(--ink-black,#1a1a1a); border-radius:25px; background:var(--ink-black,#1a1a1a); color:white; font-family:'Raleway',sans-serif; font-size:.78rem; font-weight:700; letter-spacing:.7px; text-transform:uppercase; cursor:pointer; transition:all .25s; }
  .mo-empty-btn:hover { background:var(--sketch-blue,#4a6670); border-color:var(--sketch-blue,#4a6670); transform:translateY(-2px); }
`;

const TRACK_STEPS = ["Confirmed", "Packed", "Shipped", "Delivered"];

function getTrackStep(status) {
  const s = (status || "").toLowerCase();
  if (s === "delivered") return 3;
  if (s === "shipped")   return 2;
  if (s === "packed")    return 1;
  return 0;
}

export default function MyOrders({ showPage, user, token }) {
  const [filter, setFilter]     = useState("all");
  const [expanded, setExpanded] = useState({});
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ FIXED: added `const res = await` and use the `token` prop directly
        const res = await fetch("http://localhost:8080/api/orders/my", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();

        // Support both array response and wrapped { orders: [...] } / { data: [...] }
        const raw = Array.isArray(data) ? data : (data.orders || data.data || []);

        const uiOrders = raw.map(o => ({
          id:       o.id,
          orderRef: o.orderRef || o.id,
          status:   (o.status || "processing").toLowerCase(),
          date:     o.createdAt
                      ? new Date(o.createdAt).toLocaleDateString("en-IN")
                      : new Date().toLocaleDateString("en-IN"),
          name:     o.customerName || o.itemName || "Order",
          sub:      o.description  || "Print delivery to saved address",
          price:    `₹${(o.totalAmount || 0).toLocaleString("en-IN")}`,
          total:    `₹${(o.totalAmount || 0).toLocaleString("en-IN")}`,
          emoji:    o.emoji || "🖼️",
          track:    getTrackStep(o.status)
        }));

        setMyOrders(uiOrders);
      } catch (err) {
        console.error("Fetch orders error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const visible    = filter === "all" ? myOrders : myOrders.filter(o => o.status === filter);
  const toggleTrack = id => setExpanded(e => ({ ...e, [id]: !e[id] }));

  return (
    <>
      <style>{STYLES}</style>
      <div className="mo-page">

        <div className="mo-header">
          <h2>My Orders</h2>
          <p>Track and manage your purchases</p>
        </div>

        {/* ── ERROR ── */}
        {error && (
          <div style={{ textAlign:"center", padding:"4rem 2rem" }}>
            <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>⚠️</div>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300 }}>
              Failed to load orders
            </h3>
            <p style={{ color:"var(--warm-gray,#736b5e)", marginTop:".5rem" }}>{error}</p>
            <button
              className="mo-btn primary"
              style={{ marginTop:"1.2rem" }}
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        {/* ── LOADING ── */}
        {!error && loading && (
          <div style={{ textAlign:"center", padding:"6rem 2rem", color:"var(--warm-gray,#736b5e)" }}>
            <div style={{ fontSize:"2.5rem", marginBottom:"1.2rem" }}>📦</div>
            <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:".85rem", letterSpacing:".5px" }}>
              Loading your orders…
            </div>
          </div>
        )}

        {/* ── NO TOKEN ── */}
        {!error && !loading && !token && (
          <div className="mo-empty">
            <div className="mo-empty-icon">🔒</div>
            <h3>Please log in</h3>
            <p>Sign in to view your order history.</p>
            <button className="mo-empty-btn" onClick={() => showPage("login")}>
              Sign In →
            </button>
          </div>
        )}

        {/* ── TRUE EMPTY ── */}
        {!error && !loading && token && myOrders.length === 0 && (
          <div className="mo-empty">
            <div className="mo-empty-icon">🛍️</div>
            <h3>No orders yet</h3>
            <p>When you purchase a print or original, your orders will appear here.</p>
            <button className="mo-empty-btn" onClick={() => showPage("shop")}>
              Browse the Shop →
            </button>
          </div>
        )}

        {/* ── ORDER LIST ── */}
        {!error && !loading && token && myOrders.length > 0 && (
          <>
            <div className="mo-filters">
              {[["all","All"],["delivered","Delivered"],["shipped","Shipped"],
                ["processing","Processing"],["cancelled","Cancelled"]].map(([v, l]) => (
                <button
                  key={v}
                  className={`mo-chip${filter === v ? " active" : ""}`}
                  onClick={() => setFilter(v)}
                >
                  {l}
                </button>
              ))}
            </div>

            {visible.length === 0 ? (
              <div className="mo-empty">
                <div className="mo-empty-icon">📦</div>
                <h3>No {filter} orders</h3>
                <p>Try a different filter.</p>
              </div>
            ) : (
              <div className="mo-list">
                {visible.map(o => (
                  <div key={o.id} className="mo-card">

                    {/* HEAD */}
                    <div className="mo-card-head">
                      <div>
                        <div className="mo-order-id">Order #{o.orderRef}</div>
                        <div className="mo-order-date">{o.date}</div>
                      </div>
                      <span className={`mo-status ${o.status}`}>{o.status}</span>
                    </div>

                    {/* BODY */}
                    <div className="mo-card-body">
                      <div className="mo-thumb">{o.emoji}</div>
                      <div className="mo-info">
                        <div className="mo-item-name">{o.name}</div>
                        <div className="mo-item-sub">{o.sub}</div>
                        <div className="mo-item-price">{o.price}</div>
                      </div>
                    </div>

                    {/* TRACKING */}
                    {expanded[o.id] && o.status !== "cancelled" && (
                      <div className="mo-track">
                        <div className="mo-track-title">Tracking</div>
                        <div className="mo-track-steps">
                          {TRACK_STEPS.map((step, i) => (
                            <div
                              key={step}
                              className={`mo-step${i < o.track ? " done" : i === o.track ? " current" : ""}`}
                            >
                              <div className="mo-step-dot">{i < o.track ? "✓" : i + 1}</div>
                              <div className="mo-step-label">{step}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* FOOTER */}
                    <div className="mo-card-foot">
                      <div className="mo-total">Total: <span>{o.total}</span></div>
                      <div className="mo-actions">
                        {o.status !== "cancelled" && (
                          <button className="mo-btn" onClick={() => toggleTrack(o.id)}>
                            {expanded[o.id] ? "Hide Tracking" : "Track Order"}
                          </button>
                        )}
                        {o.status === "delivered"  && <button className="mo-btn primary">Reorder</button>}
                        {o.status === "processing" && <button className="mo-btn">Cancel</button>}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </>
  );
}