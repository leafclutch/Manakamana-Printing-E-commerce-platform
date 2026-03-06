"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { notify } from "@/utils/notifications";

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        notify.success("Logged out successfully");
        router.push("/");
    };

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/services", label: "Our Services" },
        { href: "/templates", label: "Free Designs" },
        { href: "/#how-it-works", label: "Corporate" },
        { href: "/#contact", label: "Contact" },
    ];

    return (
        <nav className="navbar">
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
                {/* Logo */}
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
                    <div style={{
                        width: 38, height: 38, borderRadius: 10,
                        background: "linear-gradient(135deg, #1a56db 0%, #2563eb 100%)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontSize: "1.1rem", fontWeight: 900, letterSpacing: "-0.02em",
                        boxShadow: "0 2px 8px rgba(26,86,219,0.3)"
                    }}>
                        🖨️
                    </div>
                    <div>
                        <div className="navbar-logo-text">MANAKAMANA</div>
                        <div className="navbar-logo-sub">Printing Press</div>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hidden md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`nav-link ${pathname === link.href ? "active" : ""}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <button className="dark-toggle" title="Toggle dark mode">🌙</button>
                    {isAuthenticated ? (
                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                            <Link href="/orders" className="btn-outline-dark" style={{ padding: "0.4rem 1rem", fontSize: "0.8rem" }}>
                                Orders
                            </Link>
                            <Link href="/profile" className="btn-outline-dark" style={{ padding: "0.4rem 1rem", fontSize: "0.8rem" }}>
                                Profile
                            </Link>
                            <button onClick={handleLogout} className="btn-primary" style={{ padding: "0.4rem 1rem", fontSize: "0.8rem", background: "#ef4444" }}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="btn-primary">Login</Link>
                    )}

                    {/* Mobile menu */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: "1.25rem", padding: "0.25rem" }}
                        className="mobile-menu-btn"
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div style={{
                    background: "#fff", borderTop: "1px solid #e2e8f0",
                    padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem"
                }}>
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="nav-link" onClick={() => setMenuOpen(false)}>
                            {link.label}
                        </Link>
                    ))}
                    {!isAuthenticated && (
                        <Link href="/register" className="nav-link" onClick={() => setMenuOpen(false)}>Join Us</Link>
                    )}
                </div>
            )}
        </nav>
    );
}
