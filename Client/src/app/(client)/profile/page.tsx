"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { notify } from "@/utils/notifications";

export default function ProfilePage() {
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        companyName: user?.companyName || "",
        contactPerson: user?.contactPerson || "",
        email: user?.email || "",
        phone: "9800000000",
        address: "Kathmandu, Nepal",
    });

    const handleSave = () => {
        setEditing(false);
        notify.success("Profile updated successfully!");
    };

    return (
        <div>
            <div style={{ marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a" }}>My Profile</h1>
                <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: "0.25rem" }}>View and manage your company account details.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "1.5rem", alignItems: "start" }}>
                {/* Profile Card */}
                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                    <div className="gradient-card" style={{ padding: "2.5rem", textAlign: "center" }}>
                        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: "2rem", color: "#fff", fontWeight: 800, border: "3px solid rgba(255,255,255,0.4)" }}>
                            {user?.contactPerson?.[0] || "C"}
                        </div>
                        <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "1rem", letterSpacing: "0.02em" }}>{user?.companyName}</h2>
                        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.78rem", marginTop: "0.25rem" }}>{user?.email}</p>
                    </div>
                    <div style={{ padding: "1.5rem" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                            <div style={{ padding: "0.875rem", background: "#f0f4ff", borderRadius: 10, border: "1px solid #c7d9fd" }}>
                                <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#4361ee", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Client ID</div>
                                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", letterSpacing: "0.05em" }}>{user?.clientId}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: "0.7rem", color: "#94a3b8", marginBottom: "0.25rem" }}>Account Status</div>
                                <span className="badge" style={{ background: "#dcfce7", color: "#16a34a" }}>● Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Form */}
                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "1.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                        <h2 style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a" }}>Company Details</h2>
                        <button
                            onClick={() => editing ? handleSave() : setEditing(true)}
                            className={editing ? "btn-primary" : "btn-outline-dark"}
                            style={{ padding: "0.4rem 1.125rem", fontSize: "0.78rem" }}
                        >
                            {editing ? "💾 Save Changes" : "✏️ Edit"}
                        </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                        {[
                            { label: "Company Name", name: "companyName" },
                            { label: "Contact Person", name: "contactPerson" },
                            { label: "Email Address", name: "email" },
                            { label: "Phone Number", name: "phone" },
                        ].map(({ label, name }) => (
                            <div key={name} className="form-group">
                                <label className="form-label">{label}</label>
                                <input
                                    className="form-input"
                                    value={form[name as keyof typeof form]}
                                    onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
                                    disabled={!editing}
                                    style={{ background: editing ? "#f8fafc" : "#f1f5f9", cursor: editing ? "text" : "not-allowed" }}
                                />
                            </div>
                        ))}
                        <div className="form-group" style={{ gridColumn: "span 2" }}>
                            <label className="form-label">Business Address</label>
                            <input
                                className="form-input"
                                value={form.address}
                                onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                                disabled={!editing}
                                style={{ background: editing ? "#f8fafc" : "#f1f5f9", cursor: editing ? "text" : "not-allowed" }}
                            />
                        </div>
                    </div>

                    {/* Contact Admin */}
                    <div style={{ marginTop: "1.75rem", padding: "1.25rem", background: "#f8fafc", borderRadius: 10, border: "1px solid #e2e8f0" }}>
                        <h3 style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0f172a", marginBottom: "0.5rem" }}>Need to change your password?</h3>
                        <p style={{ color: "#64748b", fontSize: "0.78rem", lineHeight: 1.6 }}>Passwords are managed by admin. Please contact us via WhatsApp to reset your Client ID or password.</p>
                        <button
                            onClick={() => window.open("https://wa.me/97798XXXXXXXX?text=Hello%20Admin%2C%20I%20need%20help%20with%20my%20account%20%28Client%20ID%3A%20" + user?.clientId + "%29", "_blank")}
                            style={{ marginTop: "0.875rem", padding: "0.5rem 1.125rem", background: "#25D366", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: "0.78rem", cursor: "pointer" }}
                        >
                            💬 Contact Admin on WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
