"use client";

import { useState } from "react";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { notify } from "@/utils/notifications";
import { sendWhatsApp, buildTemplateMessage, buildCustomDesignMessage } from "@/utils/whatsapp";
import { SERVICES } from "@/constants";

const categoryIcons: Record<string, string> = {
    "Visiting Cards": "🪪",
    "Letterheads": "📋",
    "Envelopes": "✉️",
    "ID Cards": "🎫",
    "Garment Tags": "🏷️",
};

const categoryColors: Record<string, string> = {
    "Visiting Cards": "#fde8e8",
    "Letterheads": "#e8f0fe",
    "Envelopes": "#fef3e8",
    "ID Cards": "#e8fdf0",
    "Garment Tags": "#fde8ff",
};

export default function TemplatesPage() {
    const { user } = useAuth();
    const [activeCategory, setActiveCategory] = useState("All");
    const [customDesignType, setCustomDesignType] = useState("");

    const categories = ["All", ...TEMPLATE_CATEGORIES];
    const filtered = activeCategory === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.category === activeCategory);

    const handleSendToAdmin = (template: typeof TEMPLATES[0]) => {
        const message = buildTemplateMessage({
            clientId: user?.clientId || "N/A",
            templateName: template.name,
            category: template.category,
        });
        notify.whatsapp("Design information prepared for WhatsApp confirmation.");
        setTimeout(() => sendWhatsApp(message), 800);
    };

    const handleCustomDesign = () => {
        if (!customDesignType) {
            notify.error("Please select a design type first.");
            return;
        }
        const message = buildCustomDesignMessage({
            clientId: user?.clientId || "N/A",
            designType: customDesignType,
        });
        notify.whatsapp("Custom design submission prepared for WhatsApp.");
        setTimeout(() => sendWhatsApp(message), 800);
    };

    return (
        <div>
            {/* Header */}
            <div style={{ textAlign: "center", paddingBottom: "0.5rem", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#0f172a", textTransform: "uppercase", letterSpacing: "-.01em" }}>Free Designs</h1>
                <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: "0.375rem", maxWidth: 520, margin: "0.375rem auto 0" }}>
                    We are happy to help with our curated collection of professional templates. Download and customize for your brand.
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.75rem", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", color: "#94a3b8", textTransform: "uppercase" }}>
                    <span>Home</span>
                    <span>/</span>
                    <span style={{ color: "#1a56db" }}>Free Design Templates</span>
                </div>
            </div>

            {/* Category Filter */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem", justifyContent: "center" }}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            padding: "0.4rem 1.125rem", borderRadius: "50px",
                            border: activeCategory === cat ? "none" : "1.5px solid #e2e8f0",
                            background: activeCategory === cat ? "linear-gradient(90deg,#1a56db,#2563eb)" : "#fff",
                            color: activeCategory === cat ? "#fff" : "#475569",
                            fontWeight: 600, fontSize: "0.78rem", cursor: "pointer",
                            transition: "all 0.2s"
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Template Grid — matching reference design card grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
                {filtered.map((template) => (
                    <div key={template.id} className="card" style={{ overflow: "hidden" }}>
                        {/* Template preview */}
                        <div style={{
                            height: 140, background: categoryColors[template.category] || "#f1f5f9",
                            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                            position: "relative"
                        }}>
                            <span style={{ fontSize: "2.5rem" }}>{categoryIcons[template.category] || "📄"}</span>
                            <span style={{ fontSize: "0.6rem", background: "rgba(0,0,0,0.06)", padding: "2px 8px", borderRadius: 4, fontWeight: 600, color: "#475569" }}>TEMPLATE</span>
                        </div>

                        <div style={{ padding: "0.875rem" }}>
                            <h3 style={{ fontWeight: 700, fontSize: "0.8rem", color: "#0f172a", marginBottom: "0.2rem" }}>{template.name}</h3>
                            <p style={{ fontSize: "0.68rem", color: "#e91e8c", fontWeight: 600, marginBottom: "0.75rem" }}>
                                Free Design Available
                            </p>

                            <div style={{ display: "flex", gap: "0.375rem" }}>
                                <button
                                    className="btn-primary"
                                    style={{ flex: 1, padding: "0.4rem 0.5rem", fontSize: "0.65rem", fontWeight: 700 }}
                                    onClick={() => notify.info("Template download started!")}
                                >
                                    ⬇ Download
                                </button>
                                <button
                                    onClick={() => handleSendToAdmin(template)}
                                    style={{
                                        flex: 1, padding: "0.4rem 0.5rem", fontSize: "0.65rem", fontWeight: 700,
                                        border: "1.5px solid #e91e8c", borderRadius: 6, background: "#fff",
                                        color: "#e91e8c", cursor: "pointer"
                                    }}
                                >
                                    💬 Admin
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Custom Design Submission */}
            <div style={{ background: "linear-gradient(135deg,#f0f4ff,#fde8ff)", borderRadius: 16, padding: "2rem", border: "1px solid #c7d9fd", marginBottom: "1rem" }}>
                <h2 style={{ fontWeight: 800, fontSize: "1.125rem", color: "#0f172a", marginBottom: "0.375rem" }}>🎨 Submit Custom Design</h2>
                <p style={{ color: "#64748b", fontSize: "0.82rem", marginBottom: "1.5rem", lineHeight: 1.6, maxWidth: 540 }}>
                    Have your own design? Download a template, edit it in your design software, then send it to admin via WhatsApp for review.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
                    {["⬇️ Download template", "✏️ Edit in design software", "💬 Send to admin"].map((step, i) => (
                        <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "1rem", textAlign: "center", border: "1px solid #e2e8f0" }}>
                            <div style={{ fontWeight: 700, fontSize: "0.7rem", color: "#1a56db", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>STEP {i + 1}</div>
                            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#0f172a" }}>{step}</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end", flexWrap: "wrap" }}>
                    <div className="form-group" style={{ flex: 1, minWidth: 200 }}>
                        <label className="form-label">Design Type</label>
                        <select
                            value={customDesignType}
                            onChange={(e) => setCustomDesignType(e.target.value)}
                            className="form-input"
                            style={{ appearance: "none" }}
                        >
                            <option value="">Select design type…</option>
                            {SERVICES.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
                        </select>
                    </div>
                    <button
                        onClick={handleCustomDesign}
                        className="btn-primary"
                        style={{ padding: "0.725rem 1.5rem", whiteSpace: "nowrap" }}
                    >
                        💬 Send Design via WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
}
