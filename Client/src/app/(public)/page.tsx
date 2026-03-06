"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { notify } from "@/utils/notifications";
import { SERVICES } from "@/constants";

const heroSlides = [
    {
        label: "WELCOME TO",
        title: "MANAKAMANA\nPRINTING PRESS",
        subtitle: "We're Rededicated for development of printing Industry through Innovation and excellence.",
    },
    {
        label: "PREMIUM QUALITY",
        title: "B2B PRINTING\nSOLUTIONS",
        subtitle: "From visiting cards to garment tags — all your corporate printing needs under one roof.",
    },
    {
        label: "WHOLESALE RATES",
        title: "PRINT AT\nBEST PRICES",
        subtitle: "Get the best prices in the industry directly from the source with guaranteed quality.",
    },
];

const howItWorks = [
    { step: "01", icon: "📝", title: "Register", desc: "Sign up with your company details. Admin will provide your login credentials via WhatsApp." },
    { step: "02", icon: "🎨", title: "Choose or Design", desc: "Browse free templates or upload your custom design files to get started." },
    { step: "03", icon: "📦", title: "Place Order", desc: "Configure your order — quantity, paper type, finish — and send it to admin for confirmation." },
    { step: "04", icon: "🚚", title: "Receive Delivery", desc: "Track your order status in real-time and receive your prints at your doorstep." },
];

