"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

// ─── Hero slides ───────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 1,
    tag: "WELCOME TO",
    title: "MANAKAMANA",
    subtitle: "PRINTING PRESS",
    desc: "We're Rededicated for development of printing Industry through Innovation and excellence.",
    bg: "linear-gradient(135deg, #f72585 0%, #b5179e 25%, #7209b7 55%, #560bad 80%, #480ca8 100%)",
  },
  {
    id: 2,
    tag: "PREMIUM QUALITY",
    title: "B2B PRINTING",
    subtitle: "SOLUTIONS",
    desc: "Delivering exceptional print quality with fast turnaround times for all your business needs.",
    bg: "linear-gradient(135deg, #e91e8c 0%, #9c27b0 40%, #3a0ca3 75%, #1a56db 100%)",
  },
  {
    id: 3,
    tag: "TRUSTED BY 1000+ BUSINESSES",
    title: "ORDER ONLINE",
    subtitle: "PRINT ANYWHERE",
    desc: "Submit your designs online and receive your prints across Nepal with our reliable delivery network.",
    bg: "linear-gradient(135deg, #560bad 0%, #7209b7 40%, #f72585 80%, #f3722c 100%)",
  },
];

// ─── Services ──────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: "🖨️",
    title: "Printing Services",
    desc: "Wide range of excellent printing services at low cost with committed service time, visiting cards, pamphlets, etc.",
    badge: "MOST POPULAR",
    badgeColor: "#10b981",
    action: "View Products →",
    slug: "printing",
  },
  {
    icon: "🎨",
    title: "Free Design Files",
    desc: "Access our curated library of free graphic resources. Perfect for printers and advertising agencies.",
    badge: "FREE RESOURCE",
    badgeColor: "#f59e0b",
    action: "Browse Library →",
    slug: "designs",
  },
  {
    icon: "📋",
    title: "Magazine Services",
    desc: "Printers Club Today Put Lite India a fastest growing print & stationery platform for news and updates.",
    badge: null,
    badgeColor: "",
    action: "Learn More →",
    slug: "magazine",
  },
  {
    icon: "🖥️",
    title: "Software Services",
    desc: "Free to use printing order management software — the first & easy to use developed by Manakamana.",
    badge: null,
    badgeColor: "",
    action: "Try Free →",
    slug: "software",
  },
  {
    icon: "📐",
    title: "Paper GSM Calculator",
    desc: "Free to use paper GSM Calculator. Developed by Manakamana. Very simple & easy.",
    badge: null,
    badgeColor: "",
    action: "Use Tool →",
    slug: "calculator",
  },
  {
    icon: "🛒",
    title: "Buy & Sell Machines",
    desc: "Free online advertisement service for buying, selling & trading old & new printing machines.",
    badge: null,
    badgeColor: "",
    action: "Explore →",
    slug: "machines",
  },
];

