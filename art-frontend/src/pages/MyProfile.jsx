import { useState, useEffect, useRef } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Architects+Daughter&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Raleway:wght@300;400;500;600;700&display=swap');

  .mp-page { animation: mpFade .4s ease both; }
  @keyframes mpFade { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }

  .mp-hero {
    position: relative; height: 200px;
    background: linear-gradient(135deg, #d6cfc4 0%, #b8a99a 40%, var(--sketch-blue,#4a6670) 100%);
    overflow: hidden;
  }
  .mp-hero::before {
    content:''; position:absolute; inset:0;
    background: radial-gradient(ellipse 60% 80% at 70% 50%, rgba(184,149,106,0.25) 0%, transparent 70%),
      repeating-linear-gradient(45deg, transparent, transparent 18px, rgba(255,255,255,0.04) 18px, rgba(255,255,255,0.04) 19px);
  }
  .mp-hero-tag {
    position:absolute; bottom:1rem; left:2rem;
    font-family:'Architects Daughter',cursive; font-size:.8rem;
    color:rgba(255,255,255,0.65); letter-spacing:1px;
  }
  .mp-hero-edit {
    position:absolute; top:1rem; right:1.5rem;
    padding:.4rem .95rem; border:1.5px solid rgba(255,255,255,0.5);
    border-radius:20px; background:rgba(255,255,255,0.15);
    backdrop-filter:blur(6px); color:white;
    font-family:'Raleway',sans-serif; font-size:.73rem; font-weight:700;
    letter-spacing:.6px; text-transform:uppercase; cursor:pointer; transition:all .22s;
  }
  .mp-hero-edit:hover { background:rgba(255,255,255,0.28); }

  .mp-avatar-row {
    display:flex; align-items:flex-end; justify-content:space-between;
    padding:0 2rem 1rem; margin-top:-48px; position:relative; z-index:2;
    flex-wrap:wrap; gap:1rem;
  }
  .mp-avatar-wrap { position:relative; cursor:pointer; }
  .mp-avatar {
    width:96px; height:96px; border-radius:50%;
    background:linear-gradient(135deg, var(--sketch-blue,#4a6670), #d6cfc4);
    border:4px solid var(--paper-white,#fdfdf9);
    box-shadow:0 8px 28px rgba(0,0,0,0.12);
    display:flex; align-items:center; justify-content:center;
    font-size:2rem; font-weight:800; color:white;
    flex-shrink:0; overflow:hidden;
  }
  .mp-avatar img { width:100%; height:100%; object-fit:cover; border-radius:50%; }
  .mp-avatar-overlay {
    position:absolute; inset:0; border-radius:50%; background:rgba(0,0,0,0.45);
    display:flex; align-items:center; justify-content:center;
    opacity:0; transition:opacity .2s; font-size:.65rem; color:white; font-weight:700;
    text-align:center; letter-spacing:.3px; padding:.3rem;
    border:4px solid var(--paper-white,#fdfdf9);
  }
  .mp-avatar-wrap:hover .mp-avatar-overlay { opacity:1; }
  .mp-online {
    position:absolute; bottom:4px; right:4px;
    width:20px; height:20px; border-radius:50%;
    background:#2e7d52; border:2px solid var(--paper-white,#fdfdf9);
  }

  .mp-identity { padding:.4rem 2rem 0; }
  .mp-name { font-family:'Cormorant Garamond',serif; font-size:1.8rem; font-weight:600; margin-bottom:.1rem; }
  .mp-name-empty { font-family:'Cormorant Garamond',serif; font-size:1.8rem; font-weight:300; color:var(--warm-gray,#736b5e); margin-bottom:.1rem; }
  .mp-handle { color:var(--warm-gray,#736b5e); font-size:.86rem; font-weight:500; margin-bottom:.5rem; }
  .mp-bio { font-family:'Crimson Text',serif; font-style:italic; font-size:.98rem; color:var(--warm-gray,#736b5e); max-width:500px; line-height:1.65; margin-bottom:.7rem; }
  .mp-bio-empty { font-family:'Crimson Text',serif; font-style:italic; font-size:.92rem; color:var(--light-gray,#e8e6df); margin-bottom:.7rem; }
  .mp-meta { display:flex; flex-wrap:wrap; gap:.9rem; margin-bottom:.3rem; }
  .mp-meta span { font-size:.8rem; color:var(--warm-gray,#736b5e); display:flex; align-items:center; gap:.3rem; }
  .mp-meta a { color:var(--accent-gold,#b8956a); font-weight:600; text-decoration:none; }
  .mp-meta a:hover { text-decoration:underline; }
  .mp-joined { display:inline-block; margin-top:.5rem; font-size:.74rem; color:var(--warm-gray,#736b5e); background:var(--soft-cream,#f5f3ed); border:1px solid var(--light-gray,#e8e6df); border-radius:20px; padding:.22rem .7rem; }

  .mp-stats { display:flex; border-top:1px solid var(--light-gray,#e8e6df); border-bottom:1px solid var(--light-gray,#e8e6df); margin:1.2rem 0 0; }
  .mp-stat { flex:1; padding:.9rem .5rem; text-align:center; border-right:1px solid var(--light-gray,#e8e6df); }
  .mp-stat:last-child { border-right:none; }
  .mp-stat-n { font-family:'Cormorant Garamond',serif; font-size:1.4rem; font-weight:700; line-height:1; margin-bottom:.2rem; }
  .mp-stat-l { font-size:.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.6px; color:var(--warm-gray,#736b5e); }

  .mp-tabs { display:flex; border-bottom:2px solid var(--light-gray,#e8e6df); padding:0 2rem; }
  .mp-tab { padding:.9rem 1.2rem .75rem; background:none; border:none; border-bottom:2px solid transparent; margin-bottom:-2px; cursor:pointer; font-family:'Raleway',sans-serif; font-size:.78rem; font-weight:700; letter-spacing:.6px; text-transform:uppercase; color:var(--warm-gray,#736b5e); transition:all .2s; }
  .mp-tab:hover { color:var(--ink-black,#1a1a1a); }
  .mp-tab.active { color:var(--ink-black,#1a1a1a); border-bottom-color:var(--ink-black,#1a1a1a); }

  .mp-body { display:grid; grid-template-columns:1fr 280px; gap:1.8rem; padding:1.8rem 2rem; max-width:1100px; margin:0 auto; align-items:start; }

  .mp-empty { text-align:center; padding:3rem 1rem; }
  .mp-empty-icon { font-size:2.5rem; margin-bottom:.8rem; }
  .mp-empty h4 { font-family:'Cormorant Garamond',serif; font-size:1.15rem; font-weight:300; margin-bottom:.3rem; }
  .mp-empty p { font-family:'Crimson Text',serif; font-style:italic; font-size:.88rem; color:var(--warm-gray,#736b5e); }

  .mp-about { display:flex; flex-direction:column; gap:1.2rem; }
  .mp-card { background:white; border:1px solid var(--light-gray,#e8e6df); border-radius:10px; padding:1.3rem; }
  .mp-card h4 { font-family:'Cormorant Garamond',serif; font-size:1.05rem; font-weight:600; margin-bottom:.8rem; padding-bottom:.45rem; border-bottom:1px solid var(--light-gray,#e8e6df); }
  .mp-card p { font-family:'Crimson Text',serif; font-style:italic; color:var(--warm-gray,#736b5e); line-height:1.75; font-size:.97rem; }
  .mp-card p.empty { opacity:.45; }

  .mp-sidebar { display:flex; flex-direction:column; gap:1.1rem; }
  .mp-side { background:white; border:1px solid var(--light-gray,#e8e6df); border-radius:10px; padding:1.1rem; }
  .mp-side h4 { font-family:'Cormorant Garamond',serif; font-size:.98rem; font-weight:600; margin-bottom:.8rem; padding-bottom:.4rem; border-bottom:1px solid var(--light-gray,#e8e6df); }
  .mp-info-row { display:flex; flex-direction:column; gap:.55rem; }
  .mp-info-item { display:flex; align-items:flex-start; gap:.6rem; font-size:.82rem; color:var(--warm-gray,#736b5e); }
  .mp-info-label { font-weight:700; font-size:.72rem; text-transform:uppercase; letter-spacing:.4px; color:var(--ink-black,#1a1a1a); min-width:60px; margin-top:.05rem; }
  .mp-info-val { word-break:break-word; }
  .mp-info-val a { color:var(--accent-gold,#b8956a); font-weight:600; text-decoration:none; }
  .mp-info-val a:hover { text-decoration:underline; }

  /* EDIT MODAL */
  .mp-overlay { position:fixed; inset:0; background:rgba(26,26,26,0.5); z-index:2000; display:flex; align-items:center; justify-content:center; padding:1rem; animation:mpFade .2s ease both; }
  .mp-modal { background:var(--paper-white,#fdfdf9); border-radius:12px; padding:1.8rem; width:100%; max-width:520px; max-height:88vh; overflow-y:auto; box-shadow:0 24px 60px rgba(0,0,0,0.15); }
  .mp-modal h3 { font-family:'Cormorant Garamond',serif; font-size:1.4rem; font-weight:600; margin-bottom:1.1rem; }
  .mp-modal-section { font-size:.7rem; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--warm-gray,#736b5e); padding:.6rem 0 .4rem; margin-top:.4rem; border-top:1px solid var(--light-gray,#e8e6df); }
  .mp-mfield { display:flex; flex-direction:column; margin-bottom:.9rem; }
  .mp-mfield label { font-size:.72rem; font-weight:700; letter-spacing:.6px; text-transform:uppercase; margin-bottom:.35rem; }
  .mp-mfield input, .mp-mfield textarea { padding:.75rem .9rem; border:1.5px solid var(--light-gray,#e8e6df); background:var(--soft-cream,#f5f3ed); border-radius:6px; font-family:'Raleway',sans-serif; font-size:.87rem; color:var(--ink-black,#1a1a1a); transition:border-color .18s; resize:vertical; }
  .mp-mfield input:focus, .mp-mfield textarea:focus { outline:none; border-color:var(--accent-gold,#b8956a); background:white; }
  .mp-mfield-row { display:grid; grid-template-columns:1fr 1fr; gap:.7rem; }

  .mp-photo-upload { display:flex; align-items:center; gap:1rem; margin-bottom:1rem; }
  .mp-photo-preview { width:60px; height:60px; border-radius:50%; background:linear-gradient(135deg,var(--sketch-blue,#4a6670),#d6cfc4); border:2px solid var(--light-gray,#e8e6df); display:flex; align-items:center; justify-content:center; font-size:1.4rem; color:white; font-weight:700; overflow:hidden; flex-shrink:0; }
  .mp-photo-preview img { width:100%; height:100%; object-fit:cover; border-radius:50%; }
  .mp-photo-btn { padding:.5rem 1rem; border:2px solid var(--accent-gold,#b8956a); border-radius:20px; background:transparent; color:var(--accent-gold,#b8956a); font-family:'Raleway',sans-serif; font-size:.72rem; font-weight:700; cursor:pointer; transition:all .2s; }
  .mp-photo-btn:hover { background:var(--accent-gold,#b8956a); color:white; }

  .mp-mactions { display:flex; gap:.7rem; margin-top:1.2rem; }
  .mp-msave { flex:1; padding:.8rem; border:none; border-radius:7px; background:var(--ink-black,#1a1a1a); color:white; font-family:'Raleway',sans-serif; font-size:.8rem; font-weight:700; letter-spacing:.6px; text-transform:uppercase; cursor:pointer; transition:all .22s; }
  .mp-msave:hover { background:var(--sketch-blue,#4a6670); }
  .mp-msave:disabled { opacity:.6; cursor:not-allowed; }
  .mp-mcancel { padding:.8rem 1.2rem; border:2px solid var(--light-gray,#e8e6df); border-radius:7px; background:transparent; color:var(--warm-gray,#736b5e); font-family:'Raleway',sans-serif; font-size:.8rem; font-weight:600; cursor:pointer; transition:all .22s; }
  .mp-mcancel:hover { border-color:var(--ink-black,#1a1a1a); color:var(--ink-black,#1a1a1a); }

  .mp-saved-toast { position:fixed; bottom:2rem; right:2rem; z-index:9999; background:var(--ink-black,#1a1a1a); color:white; padding:.9rem 1.5rem; border-radius:9px; font-size:.86rem; font-weight:600; box-shadow:0 12px 35px rgba(0,0,0,0.18); animation:mpFade .3s ease both; display:flex; align-items:center; gap:.6rem; }

  @media(max-width:780px){
    .mp-body { grid-template-columns:1fr; }
    .mp-sidebar { order:-1; }
    .mp-mfield-row { grid-template-columns:1fr; }
  }
`;

/* ══════════════════════════════
   EDIT MODAL
══════════════════════════════ */
function EditModal({ profile, onSave, onClose }) {
  const [d, setD]               = useState({ ...profile });
  const [saving, setSaving]     = useState(false);
  const [photoPreview, setPhotoPreview] = useState(profile?.profilePhoto || null);
  const fileRef                 = useRef();

  const s = (k, v) => setD(p => ({ ...p, [k]: v }));

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      setPhotoPreview(base64);
      s("profilePhoto", base64);
    };
    reader.readAsDataURL(file);
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("http://localhost:8080/api/users/profile", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: d.name,
          handle: d.handle,
          bio: d.bio,
          profilePhoto: d.profilePhoto,
          location: d.location,
          website: d.website,
          addressLine: d.addressLine,
          city: d.city,
          pinCode: d.pinCode,
          phone: d.phone
        })
      });
      if (res.ok) {
        const updated = await res.json();
        onSave({
          ...d,
          id: updated.id,
          createdAt: updated.createdAt,
          updatedAt: updated.updatedAt
        });
        onClose();
      } else {
        alert("Save failed. Please try again.");
      }
    } catch (e) {
      console.error("Profile save error:", e);
      alert("Save failed. Please check your connection.");
    } finally {
      setSaving(false);
    }
  };

  const initials = d.name
    ? d.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <div className="mp-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="mp-modal">
        <h3>Edit Profile</h3>

        {/* ── Photo upload ── */}
        <div className="mp-photo-upload">
          <div className="mp-photo-preview">
            {photoPreview
              ? <img src={photoPreview} alt="preview"/>
              : initials
            }
          </div>
          <div>
            <button className="mp-photo-btn" onClick={() => fileRef.current.click()}>
              📷 Change Photo
            </button>
            <input
              ref={fileRef} type="file" accept="image/*"
              style={{ display:"none" }} onChange={handlePhoto}
            />
            {photoPreview && (
              <button
                style={{ marginLeft:".6rem", background:"none", border:"none", cursor:"pointer", fontSize:".75rem", color:"var(--warm-gray,#736b5e)" }}
                onClick={() => { setPhotoPreview(null); s("profilePhoto", null); }}
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* ── Identity fields ── */}
        {[
          ["name",     "Full Name"],
          ["handle",   "Handle (e.g. @yourname)"],
          ["location", "Location"],
          ["website",  "Website"],
        ].map(([k, l]) => (
          <div key={k} className="mp-mfield">
            <label>{l}</label>
            <input value={d[k] || ""} onChange={e => s(k, e.target.value)}/>
          </div>
        ))}
        <div className="mp-mfield">
          <label>Bio</label>
          <textarea
            rows={3} value={d.bio || ""}
            onChange={e => s("bio", e.target.value)}
            placeholder="Tell people about yourself and your art…"
          />
        </div>

        {/* ── Saved address ── */}
        <div className="mp-modal-section">Saved Address</div>
        <div className="mp-mfield">
          <label>Street Address</label>
          <input
            value={d.addressLine || ""} onChange={e => s("addressLine", e.target.value)}
            placeholder="Flat / Street / Area"
          />
        </div>
        <div className="mp-mfield-row">
          <div className="mp-mfield">
            <label>City</label>
            <input value={d.city || ""} onChange={e => s("city", e.target.value)} placeholder="Mumbai"/>
          </div>
          <div className="mp-mfield">
            <label>PIN Code</label>
            <input value={d.pinCode || ""} onChange={e => s("pinCode", e.target.value)} placeholder="400001"/>
          </div>
        </div>
        <div className="mp-mfield">
          <label>Phone</label>
          <input value={d.phone || ""} onChange={e => s("phone", e.target.value)} placeholder="+91 98765 43210"/>
        </div>

        <div className="mp-mactions">
          <button className="mp-mcancel" onClick={onClose}>Cancel</button>
          <button className="mp-msave" onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   MY PROFILE PAGE
══════════════════════════════ */
export default function MyProfile({ user, setUser, token }) {
  const [tab, setTab]         = useState("works");
  const [editOpen, setEditOpen] = useState(false);
  const [profile, setProfile]   = useState(user || {});

  // Keep profile in sync if user changes upstream
  useEffect(() => {
    setProfile(user || {});
  }, [user]);

  const initials = profile?.name
    ? profile.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  const heroTag = profile?.name
    ? `${profile.name}${profile.location ? " ✦ " + profile.location : ""}`
    : "My Profile";

  return (
    <>
      <style>{STYLES}</style>
      <div className="mp-page">

        {/* ── HERO ── */}
        <div className="mp-hero">
          <div className="mp-hero-tag">{heroTag}</div>
          <button className="mp-hero-edit" onClick={() => setEditOpen(true)}>✎ Edit Profile</button>
        </div>

        {/* ── AVATAR ── */}
        <div className="mp-avatar-row">
          <div className="mp-avatar-wrap" onClick={() => setEditOpen(true)}>
            <div className="mp-avatar">
              {profile?.profilePhoto
                ? <img src={profile.profilePhoto} alt={profile.name}/>
                : initials
              }
            </div>
            <div className="mp-avatar-overlay">📷<br/>Change</div>
            <div className="mp-online"/>
          </div>
        </div>

        {/* ── IDENTITY ── */}
        <div className="mp-identity">
          {profile?.name
            ? <div className="mp-name">{profile.name}</div>
            : <div className="mp-name-empty">Your Name</div>
          }
          {profile?.handle && <div className="mp-handle">{profile.handle}</div>}
          {profile?.bio
            ? <p className="mp-bio">{profile.bio}</p>
            : <p className="mp-bio-empty">No bio yet — click Edit Profile to add one.</p>
          }
          <div className="mp-meta">
            {profile?.location && <span>📍 {profile.location}</span>}
            {profile?.email    && <span>✉️ {profile.email}</span>}
            {profile?.website  && <span>🔗 <a href="#">{profile.website}</a></span>}
          </div>
          {profile?.joined && <div className="mp-joined">📅 {profile.joined}</div>}
        </div>



        {/* ── TABS ── */}
        <div className="mp-tabs">
          {[["works","Works"],["about","About"]].map(([id, l]) => (
            <button
              key={id}
              className={`mp-tab${tab === id ? " active" : ""}`}
              onClick={() => setTab(id)}
            >
              {l}
            </button>
          ))}
        </div>

        {/* ── BODY ── */}
        <div className="mp-body">
          <div>
{tab === "works" && (
              <div>
                <div style={{ padding: "0 2rem 1.5rem", borderBottom: "1px solid var(--light-gray,#e8e6df)" }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 600, marginBottom: "1rem" }}>
                    Selected Studies
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                    <img src="https://i.pinimg.com/736x/e7/3b/d1/e73bd1589398724a06e300213e377eb3.jpg" alt="Study 1" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                    <img src="https://i.pinimg.com/1200x/46/57/36/46573641e04ad0e9f4c4186a492735dc.jpg" alt="Study 2" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                    <img src="https://i.pinimg.com/1200x/70/06/8d/70068de3ed73336f09b260db7b97e8c4.jpg" alt="Study 3" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                    <img src="https://i.pinimg.com/736x/c9/13/b6/c913b6a07c6b94f0ae16695274944315.jpg" alt="Study 4" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                  </div>
                </div>
              </div>
            )}

            {tab === "about" && (
              <div className="mp-about">
                <div className="mp-card">
                  <h4>About</h4>
                  {profile?.bio
                    ? <p>{profile.bio}</p>
                    : <p className="empty">No bio added yet. Use Edit Profile to tell people about yourself.</p>
                  }
                </div>
                {(profile?.addressLine || profile?.city) && (
                  <div className="mp-card">
                    <h4>Saved Address</h4>
                    <p>{[profile.addressLine, profile.city, profile.pinCode].filter(Boolean).join(", ")}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <div className="mp-sidebar">
            <div className="mp-side">
              <h4>Account Info</h4>
              <div className="mp-info-row">
                {profile?.name     && <div className="mp-info-item"><span className="mp-info-label">Name</span><span className="mp-info-val">{profile.name}</span></div>}
                {profile?.handle   && <div className="mp-info-item"><span className="mp-info-label">Handle</span><span className="mp-info-val">{profile.handle}</span></div>}
                {profile?.email    && <div className="mp-info-item"><span className="mp-info-label">Email</span><span className="mp-info-val">{profile.email}</span></div>}
                {profile?.phone    && <div className="mp-info-item"><span className="mp-info-label">Phone</span><span className="mp-info-val">{profile.phone}</span></div>}
                {profile?.location && <div className="mp-info-item"><span className="mp-info-label">Location</span><span className="mp-info-val">{profile.location}</span></div>}
                {profile?.website  && <div className="mp-info-item"><span className="mp-info-label">Website</span><span className="mp-info-val"><a href="#">{profile.website}</a></span></div>}
                {!profile?.name && !profile?.email && (
                  <p style={{fontFamily:"'Crimson Text',serif",fontStyle:"italic",fontSize:".85rem",color:"var(--warm-gray,#736b5e)",opacity:.7}}>
                    No info yet. Click Edit Profile to get started.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {editOpen && (
        <EditModal
          profile={profile}
          onSave={(updated) => {
            setProfile(p => ({ ...p, ...updated }));
            setUser(u => ({ ...u, ...updated }));
          }}
          onClose={() => setEditOpen(false)}
        />
      )}
    </>
  );
}