"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { notify } from "@/utils/notifications";
import { sendWhatsApp, buildRegistrationMessage } from "@/utils/whatsapp";

interface FormData {
    companyName: string;
    contactPerson: string;
    phone: string;
    email: string;
    address: string;
    printingNeeds: string;
}

const benefits = [
    { icon: "💰", title: "Wholesale Rates", desc: "Exclusive B2B pricing on all printing services." },
    { icon: "🎨", title: "Free Templates", desc: "Access 200+ free professional design templates." },
    { icon: "🚚", title: "Reliable Delivery", desc: "On-time delivery across all of Nepal." },
    { icon: "🎧", title: "Dedicated Support", desc: "Personal account manager for all your needs." },
];

export default function RegisterPage() {
    const [form, setForm] = useState<FormData>({
        companyName: "", contactPerson: "", phone: "",
        email: "", address: "", printingNeeds: "",
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [submitted, setSubmitted] = useState(false);

    const validate = (): boolean => {
        const e: Partial<FormData> = {};
        if (!form.companyName.trim()) e.companyName = "Company name is required";
        if (!form.contactPerson.trim()) e.contactPerson = "Contact person name is required";
        if (!form.phone.trim()) e.phone = "Phone number is required";
        else if (!/^[\d\s\+\-]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
        if (!form.address.trim()) e.address = "Business address is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const message = buildRegistrationMessage({
            companyName: form.companyName,
            contactPerson: form.contactPerson,
            phone: form.phone,
            email: form.email,
            address: form.address,
            printingNeeds: form.printingNeeds || "Not specified",
        });

        setSubmitted(true);
        notify.whatsapp("Registration request prepared. Please send via WhatsApp.");
        setTimeout(() => sendWhatsApp(message), 1000);
    };

    return (
        <>
            <Navbar />
            <div style={{ background: "#f0f4ff", minHeight: "calc(100vh - 64px)", padding: "2.5rem 1rem" }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    maxWidth: 900, margin: "0 auto",
                    background: "#fff", borderRadius: 20,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                    overflow: "hidden"
                }}>

                    {/* ── Left: Gradient Panel ── */}
                    <div className="gradient-card" style={{ padding: "2.5rem 2rem", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />

                        <div>
                            <div style={{ marginBottom: "2rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.5rem" }}>
                                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>🖨️</div>
                                    <div>
                                        <div style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.05em" }}>MANAKAMANA</div>
                                        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.6rem", letterSpacing: "0.15em" }}>PRINTING PRESS</div>
                                    </div>
                                </div>
                                <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>Join Our B2B Network</h2>
                                <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "0.82rem", lineHeight: 1.7 }}>
                                    Register your company and get access to exclusive wholesale printing rates and premium templates.
                                </p>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
                                {benefits.map((b) => (
                                    <div key={b.title} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                                        <div style={{ width: 38, height: 38, borderRadius: 8, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{b.icon}</div>
                                        <div>
                                            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.15rem" }}>{b.title}</h3>
                                            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", lineHeight: 1.5 }}>{b.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: "2rem" }}>
                            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.78rem", marginBottom: "0.625rem" }}>Already have an account?</p>
                            <Link href="/login" style={{
                                display: "block", border: "2px solid rgba(255,255,255,0.7)", borderRadius: "50px",
                                padding: "0.625rem", textAlign: "center", color: "#fff",
                                fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.08em", textDecoration: "none"
                            }}>SIGN IN</Link>
                        </div>
                    </div>

                    {/* ── Right: Form ── */}
                    <div style={{ padding: "2.5rem 2.25rem", overflowY: "auto" }}>
                        {submitted ? (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center" }}>
                                <div style={{ fontSize: "3.5rem", marginBottom: "1.25rem" }}>💬</div>
                                <h2 style={{ fontWeight: 800, fontSize: "1.25rem", marginBottom: "0.75rem", color: "#0f172a" }}>Request Prepared!</h2>
                                <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: 280 }}>
                                    Your registration details have been prepared. WhatsApp should open shortly to send your request to admin.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="btn-primary"
                                    style={{ marginTop: "1.5rem" }}
                                >
                                    Submit Another Request
                                </button>
                                <Link href="/login" style={{ marginTop: "0.75rem", color: "#1a56db", fontSize: "0.82rem", textDecoration: "none", fontWeight: 600 }}>
                                    Go to Login →
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div style={{ marginBottom: "1.75rem" }}>
                                    <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.375rem" }}>Create Account</h1>
                                    <p style={{ color: "#64748b", fontSize: "0.82rem" }}>Fill in your company details to register.</p>
                                </div>

                                <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    {/* Company Name */}
                                    <div className="form-group">
                                        <label className="form-label">Company Name *</label>
                                        <input
                                            name="companyName"
                                            value={form.companyName}
                                            onChange={handleChange}
                                            placeholder="ABC Traders Pvt. Ltd."
                                            className="form-input"
                                            style={{ borderColor: errors.companyName ? "#ef4444" : undefined }}
                                        />
                                        {errors.companyName && <span style={{ color: "#ef4444", fontSize: "0.72rem" }}>{errors.companyName}</span>}
                                    </div>

                                    {/* Contact Person */}
                                    <div className="form-group">
                                        <label className="form-label">Contact Person Name *</label>
                                        <input
                                            name="contactPerson"
                                            value={form.contactPerson}
                                            onChange={handleChange}
                                            placeholder="Ram Sharma"
                                            className="form-input"
                                            style={{ borderColor: errors.contactPerson ? "#ef4444" : undefined }}
                                        />
                                        {errors.contactPerson && <span style={{ color: "#ef4444", fontSize: "0.72rem" }}>{errors.contactPerson}</span>}
                                    </div>

                                    {/* Phone + Email */}
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
                                        <div className="form-group">
                                            <label className="form-label">Phone Number *</label>
                                            <input
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                placeholder="9800000000"
                                                className="form-input"
                                                style={{ borderColor: errors.phone ? "#ef4444" : undefined }}
                                            />
                                            {errors.phone && <span style={{ color: "#ef4444", fontSize: "0.72rem" }}>{errors.phone}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Email Address *</label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="abc@gmail.com"
                                                className="form-input"
                                                style={{ borderColor: errors.email ? "#ef4444" : undefined }}
                                            />
                                            {errors.email && <span style={{ color: "#ef4444", fontSize: "0.72rem" }}>{errors.email}</span>}
                                        </div>
                                    </div>

                                    {/* Business Address */}
                                    <div className="form-group">
                                        <label className="form-label">Business Address *</label>
                                        <input
                                            name="address"
                                            value={form.address}
                                            onChange={handleChange}
                                            placeholder="Kathmandu, Nepal"
                                            className="form-input"
                                            style={{ borderColor: errors.address ? "#ef4444" : undefined }}
                                        />
                                        {errors.address && <span style={{ color: "#ef4444", fontSize: "0.72rem" }}>{errors.address}</span>}
                                    </div>

                                    {/* Printing Requirements */}
                                    <div className="form-group">
                                        <label className="form-label">Printing Requirements</label>
                                        <textarea
                                            name="printingNeeds"
                                            value={form.printingNeeds}
                                            onChange={handleChange}
                                            placeholder="Describe your printing needs (e.g. visiting cards, letterheads, pamphlets…)"
                                            className="form-input"
                                            rows={3}
                                            style={{ resize: "vertical" }}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn-primary"
                                        style={{ padding: "0.875rem", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.06em", marginTop: "0.25rem" }}
                                    >
                                        💬 SEND REGISTRATION VIA WHATSAPP
                                    </button>

                                    <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "0.7rem", lineHeight: 1.5 }}>
                                        By registering, admin will review your request and provide your Client ID and password via WhatsApp.
                                    </p>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
