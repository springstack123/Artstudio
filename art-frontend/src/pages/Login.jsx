import { useState } from "react";

/* ── password strength ── */
function passwordStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "" };
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const map = [
    { label: "Too short",  color: "#c0392b" },
    { label: "Weak",       color: "#c0392b" },
    { label: "Fair",       color: "#e67e22" },
    { label: "Good",       color: "#27ae60" },
    { label: "Strong 💪",  color: "#1a6e3c" },
  ];
  return { score: s, ...map[s] };
}

const GoogleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.6 2.5 30.1 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.8 6C12.4 13.2 17.8 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 6.9-10 6.9-17z"/>
    <path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6A24 24 0 0 0 0 24c0 3.8.9 7.4 2.5 10.7l8-6z"/>
    <path fill="#34A853" d="M24 48c6.1 0 11.2-2 14.9-5.4l-7.5-5.8c-2 1.4-4.6 2.2-7.4 2.2-6.2 0-11.5-4.2-13.4-9.9l-8 6.2C6.7 42.7 14.7 48 24 48z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

/* ═══════════════════════════════════
   AUTH STYLES
═══════════════════════════════════ */
const AUTH_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Architects+Daughter&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Raleway:wght@300;400;500;600;700&display=swap');

  .auth-page { display:grid; grid-template-columns:1fr 1fr; min-height:100vh; }
  @media(max-width:700px){ .auth-page{grid-template-columns:1fr;} .auth-left{display:none;} }

  .auth-left { background:linear-gradient(135deg,#2c3e50,var(--sketch-blue,#4a6670),#1a1a1a); position:relative; overflow:hidden; display:flex; align-items:stretch; }
  .auth-left-inner { padding:3rem 2.5rem; display:flex; flex-direction:column; justify-content:flex-end; width:100%; position:relative; z-index:1; }
  .auth-panel-logo { font-family:'Architects Daughter',cursive; font-size:1rem; color:rgba(255,255,255,0.6); letter-spacing:2px; margin-bottom:auto; padding-top:1rem; display:block; }
  .auth-panel-heading { font-family:'Cormorant Garamond',serif; font-size:2.8rem; font-weight:300; color:white; line-height:1.15; margin-bottom:1rem; }
  .auth-panel-heading em { font-style:italic; color:var(--accent-gold,#b8956a); }
  .auth-panel-tagline { font-family:'Crimson Text',serif; font-style:italic; color:rgba(255,255,255,0.65); font-size:1rem; line-height:1.7; margin-bottom:1.5rem; max-width:320px; }
  .auth-dots { display:flex; gap:.5rem; margin-bottom:2rem; }
  .auth-dot { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,0.3); }
  .auth-dot--active { background:var(--accent-gold,#b8956a); width:24px; border-radius:4px; }
  .auth-deco { position:absolute; bottom:2rem; right:2rem; opacity:0.18; }

  .auth-right { display:flex; align-items:center; justify-content:center; padding:2rem; background:var(--paper-white,#fdfdf9); }
  .auth-form-box { width:100%; max-width:420px; }
  .auth-form-title { font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:600; margin-bottom:.3rem; }
  .auth-form-subtitle { font-family:'Crimson Text',serif; font-style:italic; color:var(--warm-gray,#736b5e); margin-bottom:1.6rem; font-size:.95rem; }

  .auth-social-row { display:flex; gap:.7rem; margin-bottom:1.2rem; }
  .auth-social-btn { flex:1; display:flex; align-items:center; justify-content:center; gap:.5rem; padding:.75rem; border:2px solid var(--light-gray,#e8e6df); border-radius:8px; background:white; cursor:pointer; font-family:'Raleway',sans-serif; font-size:.8rem; font-weight:700; color:var(--ink-black,#1a1a1a); transition:all .22s; }
  .auth-social-btn:hover { border-color:var(--accent-gold,#b8956a); background:var(--soft-cream,#f5f3ed); }

  .auth-divider { display:flex; align-items:center; gap:.8rem; margin:1.2rem 0; color:var(--warm-gray,#736b5e); font-size:.75rem; font-weight:700; letter-spacing:.5px; text-transform:uppercase; }
  .auth-divider::before,.auth-divider::after { content:''; flex:1; height:1px; background:var(--light-gray,#e8e6df); }

  .form-group { display:flex; flex-direction:column; margin-bottom:1rem; }
  .form-group label { font-size:.72rem; font-weight:700; letter-spacing:.5px; text-transform:uppercase; margin-bottom:.38rem; color:var(--ink-black,#1a1a1a); }
  .form-group input { padding:.8rem 1rem; border:1.5px solid var(--light-gray,#e8e6df); background:var(--soft-cream,#f5f3ed); border-radius:7px; font-family:'Raleway',sans-serif; font-size:.9rem; color:var(--ink-black,#1a1a1a); transition:all .18s; }
  .form-group input:focus { outline:none; border-color:var(--accent-gold,#b8956a); background:white; }
  .auth-input-error { border-color:#e74c3c !important; }
  .auth-err { font-size:.75rem; color:#e74c3c; margin-top:.3rem; }

  .auth-field-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:.38rem; }
  .auth-forgot { font-size:.75rem; color:var(--accent-gold,#b8956a); cursor:pointer; font-weight:600; }
  .auth-forgot:hover { text-decoration:underline; }

  .auth-pw-wrap { position:relative; }
  .auth-eye { position:absolute; right:.8rem; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; font-size:1rem; padding:.2rem; }

  .auth-strength { display:flex; align-items:center; gap:.6rem; margin-top:.4rem; }
  .auth-strength-track { flex:1; height:4px; background:var(--light-gray,#e8e6df); border-radius:4px; overflow:hidden; }
  .auth-strength-fill { height:100%; border-radius:4px; transition:all .3s; }
  .auth-strength-label { font-size:.72rem; font-weight:700; }

  .auth-remember { display:flex; align-items:center; gap:.5rem; font-size:.8rem; color:var(--warm-gray,#736b5e); cursor:pointer; margin-bottom:1.2rem; }

  .auth-submit-btn { width:100%; padding:.9rem; border:none; border-radius:8px; background:var(--ink-black,#1a1a1a); color:white; font-family:'Raleway',sans-serif; font-size:.86rem; font-weight:700; letter-spacing:.8px; text-transform:uppercase; cursor:pointer; transition:all .28s; margin-bottom:1rem; }
  .auth-submit-btn:hover:not(:disabled) { background:var(--sketch-blue,#4a6670); transform:translateY(-2px); box-shadow:0 10px 28px rgba(0,0,0,0.14); }
  .auth-submit-btn:disabled { opacity:.65; cursor:not-allowed; }

  .auth-switch { font-size:.83rem; color:var(--warm-gray,#736b5e); text-align:center; }
  .auth-switch-link { color:var(--accent-gold,#b8956a); font-weight:700; cursor:pointer; }
  .auth-switch-link:hover { text-decoration:underline; }
  .auth-terms { font-size:.75rem; color:var(--warm-gray,#736b5e); text-align:center; margin-bottom:.8rem; line-height:1.5; }
  .auth-terms span { color:var(--accent-gold,#b8956a); cursor:pointer; font-weight:600; }

  .auth-success { display:flex; align-items:center; justify-content:center; min-height:60vh; padding:2rem; }
  .auth-success-card { background:white; border-radius:14px; padding:3rem 2.5rem; text-align:center; max-width:420px; width:100%; border:1px solid var(--light-gray,#e8e6df); box-shadow:0 24px 60px rgba(0,0,0,0.08); }
  .auth-success-icon { font-size:3rem; margin-bottom:1rem; }
  .auth-success-title { font-family:'Cormorant Garamond',serif; font-size:1.8rem; font-weight:600; margin-bottom:.5rem; }
  .auth-success-text { font-family:'Crimson Text',serif; font-style:italic; color:var(--warm-gray,#736b5e); margin-bottom:1.5rem; line-height:1.6; }
  .btn { padding:.85rem 2rem; border-radius:8px; font-family:'Raleway',sans-serif; font-size:.84rem; font-weight:700; letter-spacing:.8px; text-transform:uppercase; cursor:pointer; transition:all .25s; border:none; }
  .btn-primary { background:var(--ink-black,#1a1a1a); color:white; }
  .btn-primary:hover { background:var(--sketch-blue,#4a6670); transform:translateY(-2px); }
`;

/* ═══════════════════════════════════
   LOGIN
═══════════════════════════════════ */
export function Login({ showPage, onSwitch, onSuccess }) {
  const [form, setForm]     = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "At least 6 characters";
    return e;
  };

  const submit = async ev => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res  = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const responseData = data.data;
        if (responseData.role === "ADMIN") {
          localStorage.setItem("isAdmin", "true");
          showPage("admin");
        } else {
          setSuccess(true);
          if (typeof onSuccess === "function") onSuccess(responseData);
        }
      } else {
        setErrors({ password: data.message || data.error || "Login failed" });
      }
    } catch {
      setErrors({ password: "Server error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <>
      <style>{AUTH_STYLES}</style>
      <div className="auth-success">
        <div className="auth-success-card">
          <div className="auth-success-icon">✨</div>
          <h3 className="auth-success-title">Welcome back!</h3>
          <p className="auth-success-text">You've successfully signed in to Studio by Ankita.</p>
          <button className="btn btn-primary" onClick={() => showPage("home")}>Continue browsing</button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{AUTH_STYLES}</style>
      <div className="auth-page">
        <div className="auth-left">
          <div className="auth-left-inner">
            <span className="auth-panel-logo">studio by ankita</span>
            <h2 className="auth-panel-heading">Every line<br />tells a <em>story.</em></h2>
            <p className="auth-panel-tagline">Sign in to access your commissions, track orders, and save favourites from the studio.</p>
            <div className="auth-dots">
              <span className="auth-dot auth-dot--active"></span>
              <span className="auth-dot"></span>
              <span className="auth-dot"></span>
            </div>
            <div className="auth-deco" aria-hidden="true">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                <rect x="10" y="10" width="180" height="180" stroke="white" strokeWidth="1" strokeDasharray="6 4"/>
                <line x1="10" y1="70" x2="190" y2="70" stroke="white" strokeWidth="1"/>
                <line x1="70" y1="10" x2="70" y2="190" stroke="white" strokeWidth="1"/>
                <circle cx="100" cy="100" r="45" stroke="white" strokeWidth="1" strokeDasharray="4 3"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-box">
            <h2 className="auth-form-title">Sign In</h2>
            <p className="auth-form-subtitle">Welcome back — good to see you again.</p>

            <div className="auth-social-row">
              <button className="auth-social-btn"><GoogleIcon /> Google</button>
              <button className="auth-social-btn"><AppleIcon /> Apple</button>
            </div>
            <div className="auth-divider"><span>or continue with email</span></div>

            <form onSubmit={submit} noValidate>
              <div className="form-group">
                <label htmlFor="li-email">Email Address</label>
                <input id="li-email" type="email" placeholder="you@example.com"
                  value={form.email} onChange={e => set("email", e.target.value)}
                  className={errors.email ? "auth-input-error" : ""}/>
                {errors.email && <span className="auth-err">{errors.email}</span>}
              </div>

              <div className="form-group">
                <div className="auth-field-row">
                  <label htmlFor="li-pw">Password</label>
                  <span className="auth-forgot" onClick={() => alert("Password reset link sent!")}>Forgot?</span>
                </div>
                <div className="auth-pw-wrap">
                  <input id="li-pw" type={showPw ? "text" : "password"} placeholder="••••••••"
                    value={form.password} onChange={e => set("password", e.target.value)}
                    className={errors.password ? "auth-input-error" : ""}
                    style={{ paddingRight: "2.8rem" }}/>
                  <button type="button" className="auth-eye" onClick={() => setShowPw(p => !p)}>
                    {showPw ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && <span className="auth-err">{errors.password}</span>}
              </div>

              <label className="auth-remember">
                <input type="checkbox" checked={form.remember} onChange={e => set("remember", e.target.checked)}/>
                Remember me for 30 days
              </label>

              <button className="auth-submit-btn" type="submit" disabled={loading}>
                {loading ? "Signing in…" : "Sign In →"}
              </button>
            </form>

            <p className="auth-switch">
              Don't have an account?{" "}
              <span className="auth-switch-link" onClick={onSwitch}>Create one</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════
   SIGN UP
═══════════════════════════════════ */
export function SignUp({ showPage, onSwitch, onSuccess }) {
  const [form, setForm]     = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  };

  const strength = passwordStrength(form.password);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "At least 8 characters";
    if (!form.confirm) e.confirm = "Please confirm your password";
    else if (form.confirm !== form.password) e.confirm = "Passwords do not match";
    return e;
  };

  const submit = async ev => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res  = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const responseData = data.data;
        if (responseData.role === "ADMIN") {
          localStorage.setItem("isAdmin", "true");
          showPage("admin");
        } else {
          if (onSuccess) onSuccess(responseData);
          setSuccess(true);
        }
      } else {
        setErrors({ email: data.message || data.error || "Registration failed" });
      }
    } catch {
      setErrors({ email: "Server error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <>
      <style>{AUTH_STYLES}</style>
      <div className="auth-success">
        <div className="auth-success-card">
          <div className="auth-success-icon">🎨</div>
          <h3 className="auth-success-title">Account Created!</h3>
          <p className="auth-success-text">Welcome to Studio by Ankita. You're now signed in.</p>
          <button className="btn btn-primary" onClick={() => showPage("home")}>Start exploring</button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{AUTH_STYLES}</style>
      <div className="auth-page">
        <div className="auth-left">
          <div className="auth-left-inner">
            <span className="auth-panel-logo">studio by ankita</span>
            <h2 className="auth-panel-heading">Join the<br /><em>collector's</em><br />circle.</h2>
            <p className="auth-panel-tagline">Create an account to commission original art, track your orders, and curate your personal wishlist.</p>
            <div className="auth-dots">
              <span className="auth-dot"></span>
              <span className="auth-dot auth-dot--active"></span>
              <span className="auth-dot"></span>
            </div>
            <div className="auth-deco" aria-hidden="true">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                <polygon points="100,10 190,100 100,190 10,100" stroke="white" strokeWidth="1" fill="none"/>
                <polygon points="100,40 160,100 100,160 40,100" stroke="white" strokeWidth="1" fill="none"/>
                <circle cx="100" cy="100" r="18" stroke="white" strokeWidth="1"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-box">
            <h2 className="auth-form-title">Create Account</h2>
            <p className="auth-form-subtitle">Start your collection — it only takes a moment.</p>

            <div className="auth-social-row">
              <button className="auth-social-btn"><GoogleIcon /> Google</button>
              <button className="auth-social-btn"><AppleIcon /> Apple</button>
            </div>
            <div className="auth-divider"><span>or sign up with email</span></div>

            <form onSubmit={submit} noValidate>
              <div className="form-group">
                <label htmlFor="su-name">Full Name</label>
                <input id="su-name" type="text" placeholder="Your full name"
                  value={form.name} onChange={e => set("name", e.target.value)}
                  className={errors.name ? "auth-input-error" : ""}/>
                {errors.name && <span className="auth-err">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="su-email">Email Address</label>
                <input id="su-email" type="email" placeholder="you@example.com"
                  value={form.email} onChange={e => set("email", e.target.value)}
                  className={errors.email ? "auth-input-error" : ""}/>
                {errors.email && <span className="auth-err">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="su-pw">Password</label>
                <div className="auth-pw-wrap">
                  <input id="su-pw" type={showPw ? "text" : "password"} placeholder="Min. 8 characters"
                    value={form.password} onChange={e => set("password", e.target.value)}
                    className={errors.password ? "auth-input-error" : ""}
                    style={{ paddingRight: "2.8rem" }}/>
                  <button type="button" className="auth-eye" onClick={() => setShowPw(p => !p)}>
                    {showPw ? "🙈" : "👁️"}
                  </button>
                </div>
                {form.password && (
                  <div className="auth-strength">
                    <div className="auth-strength-track">
                      <div className="auth-strength-fill" style={{ width:`${(strength.score/4)*100}%`, background:strength.color }}/>
                    </div>
                    <span className="auth-strength-label" style={{ color:strength.color }}>{strength.label}</span>
                  </div>
                )}
                {errors.password && <span className="auth-err">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="su-cf">Confirm Password</label>
                <div className="auth-pw-wrap">
                  <input id="su-cf" type={showCf ? "text" : "password"} placeholder="Repeat your password"
                    value={form.confirm} onChange={e => set("confirm", e.target.value)}
                    className={errors.confirm ? "auth-input-error" : ""}
                    style={{ paddingRight: "2.8rem" }}/>
                  <button type="button" className="auth-eye" onClick={() => setShowCf(p => !p)}>
                    {showCf ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.confirm && <span className="auth-err">{errors.confirm}</span>}
              </div>

              <button className="auth-submit-btn" type="submit" disabled={loading}>
                {loading ? "Creating account…" : "Create Account →"}
              </button>
            </form>

            <p className="auth-terms">
              By signing up you agree to our <span>Terms of Service</span> and <span>Privacy Policy</span>.
            </p>
            <p className="auth-switch">
              Already have an account?{" "}
              <span className="auth-switch-link" onClick={onSwitch}>Sign in</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}