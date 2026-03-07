"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
    const [email, setEmail] = useState("");

    return (
        <footer className="footer">
            <div className="max-w-[1200px] mx-auto pt-14 px-6 pb-8 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10">
                {/* Brand */}
                <div>
                    <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#1a56db] to-[#2563eb] flex items-center justify-center text-white text-[1.1rem]">🖨️</div>
                        <div>
                            <div className="text-white text-[0.9rem] font-extrabold tracking-[0.05em]">MANAKAMANA</div>
                            <div className="text-[color:var(--text-muted)] text-[0.6rem] tracking-[0.15em] uppercase">Printing Press</div>
                        </div>
                    </div>
                    <p className="text-[0.8rem] leading-[1.7] text-[color:var(--text-muted)] max-w-[200px]">
                        Providing premium quality printing services across Nepal since 1995. Your trusted partner for corporate branding and wholesale print solutions.
                    </p>
                    <div className="flex gap-3 mt-5">
                        {["facebook", "instagram"].map((s) => (
                            <a key={s} href="#" className="w-[34px] h-[34px] rounded-full border border-[#334155] flex items-center justify-center text-[color:var(--text-muted)] text-[0.85rem] no-underline transition-all duration-200 hover:text-white hover:bg-white/10">
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
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-2.5 items-start">
                            <span className="text-[color:var(--primary)] mt-[0.1rem]">📍</span>
                            <span className="text-[0.8rem] leading-[1.6]">Head Office<br />Kathmandu, Nepal</span>
                        </div>
                        <div className="flex gap-2.5 items-center">
                            <span className="text-[color:var(--primary)]">📞</span>
                            <span className="text-[0.8rem]">+977 98XXXXXXXX</span>
                        </div>
                        <div className="flex gap-2.5 items-center">
                            <span className="text-[color:var(--primary)]">✉️</span>
                            <span className="text-[0.8rem]">info@manakamana.com</span>
                        </div>
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <p className="footer-heading">Newsletter</p>
                    <p className="text-[0.8rem] text-[color:var(--text-muted)] mb-4 leading-[1.6]">
                        Subscribe to get the latest updates and amazing offers.
                    </p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="w-full py-2.5 px-3.5 bg-[#1e293b] border border-[#334155] rounded-md text-white text-[0.8rem] mb-2.5 outline-none font-sans placeholder-[#64748b] focus:border-[var(--primary)] transition-colors"
                    />
                    <button className="btn-primary w-full py-2.5 text-[0.8rem]">
                        Subscribe
                    </button>
                </div>
            </div>

            <div className="border-t border-[#1e293b] py-5 px-6 text-center">
                <p className="text-[0.75rem] text-[#475569]">
                    © 2024 Manakamana Printing Press. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
