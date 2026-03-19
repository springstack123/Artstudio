import { useState } from "react";

export default function Commissions() {
  const [msg, setMsg] = useState({ text: "", color: "" });
  const [form, setForm] = useState({ name: "", email: "", location: "", size: "A4 (small)", deadline: "", notes: "" });

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();

    if (!form.name || !form.email || !form.location) {
      setMsg({
        text: "Please fill name, email and location to continue.",
        color: "#c0392b"
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/commissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setMsg({
          text: "Thanks — your request has been sent. I will reply within a few days.",
          color: "var(--sketch-blue)"
        });

        setForm({
          name: "",
          email: "",
          location: "",
          size: "A4 (small)",
          deadline: "",
          notes: ""
        });

      } else {
        setMsg({
          text: "Error sending request. Please try again.",
          color: "#c0392b"
        });
      }

    } catch (error) {
      setMsg({
        text: "Server error. Try again later.",
        color: "#c0392b"
      });
    }
  };

  return (
    <section className="page" aria-hidden="false" style={{ paddingTop: "1.75rem" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "0.5rem 2rem" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.9rem", marginBottom: ".4rem", marginTop: 0 }}>Commission a Sketch</h2>
        <p className="section-subtitle" style={{ marginBottom: "0.75rem", marginTop: 0 }}>Tell me about the place you'd like captured — I will reply with timeline &amp; pricing.</p>

        <div className="commission-content">
          <div className="commission-form">
            <form onSubmit={submit} noValidate>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handle} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handle} required />
                </div>
                <div className="form-group full">
                  <label htmlFor="location">Location / Reference</label>
                  <input id="location" name="location" type="text" placeholder="Address, city or link to photo" value={form.location} onChange={handle} required />
                </div>
                <div className="form-group">
                  <label htmlFor="size">Preferred Size</label>
                  <select id="size" name="size" value={form.size} onChange={handle}>
                    <option>A4 (small)</option>
                    <option>A3 (medium)</option>
                    <option>Custom size</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="deadline">Timeline</label>
                  <input id="deadline" name="deadline" type="text" placeholder="e.g., 2–4 weeks" value={form.deadline} onChange={handle} />
                </div>
                <div className="form-group full">
                  <label htmlFor="notes">Notes &amp; References</label>
                  <textarea id="notes" name="notes" placeholder="Any details about composition, people, color, etc." value={form.notes} onChange={handle}></textarea>
                </div>
              </div>
              <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button className="btn btn-primary" type="submit">Send Request</button>
                <button type="button" className="btn btn-secondary" onClick={() => { setForm({ name: "", email: "", location: "", size: "A4 (small)", deadline: "", notes: "" }); setMsg({ text: "", color: "" }); }}>Reset</button>
              </div>
              {msg.text && <div style={{ marginTop: ".8rem", color: msg.color, fontWeight: 600 }}>{msg.text}</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}