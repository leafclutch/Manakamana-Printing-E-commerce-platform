"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
    const [email, setEmail] = useState("");

    return (
        <footer className="footer">
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3.5rem 1.5rem 2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2.5rem" }}>
                {/* Brand */}
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: 10,
                            background: "linear-gradient(135deg, #1a56db 0%, #2563eb 100%)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff", fontSize: "1.1rem",
                        }}>🖨️</div>
                        <div>
                            <div style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.05em" }}>MANAKAMANA</div>
                            <div style={{ color: "#64748b", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Printing Press</div>
                        </div>
                    </div>
                    <p style={{ fontSize: "0.8rem", lineHeight: 1.7, color: "#64748b", maxWidth: 200 }}>
                        Providing premium quality printing services across Nepal since 1995. Your trusted partner for corporate branding and wholesale print solutions.
                    </p>
                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
                        {["facebook", "instagram"].map((s) => (
                            <a key={s} href="#" style={{
                                width: 34, height: 34, borderRadius: "50%", border: "1px solid #334155",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "#94a3b8", fontSize: "0.85rem", textDecoration: "none", transition: "all 0.2s"
                            }}>
                                {s === "facebook" ? "f" : "📷"}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Useful Links */}
                <div>
                    <p className="footer-heading">Useful Links</p>
                    {["About Us", "Our Services", "Portfolio", "Contact Us", "Terms & Conditions"].map((item) => (
                        <a key={item} href="#" className="footer-link">› {item}</a>
                    ))}
                </div>

                {/* Location */}
                <div>
                    <p className="footer-heading">Our Location</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <div style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                            <span style={{ color: "#1a56db", marginTop: "0.1rem" }}>📍</span>
                            <span style={{ fontSize: "0.8rem", lineHeight: 1.6 }}>Head Office<br />Kathmandu, Nepal</span>
                        </div>
                        <div style={{ display: "flex", gap: "0.625rem", alignItems: "center" }}>
                            <span style={{ color: "#1a56db" }}>📞</span>
                            <span style={{ fontSize: "0.8rem" }}>+977 98XXXXXXXX</span>
                        </div>
                        <div style={{ display: "flex", gap: "0.625rem", alignItems: "center" }}>
                            <span style={{ color: "#1a56db" }}>✉️</span>
                            <span style={{ fontSize: "0.8rem" }}>info@manakamana.com</span>
                        </div>
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <p className="footer-heading">Newsletter</p>
                    <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "1rem", lineHeight: 1.6 }}>
                        Subscribe to get the latest updates and amazing offers.
                    </p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        style={{
                            width: "100%", padding: "0.625rem 0.875rem",
                            background: "#1e293b", border: "1px solid #334155",
                            borderRadius: "6px", color: "#fff", fontSize: "0.8rem",
                            marginBottom: "0.625rem", outline: "none", fontFamily: "inherit"
                        }}
                    />
                    <button className="btn-primary" style={{ width: "100%", padding: "0.625rem", fontSize: "0.8rem" }}>
                        Subscribe
                    </button>
                </div>
            </div>

            <div style={{ borderTop: "1px solid #1e293b", padding: "1.25rem 1.5rem", textAlign: "center" }}>
                <p style={{ fontSize: "0.75rem", color: "#475569" }}>
                    © 2024 Manakamana Printing Press. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
