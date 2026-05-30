"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavVisibility } from "@/lib/website";


const ALL_NAV_ITEMS = [
  { href: "/",         label: "Home",         key: "home"       },
  { href: "/about",    label: "About Us",      key: "about_us"   },
  { href: "/services", label: "Our Services",  key: "services"   },
  { href: "/portfolio",label: "Our Products",  key: "portfolio"  },
  { href: "/career",   label: "Career",        key: "carrer"     },
  { href: "/contact",  label: "Contact",       key: "contact_us" },
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVis, setNavVis] = useState<NavVisibility | null>(null);
  const [logoSrc, setLogoSrc] = useState("/images/logo.png");
  const [groupLogoSrc, setGroupLogoSrc] = useState("/images/superlogo.png");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("/api/nav")
      .then((r) => r.json())
      .then((data: NavVisibility) => setNavVis(data))
      .catch(() => {}); // keep all items visible on error
  }, []);
console.log("Nav visibility:", navVis);

  useEffect(() => {
    fetch("/api/setting")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        if (data.logo) setLogoSrc(data.logo as string);
        if (data.abhimaGroupLogo) setGroupLogoSrc(data.abhimaGroupLogo as string);
      })
      .catch(() => {});
  }, []);

  const navItems = navVis
    ? ALL_NAV_ITEMS.filter((item) => navVis[item.key])
    : ALL_NAV_ITEMS;
console.log(navItems);
  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <Link href="/" className="logo">
          <img src={logoSrc} alt="Abhima Technologies" className="logo-img" />
        </Link>
        <nav className={`nav-links${menuOpen ? " active" : ""}`} id="navLinks">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              {pathname === item.href && <span className="nav-dot"></span>}
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          <a
            href="#"
            className="super-group-link"
            target="_blank"
            rel="noopener"
            aria-label="Abhima Group"
          >
            <img
              src={groupLogoSrc}
              alt="Abhima Group"
              className="super-group-logo"
            />
          </a>
          <button
            className="menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={`fas ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
