"use client";

import { useState, Suspense } from "react";
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
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="text-[3.5rem] mb-4">💬</div>
                <h2 className="font-extrabold text-[1.25rem] mb-3">Order Prepared!</h2>
                <p className="text-[#64748b] text-[0.875rem] leading-[1.7] max-w-[360px]">
                    Your order details have been prepared. WhatsApp will open to send your order to admin for confirmation.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-primary mt-6">
                    Create Another Order
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-[1fr_380px] gap-6 items-start">
            {/* Form */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8">
                <div className="mb-7">
                    <h1 className="font-extrabold text-[1.375rem] text-[#0f172a]">ADD ORDER</h1>
                    <p className="text-[#64748b] text-[0.8rem] mt-1">Configure your printing order details</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4.5">
                    {/* Order Name */}
                    <div className="form-group">
                        <label className="form-label">Order Name</label>
                        <input name="orderName" value={form.orderName} onChange={handleChange} placeholder="Enter a reference name for your order..." className="form-input" style={{ borderColor: errors.orderName ? "#ef4444" : undefined }} />
                        {errors.orderName && <span className="text-[#ef4444] text-[0.72rem]">{errors.orderName}</span>}
                    </div>

                    {/* Service */}
                    <div className="form-group">
                        <label className="form-label">Select Product</label>
                        <select name="service" value={form.service} onChange={handleChange} className="form-input" style={{ borderColor: errors.service ? "#ef4444" : undefined }}>
                            <option value="">Select a service…</option>
                            {SERVICES.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
                        </select>
                        {errors.service && <span className="text-[#ef4444] text-[0.72rem]">{errors.service}</span>}
                    </div>

                    {/* Quantity + Order Type */}
                    <div className="grid grid-cols-2 gap-3.5">
                        <div className="form-group">
                            <label className="form-label">Quantity {selectedService && <span className="text-[#94a3b8]">(min. {selectedService.minimumQuantity})</span>}</label>
                            <input name="quantity" value={form.quantity} onChange={handleChange} type="number" placeholder={String(selectedService?.minimumQuantity || 100)} className="form-input" style={{ borderColor: errors.quantity ? "#ef4444" : undefined }} />
                            {errors.quantity && <span className="text-[#ef4444] text-[0.72rem]">{errors.quantity}</span>}
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
                    <div className="grid grid-cols-2 gap-3.5 mt-4">
                        <div className="form-group">
                            <label className="form-label">Paper Type</label>
                            <select name="paperType" value={form.paperType} onChange={handleChange} className="form-input" style={{ borderColor: errors.paperType ? "#ef4444" : undefined }}>
                                <option value="">Select paper type…</option>
                                {PAPER_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                            {errors.paperType && <span className="text-[#ef4444] text-[0.72rem]">{errors.paperType}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Finishing Option</label>
                            <select name="finishingOption" value={form.finishingOption} onChange={handleChange} className="form-input" style={{ borderColor: errors.finishingOption ? "#ef4444" : undefined }}>
                                <option value="">Select finishing…</option>
                                {FINISHING_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                            </select>
                            {errors.finishingOption && <span className="text-[#ef4444] text-[0.72rem]">{errors.finishingOption}</span>}
                        </div>
                    </div>

                    {/* Design ID */}
                    <div className="form-group mt-4 mb-2">
                        <label className="form-label">Design ID <span className="text-[#94a3b8] normal-case tracking-normal">(optional)</span></label>
                        <input name="designId" value={form.designId} onChange={handleChange} placeholder="e.g. D203" className="form-input" />
                    </div>

                    <button type="submit" className="btn-primary w-full p-3.5 font-bold text-[0.875rem] mt-1">
                        💬 ADD ORDER (Confirm via WhatsApp)
                    </button>
                </form>
            </div>

            {/* Right Panel — Product Info */}
            <div className="flex flex-col gap-4">
                {/* Preview */}
                <div className="bg-[#0f172a] rounded-2xl overflow-hidden min-h-[200px] flex flex-col items-center justify-center">
                    {selectedService ? (
                        <div className="p-10 text-center">
                            <div className="text-[4rem] mb-4">{selectedService.icon}</div>
                            <h3 className="text-white font-extrabold text-[1.25rem] tracking-[0.08em] uppercase">{selectedService.name}</h3>
                            <p className="text-white/60 text-[0.75rem] mt-1.5 tracking-[0.08em] uppercase">B2B Printing Service</p>
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="text-[3rem] mb-3">🖨️</div>
                            <p className="text-white/50 text-[0.8rem]">Select a service to see the preview</p>
                        </div>
                    )}
                </div>

                {/* Product Details */}
                {selectedService && (
                    <div className="bg-white rounded-[14px] border border-[#e2e8f0] p-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[0.7rem] font-bold tracking-[0.08em] text-[#1a56db] mb-3 uppercase">📋 Product Details</p>
                                <div className="flex flex-col gap-2">
                                    {[["Min. Qty", `${selectedService.minimumQuantity} pcs`], ["Order Type", form.orderType || "-"], ["Paper", form.paperType || "-"], ["Finishing", form.finishingOption || "-"]].map(([k, v]) => (
                                        <div key={k} className="flex justify-between text-[0.78rem]">
                                            <span className="text-[#64748b]">{k}:</span>
                                            <span className="font-semibold text-[#0f172a]">{v}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-[0.7rem] font-bold tracking-[0.08em] text-[#e91e8c] mb-3 uppercase">⚡ Our Specialization</p>
                                <div className="flex flex-col gap-2">
                                    {["Nepal-Wide Reach", "Precision Printing", "B2B Exclusive", "On-Time Delivery"].map((item) => (
                                        <div key={item} className="flex items-center gap-1.5 text-[0.75rem] text-[#475569]">
                                            <span className="text-[#e91e8c]">✓</span> {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notes */}
                <div className="bg-[#fef9c3] rounded-xl border border-[#fde047] p-4">
                    <p className="text-[0.72rem] font-bold text-[#92400e] mb-2">⚠️ IMPORTANT NOTES</p>
                    <ul className="list-none flex flex-col gap-1.5">
                        {["Use high-resolution vector files (PDF, CDR, AI).", "Maintain font size above 8pt for legibility.", "Send your design via WhatsApp after placing order.", "Minimum quantity applies per design variant."].map((note) => (
                            <li key={note} className="text-[0.72rem] text-[#78350f] flex gap-1.5">
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
        <Suspense fallback={<div className="p-8 text-center">Loading…</div>}>
            <CreateOrderForm />
        </Suspense>
    );
}
