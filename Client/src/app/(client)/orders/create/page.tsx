"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { notify } from "@/utils/notifications";
import { sendWhatsApp, buildOrderMessage } from "@/utils/whatsapp";
import { SERVICES, PAPER_TYPES, FINISHING_OPTIONS } from "@/constants";

function CreateOrderForm() {
    const searchParams = useSearchParams();
    const { user } = useAuth();

    const [form, setForm] = useState({
        orderName: "",
        service: searchParams.get("service") || "",
        quantity: "",
        paperType: "",
        finishingOption: "",
        designId: "",
        orderType: "STANDARD" as "STANDARD" | "CUSTOM",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    const selectedService = SERVICES.find((s) => s.name === form.service);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.orderName.trim()) e.orderName = "Order name is required";
        if (!form.service) e.service = "Please select a service";
        if (!form.quantity) e.quantity = "Quantity is required";
        else if (isNaN(Number(form.quantity)) || Number(form.quantity) <= 0) e.quantity = "Enter a valid quantity";
        else if (selectedService && Number(form.quantity) < selectedService.minimumQuantity) {
            e.quantity = `Minimum quantity is ${selectedService.minimumQuantity}`;
        }
        if (!form.paperType) e.paperType = "Please select paper type";
        if (!form.finishingOption) e.finishingOption = "Please select a finishing option";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        const message = buildOrderMessage({
            clientId: user?.clientId || "N/A",
            orderName: form.orderName,
            service: form.service,
            quantity: Number(form.quantity),
            paperType: form.paperType,
            finishingOption: form.finishingOption,
            designId: form.designId || undefined,
        });
        setSubmitted(true);
        notify.whatsapp("Order details prepared. Please confirm with admin via WhatsApp.");
        setTimeout(() => sendWhatsApp(message), 800);
    };

    if (submitted) {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, textAlign: "center" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>💬</div>
                <h2 style={{ fontWeight: 800, fontSize: "1.25rem", marginBottom: "0.75rem" }}>Order Prepared!</h2>
                <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: 360 }}>
                    Your order details have been prepared. WhatsApp will open to send your order to admin for confirmation.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-primary" style={{ marginTop: "1.5rem" }}>
                    Create Another Order
                </button>
            </div>
        );
    }

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "1.5rem", alignItems: "start" }}>
            {/* Form */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "2rem" }}>
                <div style={{ marginBottom: "1.75rem" }}>
                    <h1 style={{ fontWeight: 800, fontSize: "1.375rem", color: "#0f172a" }}>ADD ORDER</h1>
                    <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.25rem" }}>Configure your printing order details</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
                    {/* Order Name */}
                    <div className="form-group">
                        <label className="form-label">Order Name</label>
                        <input name="orderName" value={form.orderName} onChange={handleChange} placeholder="Enter a reference name for your order..." className="form-input" style={{ borderColor: errors.orderName ? "#ef4444" : undefined }} />
                        {errors.orderName && <span style={{ color: "#ef4444", fontSize: "0.72rem" }}>{errors.orderName}</span>}
                    </div>

                    {/* Service */}
                    <div className="form-group">
                        <label className="form-label">Select Product</label>
                        <select name="service" value={form.service} onChange={handleChange} className="form-input" style={{ borderColor: errors.service ? "#ef4444" : undefined }}>
                            <option value="">Select a service…</option>
                            {SERVICES.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
                        </select>
                        {errors.service && <span style={{ color: "#ef4444", fontSize: "0.72rem" }}>{errors.service}</span>}
                    </div>

                    {/* Quantity + Order Type */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
                        <div className="form-group">
                            <label className="form-label">Quantity {selectedService && <span style={{ color: "#94a3b8" }}>(min. {selectedService.minimumQuantity})</span>}</label>
                            <input name="quantity" value={form.quantity} onChange={handleChange} type="number" placeholder={String(selectedService?.minimumQuantity || 100)} className="form-input" style={{ borderColor: errors.quantity ? "#ef4444" : undefined }} />
                            {errors.quantity && <span style={{ color: "#ef4444", fontSize: "0.72rem" }}>{errors.quantity}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Order Type</label>
                            <select name="orderType" value={form.orderType} onChange={handleChange} className="form-input">
                                <option value="STANDARD">Standard Order</option>
                                <option value="CUSTOM">Custom Order</option>
                            </select>
                        </div>
                    </div>

                    {/* Paper + Finishing */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
                        <div className="form-group">
                            <label className="form-label">Paper Type</label>
                            <select name="paperType" value={form.paperType} onChange={handleChange} className="form-input" style={{ borderColor: errors.paperType ? "#ef4444" : undefined }}>
                                <option value="">Select paper type…</option>
                                {PAPER_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                            {errors.paperType && <span style={{ color: "#ef4444", fontSize: "0.72rem" }}>{errors.paperType}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Finishing Option</label>
                            <select name="finishingOption" value={form.finishingOption} onChange={handleChange} className="form-input" style={{ borderColor: errors.finishingOption ? "#ef4444" : undefined }}>
                                <option value="">Select finishing…</option>
                                {FINISHING_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                            </select>
                            {errors.finishingOption && <span style={{ color: "#ef4444", fontSize: "0.72rem" }}>{errors.finishingOption}</span>}
                        </div>
                    </div>

                    {/* Design ID */}
                    <div className="form-group">
                        <label className="form-label">Design ID <span style={{ color: "#94a3b8", textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                        <input name="designId" value={form.designId} onChange={handleChange} placeholder="e.g. D203" className="form-input" />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: "100%", padding: "0.875rem", fontWeight: 700, fontSize: "0.875rem", marginTop: "0.25rem" }}>
                        💬 ADD ORDER (Confirm via WhatsApp)
                    </button>
                </form>
            </div>

            {/* Right Panel — Product Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Preview */}
                <div style={{ background: "#0f172a", borderRadius: 16, overflow: "hidden", minHeight: 200 }}>
                    {selectedService ? (
                        <div style={{ padding: "2.5rem", textAlign: "center" }}>
                            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{selectedService.icon}</div>
                            <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.25rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>{selectedService.name}</h3>
                            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", marginTop: "0.375rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>B2B Printing Service</p>
                        </div>
                    ) : (
                        <div style={{ padding: "3rem", textAlign: "center" }}>
                            <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>🖨️</div>
                            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>Select a service to see the preview</p>
                        </div>
                    )}
                </div>

                {/* Product Details */}
                {selectedService && (
                    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: "1.25rem" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            <div>
                                <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", color: "#1a56db", marginBottom: "0.75rem", textTransform: "uppercase" }}>📋 Product Details</p>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                    {[["Min. Qty", `${selectedService.minimumQuantity} pcs`], ["Order Type", form.orderType || "-"], ["Paper", form.paperType || "-"], ["Finishing", form.finishingOption || "-"]].map(([k, v]) => (
                                        <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
                                            <span style={{ color: "#64748b" }}>{k}:</span>
                                            <span style={{ fontWeight: 600, color: "#0f172a" }}>{v}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", color: "#e91e8c", marginBottom: "0.75rem", textTransform: "uppercase" }}>⚡ Our Specialization</p>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                    {["Nepal-Wide Reach", "Precision Printing", "B2B Exclusive", "On-Time Delivery"].map((item) => (
                                        <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", color: "#475569" }}>
                                            <span style={{ color: "#e91e8c" }}>✓</span> {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notes */}
                <div style={{ background: "#fef9c3", borderRadius: 12, border: "1px solid #fde047", padding: "1rem" }}>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#92400e", marginBottom: "0.5rem" }}>⚠️ IMPORTANT NOTES</p>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                        {["Use high-resolution vector files (PDF, CDR, AI).", "Maintain font size above 8pt for legibility.", "Send your design via WhatsApp after placing order.", "Minimum quantity applies per design variant."].map((note) => (
                            <li key={note} style={{ fontSize: "0.72rem", color: "#78350f", display: "flex", gap: "0.375rem" }}>
                                <span>•</span>{note}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function CreateOrderPage() {
    return (
        <Suspense fallback={<div style={{ padding: "2rem", textAlign: "center" }}>Loading…</div>}>
            <CreateOrderForm />
        </Suspense>
    );
}
