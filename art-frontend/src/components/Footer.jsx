export default function Footer({ showPage }) {
  return (
    <footer role="contentinfo">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Studio</h4>
          <p>Architectural sketches, prints &amp; commissions — hand-drawn with pen &amp; heart.</p>
        </div>
        <div className="footer-section">
          <h4>Links</h4>
          <a onClick={() => showPage("shop")}>Shop</a>
          <a onClick={() => showPage("commissions")}>Commission</a>
          <a onClick={() => showPage("sketch-club")}>Sketch Club</a>
          <a onClick={() => showPage("contact")}>Contact</a>
        </div>
        <div className="footer-section">
          <h4>Follow</h4>
          <a href="https://instagram.com/studio.by.ankita" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://etsy.com" target="_blank" rel="noopener noreferrer">Shop</a>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>hello@example.com</p>
          <p>South Florida</p>
        </div>
      </div>
      <div className="copyright">
        © {new Date().getFullYear()} Studio by Ankita · All rights reserved
      </div>
    </footer>
  );
}