export default function HomePage() {
    const router = useRouter();
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleLockedServiceClick = () => {
        notify.lock();
        setTimeout(() => router.push("/login"), 800);
    };

    return (
        <>
            <Navbar />

            {/* ─── Hero Section ─── */}
            <section className="gradient-hero" style={{ position: "relative", overflow: "hidden", minHeight: 480 }}>
                {/* Decorative shapes */}
                <div style={{
                    position: "absolute", top: -60, right: -60, width: 300, height: 300,
                    background: "rgba(255,255,255,0.06)", borderRadius: "50%", pointerEvents: "none"
                }} />
                <div style={{
                    position: "absolute", bottom: -80, left: "30%", width: 400, height: 400,
                    background: "rgba(255,255,255,0.04)", borderRadius: "50%", pointerEvents: "none"
                }} />

                {/* Slide nav arrows */}
                <button onClick={() => setActiveSlide((p) => (p - 1 + heroSlides.length) % heroSlides.length)} style={{
                    position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
                    width: 40, height: 40, borderRadius: "50%", fontSize: "1.1rem", cursor: "pointer",
                    backdropFilter: "blur(4px)", zIndex: 10
                }}>‹</button>
                <button onClick={() => setActiveSlide((p) => (p + 1) % heroSlides.length)} style={{
                    position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
                    width: 40, height: 40, borderRadius: "50%", fontSize: "1.1rem", cursor: "pointer",
                    backdropFilter: "blur(4px)", zIndex: 10
                }}>›</button>

                <div style={{ maxWidth: 900, margin: "0 auto", padding: "5rem 2rem 3.5rem", textAlign: "center", position: "relative", zIndex: 2 }}>
                    <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                        {heroSlides[activeSlide].label}
                    </p>
                    <h1 style={{
                        color: "#fff", fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 900,
                        letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.25rem",
                        whiteSpace: "pre-line", textShadow: "0 2px 20px rgba(0,0,0,0.2)"
                    }}>
                        {heroSlides[activeSlide].title}
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem", maxWidth: 500, margin: "0 auto 2rem", lineHeight: 1.7 }}>
                        {heroSlides[activeSlide].subtitle}
                    </p>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link href="/services" className="btn-white-outline">Our Services</Link>
                        <Link href="/register" className="btn-white-outline" style={{ background: "rgba(255,255,255,0.2)" }}>Learn More</Link>
                    </div>

                    {/* Slider dots */}
                    <div className="slider-dots">
                        {heroSlides.map((_, i) => (
                            <div key={i} className={`slider-dot ${i === activeSlide ? "active" : ""}`} onClick={() => setActiveSlide(i)} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Services Preview ─── */}
            <section style={{ padding: "4rem 1.5rem", background: "#f8fafc" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div className="section-title">
                        <h2>Our Services</h2>
                        <div className="divider" />
                        <p>Discover our premium range of printing solutions tailored to elevate your business brand and operations.</p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
                        {SERVICES.map((service) => (
                            <div
                                key={service.id}
                                className="card service-locked pulse-lock"
                                onClick={handleLockedServiceClick}
                            >
                                <div style={{
                                    background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                                    height: 160, display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "3.5rem", position: "relative"
                                }}>
                                    {service.icon}
                                    <span style={{
                                        position: "absolute", top: 10, right: 10,
                                        background: "rgba(0,0,0,0.12)", color: "#334155",
                                        borderRadius: "50px", padding: "3px 10px",
                                        fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.05em",
                                        textTransform: "uppercase"
                                    }}>🔒 Locked</span>
                                </div>
                                <div style={{ padding: "1.25rem" }}>
                                    <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.375rem" }}>{service.name}</h3>
                                    <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.6, marginBottom: "0.75rem" }}>{service.description}</p>
                                    <p style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Min. Qty: <strong style={{ color: "#475569" }}>{service.minimumQuantity} pcs</strong></p>
                                    <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.375rem", color: "#1a56db", fontSize: "0.8rem", fontWeight: 600 }}>
                                        <span>Login to order</span>
                                        <span>→</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── How It Works ─── */}
            <section id="how-it-works" style={{ padding: "4rem 1.5rem", background: "#fff" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div className="section-title">
                        <h2>How It Works</h2>
                        <div className="divider" />
                        <p>Get your prints in 4 simple steps — from registration to doorstep delivery.</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "2rem" }}>
                        {howItWorks.map((step) => (
                            <div key={step.step} style={{ textAlign: "center" }}>
                                <div style={{
                                    width: 72, height: 72, borderRadius: "50%",
                                    background: "linear-gradient(135deg, #e1effe, #c7d9fd)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "2rem", margin: "0 auto 1rem"
                                }}>{step.icon}</div>
                                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#1a56db", letterSpacing: "0.1em", marginBottom: "0.375rem" }}>STEP {step.step}</div>
                                <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem" }}>{step.title}</h3>
                                <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.6 }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Free Design Files CTA ─── */}
            <section style={{ padding: "4rem 1.5rem", background: "#f8fafc" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                    {/* Printing Services */}
                    <div className="card" style={{ overflow: "hidden", cursor: "pointer" }} onClick={handleLockedServiceClick}>
                        <div style={{
                            height: 180, background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem"
                        }}>🖨️</div>
                        <div style={{ padding: "1.5rem" }}>
                            <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: "0.6rem", fontWeight: 700, padding: "2px 8px", borderRadius: "50px", letterSpacing: "0.08em", textTransform: "uppercase" }}>MOST POPULAR</span>
                            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginTop: "0.75rem" }}>
                                <span style={{ fontSize: "1.25rem" }}>🖨️</span>
                                <h3 style={{ fontWeight: 700, fontSize: "1.05rem" }}>Printing Services</h3>
                            </div>
                            <p style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "0.5rem", lineHeight: 1.6 }}>Wide range of excellent printing services at low cost with committed turnaround time.</p>
                            <button onClick={handleLockedServiceClick} style={{ marginTop: "1rem", background: "none", border: "none", color: "#1a56db", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                View Products →
                            </button>
                        </div>
                    </div>

                    {/* Free Design Files */}
                    <div className="card" style={{ overflow: "hidden", cursor: "pointer" }} onClick={handleLockedServiceClick}>
                        <div style={{
                            height: 180, background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem"
                        }}>🎨</div>
                        <div style={{ padding: "1.5rem" }}>
                            <span style={{ background: "#fef9c3", color: "#ca8a04", fontSize: "0.6rem", fontWeight: 700, padding: "2px 8px", borderRadius: "50px", letterSpacing: "0.08em", textTransform: "uppercase" }}>FREE RESOURCE</span>
                            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginTop: "0.75rem" }}>
                                <span style={{ fontSize: "1.25rem" }}>✂️</span>
                                <h3 style={{ fontWeight: 700, fontSize: "1.05rem" }}>Free Design Files</h3>
                            </div>
                            <p style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "0.5rem", lineHeight: 1.6 }}>Access our curated library of free graphic resources. Perfect for print-ready templates.</p>
                            <button style={{ marginTop: "1rem", background: "none", border: "none", color: "#e91e8c", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                Browse Library →
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CTA Section ─── */}
            <section id="contact" className="gradient-card" style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
                <div style={{ maxWidth: 600, margin: "0 auto" }}>
                    <h2 style={{ color: "#fff", fontSize: "2rem", fontWeight: 900, marginBottom: "1rem" }}>Ready to Start Printing?</h2>
                    <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem", marginBottom: "2rem", lineHeight: 1.7 }}>
                        Register your company today and get access to wholesale printing rates, free templates, and dedicated support.
                    </p>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link href="/register" className="btn-white-outline" style={{ background: "rgba(255,255,255,0.2)" }}>Register Now</Link>
                        <Link href="/login" className="btn-white-outline">Login</Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
