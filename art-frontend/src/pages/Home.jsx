import React, { useState, useEffect } from "react";

export default function Home({ showPage }) {

  const [drawings, setDrawings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/drawings/weekly")
      .then(res => res.json())
      .then(data => setDrawings(data))
      .catch(err => console.error(err));
  }, []);
  return (
    <main className="page" aria-live="polite">
      {/* HERO */}
      <div className="hero">
        <div className="hero-text">
          <h1>Architectural Urban Sketches <strong>Pen &amp; Ink</strong></h1>
          <p className="tagline">"Architectural urban sketching with pen &amp; ink, detailed lines, and travel-journal aesthetics."</p>
          <p style={{ color: "var(--warm-gray)", fontSize: "1rem", lineHeight: 1.8 }}>
            My art style blends architectural line drawing with urban sketching techniques. Using fine-point ink pens, I capture real places with clean structural lines, subtle hatching, and carefully observed perspective—combining illustration and travel journaling into personal, timeless pieces.
          </p>
          <div className="hero-ctas">
            <button className="btn btn" onClick={() => showPage("shop")}>Browse Sketches</button>
            <button className="btn btn-secondary" onClick={() => showPage("commissions")}>Commission Art</button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="sketch-frame">
            <div className="sketch-inner" aria-hidden="true">
              <div className="sketch-lines">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
              <span style={{ padding: "1rem" }}>
                <img src="https://i.pinimg.com/1200x/a3/bd/b8/a3bdb83baf182cc07f46fc57dfe3873a.jpg" alt="Sketch preview" />
              </span>
            </div>
          </div>
          <div className="floating-sketch" style={{ right: "-10px", top: "20px" }}>Morning Brew</div>
          <div className="floating-sketch" style={{ left: "-10px", bottom: "-10px" }}>Exploration</div>
        </div>
      </div>
{/* GALLERY PREVIEW */}
      <section className="gallery-preview" aria-labelledby="galleryTitle">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "var(--max-w)", margin: "0 auto", padding: "0 2rem" }}>
          <div>
            <h3 className="section-title" style={{ fontSize: "1.6rem", marginBottom: ".2rem" }}>Selected Studies</h3>
            <p className="section-subtitle" style={{ margin: 0 }}>A few recent pieces &amp; limited prints</p>
          </div>
          <div style={{ alignSelf: "flex-end" }}>
            <button className="btn btn-secondary" onClick={() => showPage("shop")}>View Shop</button>
          </div>
        </div>
        <div className="gallery-grid" role="list" aria-label="Gallery preview">
          <div className="gallery-item" role="listitem">
            <img src="https://i.pinimg.com/736x/e7/3b/d1/e73bd1589398724a06e300213e377eb3.jpg" alt="Old Couple Characters" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div className="gallery-label">Old Couple Characters</div>
          </div>
          <div className="gallery-item" role="listitem">
            <img src="https://i.pinimg.com/1200x/46/57/36/46573641e04ad0e9f4c4186a492735dc.jpg" alt="Zentangle Journal" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div className="gallery-label">Zentangle Journal</div>
          </div>
          <div className="gallery-item" role="listitem">
            <img src="https://i.pinimg.com/1200x/70/06/8d/70068de3ed73336f09b260db7b97e8c4.jpg" alt="Quirky Creature Gang" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div className="gallery-label">Quirky Creature Gang</div>
          </div>
          <div className="gallery-item" role="listitem">
            <img src="https://i.pinimg.com/736x/c9/13/b6/c913b6a07c6b94f0ae16695274944315.jpg" alt="Tortoise Sketch" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div className="gallery-label">Tortoise Sketch</div>
          </div>
        </div>
      </section>
      {/* APPROACH */}
      <section className="approach-section" aria-labelledby="approachTitle">
        <div className="section-header">
          <h2 id="approachTitle" className="section-title">My Artistic Approach</h2>
          <p className="section-subtitle">Combining technical precision with artistic soul</p>
        </div>
        <div className="approach-grid">
          <div className="approach-card">
            <span className="approach-icon">✏</span>
            <h3>Fine-Point Line Drawing</h3>
            <p>Each piece begins with precise architectural line work—careful perspective, measured proportions, and a focus on compositional balance.</p>
          </div>
          <div className="approach-card">
            <span className="approach-icon">✒</span>
            <h3>Ink &amp; Hatching Technique</h3>
            <p>I build depth and atmosphere through selective hatching, cross-hatching and tonal layers, keeping the language of the mark delicate and purposeful.</p>
          </div>
          <div className="approach-card">
            <span className="approach-icon">🗺️</span>
            <h3>Travel-Journal Aesthetic</h3>
            <p>Sketches are small narratives—snapshots of place, memory, and time—often paired with notes that hint at light, weather and mood.</p>
          </div>
        </div>
      </section><br/><br/><br/>
{/* WEEKLY NEW DRAWINGS */}
<section className="weekly-section" aria-labelledby="weeklyTitle">
  <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "0 2rem" }}>
    
    <div className="section-header">
      <h2 id="weeklyTitle" className="section-title">Weekly New Drawings</h2>
      <p className="section-subtitle">Fresh sketches added every week</p>
    </div>

    <div className="gallery-grid" role="list" aria-label="Weekly drawings">

      {drawings.slice(0, 4).map(d => (
        <div key={d.id} className="gallery-item" role="listitem">
          <img
            src={d.imageUrl}
            alt={d.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div className="gallery-label">{d.title}</div>
        </div>
      ))}
    </div>
  </div>
</section> 
      

      {/* TESTIMONIALS */}
      <br /><br /><br />
      <section className="testimonials" aria-labelledby="testTitle">
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "0 2rem" }}>
          <h3 id="testTitle" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", color: "white", marginBottom: "1rem" }}>What collectors say</h3>
          <div className="testimonials-grid" role="list">
            <div className="testimonial-card" role="listitem">
              <div className="testimonial-text">"Ankita's attention to light and detail transformed a simple street into a cherished memento. The line work is precise and emotive."</div>
              <div className="testimonial-author">— Claire P., Architect</div>
            </div>
            <div className="testimonial-card" role="listitem">
              <div className="testimonial-text">"Ordering a commission was effortless. She captured our family home with surprising warmth and accuracy."</div>
              <div className="testimonial-author">— Miguel R., Homeowner</div>
            </div>
            <div className="testimonial-card" role="listitem">
              <div className="testimonial-text">"Wonderful prints. Subtle tones and beautiful composition — every piece feels hand-picked."</div>
              <div className="testimonial-author">— Studio Buyer</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" aria-labelledby="ctaTitle">
        <div className="cta-content" id="ctaTitle">
          <h2>Bring a Place to Paper</h2>
          <p>Commissions, limited prints, and private studies — every piece is made with architectural care and artistic heart.</p>
          <button className="btn btn-secondary" onClick={() => showPage("commissions")}>Request a commission</button>
        </div>
      </section>
    </main>
  );
}