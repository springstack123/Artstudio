import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [msg, setMsg] = useState({ text: "", color: "" });
  const [loading, setLoading] = useState(false);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    const { name, email, subject, message } = form;
    if (!name || !email || !subject || !message) {
      setMsg({ text: "Please fill all fields.", color: "#c0392b" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message })
      });
      if (res.ok) {
        setMsg({ text: "✓ Message sent successfully!", color: "var(--sketch-blue)" });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setMsg({ text: "Error sending message.", color: "#c0392b" });
      }
    } catch {
      setMsg({ text: "Server error. Try again later.", color: "#c0392b" });
    }
    setLoading(false);
  };

  return (
    <section style={{ paddingTop: "20px" }}>
      <div className="contact-section" style={{ paddingTop: "2rem" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.9rem", marginBottom: ".4rem" }}>
          Get in Touch
        </h2>
        <p className="section-subtitle">Reach out for commissions, inquiries, or just to say hello.</p>

        <div className="contact-grid">
          <div className="contact-form">
            <form onSubmit={submit} noValidate>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" name="name" type="text" placeholder="Your name"
                    value={form.name} onChange={handle} required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" name="email" type="email" placeholder="you@example.com"
                    value={form.email} onChange={handle} required />
                </div>
                <div className="form-group full">
                  <label htmlFor="contact-subject">Subject</label>
                  <input id="contact-subject" name="subject" type="text" placeholder="How can I help?"
                    value={form.subject} onChange={handle} required />
                </div>
                <div className="form-group full">
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" name="message" placeholder="Tell me more..."
                    value={form.message} onChange={handle} required />
                </div>
              </div>
              <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button className="btn btn-primary" type="submit" disabled={loading}
                  style={{ opacity: loading ? 0.7 : 1 }}>
                  Send Message
                </button>
                <button type="button" className="btn btn-secondary"
                  onClick={() => { setForm({ name:"", email:"", subject:"", message:"" }); setMsg({ text:"", color:"" }); }}>
                  Clear
                </button>
              </div>
              {msg.text && (
                <div style={{ marginTop: ".8rem", fontWeight: 600, color: msg.color }}>{msg.text}</div>
              )}
            </form>
          </div>

          <div className="contact-info">
            <div className="contact-card">
              <h4>Email</h4>
              <p>hello@example.com</p>
              <p style={{ marginTop: ".4rem", fontSize: ".9rem", color: "#999" }}>
                I usually respond within 24-48 hours.
              </p>
            </div>
            <div className="contact-card">
              <h4>Follow &amp; Connect</h4>
              <p>Stay updated on new sketches and studio news.</p>
              <div className="social-links-large">
                <a href="https://instagram.com/studio.by.ankita" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷</a>
                <a href="https://etsy.com" target="_blank" rel="noopener noreferrer" aria-label="Etsy Shop">🛍️</a>
              </div>
            </div>
            <div className="contact-card">
              <h4>Location</h4>
              <p>South Florida, United States</p>
              <p style={{ marginTop: ".4rem", fontSize: ".9rem", color: "#999" }}>
                Commissions &amp; orders shipped worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}