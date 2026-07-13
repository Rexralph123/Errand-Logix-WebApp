
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/Errand Logix LTD Logo .png" alt="Errand Logix Logo" />
            <h2 className="footer-name">
              Errand<span>Logix</span>
            </h2>
          </div>
          <p>
            Nigeria's on-demand errand, delivery, and personal assistance
            platform. Verified runners, real-time tracking, and one simple
            promise, you relax, we run the errands.
          </p>
        </div>

        <div className="footer-links">
          <h3>Services</h3>
          <div className="Link-info">
            <a onClick={() => scrollToId("services")}>Grocery &amp; Market Runs</a>
            <a onClick={() => scrollToId("services")}>Package Delivery</a>
            <a onClick={() => scrollToId("services")}>Document Processing</a>
            <a onClick={() => scrollToId("services")}>Corporate Errands</a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Company</h3>
          <div className="Link-info">
            <a onClick={() => scrollToId("top")}>Home</a>
            <a onClick={() => scrollToId("how-it-works")}>How It Works</a>
            <a onClick={() => scrollToId("booking")}>Book a Task</a>
            <a>Become a Runner</a>
          </div>
        </div>

        <div className="footer-contact">
          <h3>Get In Touch</h3>
          <div className="support">
            <p>Lagos, Nigeria</p>
            <p>hello@errandlogix.com</p>
            <p>+234 9050412857</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Errand Logix Ltd. All rights reserved.</p>
        <div className="footer-legal">
          <a>Privacy Policy</a>
          <a>Terms of Service</a>
          <a>Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;