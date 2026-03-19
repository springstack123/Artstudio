import { useState } from "react";

export default function SketchClub() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState({ text: "", color: "" });

  const join = async () => {
    if (!email || !email.includes("@")) {
      setMsg({ text: "Please enter a valid email.", color: "#c0392b" });
      return;
    }

    try {
      await fetch("http://localhost:8080/api/sketchclub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      setMsg({
        text: "Thanks — you are on the list!",
        color: "var(--sketch-blue)"
      });

      setEmail("");

    } catch (err) {
      setMsg({
        text: "Something went wrong. Try again.",
        color: "#c0392b"
      });
    }
  };

  return (
    <section className="page" aria-hidden="false" style={{ paddingTop: "2.75rem" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "0.5rem 2rem" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.9rem", marginBottom: ".4rem", marginTop: 0 }}>Sketch Club</h2>
        <p className="section-subtitle" style={{ marginTop: 0, marginBottom: 0 }}>Join occasional sketch sessions, prompts and tutorials — for curious minds and fellow sketchers.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.2rem", marginTop: "0.75rem" }}>
          <div className="section-card">
            <h4 style={{ fontFamily: "'Cormorant Garamond',serif", marginBottom: ".6rem" }}>What to expect</h4>
            <p style={{ color: "var(--warm-gray)", lineHeight: 1.7 }}>Monthly prompts, short demo videos, and a small group critique session. Low cost or donation-based events — focused on line, perspective and journaling techniques.</p>
            <ul style={{ marginTop: ".8rem", color: "var(--warm-gray)", lineHeight: 1.8 }}>
              <li>Weekly prompts</li>
              <li>Monthly live demo</li>
              <li>Guest architect talks</li>
            </ul>
          </div>

          <aside className="section-card">
            <h4 style={{ fontFamily: "'Architects Daughter',cursive", color: "var(--accent-gold)" }}>Join the list</h4>
            <p style={{ fontSize: ".92rem", color: "var(--warm-gray)" }}>Get notified about the next session.</p>
            <div style={{ marginTop: ".6rem" }}>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                style={{ width: "100%", padding: ".75rem", border: "1px solid var(--light-gray)", borderRadius: "6px" }}
              />
              <button className="btn btn-primary" style={{ marginTop: ".6rem", width: "100%" }} onClick={join}>Join</button>
              {msg.text && <div style={{ marginTop: ".5rem", fontWeight: 600, color: msg.color }}>{msg.text}</div>}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}