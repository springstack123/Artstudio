import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Commissions from "./pages/Commissions";
import SketchClub from "./pages/SketchClub";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProfilePage from "./pages/ProfilePage";
import MyProfile from "./pages/MyProfile";
import MyOrders from "./pages/MyOrders";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import { Login, SignUp } from "./pages/Login";

// Home manages its own nav offset via hero min-height
const SELF_OFFSET_PAGES = ["home"];

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [scrolled, setScrolled]     = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken]           = useState(null);

  const [user, setUser] = useState({
    name:         "",
    email:        "",
    handle:       "",
    bio:          "",
    location:     "",
    website:      "",
    joined:       "",
    phone:        "",
    addressLine:  "",
    city:         "",
    pinCode:      "",
    profilePhoto: "",
    role:         "",
  });

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser  = localStorage.getItem("user");
      if (storedToken && storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed.email) {
          setToken(storedToken);
          setUser(parsed);
          setIsLoggedIn(true);
          // Refresh full profile from backend
          fetchFullProfile(storedToken);
        }
      }
    } catch (e) {
      console.error("Failed to restore session:", e);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showPage = (id) => {
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isAuth = activePage === "login" || activePage === "signup";

  const fetchFullProfile = async (tkn) => {
    try {
      const res = await fetch("http://localhost:8080/api/users/profile", {
        headers: { Authorization: `Bearer ${tkn}` }
      });
      const profileResponse = await res.json();
      if (res.ok && profileResponse.success) {
        const profile = profileResponse.data;
        const userObj = {
          ...profile,
          joined: profile.createdAt
            ? "Joined " + new Date(profile.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
            : "Joined recently"
        };
        setUser(userObj);
        localStorage.setItem("user", JSON.stringify(userObj));
        return userObj;
      } else {
        console.error("Profile fetch failed:", profileResponse.message);
      }
    } catch (e) {
      console.error("Profile fetch failed:", e);
    }
    return null;
  };

  const handleAuthSuccess = async (userData) => {
    if (userData.accessToken) {
      const tkn = userData.accessToken;
      setToken(tkn);
      localStorage.setItem("token", tkn);
      localStorage.setItem("refreshToken", userData.refreshToken);
      setIsLoggedIn(true);

      // Build base user from login response (includes role)
      const baseUser = {
        id:           userData.id || null,
        name:         userData.name || "",
        email:        userData.email || "",
        handle:       userData.handle || "@" + (userData.name || "user").toLowerCase().replace(/\s+/g, ""),
        bio:          "",
        location:     "",
        website:      "",
        phone:        "",
        addressLine:  "",
        city:         "",
        pinCode:      "",
        profilePhoto: "",
        role:         userData.role || "user",   // ✅ role from login response
        joined:       "Joined " + new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
      };
      setUser(baseUser);
      localStorage.setItem("user", JSON.stringify(baseUser));

      // Then try to enrich with full profile (role will be preserved if profile returns it too)
      const fullProfile = await fetchFullProfile(tkn);
      if (!fullProfile) {
        // fetchFullProfile failed — baseUser is already set, that's fine
      }
    }
    showPage("home");
  };

  const handleLogout = () => {
    setToken(null);
    setIsLoggedIn(false);
    setUser({ name:"", email:"", handle:"", bio:"", location:"", website:"",
              joined:"", role:"", phone:"", addressLine:"", city:"", pinCode:"", profilePhoto:"" });
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    showPage("home");
  };

  const renderPage = () => {
    switch (activePage) {
      case "home":        return <Home        showPage={showPage} user={user} />;
      case "shop":        return <Shop        showPage={showPage} user={user} token={token} />;
      case "commissions": return <Commissions showPage={showPage} user={user} />;
      case "sketch-club": return <SketchClub  showPage={showPage} user={user} />;
      case "about":       return <About       showPage={showPage} />;
      case "contact":     return <Contact     showPage={showPage} />;
      case "profile":     return <ProfilePage showPage={showPage} user={user} setUser={setUser} />;
      case "my-profile":  return <MyProfile   showPage={showPage} user={user} setUser={setUser} token={token} />;
      case "orders":      return <MyOrders    showPage={showPage} user={user} token={token} />;
      case "settings":    return <Settings    showPage={showPage} user={user} setUser={setUser} token={token} />;
      case "admin":
        // ✅ Use role from user state — no isAdmin localStorage hack needed
        if (user?.role !== "admin") {
          return (
            <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
              <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🚫 Access Denied</h2>
              <p style={{ color: "#666", marginBottom: "2rem" }}>You need an admin account to view this page.</p>
              <button
                onClick={() => showPage("login")}
                style={{ padding: ".75rem 2rem", background: "#1a1a1a", color: "#fff",
                         border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1rem" }}>
                Go to Login
              </button>
            </div>
          );
        }
        return <AdminDashboard showPage={showPage} user={user} token={token} />;
      default:            return <Home        showPage={showPage} user={user} />;
    }
  };

  const needsOffset = !isAuth && !SELF_OFFSET_PAGES.includes(activePage);

  return (
    <>
      <Nav
        activePage={activePage}
        showPage={showPage}
        scrolled={scrolled}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={handleLogout}
        user={user}
      />

      {activePage === "login" && (
        <Login
          showPage={showPage}
          onSwitch={() => showPage("signup")}
          onSuccess={handleAuthSuccess}
        />
      )}

      {activePage === "signup" && (
        <SignUp
          showPage={showPage}
          onSwitch={() => showPage("login")}
          onSuccess={handleAuthSuccess}
        />
      )}

      {!isAuth && (
        <div style={needsOffset ? { paddingTop: "80px" } : {}}>
          {renderPage()}
        </div>
      )}

      {!isAuth && <Footer showPage={showPage} />}
    </>
  );
}