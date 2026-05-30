import Link from "next/link";
import { listWebsiteServices, getSetting } from "@/lib/website";
import { getImageUrl } from "@/lib/api";

interface FooterProps {
  ctaTitle?: string;
  ctaDescription?: string;
  showBrochure?: boolean;
}

const FALLBACK_SERVICE_LINKS = [
  "Software Development",
  "Cloud Solutions",
  "Data Analytics",
  "IT Consulting",
  "Digital Transformation",
];

export default async function Footer({
  ctaTitle = "Ready to Transform Your Business?",
  ctaDescription = "Let's build something exceptional together.",
  showBrochure = true,
}: FooterProps) {
  const services = await listWebsiteServices().catch(() => []);
  const footerServices = services.slice(0, 5);
  const setting = await getSetting().catch(() => null);

  const brochureLink = setting?.brochure?.trim() || "/Brochure/broucher.pdf";
  const companyName = setting?.companyName || "Abhima Technologies";
  const companyDescription =
    setting?.aboutCompany ||
    "Driving global success through smart digital solutions, future-ready technology, and trusted collaborations.";

  const usaAddress = setting?.usaAddress ||
    "24155 Drake Road, Suite 206, Farmington, MI 48335-3168, United States";
  const indiaAddress =
    setting?.address ||
    "Sri Venkata Sai Complex, 1-62/33/34 First Floor, Kavuri Hills, Madhapur, Hyderabad 500033";
  const usaPhone = setting?.usaPhone || "+1-947-622-4462";
  const usaAltPhone = setting?.usaAltPhone || "+1-947-622-4462";
  const indiaPhone = setting?.indiaPhone || "+91 99891 30999";
  const indiaAltPhone = setting?.indiaAltPhone || "+91 90635 85823";
  const email = setting?.email || "contact@abhima.com";
  const logo = setting?.logo ? getImageUrl(setting.logo) : "/images/logo.png";
  const formatTel = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;
  const socials = [
    { href: setting?.facebook, label: "Facebook", icon: "fab fa-facebook-f" },
    { href: setting?.twitter, label: "Twitter", icon: "fab fa-twitter" },
    { href: setting?.youtube, label: "YouTube", icon: "fab fa-youtube" },
    { href: setting?.instagram, label: "Instagram", icon: "fab fa-instagram" },
  ].filter((item) => !!item.href);

  return (
    <footer className="footer">
      {/* Footer CTA Banner */}
      <div className="footer-cta">
        <div className="container">
          <div className="footer-cta-inner">
            <div className="footer-cta-text">
              <h3>{ctaTitle}</h3>
              <p>{ctaDescription}</p>
            </div>
            <div className="footer-cta-actions">
              {showBrochure && (
                <a
                  href={brochureLink}
                  className="footer-cta-btn"
                  download
                >
                  Download Brochure <i className="fas fa-download"></i>
                </a>
              )}
              <Link href="/contact" className="footer-cta-btn">
                Contact Us <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Main */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Column 1: Brand */}
            <div className="footer-col footer-brand">
              <Link href="/" className="logo">
                <img
                  src={logo}
                  alt={companyName}
                  className="logo-img"
                />
              </Link>
              <p className="footer-desc">{companyDescription}</p>
              <div className="footer-socials">
                {socials.length > 0 ? (
                  socials.map((item) => (
                    <a
                      key={item.label}
                      href={item.href!}
                      className="footer-social-link"
                      aria-label={item.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={item.icon}></i>
                    </a>
                  ))
                ) : (
                  <>
                    <a href="#" className="footer-social-link" aria-label="Instagram">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="footer-social-link" aria-label="LinkedIn">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="footer-social-link" aria-label="WhatsApp">
                      <i className="fab fa-whatsapp"></i>
                    </a>
                    <a href="#" className="footer-social-link" aria-label="Facebook">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-col">
              <h4 className="footer-col-title">Quick Links</h4>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/portfolio">Our Products</Link></li>
                <li><Link href="/career">Career</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="footer-col">
              <h4 className="footer-col-title">Services</h4>
              <ul className="footer-links">
                {footerServices.length > 0
                  ? footerServices.map((service) => (
                    <li key={service.id}>
                      <Link href={`/service-details?id=${service.id}`}>{service.title}</Link>
                    </li>
                  ))
                  : FALLBACK_SERVICE_LINKS.map((label) => (
                    <li key={label}>
                      <Link href="/services">{label}</Link>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="footer-col">
              <h4 className="footer-col-title">Contact Us</h4>
              <div className="footer-contact-list">
                <div className="footer-contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <strong>USA Office</strong>
                    <p>{usaAddress}</p>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <a href={formatTel(usaPhone)}>{usaPhone}</a>
                    <a href={formatTel(usaAltPhone)}>{usaAltPhone}</a>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <strong>India Office</strong>
                    <p>{indiaAddress}</p>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <a href={formatTel(indiaPhone)}>{indiaPhone}</a>
                    <a href={formatTel(indiaAltPhone)}>{indiaAltPhone}</a>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <i className="fas fa-envelope"></i>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p className="footer-copyright">
              &copy; 2026 {companyName}. All rights reserved.
            </p>
            <div className="footer-legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms &amp; Conditions</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
