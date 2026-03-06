"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { notify } from "@/utils/notifications";

const features = [
    { icon: "🏷️", title: "Wholesale Rates", desc: "Get the best prices in the industry directly from the source." },
    { icon: "📡", title: "Live Tracking", desc: "Real-time updates on all your print jobs from start to delivery." },
    { icon: "🌏", title: "Nepal-Wide Reach", desc: "Service available across all major cities with premium logistics." },
    { icon: "🎧", title: "Expert Support", desc: "Dedicated team available for all your custom printing needs." },
];

export default function LoginPage() {
    const [clientId, setClientId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!clientId || !password) {
            notify.error("Please enter your Client ID and password");
            return;
        }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 600));
        const success = login(clientId, password);
        setLoading(false);
        if (success) {
            notify.success("Welcome back! Redirecting to dashboard…");
            setTimeout(() => router.push("/dashboard"), 800);
        } else {
            notify.error("Invalid Client ID or password. Try CL102 / manakamana123");
        }
    };

    return (
        <>
            <Navbar />
            <div style={{ background: "#f0f4ff", minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
                <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    maxWidth: 860, width: "100%",
                    background: "#fff", borderRadius: 20,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.12)", overflow: "hidden"
                }}>

                    {/* ── Left: Form ── */}
                    <div style={{ padding: "2.5rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <div style={{ marginBottom: "2rem" }}>
                            <h1 style={{ fontSize: "1.875rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.375rem" }}>Welcome!</h1>
                            <p style={{ color: "#64748b", fontSize: "0.875rem" }}>Log in to access your dashboard.</p>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            <div className="form-group">
                                <label className="form-label">Client ID</label>
                                <input
                                    type="text"
                                    value={clientId}
                                    onChange={(e) => setClientId(e.target.value)}
                                    placeholder="e.g. CL102"
                                    className="form-input"
                                    autoComplete="username"
                                />
                            </div>

                            <div className="form-group">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <label className="form-label">Password</label>
                                    <button type="button" style={{ background: "none", border: "none", color: "#1a56db", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>
                                        Forgot?
                                    </button>
                                </div>
                                <div style={{ position: "relative" }}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="form-input"
                                        autoComplete="current-password"
                                        style={{ paddingRight: "3rem" }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "1rem" }}
                                    >
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary"
                                style={{ width: "100%", padding: "0.875rem", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.08em", opacity: loading ? 0.7 : 1 }}
                            >
                                {loading ? "SIGNING IN…" : "SIGN IN"}
                            </button>
                        </form>

                        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.78rem", color: "#64748b" }}>
                            Demo: <strong style={{ color: "#0f172a" }}>CL102</strong> / <strong style={{ color: "#0f172a" }}>manakamana123</strong>
                        </p>
                    </div>

                    {/* ── Right: Gradient Panel ── */}
                    <div className="gradient-card" style={{ padding: "2.5rem 2rem", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
                        {/* Decorative blob */}
                        <div style={{ position: "absolute", bottom: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />

                        <div>
                            <h2 style={{ color: "#fff", fontSize: "1.35rem", fontWeight: 800, letterSpacing: "0.02em", marginBottom: "1.75rem" }}>NEW USER?</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                {features.map((f) => (
                                    <div key={f.title} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                                        <div style={{
                                            width: 42, height: 42, borderRadius: 10,
                                            background: "rgba(255,255,255,0.15)", display: "flex",
                                            alignItems: "center", justifyContent: "center",
                                            fontSize: "1.1rem", flexShrink: 0
                                        }}>{f.icon}</div>
                                        <div>
                                            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.2rem" }}>{f.title}</h3>
                                            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.78rem", lineHeight: 1.6 }}>{f.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Link
                            href="/register"
                            style={{
                                display: "block", marginTop: "2rem",
                                border: "2px solid rgba(255,255,255,0.7)", borderRadius: "50px",
                                padding: "0.75rem", textAlign: "center",
                                color: "#fff", fontWeight: 700, fontSize: "0.85rem",
                                letterSpacing: "0.08em", textDecoration: "none",
                                transition: "all 0.2s"
                            }}
                        >
                            CREATE ACCOUNT
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
