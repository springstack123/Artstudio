export default function About() {
  return (
    <section className="page" aria-hidden="false" style={{ paddingTop: "20px" }}>
      
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "2rem" }}>

        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.9rem", marginBottom: ".4rem" }}>
          About - Art Studio
        </h2>
        <p className="section-subtitle">
          Architectural background, travel-led practice, and a love for pen, paper, and proportion.
        </p>

        {/* ── TWO-COLUMN GRID ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: "2.5rem",
          marginTop: "1.8rem",
          alignItems: "start",
        }}>

          {/* ── LEFT COLUMN ── */}
          <div>

            {/* SECTION 1: Bio */}
            <div style={{ paddingBottom: "1.5rem" }}>
              <p style={{ color: "var(--warm-gray)", lineHeight: 1.8 }}>
                Hi! I'm Ankita — I turn cherished places into carefully observed sketches.
                With a background in architecture, my work focuses on structure, light and
                the small human details that bring a scene to life. I use fine pens,
                selective washes, and a journal approach to create art that feels personal
                and timeless.
              </p>
            </div>

            {/* ── HORIZONTAL DIVIDER ── */}
            <hr style={{
              border: "none",
              borderTop: "1px solid var(--light-gray)",
              margin: "0 0 1.5rem 0",
            }} />

            {/* SECTION 2: Services */}
            <div>
              <h4 style={{
                marginBottom: ".5rem",
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "1.2rem",
              }}>
                Services
              </h4>
              <ul style={{ color: "var(--warm-gray)", lineHeight: 1.8, paddingLeft: "1.2rem" }}>
                <li>Custom Commissions</li>
                <li>Limited archival prints</li>
                <li>Sketch Club &amp; workshops</li>
              </ul>
            </div>
 {/* Studio Details card */}
            <aside className="section-card">
              <h4 style={{ fontFamily: "'Architects Daughter',cursive", color: "var(--accent-gold)" }}>Studio Details</h4>
              <p style={{ color: "var(--warm-gray)", lineHeight: 1.6 }}>
                Based in South Florida. Shipping worldwide. Commissions by appointment.
              </p>
              <p style={{ marginTop: ".6rem" }}>
                <strong style={{ color: "var(--accent-gold)" }}>Email:</strong> hello@example.com
              </p>
            </aside>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Sketch frame */}
            <div
              style={{
                marginTop: ".65rem",
                background: "white",
                padding: "1rem",
                borderRadius: "10px",
                border: "1px solid var(--light-gray)",
                boxShadow: "0 28px 70px rgba(0,0,0,0.10)",
                transition: "transform .45s, box-shadow .45s",
                cursor: "default",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-8px) rotate(-1deg)";
                e.currentTarget.style.boxShadow = "0 36px 90px rgba(0,0,0,0.16)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 28px 70px rgba(0,0,0,0.10)";
              }}
            >
              <div style={{
                width: "100%",
                height: "260px",
                borderRadius: "6px",
                overflow: "hidden",
                background: "#f7f5ef",
              }}>
                <svg viewBox="0 0 300 240" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <rect width="300" height="240" fill="#f7f5ef"/>
                  {[15,30,45,60,75,90,105,120,135,150,165,180,195,210,225].map(y => (
                    <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#e2ddd5" strokeWidth="0.3"/>
                  ))}
                  <rect x="0" y="0" width="300" height="90" fill="#eeeae2" opacity="0.4"/>
                  <rect x="0" y="200" width="300" height="40" fill="#e3dfd6"/>
                  <line x1="0" y1="200" x2="300" y2="200" stroke="#4a3f35" strokeWidth="1.5"/>
                  {[210,220,230].map(y =>
                    [0,20,40,60,80,100,120,140,160,180,200,220,240,260,280].map(x => (
                      <line key={`g-${y}-${x}`} x1={x} y1={y} x2={x+14} y2={y} stroke="#b0aa9f" strokeWidth="0.4" opacity="0.5"/>
                    ))
                  )}
                  {[0,30,60,90,120,150,180,210,240,270,300].map(x => (
                    <line key={`gv-${x}`} x1={x} y1="200" x2={x} y2="240" stroke="#b0aa9f" strokeWidth="0.3" opacity="0.3"/>
                  ))}
                  <rect x="0" y="155" width="42" height="45" fill="#e8e3d9" stroke="#3a322a" strokeWidth="1"/>
                  {[0,4,8,12,16,20,24,28,32,36,40,44].map(i => (
                    <line key={`ha-${i}`} x1={i} y1="155" x2={i} y2="200" stroke="#c4bdb2" strokeWidth="0.4" opacity="0.4"/>
                  ))}
                  <rect x="5"  y="162" width="10" height="12" fill="#cdc8be" stroke="#4a3f35" strokeWidth="0.6"/>
                  <rect x="20" y="162" width="10" height="12" fill="#cdc8be" stroke="#4a3f35" strokeWidth="0.6"/>
                  <rect x="5"  y="180" width="10" height="12" fill="#cdc8be" stroke="#4a3f35" strokeWidth="0.6"/>
                  <rect x="20" y="180" width="10" height="12" fill="#cdc8be" stroke="#4a3f35" strokeWidth="0.6"/>
                  <rect x="0" y="151" width="42" height="5" fill="#d4cec4" stroke="#3a322a" strokeWidth="0.8"/>
                  <rect x="44" y="95" width="52" height="105" fill="#ede9e0" stroke="#3a322a" strokeWidth="1.2"/>
                  <line x1="58" y1="95" x2="58" y2="200" stroke="#c4bdb2" strokeWidth="0.5" opacity="0.6"/>
                  <line x1="72" y1="95" x2="72" y2="200" stroke="#c4bdb2" strokeWidth="0.5" opacity="0.6"/>
                  <line x1="86" y1="95" x2="86" y2="200" stroke="#c4bdb2" strokeWidth="0.5" opacity="0.6"/>
                  {[0,1,2,3,4].map(row =>
                    [0,1,2].map(col => (
                      <rect key={`b-${row}-${col}`}
                        x={49 + col*16} y={103 + row*18}
                        width="10" height="12"
                        fill={row===2&&col===1 ? "#b8956a" : "#d8d3c9"}
                        stroke="#736b5e" strokeWidth="0.5"/>
                    ))
                  )}
                  <rect x="60" y="178" width="18" height="22" fill="#5a6e74" stroke="#3a322a" strokeWidth="0.8"/>
                  <line x1="69" y1="178" x2="69" y2="200" stroke="#3a322a" strokeWidth="0.5"/>
                  <rect x="42" y="88" width="56" height="8" fill="#d8d3c9" stroke="#3a322a" strokeWidth="1"/>
                  <line x1="42" y1="92" x2="98" y2="92" stroke="#9e9790" strokeWidth="0.4"/>
                  <rect x="100" y="55" width="80" height="145" fill="#f0ece4" stroke="#3a322a" strokeWidth="1.4"/>
                  {[0,1,2,3,4,5].map(c => (
                    <line key={`cc-${c}`} x1={108+c*13} y1="80" x2={108+c*13} y2="200" stroke="#c8c3b9" strokeWidth="0.6" opacity="0.55"/>
                  ))}
                  {[0,1,2,3,4,5].map(row =>
                    [0,1,2,3].map(col => (
                      <rect key={`c-${row}-${col}`}
                        x={105+col*19} y={63+row*21}
                        width="13" height="16"
                        fill={row===3&&col===1 ? "#b8956a" : "#ddd8ce"}
                        stroke="#736b5e" strokeWidth="0.55"/>
                    ))
                  )}
                  <rect x="126" y="172" width="28" height="28" fill="#4a6670" stroke="#3a322a" strokeWidth="1"/>
                  <path d="M126 172 Q140 158 154 172" fill="#3d5760" stroke="#3a322a" strokeWidth="1"/>
                  <line x1="140" y1="158" x2="140" y2="172" stroke="#3a322a" strokeWidth="0.6"/>
                  <rect x="98"  y="48" width="84" height="8"  fill="#e0dbd2" stroke="#3a322a" strokeWidth="1.2"/>
                  <rect x="102" y="41" width="76" height="8"  fill="#e8e4db" stroke="#3a322a" strokeWidth="1"/>
                  <rect x="106" y="35" width="68" height="7"  fill="#ede9e1" stroke="#3a322a" strokeWidth="0.8"/>
                  <rect x="128" y="18" width="24" height="18" fill="#e0dbd2" stroke="#3a322a" strokeWidth="1"/>
                  <circle cx="140" cy="27" r="6" fill="none" stroke="#3a322a" strokeWidth="0.8"/>
                  <line x1="140" y1="27" x2="140" y2="22" stroke="#3a322a" strokeWidth="0.7"/>
                  <line x1="140" y1="27" x2="144" y2="27" stroke="#3a322a" strokeWidth="0.7"/>
                  <line x1="140" y1="18" x2="140" y2="5"  stroke="#3a322a" strokeWidth="1.2"/>
                  <polygon points="140,2 136,10 144,10" fill="#3a322a"/>
                  <rect x="184" y="108" width="56" height="92" fill="#eae6dc" stroke="#3a322a" strokeWidth="1.2"/>
                  {[0,1,2,3,4].map(row =>
                    [0,1,2].map(col => (
                      <rect key={`d-${row}-${col}`}
                        x={189+col*17} y={116+row*17}
                        width="12" height="12"
                        fill="#d4cfc6" stroke="#736b5e" strokeWidth="0.5"/>
                    ))
                  )}
                  <rect x="198" y="180" width="20" height="20" fill="#5a6e74" stroke="#3a322a" strokeWidth="0.8"/>
                  <rect x="184" y="102" width="56" height="7" fill="#d4cfc6" stroke="#3a322a" strokeWidth="1"/>
                  {[0,3,6,9,12,15].map(i => (
                    <line key={`ds-${i}`} x1={240} y1={108+i*6} x2={244} y2={108+i*6+6} stroke="#b0aa9f" strokeWidth="0.5" opacity="0.5"/>
                  ))}
                  <rect x="244" y="130" width="38" height="70" fill="#ebe7de" stroke="#3a322a" strokeWidth="1"/>
                  {[0,1,2].map(row =>
                    [0,1].map(col => (
                      <rect key={`e-${row}-${col}`}
                        x={249+col*17} y={138+row*19}
                        width="12" height="13"
                        fill="#d4cfc6" stroke="#736b5e" strokeWidth="0.45"/>
                    ))
                  )}
                  <rect x="253" y="185" width="16" height="15" fill="#5a6e74" stroke="#3a322a" strokeWidth="0.7"/>
                  <rect x="244" y="124" width="38" height="7" fill="#d8d3c9" stroke="#3a322a" strokeWidth="0.9"/>
                  <rect x="282" y="150" width="18" height="50" fill="#e5e0d7" stroke="#3a322a" strokeWidth="0.8"/>
                  <rect x="285" y="157" width="9" height="10" fill="#cdc8be" stroke="#736b5e" strokeWidth="0.4"/>
                  <rect x="285" y="173" width="9" height="10" fill="#cdc8be" stroke="#736b5e" strokeWidth="0.4"/>
                  <line x1="30" y1="200" x2="30" y2="148" stroke="#3a322a" strokeWidth="1.5"/>
                  <path d="M30 148 Q30 138 42 138" fill="none" stroke="#3a322a" strokeWidth="1.3"/>
                  <circle cx="43" cy="137" r="3.5" fill="#b8956a" stroke="#3a322a" strokeWidth="0.8"/>
                  <line x1="43" y1="140" x2="43" y2="200" stroke="#c8a070" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.4"/>
                  <line x1="240" y1="200" x2="240" y2="158" stroke="#3a322a" strokeWidth="1.5"/>
                  <path d="M240 158 Q240 148 228 148" fill="none" stroke="#3a322a" strokeWidth="1.3"/>
                  <circle cx="227" cy="147" r="3.5" fill="#b8956a" stroke="#3a322a" strokeWidth="0.8"/>
                  <line x1="227" y1="150" x2="227" y2="200" stroke="#c8a070" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.4"/>
                  <line x1="14" y1="200" x2="14" y2="168" stroke="#4a3f35" strokeWidth="1.2"/>
                  <ellipse cx="14" cy="160" rx="9" ry="12" fill="none" stroke="#4a3f35" strokeWidth="1"/>
                  {[0,1,2,3,4,5,6,7].map(i => (
                    <line key={`tl-${i}`} x1={6+i*2} y1={148+i*1.5} x2={6+i*2} y2={162+i} stroke="#4a3f35" strokeWidth="0.4" opacity="0.5"/>
                  ))}
                  <line x1="264" y1="200" x2="264" y2="170" stroke="#4a3f35" strokeWidth="1.2"/>
                  <ellipse cx="264" cy="162" rx="9" ry="12" fill="none" stroke="#4a3f35" strokeWidth="1"/>
                  <line x1="0" y1="160" x2="300" y2="160" stroke="#b8956a" strokeWidth="0.5" strokeDasharray="5 4" opacity="0.3"/>
                  <text x="4" y="158" fontSize="5.5" fill="#b8956a" opacity="0.55" fontFamily="'Crimson Text', serif" fontStyle="italic">horizon line</text>
                  <line x1="4" y1="60" x2="4" y2="200" stroke="#b8956a" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.35"/>
                  <line x1="296" y1="60" x2="296" y2="200" stroke="#b8956a" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.35"/>
                  <text x="6" y="72" fontSize="5" fill="#b8956a" opacity="0.55" fontFamily="serif">VP</text>
                  <text x="284" y="72" fontSize="5" fill="#b8956a" opacity="0.55" fontFamily="serif">VP</text>
                  <path d="M30 25 Q40 16 55 20 Q60 10 75 14 Q85 6 98 12 Q108 8 115 18 Q120 12 130 16 Q128 28 115 28 Q108 34 90 30 Q80 36 65 32 Q50 36 38 30 Q28 32 30 25Z"
                    fill="#f0ece4" stroke="#9e9790" strokeWidth="0.6"/>
                  {[0,1,2,3,4,5].map(i => (
                    <line key={`cl1-${i}`} x1={35+i*14} y1={20+i%2*3} x2={42+i*14} y2={25+i%2*3} stroke="#b0aa9f" strokeWidth="0.4" opacity="0.5"/>
                  ))}
                  <path d="M180 20 Q192 12 208 16 Q216 8 230 14 Q242 10 248 20 Q255 16 262 22 Q258 32 245 30 Q238 36 222 32 Q208 36 195 30 Q182 32 180 20Z"
                    fill="#f0ece4" stroke="#9e9790" strokeWidth="0.6"/>
                  <text x="216" y="236" fontSize="6" fill="#b8956a" opacity="0.7"
                    fontFamily="'Architects Daughter', cursive" transform="rotate(-1,216,236)">studio by ankita</text>
                </svg>
              </div>

              <p style={{
                fontFamily: "'Architects Daughter', cursive",
                fontSize: ".78rem",
                color: "var(--warm-gray)",
                textAlign: "center",
                marginTop: ".65rem",
                borderTop: "1px dashed var(--light-gray)",
                paddingTop: ".6rem",
                letterSpacing: ".3px",
              }}>
                ✏ architectural study — pen &amp; ink
              </p>
            </div>

           

          </aside>
        </div>
      </div>
    </section>
  );
}