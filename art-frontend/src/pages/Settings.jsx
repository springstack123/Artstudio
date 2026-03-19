import { useState, useEffect } from "react";

const STYLES = `
  .st-page { animation:stFade .4s ease both; max-width:820px; margin:0 auto; padding:2rem 2rem 4rem; }
  @keyframes stFade{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}

  .st-header { margin-bottom:1.8rem; }
  .st-header h2 { font-family:'Cormorant Garamond',serif; font-size:1.9rem; font-weight:300; margin-bottom:.2rem; }
  .st-header p { font-family:'Crimson Text',serif; font-style:italic; color:var(--warm-gray,#736b5e); font-size:.97rem; }

  .st-tabs { display:flex; border-bottom:2px solid var(--light-gray,#e8e6df); margin-bottom:1.8rem; gap:0; overflow-x:auto; }
  .st-tab { padding:.85rem 1.2rem .7rem; background:none; border:none; border-bottom:2px solid transparent; margin-bottom:-2px; cursor:pointer; font-family:'Raleway',sans-serif; font-size:.77rem; font-weight:700; letter-spacing:.6px; text-transform:uppercase; color:var(--warm-gray,#736b5e); transition:all .2s; white-space:nowrap; }
  .st-tab:hover { color:var(--ink-black,#1a1a1a); }
  .st-tab.active { color:var(--ink-black,#1a1a1a); border-bottom-color:var(--ink-black,#1a1a1a); }

  .st-section { display:flex; flex-direction:column; gap:1.2rem; }
  .st-card { background:white; border:1px solid var(--light-gray,#e8e6df); border-radius:10px; overflow:hidden; }
  .st-card-head { padding:1.1rem 1.4rem; background:var(--soft-cream,#f5f3ed); border-bottom:1px solid var(--light-gray,#e8e6df); }
  .st-card-head h4 { font-family:'Cormorant Garamond',serif; font-size:1.05rem; font-weight:600; margin-bottom:.1rem; }
  .st-card-head p { font-size:.78rem; color:var(--warm-gray,#736b5e); font-family:'Crimson Text',serif; font-style:italic; }
  .st-card-body { padding:1.2rem 1.4rem; display:flex; flex-direction:column; gap:1rem; }

  .st-field { display:flex; flex-direction:column; }
  .st-field label { font-size:.72rem; font-weight:700; letter-spacing:.5px; text-transform:uppercase; margin-bottom:.35rem; color:var(--ink-black,#1a1a1a); }
  .st-field input, .st-field select { padding:.75rem .9rem; border:1.5px solid var(--light-gray,#e8e6df); background:var(--soft-cream,#f5f3ed); border-radius:6px; font-family:'Raleway',sans-serif; font-size:.87rem; color:var(--ink-black,#1a1a1a); transition:border-color .18s; }
  .st-field input:focus, .st-field select:focus { outline:none; border-color:var(--accent-gold,#b8956a); background:white; }
  .st-field-row { display:grid; grid-template-columns:1fr 1fr; gap:.8rem; }

  .st-toggle-row { display:flex; align-items:center; justify-content:space-between; padding:.65rem 0; border-bottom:1px solid var(--light-gray,#e8e6df); }
  .st-toggle-row:last-child { border-bottom:none; }
  .st-toggle-info { flex:1; padding-right:1rem; }
  .st-toggle-label { font-size:.86rem; font-weight:700; margin-bottom:.1rem; }
  .st-toggle-sub { font-size:.75rem; color:var(--warm-gray,#736b5e); font-family:'Crimson Text',serif; font-style:italic; }
  .st-toggle { position:relative; width:42px; height:24px; flex-shrink:0; }
  .st-toggle input { opacity:0; width:0; height:0; }
  .st-toggle-slider { position:absolute; inset:0; background:var(--light-gray,#e8e6df); border-radius:24px; cursor:pointer; transition:all .25s; }
  .st-toggle-slider::before { content:''; position:absolute; width:18px; height:18px; left:3px; top:3px; background:white; border-radius:50%; transition:all .25s; box-shadow:0 2px 6px rgba(0,0,0,0.15); }
  .st-toggle input:checked + .st-toggle-slider { background:var(--accent-gold,#b8956a); }
  .st-toggle input:checked + .st-toggle-slider::before { transform:translateX(18px); }

  .st-danger .st-card-head { background:#fff5f5; border-bottom-color:#fce4ec; }
  .st-danger .st-card-head h4 { color:#c62828; }
  .st-danger-row { display:flex; align-items:center; justify-content:space-between; padding:.65rem 0; border-bottom:1px solid var(--light-gray,#e8e6df); flex-wrap:wrap; gap:.8rem; }
  .st-danger-row:last-child { border-bottom:none; }
  .st-danger-info .st-toggle-label { font-size:.84rem; }
  .st-danger-btn { padding:.5rem 1rem; border-radius:6px; font-family:'Raleway',sans-serif; font-size:.73rem; font-weight:700; letter-spacing:.5px; text-transform:uppercase; cursor:pointer; transition:all .2s; border:2px solid #fce4ec; background:white; color:#c62828; }
  .st-danger-btn:hover { background:#c62828; color:white; border-color:#c62828; }

  .st-save-bar { display:flex; justify-content:flex-end; gap:.8rem; margin-top:.5rem; }
  .st-save-btn { padding:.8rem 1.8rem; border:none; border-radius:7px; background:var(--ink-black,#1a1a1a); color:white; font-family:'Raleway',sans-serif; font-size:.8rem; font-weight:700; letter-spacing:.6px; text-transform:uppercase; cursor:pointer; transition:all .22s; }
  .st-save-btn:hover { background:var(--sketch-blue,#4a6670); transform:translateY(-2px); }
  .st-save-btn:disabled { opacity:.6; cursor:not-allowed; }
  .st-cancel-btn { padding:.8rem 1.4rem; border:2px solid var(--light-gray,#e8e6df); border-radius:7px; background:transparent; color:var(--warm-gray,#736b5e); font-family:'Raleway',sans-serif; font-size:.8rem; font-weight:600; cursor:pointer; transition:all .22s; }
  .st-cancel-btn:hover { border-color:var(--ink-black,#1a1a1a); color:var(--ink-black,#1a1a1a); }

  .st-err { font-size:.78rem; color:#c62828; margin-top:.3rem; }

  .st-saved-toast { position:fixed; bottom:2rem; right:2rem; z-index:9999; background:var(--ink-black,#1a1a1a); color:white; padding:.9rem 1.5rem; border-radius:9px; font-size:.86rem; font-weight:600; box-shadow:0 12px 35px rgba(0,0,0,0.18); animation:stFade .3s ease both; display:flex; align-items:center; gap:.6rem; }

  @media(max-width:560px){
    .st-field-row{grid-template-columns:1fr;}
  }
`;

