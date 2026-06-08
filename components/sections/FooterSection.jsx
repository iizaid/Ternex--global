const contactLinks = [
  {
    label: "+962 7 9942 5899",
    href: "tel:+962799425899",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 16.92v2.1a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 3.3 2 2 0 0 1 4.11 1h2.1a2 2 0 0 1 2 1.72c.13.96.35 1.9.66 2.8a2 2 0 0 1-.45 2.11L7.53 8.52a16 16 0 0 0 7.95 7.95l.89-.89a2 2 0 0 1 2.11-.45c.9.31 1.84.53 2.8.66A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
  {
    label: "sales@ternex.global",
    href: "mailto:sales@ternex.global",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
        <path d="m22 7-10 6L2 7" />
      </svg>
    ),
  },
  {
    label: "Amman, Jordan",
    href: "https://maps.app.goo.gl/f4fCF1sQ7crL823d8",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 10c0 6-8 13-8 13S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/ternex.global",
    social: "facebook",
    icon: (
      <svg viewBox="0 0 30 30" aria-hidden="true">
        <path d="M29.059 15.085C29.058 7.322 22.764 1.028 15 1.028S0.941 7.323 0.941 15.087c0 6.989 5.1 12.787 11.781 13.875l0.081 0.011V19.15H9.232v-4.065h3.57v-3.096a4.962 4.962 0 0 1 5.329 -5.469l-0.017 -0.001c1.124 0.016 2.212 0.115 3.273 0.292l-0.126 -0.018v3.459h-1.774a2.033 2.033 0 0 0 -2.291 2.204l-0.001 -0.008v2.636h3.899l-0.623 4.065h-3.276v9.823c6.762 -1.101 11.862 -6.899 11.863 -13.888" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ternex._/",
    social: "instagram",
    icon: (
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M22.3,8.4c-0.8,0-1.4,0.6-1.4,1.4c0,0.8,0.6,1.4,1.4,1.4c0.8,0,1.4-0.6,1.4-1.4C23.7,9,23.1,8.4,22.3,8.4z"/>
        <path d="M16,10.2c-3.3,0-5.9,2.7-5.9,5.9s2.7,5.9,5.9,5.9s5.9-2.7,5.9-5.9S19.3,10.2,16,10.2z M16,19.9c-2.1,0-3.8-1.7-3.8-3.8   c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C19.8,18.2,18.1,19.9,16,19.9z"/>
        <path d="M20.8,4h-9.5C7.2,4,4,7.2,4,11.2v9.5c0,4,3.2,7.2,7.2,7.2h9.5c4,0,7.2-3.2,7.2-7.2v-9.5C28,7.2,24.8,4,20.8,4z M25.7,20.8   c0,2.7-2.2,5-5,5h-9.5c-2.7,0-5-2.2-5-5v-9.5c0-2.7,2.2-5,5-5h9.5c2.7,0,5,2.2,5,5V20.8z"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/962799425899",
    social: "whatsapp",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91a9.86 9.86 0 0 0-2.91-7.01ZM12.05 20.15h-.01a8.25 8.25 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.55 3.71-8.25 8.27-8.25a8.2 8.2 0 0 1 5.84 2.42 8.2 8.2 0 0 1 2.42 5.84c-.01 4.55-3.71 8.23-8.27 8.23Zm4.53-6.16c-.25-.13-1.47-.73-1.7-.81-.23-.08-.39-.13-.56.13-.16.25-.64.81-.78.98-.14.16-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.16 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29Z" />
      </svg>
    ),
  },
];

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function FooterSection() {
  return (
    <footer className="site-footer" id="contact">

      {/* Top wave divider */}
      <div className="site-footer__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 32C240 56 480 0 720 24C960 48 1200 8 1440 32V56H0V32Z"
            fill="#08090a"
          />
        </svg>
      </div>

      <div className="site-footer__inner">

        {/* Brand column */}
        <div className="site-footer__brand">
          {/* SVG logo in footer — white version */}
          <svg viewBox="0 0 190 40" aria-label="TERNEX" className="footer-logo-svg" xmlns="http://www.w3.org/2000/svg">
            <text
              x="0"
              y="30"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize="26"
              fontWeight="700"
              letterSpacing="5"
              fill="#ffffff"
            >
              TERNEX
            </text>
          </svg>
          <p className="site-footer__tagline">
            Connecting Jordan with the world's finest food brands — from Amman, with excellence.
          </p>
          {/* Social icons */}
          <ul className="footer-social" aria-label="Social media links">
            {socialLinks.map((link) => (
              <li className="footer-social__item" key={link.label}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  data-social={link.social}
                  className="footer-social__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div className="site-footer__group">
          <h2 className="site-footer__group-title">Quick Links</h2>
          <nav aria-label="Footer navigation">
            <ul className="footer-nav-list">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="footer-nav-link">
                    <span className="footer-nav-arrow" aria-hidden="true">›</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Contact */}
        <div className="site-footer__group">
          <h2 className="site-footer__group-title">Get in Touch</h2>
          <div className="footer-contact">
            {contactLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="footer-contact__link"
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                <span className="footer-contact__icon">{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="site-footer__bottom">
        <span>© 2026 TERNEX. All rights reserved.</span>
        <span className="footer-bottom__divider" aria-hidden="true">·</span>
        <span>Food Import & Distribution · Amman, Jordan</span>
      </div>
    </footer>
  );
}
