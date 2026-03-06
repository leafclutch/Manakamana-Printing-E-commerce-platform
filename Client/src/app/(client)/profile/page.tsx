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
            <div className="mb-8">
                <h1 className="text-[1.5rem] font-extrabold text-[#0f172a]">My Profile</h1>
                <p className="text-[#64748b] text-[0.875rem] mt-1">View and manage your company account details.</p>
            </div>

            <div className="grid grid-cols-[320px_1fr] gap-6 items-start">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden">
                    <div className="gradient-card p-10 text-center">
                        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 text-[2rem] text-white font-extrabold border-[3px] border-white/40">
                            {user?.contactPerson?.[0] || "C"}
                        </div>
                        <h2 className="text-white font-extrabold text-[1rem] tracking-[0.02em]">{user?.companyName}</h2>
                        <p className="text-white/75 text-[0.78rem] mt-1">{user?.email}</p>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-col gap-3.5">
                            <div className="p-3.5 bg-[#f0f4ff] rounded-[10px] border border-[#c7d9fd]">
                                <div className="text-[0.65rem] font-bold text-[#4361ee] tracking-[0.08em] uppercase mb-1">Client ID</div>
                                <div className="text-[1.25rem] font-extrabold text-[#0f172a] tracking-[0.05em]">{user?.clientId}</div>
                            </div>
                            <div>
                                <div className="text-[0.7rem] text-[#94a3b8] mb-1">Account Status</div>
                                <span className="badge bg-[#dcfce7] text-[#16a34a]">● Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Form */}
                <div className="bg-white rounded-2xl border border-[#e2e8f0] p-7">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-bold text-[1rem] text-[#0f172a]">Company Details</h2>
                        <button
                            onClick={() => editing ? handleSave() : setEditing(true)}
                            className={`${editing ? "btn-primary" : "btn-outline-dark"} py-1.5 px-4.5 text-[0.78rem]`}
                        >
                            {editing ? "💾 Save Changes" : "✏️ Edit"}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        {[
                            { label: "Company Name", name: "companyName" },
                            { label: "Contact Person", name: "contactPerson" },
                            { label: "Email Address", name: "email" },
                            { label: "Phone Number", name: "phone" },
                        ].map(({ label, name }) => (
                            <div key={name} className="form-group">
                                <label className="form-label">{label}</label>
                                <input
                                    className={`form-input focus:ring-2 focus:ring-[#1a56db] focus:border-[#1a56db] outline-none ${editing ? "bg-[#f8fafc] cursor-text" : "bg-[#f1f5f9] cursor-not-allowed"}`}
                                    value={form[name as keyof typeof form]}
                                    onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
                                    disabled={!editing}
                                />
                            </div>
                        ))}
                        <div className="form-group col-span-2">
                            <label className="form-label">Business Address</label>
                            <input
                                className={`form-input focus:ring-2 focus:ring-[#1a56db] focus:border-[#1a56db] outline-none ${editing ? "bg-[#f8fafc] cursor-text" : "bg-[#f1f5f9] cursor-not-allowed"}`}
                                value={form.address}
                                onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                                disabled={!editing}
                            />
                        </div>
                    </div>

                    {/* Contact Admin */}
                    <div className="mt-7 p-5 bg-[#f8fafc] rounded-[10px] border border-[#e2e8f0]">
                        <h3 className="font-bold text-[0.875rem] text-[#0f172a] mb-2">Need to change your password?</h3>
                        <p className="text-[#64748b] text-[0.78rem] leading-[1.6]">Passwords are managed by admin. Please contact us via WhatsApp to reset your Client ID or password.</p>
                        <button
                            onClick={() => window.open(`https://wa.me/97798XXXXXXXX?text=Hello%20Admin%2C%20I%20need%20help%20with%20my%20account%20%28Client%20ID%3A%20${user?.clientId}%29`, "_blank")}
                            className="mt-3.5 py-2 px-4.5 bg-[#25D366] text-white border-none rounded-lg font-bold text-[0.78rem] cursor-pointer hover:bg-[#20bd5a] transition-colors"
                        >
                            💬 Contact Admin on WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
