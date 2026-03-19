import { useState } from "react";

export default function AdminLogin({ showPage }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setField = (key, value) => {
    setForm(f => ({ ...f, [key]: value }));
    setError("");
  };

  const submit = (e) => {
    e.preventDefault();
    if (form.email === "admin@example.com" && form.password === "admin123") {
      // Set admin state (simple)
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("adminToken", "admin-fixed-token"); // dummy for backend calls if needed
      showPage("admin");
    } else {
      setError("Invalid credentials. Use admin@example.com / admin123");
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem', background: '#f8f9fa' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: 'white', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '2.5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#333' }}>Admin Login</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem', fontSize: '0.95rem' }}>Studio Admin Panel</p>
        
        <form onSubmit={submit}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Email</label>
            <input 
              type="email" 
              value={form.email} 
              onChange={e => setField("email", e.target.value)}
              style={{ width: '100%', padding: '0.9rem', border: '2px solid #e1e5e9', borderRadius: '8px', fontSize: '1rem' }}
              placeholder="admin@example.com"
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Password</label>
            <input 
              type="password" 
              value={form.password} 
              onChange={e => setField("password", e.target.value)}
              style={{ width: '100%', padding: '0.9rem', border: '2px solid #e1e5e9', borderRadius: '8px', fontSize: '1rem' }}
              placeholder="admin123"
            />
          </div>

          {error && <div style={{ background: '#fee', color: '#c33', padding: '0.8rem', borderRadius: '6px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%', padding: '1rem', background: '#0d6efd', color: 'white', border: 'none', borderRadius: '8px', 
              fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? "Logging in..." : "Admin Login"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
          <button onClick={() => showPage("login")} style={{ background: 'none', border: 'none', color: '#0d6efd', cursor: 'pointer', fontSize: '0.9rem' }}>
            ← Back to User Login
          </button>
        </p>
      </div>
    </div>
  );
}

