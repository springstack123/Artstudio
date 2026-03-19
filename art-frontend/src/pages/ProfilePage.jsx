import { useState } from "react";

const PROFILE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Architects+Daughter&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Raleway:wght@300;400;500;600;700&display=swap');

  :root {
    --ink-black: #1a1a1a; --paper-white: #fdfdf9; --warm-gray: #736b5e;
    --light-gray: #e8e6df; --accent-gold: #b8956a; --sketch-blue: #4a6670; --soft-cream: #f5f3ed;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Raleway', sans-serif; color: var(--ink-black); background: var(--paper-white); line-height: 1.7; -webkit-font-smoothing: antialiased; overflow-x: hidden; }

  .pr-page { animation: prFade .45s ease both; }
  @keyframes prFade { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }

  .pr-hero { position:relative; height:200px; background:linear-gradient(135deg,#d6cfc4 0%,#b8a99a 40%,var(--sketch-blue) 100%); overflow:hidden; }
  .pr-hero::before { content:''; position:absolute; inset:0; background: radial-gradient(ellipse 60% 80% at 70% 50%,rgba(184,149,106,0.25) 0%,transparent 70%), repeating-linear-gradient(45deg,transparent,transparent 18px,rgba(255,255,255,0.04) 18px,rgba(255,255,255,0.04) 19px); }
  .pr-hero-label { position:absolute; bottom:1rem; left:2rem; font-family:'Architects Daughter',cursive; font-size:.8rem; color:rgba(255,255,255,0.65); letter-spacing:1px; }
  .pr-hero-edit { position:absolute; top:1rem; right:1.5rem; padding:.4rem .95rem; border:1.5px solid rgba(255,255,255,0.5); border-radius:20px; background:rgba(255,255,255,0.15); backdrop-filter:blur(6px); color:white; font-family:'Raleway',sans-serif; font-size:.73rem; font-weight:700; letter-spacing:.6px; text-transform:uppercase; cursor:pointer; transition:all .22s; }
  .pr-hero-edit:hover { background:rgba(255,255,255,0.28); }

  .pr-avatar-row { display:flex; align-items:flex-end; padding:0 2rem 1rem; margin-top:-48px; position:relative; z-index:2; flex-wrap:wrap; gap:1rem; }
  .pr-avatar { width:96px; height:96px; border-radius:50%; background:linear-gradient(135deg,var(--soft-cream),var(--sketch-blue)); border:4px solid var(--paper-white); box-shadow:0 8px 28px rgba(0,0,0,0.12); display:flex; align-items:center; justify-content:center; font-size:2rem; font-weight:800; color:white; flex-shrink:0; }

  .pr-identity { padding:.4rem 2rem 0; }
  .pr-name { font-family:'Cormorant Garamond',serif; font-size:1.8rem; font-weight:600; margin-bottom:.1rem; }
  .pr-handle { color:var(--warm-gray); font-size:.86rem; font-weight:500; margin-bottom:.4rem; }
  .pr-bio { font-family:'Crimson Text',serif; font-style:italic; font-size:.98rem; color:var(--warm-gray); max-width:500px; line-height:1.65; margin-bottom:.7rem; }
  .pr-meta { display:flex; flex-wrap:wrap; gap:.9rem; margin-bottom:.5rem; }
  .pr-meta span { font-size:.8rem; color:var(--warm-gray); display:flex; align-items:center; gap:.3rem; }
  .pr-meta a { color:var(--accent-gold); font-weight:600; text-decoration:none; }
  .pr-meta a:hover { text-decoration:underline; }

  .pr-joined { display:inline-block; margin-top:.6rem; font-size:.75rem; color:var(--warm-gray); background:var(--soft-cream); border:1px solid var(--light-gray); border-radius:20px; padding:.25rem .75rem; }

  .pr-empty-works { text-align:center; padding:3rem 1rem; color:var(--warm-gray); }
  .pr-empty-works .e-icon { font-size:2.5rem; margin-bottom:.8rem; }
  .pr-empty-works h4 { font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-weight:300; margin-bottom:.3rem; }
  .pr-empty-works p { font-family:'Crimson Text',serif; font-style:italic; font-size:.9rem; }

  /* MODAL */
  .pr-modal-overlay { position:fixed; inset:0; background:rgba(26,26,26,0.55); z-index:2000; display:flex; align-items:center; justify-content:center; padding:1rem; animation:prFade .2s ease both; }
  .pr-modal { background:var(--paper-white); border-radius:12px; padding:1.8rem; width:100%; max-width:480px; max-height:85vh; overflow-y:auto; box-shadow:0 24px 60px rgba(0,0,0,0.15); }
  .pr-modal h3 { font-family:'Cormorant Garamond',serif; font-size:1.4rem; font-weight:600; margin-bottom:1.1rem; }
  .pr-mfield { display:flex; flex-direction:column; margin-bottom:.9rem; }
  .pr-mfield label { font-size:.72rem; font-weight:700; letter-spacing:.5px; text-transform:uppercase; margin-bottom:.35rem; }
  .pr-mfield input, .pr-mfield textarea { padding:.75rem .9rem; border:1.5px solid var(--light-gray); background:var(--soft-cream); border-radius:6px; font-family:'Raleway',sans-serif; font-size:.87rem; color:var(--ink-black); transition:border-color .18s; resize:vertical; }
  .pr-mfield input:focus, .pr-mfield textarea:focus { outline:none; border-color:var(--accent-gold); background:white; }
  .pr-mactions { display:flex; gap:.7rem; margin-top:1.2rem; }
  .pr-msave { flex:1; padding:.8rem; border:none; border-radius:7px; background:var(--ink-black); color:white; font-family:'Raleway',sans-serif; font-size:.8rem; font-weight:700; letter-spacing:.6px; text-transform:uppercase; cursor:pointer; transition:all .22s; }
  .pr-msave:hover { background:var(--sketch-blue); }
  .pr-mcancel { padding:.8rem 1.2rem; border:2px solid var(--light-gray); border-radius:7px; background:transparent; color:var(--warm-gray); font-family:'Raleway',sans-serif; font-size:.8rem; font-weight:600; cursor:pointer; transition:all .22s; }
  .pr-mcancel:hover { border-color:var(--ink-black); color:var(--ink-black); }

  @media(max-width:600px){ .pr-identity{padding:.4rem 1rem 0;} .pr-avatar-row{padding:0 1rem 1rem;} }
`;

function EditModal({ profile, onSave, onClose }) {
  const [d, setD] = useState({...profile});
  const s = (k, v) => setD(p => ({...p, [k]: v}));
  return (
    <div className="pr-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="pr-modal">
        <h3>Edit Profile</h3>
        {[["name","Full Name"],["handle","Handle (e.g. @yourname)"],["location","Location"],["website","Website"]].map(([k,l])=>(
          <div key={k} className="pr-mfield">
            <label>{l}</label>
            <input value={d[k] || ""} onChange={e => s(k, e.target.value)}/>
          </div>
        ))}
        <div className="pr-mfield">
          <label>Bio</label>
          <textarea rows={3} value={d.bio || ""} onChange={e => s("bio", e.target.value)}/>
        </div>
        <div className="pr-mactions">
          <button className="pr-mcancel" onClick={onClose}>Cancel</button>
          <button className="pr-msave" onClick={() => { onSave(d); onClose(); }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage({ user, setUser }) {
  const [editOpen, setEditOpen] = useState(false);

  // Initials for avatar
  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <>
      <style>{PROFILE_STYLES}</style>
      <div className="pr-page">

        <div className="pr-hero">
          <div className="pr-hero-label">My Profile</div>
          <button className="pr-hero-edit" onClick={() => setEditOpen(true)}>✎ Edit Profile</button>
        </div>

        <div className="pr-avatar-row">
          <div className="pr-avatar">{initials}</div>
        </div>

        <div className="pr-identity">
          {user?.name
            ? <div className="pr-name">{user.name}</div>
            : <div className="pr-name" style={{color:"var(--warm-gray)",fontWeight:300}}>Your Name</div>
          }
          {user?.handle && <div className="pr-handle">{user.handle}</div>}
          {user?.bio
            ? <p className="pr-bio">{user.bio}</p>
            : <p className="pr-bio" style={{opacity:.5}}>No bio added yet. Click Edit Profile to add one.</p>
          }
          <div className="pr-meta">
            {user?.location && <span>📍 {user.location}</span>}
            {user?.email    && <span>✉️ {user.email}</span>}
            {user?.website  && <span>🔗 <a href="#">{user.website}</a></span>}
          </div>
          {user?.joined && <div className="pr-joined">📅 {user.joined}</div>}
        </div>

        {/* Empty works state */}
        <div style={{padding:"1.5rem 2rem 0"}}>
          <div style={{borderTop:"1px solid var(--light-gray)",paddingTop:"1.5rem"}}>
            <div className="pr-empty-works">
              <div className="e-icon">🖼</div>
              <h4>No works listed yet</h4>
              <p>Items you list in the shop will appear here.</p>
            </div>
          </div>
        </div>

      </div>

      {editOpen && (
        <EditModal
          profile={user}
          onSave={(updated) => setUser(u => ({...u, ...updated}))}
          onClose={() => setEditOpen(false)}
        />
      )}
    </>
  );
}