// ─── Printing products ─────────────────────────────────────────────────────────
const PRINT_PRODUCTS = [
  { name: "Visiting Cards", emoji: "💳" },
  { name: "Envelopes", emoji: "✉️" },
  { name: "Letterheads", emoji: "📄" },
  { name: "Card Holders", emoji: "📂" },
  { name: "Digital Paper", emoji: "🗒️" },
  { name: "Pamphlets", emoji: "📰" },
  { name: "ATM Pouches", emoji: "💼" },
  { name: "Garment Tags", emoji: "🏷️" },
  { name: "Bill Books", emoji: "📒" },
  { name: "Stickers & Labels", emoji: "🔖" },
];

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [slide, setSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [email, setEmail] = useState("");

  const goToSlide = useCallback(
    (idx: number) => {
      if (transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setSlide(idx);
        setTransitioning(false);
      }, 250);
    },
    [transitioning]
  );

  const nextSlide = useCallback(() => goToSlide((slide + 1) % SLIDES.length), [slide, goToSlide]);
  const prevSlide = useCallback(() => goToSlide((slide - 1 + SLIDES.length) % SLIDES.length), [slide, goToSlide]);

  // Auto-advance slider
  useEffect(() => {
    const t = setInterval(nextSlide, 5000);
    return () => clearInterval(t);
  }, [nextSlide]);

  const handleServiceClick = () => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/services");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
      {/* ── Navbar ── */}
      <nav
        style={{
          background: "#fff",
          boxShadow: "0 1px 0 #e2e8f0",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            height: 64,
            gap: "2rem",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "linear-gradient(135deg, #f72585, #7209b7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                color: "#fff",
                fontWeight: 900,
                flexShrink: 0,
              }}
            >
              M
            </div>
            <div>
              <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>
                MANAKAMANA
              </div>
              <div style={{ fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.18em", color: "#64748b", textTransform: "uppercase" }}>
                PRINTING PRESS
              </div>
            </div>
          </Link>

          {/* Nav links */}
          <div style={{ display: "flex", gap: "1.75rem", marginLeft: "auto", alignItems: "center" }}>
            {["Home", "Corporate", "Our Services", "Join Us", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: item === "Home" ? "#1a56db" : "#0f172a",
                  textDecoration: "none",
                  paddingBottom: item === "Home" ? "2px" : undefined,
                  borderBottom: item === "Home" ? "2px solid #1a56db" : undefined,
                  whiteSpace: "nowrap",
                }}
              >
                {item}
              </a>
            ))}
            {/* Login / Dashboard */}
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                style={{
                  background: "linear-gradient(90deg, #1a56db, #2563eb)",
                  color: "#fff",
                  padding: "0.5rem 1.25rem",
                  borderRadius: 6,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                style={{
                  background: "linear-gradient(90deg, #1a56db, #2563eb)",
                  color: "#fff",
                  padding: "0.5rem 1.25rem",
                  borderRadius: 6,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero Slider ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          height: 480,
          background: SLIDES[slide].bg,
          transition: "background 0.5s ease",
        }}
      >
        {/* Abstract decoration */}
        <div
          style={{
            position: "absolute",
            right: -60,
            top: -40,
            width: 520,
            height: 520,
            background: "rgba(255,255,255,0.07)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 60,
            top: 40,
            width: 320,
            height: 320,
            background: "rgba(255,255,255,0.05)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        {/* Brush-stroke effect */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "45%",
            backgroundImage:
              "repeating-linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.04) 30%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "translateY(12px)" : "translateY(0)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.75)",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            {SLIDES[slide].tag}
          </p>
          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            {SLIDES[slide].title}
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.7) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {SLIDES[slide].subtitle}
            </span>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "1rem",
              marginTop: "1rem",
              maxWidth: 480,
              lineHeight: 1.7,
            }}
          >
            {SLIDES[slide].desc}
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
            <button
              onClick={handleServiceClick}
              style={{
                background: "#fff",
                color: "#7209b7",
                padding: "0.75rem 2rem",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: "0.9rem",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.25)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
              }}
            >
              Our Services
            </button>
            <Link
              href="/login"
              style={{
                background: "transparent",
                color: "#fff",
                padding: "0.75rem 2rem",
                borderRadius: 50,
                fontWeight: 600,
                fontSize: "0.9rem",
                border: "2px solid rgba(255,255,255,0.7)",
                textDecoration: "none",
                transition: "all 0.2s",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Learn More
            </Link>
          </div>
          {/* Slider dots */}
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "2.5rem" }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                style={{
                  height: 4,
                  width: i === slide ? 40 : 28,
                  borderRadius: 2,
                  background: i === slide ? "#fff" : "rgba(255,255,255,0.4)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Arrow controls */}
        {(["prev", "next"] as const).map((dir) => (
          <button
            key={dir}
            onClick={dir === "prev" ? prevSlide : nextSlide}
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              [dir === "prev" ? "left" : "right"]: "1.25rem",
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              border: "1.5px solid rgba(255,255,255,0.4)",
              color: "#fff",
              fontSize: "1.1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
              transition: "background 0.2s",
              zIndex: 2,
            }}
            onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.35)")}
            onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)")}
          >
            {dir === "prev" ? "‹" : "›"}
          </button>
        ))}
      </section>

      {/* ── Announcement Banner ── */}
      <div
        style={{
          background: "#0f172a",
          color: "#fff",
          padding: "0.6rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              background: "#ef4444",
              color: "#fff",
              fontSize: "0.6rem",
              fontWeight: 700,
              padding: "0.1rem 0.5rem",
              borderRadius: 4,
              letterSpacing: "0.08em",
            }}
          >
            NEW
          </span>
          <span style={{ fontSize: "0.8rem", fontWeight: 500 }}>
            📢 Manakamana Special Offer — Bulk order discounts now available!
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.75rem", color: "#94a3b8" }}>
          <span>📅 Valid until 30 MARCH 2026</span>
          <span>📍 Jaipur, Rajasthan</span>
        </div>
      </div>

      {/* ── Our Services ── */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.01em",
            }}
          >
            Our Services
          </h2>
          <div
            style={{
              width: 40,
              height: 3,
              background: "#ef4444",
              borderRadius: 2,
              margin: "0.6rem auto 1rem",
            }}
          />
          <p style={{ color: "#64748b", maxWidth: 500, margin: "0 auto", lineHeight: 1.7, fontSize: "0.95rem" }}>
            Discover our premium range of printing solutions tailored to elevate your business brand and operations.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {SERVICES.map((svc) => (
            <ServiceCard key={svc.slug} svc={svc} onAction={handleServiceClick} />
          ))}
        </div>
      </section>

      {/* ── Printing Products List ── */}
      <section style={{ background: "#fff", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a" }}>
                List of Printing Services
              </h2>
              <div
                style={{
                  width: 40,
                  height: 3,
                  background: "#ef4444",
                  borderRadius: 2,
                  marginTop: "0.5rem",
                }}
              />
            </div>
            <button
              onClick={handleServiceClick}
              style={{
                background: "linear-gradient(90deg, #1a56db, #2563eb)",
                color: "#fff",
                padding: "0.6rem 1.5rem",
                borderRadius: 6,
                border: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              View All Products →
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "1rem",
            }}
          >
            {PRINT_PRODUCTS.map((prod) => (
              <button
                key={prod.name}
                onClick={handleServiceClick}
                style={{
                  background: "#f8fafc",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "1.5rem 1rem",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                onMouseOver={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = "#1a56db";
                  el.style.background = "#eff6ff";
                  el.style.transform = "translateY(-3px)";
                  el.style.boxShadow = "0 6px 20px rgba(26,86,219,0.1)";
                }}
                onMouseOut={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = "#e2e8f0";
                  el.style.background = "#f8fafc";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                <span style={{ fontSize: "2rem" }}>{prod.emoji}</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1a56db" }}>
                  {prod.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Login CTA Banner ── */}
      {!isAuthenticated && (
        <section
          style={{
            background: "linear-gradient(135deg, #f72585 0%, #7209b7 50%, #480ca8 100%)",
            padding: "4rem 1.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔒</div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#fff", marginBottom: "0.75rem" }}>
              Access All Services with a Free Account
            </h2>
            <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: "2rem", fontSize: "0.95rem" }}>
              Create your free B2B account to place orders, track deliveries, access free design files, and much more. Login required.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/login"
                style={{
                  background: "#fff",
                  color: "#7209b7",
                  padding: "0.85rem 2.5rem",
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  transition: "transform 0.2s",
                  display: "inline-block",
                }}
              >
                Login to Your Account
              </Link>
              <Link
                href="/register"
                style={{
                  background: "transparent",
                  color: "#fff",
                  padding: "0.85rem 2.5rem",
                  borderRadius: 50,
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  border: "2px solid rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Register Free
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer style={{ background: "#0f172a", color: "#94a3b8", padding: "4rem 1.5rem 2rem" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "3rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: "linear-gradient(135deg, #f72585, #7209b7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: "1rem",
                }}
              >
                M
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: "0.9rem" }}>MANAKAMANA</div>
                <div style={{ fontSize: "0.5rem", letterSpacing: "0.15em", color: "#64748b" }}>PRINTING PRESS</div>
              </div>
            </div>
            <p style={{ fontSize: "0.8rem", lineHeight: 1.7, maxWidth: 220 }}>
              Rededicated for the development of the printing industry. Delivering quality and precision in every print.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
              {["f", "in"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Useful Links
            </h4>
            {["About Us", "Services", "Portfolio", "Contact Us", "Terms & Conditions"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  display: "block",
                  color: "#94a3b8",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
                onMouseOut={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8")}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Location */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Our Location
            </h4>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.8 }}>
              Head Office<br />
              Plot No. 57, Jhotwara Industrial Area,<br />
              Near Shalimar Circle,<br />
              Jaipur – 302012, Rajasthan, India
            </p>
            <p style={{ fontSize: "0.875rem", marginTop: "1rem" }}>
              Phone: <a href="tel:+919141511244" style={{ color: "#60a5fa", textDecoration: "none" }}>+91 0141-511-2244</a>
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Newsletter
            </h4>
            <p style={{ fontSize: "0.8rem", lineHeight: 1.7, marginBottom: "1rem" }}>
              Subscribe to get the latest news, amazing offers & insider industry voice.
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  padding: "0.65rem 1rem",
                  borderRadius: 6,
                  border: "1.5px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.07)",
                  color: "#fff",
                  fontSize: "0.8rem",
                  outline: "none",
                  fontFamily: "'Inter', sans-serif",
                }}
              />
              <button
                onClick={() => setEmail("")}
                style={{
                  background: "#10b981",
                  color: "#fff",
                  padding: "0.65rem 1rem",
                  borderRadius: 6,
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            maxWidth: 1200,
            margin: "2rem auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
            fontSize: "0.75rem",
          }}
        >
          <span>© 2024 Manakamana Printing Press. All rights reserved.</span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a href="#" style={{ color: "#64748b", textDecoration: "none" }}>Privacy Policy</a>
            <a href="#" style={{ color: "#64748b", textDecoration: "none" }}>Terms of Service</a>
            <span style={{ color: "#60a5fa" }}>📊 118,576 Total Visits Today</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Service Card Component ──────────────────────────────────────────────────────
function ServiceCard({ svc, onAction }: { svc: (typeof SERVICES)[0]; onAction: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onAction}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1.5px solid ${hovered ? "#1a56db" : "#e2e8f0"}`,
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.25s",
        boxShadow: hovered ? "0 12px 40px rgba(26,86,219,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        position: "relative",
      }}
    >
      {/* Image area */}
      <div
        style={{
          height: 160,
          background: hovered
            ? "linear-gradient(135deg, #eff6ff, #dbeafe)"
            : "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "3rem",
          transition: "background 0.3s",
          position: "relative",
        }}
      >
        {svc.icon}
        {svc.badge && (
          <span
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: svc.badgeColor,
              color: "#fff",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "0.2rem 0.6rem",
              borderRadius: 50,
              textTransform: "uppercase",
            }}
          >
            {svc.badge}
          </span>
        )}
      </div>

      {/* Info area */}
      <div style={{ padding: "1.25rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.5rem" }}>
          {svc.title}
        </h3>
        <p style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.65 }}>{svc.desc}</p>
        <div
          style={{
            marginTop: "1rem",
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "#1a56db",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          {svc.action}
        </div>
      </div>

      {/* Lock overlay hint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(15,23,42,0.0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s",
          pointerEvents: "none",
          borderRadius: 16,
        }}
      >
        <div
          style={{
            background: "rgba(15,23,42,0.78)",
            color: "#fff",
            padding: "0.5rem 1.25rem",
            borderRadius: 50,
            fontSize: "0.8rem",
            fontWeight: 600,
            backdropFilter: "blur(4px)",
          }}
        >
          🔒 Login to Access
        </div>
      </div>
    </div>
  );
}