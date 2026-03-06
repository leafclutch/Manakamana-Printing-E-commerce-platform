"use client";

import Link from "next/link";
import { SERVICES } from "@/constants";

export default function ServicesPage() {
    return (
        <div>
            <div style={{ marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a" }}>Printing Services</h1>
                <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                    Choose from our range of premium printing services. All prices are wholesale B2B rates.
                </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
                {SERVICES.map((service) => (
                    <div key={service.id} className="card">
                        {/* Preview image / icon area */}
                        <div style={{
                            background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                            height: 160, display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "3.5rem", position: "relative"
                        }}>
                            {service.icon}
                            <span style={{
                                position: "absolute", top: 10, left: 10,
                                background: "linear-gradient(90deg,#e91e8c,#9c27b0)",
                                color: "#fff", borderRadius: "50px",
                                padding: "3px 10px", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em"
                            }}>B2B</span>
                        </div>

                        <div style={{ padding: "1.25rem" }}>
                            <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.375rem" }}>{service.name}</h3>
                            <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.6, marginBottom: "0.875rem" }}>{service.description}</p>

                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                                <div>
                                    <div style={{ fontSize: "0.65rem", color: "#94a3b8", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Minimum Quantity</div>
                                    <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.9rem" }}>{service.minimumQuantity.toLocaleString()} pcs</div>
                                </div>
                            </div>

                            <Link
                                href={`/orders/create?service=${encodeURIComponent(service.name)}`}
                                className="btn-primary"
                                style={{ width: "100%", textAlign: "center", display: "block", padding: "0.625rem" }}
                            >
                                Create Order
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