function Toggle({ checked, onChange }) {
  return (
    <label className="st-toggle">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}/>
      <span className="st-toggle-slider"/>
    </label>
  );
}

export default function Settings({ user, setUser, token }) {
  const [tab, setTab]     = useState("account");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pwError, setPwError] = useState("");

  // ── Account fields — pre-filled from user prop ──
  const [account, setAccount] = useState({
    name:     user?.name     || "",
    email:    user?.email    || "",
    phone:    user?.phone    || "",
    location: user?.location || "",
  });

  // Sync if user prop changes (e.g. after profile edit elsewhere)
  useEffect(() => {
    setAccount({
      name:     user?.name     || "",
      email:    user?.email    || "",
      phone:    user?.phone    || "",
      location: user?.location || "",
    });
  }, [user]);

  const [passwords, setPasswords] = useState({ current:"", newPw:"", confirm:"" });
  const [notifs, setNotifs] = useState({ orders:true, commissions:true, newsletter:false, reviews:true, promotions:false, sms:false });
  const [privacy, setPrivacy] = useState({ publicProfile:true, showSales:false, allowMessages:true, indexSearch:true });

  const setA  = (k,v) => setAccount(p  => ({ ...p, [k]:v }));
  const setP  = (k,v) => setPasswords(p=> ({ ...p, [k]:v }));
  const setN  = (k,v) => setNotifs(p   => ({ ...p, [k]:v }));
  const setPr = (k,v) => setPrivacy(p  => ({ ...p, [k]:v }));

  const toast = () => { setSaved(true); setTimeout(()=>setSaved(false), 2500); };

  // ── Save account info to backend ──
  const saveAccount = async () => {
    setSaving(true);
    try {
      const res = await fetch("http://localhost:8080/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          name:     account.name,
          phone:    account.phone,
          location: account.location,
        })
      });
      if (res.ok) {
        const updated = await res.json();
        // Push updated name/location back to global user state
        if (setUser) setUser(u => ({ ...u, ...updated }));
        toast();
      }
    } catch (err) {
      console.error("Save account failed", err);
    } finally {
      setSaving(false);
    }
  };

  // ── Change password via backend ──
  const savePassword = async () => {
    setPwError("");
    if (passwords.newPw !== passwords.confirm) { setPwError("Passwords do not match"); return; }
    if (passwords.newPw.length < 8) { setPwError("Password must be at least 8 characters"); return; }
    setSaving(true);
    try {
      const res = await fetch("http://localhost:8080/api/users/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword:     passwords.newPw
        })
      });
      if (res.ok) {
        setPasswords({ current:"", newPw:"", confirm:"" });
        toast();
      } else {
        const data = await res.json();
        setPwError(data.message || "Password change failed");
      }
    } catch (err) {
      setPwError("Server error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Notifications + privacy just show toast (extend with real endpoints as needed)
  const saveNotifs  = () => toast();
  const savePrivacy = () => toast();

  return (
    <>
      <style>{STYLES}</style>
      <div className="st-page">
        <div className="st-header">
          <h2>Settings</h2>
          <p>Manage your account, notifications and privacy</p>
        </div>

        <div className="st-tabs">
          {[["account","Account"],["password","Password"],["notifications","Notifications"],["privacy","Privacy"]].map(([id,l])=>(
            <button key={id} className={`st-tab${tab===id?" active":""}`} onClick={()=>setTab(id)}>{l}</button>
          ))}
        </div>

        {/* ── ACCOUNT ── */}
        {tab==="account" && (
          <div className="st-section">
            <div className="st-card">
              <div className="st-card-head"><h4>Personal Information</h4><p>Update your name, contact and location</p></div>
              <div className="st-card-body">
                <div className="st-field-row">
                  <div className="st-field"><label>Full Name</label><input value={account.name} onChange={e=>setA("name",e.target.value)}/></div>
                  <div className="st-field"><label>Phone</label><input value={account.phone} onChange={e=>setA("phone",e.target.value)}/></div>
                </div>
                {/* Email shown read-only — change via support */}
                <div className="st-field">
                  <label>Email Address</label>
                  <input type="email" value={account.email} readOnly
                    style={{opacity:.65,cursor:"not-allowed"}}
                    title="Email cannot be changed here"/>
                </div>
                <div className="st-field"><label>Location</label><input value={account.location} onChange={e=>setA("location",e.target.value)}/></div>
              </div>
            </div>

            <div className="st-card st-danger">
              <div className="st-card-head"><h4>Danger Zone</h4></div>
              <div className="st-card-body">
                {[["Deactivate Account","Your profile will be hidden but data retained."],
                  ["Delete Account","Permanently delete all your data. This cannot be undone."]
                ].map(([l,s])=>(
                  <div key={l} className="st-danger-row">
                    <div className="st-danger-info">
                      <div className="st-toggle-label">{l}</div>
                      <div className="st-toggle-sub">{s}</div>
                    </div>
                    <button className="st-danger-btn">{l.split(" ")[0]}</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="st-save-bar">
              <button className="st-cancel-btn" onClick={() => setAccount({ name:user?.name||"", email:user?.email||"", phone:user?.phone||"", location:user?.location||"" })}>Cancel</button>
              <button className="st-save-btn" disabled={saving} onClick={saveAccount}>
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        {/* ── PASSWORD ── */}
        {tab==="password" && (
          <div className="st-section">
            <div className="st-card">
              <div className="st-card-head"><h4>Change Password</h4><p>Use a strong password you don't use elsewhere</p></div>
              <div className="st-card-body">
                <div className="st-field"><label>Current Password</label><input type="password" placeholder="••••••••" value={passwords.current} onChange={e=>setP("current",e.target.value)}/></div>
                <div className="st-field"><label>New Password</label><input type="password" placeholder="Min. 8 characters" value={passwords.newPw} onChange={e=>setP("newPw",e.target.value)}/></div>
                <div className="st-field">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="••••••••" value={passwords.confirm} onChange={e=>setP("confirm",e.target.value)}/>
                  {pwError && <span className="st-err">{pwError}</span>}
                </div>
              </div>
            </div>
            <div className="st-save-bar">
              <button className="st-cancel-btn" onClick={()=>setPasswords({current:"",newPw:"",confirm:""})}>Cancel</button>
              <button className="st-save-btn" disabled={saving} onClick={savePassword}>
                {saving ? "Updating…" : "Update Password"}
              </button>
            </div>
          </div>
        )}

        {/* ── NOTIFICATIONS ── */}
        {tab==="notifications" && (
          <div className="st-section">
            <div className="st-card">
              <div className="st-card-head"><h4>Email Notifications</h4><p>Choose what you'd like to hear about</p></div>
              <div className="st-card-body">
                {[["orders","Order updates","Shipping, delivery and status changes"],
                  ["commissions","Commission updates","Messages and progress from your artist"],
                  ["reviews","New reviews","When someone leaves a review on your work"],
                  ["newsletter","Studio newsletter","Monthly roundup of new works and stories"],
                  ["promotions","Promotions & offers","Discounts and seasonal sale alerts"]
                ].map(([k,l,s])=>(
                  <div key={k} className="st-toggle-row">
                    <div className="st-toggle-info">
                      <div className="st-toggle-label">{l}</div>
                      <div className="st-toggle-sub">{s}</div>
                    </div>
                    <Toggle checked={notifs[k]} onChange={v=>setN(k,v)}/>
                  </div>
                ))}
              </div>
            </div>
            <div className="st-card">
              <div className="st-card-head"><h4>SMS Notifications</h4><p>Text alerts for important updates</p></div>
              <div className="st-card-body">
                <div className="st-toggle-row">
                  <div className="st-toggle-info">
                    <div className="st-toggle-label">SMS Alerts</div>
                    <div className="st-toggle-sub">Delivery confirmations and order status via text</div>
                  </div>
                  <Toggle checked={notifs.sms} onChange={v=>setN("sms",v)}/>
                </div>
              </div>
            </div>
            <div className="st-save-bar">
              <button className="st-cancel-btn">Cancel</button>
              <button className="st-save-btn" onClick={saveNotifs}>Save Preferences</button>
            </div>
          </div>
        )}

        {/* ── PRIVACY ── */}
        {tab==="privacy" && (
          <div className="st-section">
            <div className="st-card">
              <div className="st-card-head"><h4>Privacy Controls</h4><p>Manage who can see your profile and activity</p></div>
              <div className="st-card-body">
                {[["publicProfile","Public profile","Anyone can view your profile and works"],
                  ["showSales","Show sales figures","Display total sales on your public profile"],
                  ["allowMessages","Allow direct messages","Let other users send you messages"],
                  ["indexSearch","Appear in search","Include your profile in search results"]
                ].map(([k,l,s])=>(
                  <div key={k} className="st-toggle-row">
                    <div className="st-toggle-info">
                      <div className="st-toggle-label">{l}</div>
                      <div className="st-toggle-sub">{s}</div>
                    </div>
                    <Toggle checked={privacy[k]} onChange={v=>setPr(k,v)}/>
                  </div>
                ))}
              </div>
            </div>
            <div className="st-save-bar">
              <button className="st-cancel-btn">Cancel</button>
              <button className="st-save-btn" onClick={savePrivacy}>Save Privacy Settings</button>
            </div>
          </div>
        )}
      </div>

      {saved && <div className="st-saved-toast"><span>✓</span> Changes saved successfully</div>}
    </>
  );
}