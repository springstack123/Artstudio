import { useState, useRef, useEffect } from "react";

export default function Nav({ activePage, showPage, scrolled, isLoggedIn, setIsLoggedIn, user }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggle = () => setMobileOpen(p => !p);
  const go = (id) => { setMobileOpen(false); setProfileDropdown(false); showPage(id); };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfileDropdown(false);
    go("home");
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navItems = [
    ["home", "Home"],
    ["shop", "Shop"],
    ["commissions", "Commission"],
    ["sketch-club", "Sketch Club"],
    ["about", "About"],
    ["contact", "Contact"],
  ];

  const firstName = user?.name ? user.name.split(" ")[0] : "Account";

  return (
    <>
      <style>{`
        .nav-profile-wrap { position: relative; }
        .nav-avatar-btn {
          display: flex; align-items: center; gap: .5rem;
          background: none; border: 1.5px solid var(--light-gray, #e8e6df);
          border-radius: 25px; padding: .35rem .75rem .35rem .35rem;
          cursor: pointer; transition: all .22s;
          font-family: 'Raleway', sans-serif; font-size: .78rem;
          font-weight: 700; color: var(--ink-black, #1a1a1a);
        }
        .nav-avatar-btn:hover { border-color: var(--accent-gold, #b8956a); color: var(--accent-gold, #b8956a); }
        .nav-avatar-circle {
          width: 28px; height: 28px; border-radius: 50%;
          background: linear-gradient(135deg, #d6cfc4, var(--sketch-blue, #4a6670));
          display: flex; align-items: center; justify-content: center;
          font-size: .78rem; font-weight: 700; color: white; flex-shrink: 0;
        }
        .nav-avatar-caret {
          font-size: .6rem; color: var(--warm-gray, #736b5e);
          transition: transform .2s; display: inline-block;
        }
        .nav-avatar-caret.open { transform: rotate(180deg); }
        .nav-profile-dropdown {
          position: absolute; top: calc(100% + .6rem); right: 0;
          width: 220px;
          background: var(--paper-white, #fdfdf9);
          border: 1px solid var(--light-gray, #e8e6df);
          border-radius: 10px;
          box-shadow: 0 16px 45px rgba(0,0,0,0.12);
          overflow: hidden;
          animation: dropFade .18s ease both;
          z-index: 9999;
        }
        @keyframes dropFade {
          from { opacity:0; transform: translateY(-6px); }
          to   { opacity:1; transform: none; }
        }
        .nav-drop-header {
          padding: .9rem 1rem .7rem;
          border-bottom: 1px solid var(--light-gray, #e8e6df);
          background: var(--soft-cream, #f5f3ed);
        }
        .nav-drop-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; font-weight: 600; color: var(--ink-black, #1a1a1a);
        }
        .nav-drop-handle {
          font-size: .73rem; color: var(--warm-gray, #736b5e); margin-top: .1rem;
        }
        .nav-drop-email {
          font-size: .7rem; color: var(--warm-gray, #736b5e); margin-top: .1rem;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .nav-drop-item {
          display: flex; align-items: center; gap: .7rem;
          padding: .7rem 1rem;
          font-family: 'Raleway', sans-serif; font-size: .8rem; font-weight: 600;
          color: var(--warm-gray, #736b5e);
          cursor: pointer; transition: all .17s;
          border: none; background: none; width: 100%; text-align: left;
        }
        .nav-drop-item:hover { background: var(--soft-cream, #f5f3ed); color: var(--ink-black, #1a1a1a); }
        .nav-drop-item .drop-icon { display: flex; align-items: center; justify-content: center; width: 18px; }
        .nav-drop-divider { height: 1px; background: var(--light-gray, #e8e6df); margin: .2rem 0; }
        .nav-drop-logout { color: #c0392b !important; }
        .nav-drop-logout:hover { background: #fff5f5 !important; color: #c0392b !important; }
      `}</style>

      <nav className={scrolled ? "scrolled" : ""} aria-label="Main navigation">
        <div className="nav-container">
          <div className="logo" onClick={() => go("home")}>Art Studio</div>

          <ul className={`nav-links${mobileOpen ? " mobile-open" : ""}`} id="navLinks" role="menubar">
            {navItems.map(([id, label]) => (
              <a key={id} onClick={() => go(id)} role="menuitem" tabIndex={0}
                onKeyDown={e => e.key === "Enter" && go(id)}
                className={activePage === id ? "nav-link--active" : ""}>
                {label}
              </a>
            ))}

            {!isLoggedIn ? (
              <>
                <a onClick={() => go("login")} role="menuitem" tabIndex={0}
                  onKeyDown={e => e.key === "Enter" && go("login")}
                  className={`nav-auth-link${activePage === "login" ? " nav-link--active" : ""}`}>
                  Login
                </a>
                <a onClick={() => go("signup")} role="menuitem" tabIndex={0}
                  onKeyDown={e => e.key === "Enter" && go("signup")}
                  className="nav-signup-btn">
                  Sign Up
                </a>
              </>
            ) : (
              <div className="nav-profile-wrap" ref={dropdownRef}>
                <button className="nav-avatar-btn"
                  onClick={() => setProfileDropdown(p => !p)}
                  aria-expanded={profileDropdown} aria-label="Profile menu">
                  <div className="nav-avatar-circle">
                    {user?.name ? user.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase() : "👤"}
                  </div>
                  <span>{firstName}</span>
                  <span className={`nav-avatar-caret${profileDropdown ? " open" : ""}`}>▼</span>
                </button>

                {profileDropdown && (
                  <div className="nav-profile-dropdown" role="menu">
                    <div className="nav-drop-header">
                      <div className="nav-drop-name">{user?.name || "My Account"}</div>
                      <div className="nav-drop-handle">{user?.handle || ""}</div>
                      {user?.email && <div className="nav-drop-email">{user.email}</div>}
                    </div>

                    <button className="nav-drop-item" onClick={() => go("my-profile")}>
                      <span className="drop-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                        </svg>
                      </span>
                      My Profile
                    </button>

                    <button className="nav-drop-item" onClick={() => go("orders")}>
                      <span className="drop-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/>
                        </svg>
                      </span>
                      My Orders
                    </button>

                    <button className="nav-drop-item" onClick={() => go("settings")}>
                      <span className="drop-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                        </svg>
                      </span>
                      Settings
                    </button>

                    {/* ✅ Only shown to admin users */}
                    {user?.role === "admin" && (
                      <button className="nav-drop-item" onClick={() => go("admin")}>
                        <span className="drop-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M.5 3a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zm0 2a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zm0 2.5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zm0 2.5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zm0 2.5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zm13 .5a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5z"/>
                            <path fillRule="evenodd" d="M8 3.5a5.5 5.5 0 0 1 5.5 5.5.5.5 0 0 1-1 0 4.5 4.5 0 0 1-9 0 .5.5 0 0 1 1 0 4.5 4.5 0 0 1 9 0"/>
                            <path fillRule="evenodd" d="M7.5 10.5a2.5 2.5 0 1 1 .5 4.883v1.398a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-1.398a2.5 2.5 0 0 1 .5-4.883zM6.5 12a1.5 1.5 0 1 0 0-3 1.5 1 0 0 0 0 3"/>
                          </svg>
                        </span>
                        Admin Dashboard
                      </button>
                    )}

                    <div className="nav-drop-divider"/>

                    <button className="nav-drop-item nav-drop-logout" onClick={handleLogout}>
                      <span className="drop-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                          <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                        </svg>
                      </span>
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </ul>

          <div className="nav-social">
            <a href="https://instagram.com/studio.by.ankita" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
              </svg>
            </a>
          </div>

          <div className="mobile-menu" id="mobileToggle" onClick={toggle} aria-label="Toggle menu">☰</div>
        </div>
      </nav>
    </>
  );
}