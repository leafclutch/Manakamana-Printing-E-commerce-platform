"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { MOCK_ORDERS } from "@/constants";
import { TEMPLATES } from "@/constants";
import { getStatusColor, getStatusLabel, formatDate } from "@/utils/helpers";

const statsData = [
    { icon: "📦", label: "Total Orders", color: "#e1effe", iconColor: "#1a56db", key: "total" },
    { icon: "⚙️", label: "In Progress", color: "#fef9c3", iconColor: "#ca8a04", key: "progress" },
    { icon: "✅", label: "Completed", color: "#dcfce7", iconColor: "#16a34a", key: "done" },
    { icon: "🎨", label: "Templates", color: "#fde8ff", iconColor: "#9c27b0", key: "templates" },
];

const quickActions = [
    { href: "/orders/create", icon: "➕", label: "Create Order", color: "#1a56db" },
    { href: "/services", icon: "🖨️", label: "Browse Services", color: "#9c27b0" },
    { href: "/templates", icon: "🎨", label: "Free Templates", color: "#e91e8c" },
    { href: "/orders", icon: "📋", label: "Order History", color: "#16a34a" },
];

export default function DashboardPage() {
    const { user } = useAuth();

    const totalOrders = MOCK_ORDERS.length;
    const inProgress = MOCK_ORDERS.filter((o) => ["ORDER_PLACED", "ORDER_ACCEPTED", "ORDER_PROCESSING", "ORDER_DISPATCHED"].includes(o.status)).length;
    const completed = MOCK_ORDERS.filter((o) => o.status === "ORDER_DELIVERED").length;

    const statValues: Record<string, number> = {
        total: totalOrders, progress: inProgress, done: completed, templates: TEMPLATES.length
    };

    const recentOrders = MOCK_ORDERS.slice(0, 5);

    return (
        <div>
            {/* Greeting */}
            <div style={{ marginBottom: "1.75rem" }}>
                <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a" }}>
                    Good morning, {user?.contactPerson?.split(" ")[0]}! 👋
                </h1>
                <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                    Here's a summary of your printing activity.
                </p>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
                {statsData.map((s) => (
                    <div key={s.key} className="stat-card">
                        <div className="stat-icon" style={{ background: s.color }}>
                            <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>
                        </div>
                        <div>
                            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>
                                {statValues[s.key]}
                            </div>
                            <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "0.25rem" }}>{s.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.5rem", alignItems: "start" }}>
                {/* Recent Orders */}
                <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                        <h2 style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a" }}>Recent Orders</h2>
                        <Link href="/orders" style={{ fontSize: "0.78rem", color: "#1a56db", fontWeight: 600, textDecoration: "none" }}>View all →</Link>
                    </div>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Order Name</th>
                                    <th>Service</th>
                                    <th>Qty</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td style={{ fontWeight: 600 }}>{order.orderName}</td>
                                        <td style={{ color: "#64748b" }}>{order.service}</td>
                                        <td style={{ color: "#64748b" }}>{order.quantity.toLocaleString()}</td>
                                        <td>
                                            <span className={`badge ${getStatusColor(order.status)}`}>
                                                {getStatusLabel(order.status)}
                                            </span>
                                        </td>
                                        <td style={{ color: "#64748b" }}>{formatDate(order.date)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: "1.25rem" }}>
                    <h2 style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a", marginBottom: "1rem" }}>Quick Actions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                        {quickActions.map((a) => (
                            <Link
                                key={a.href}
                                href={a.href}
                                style={{
                                    display: "flex", alignItems: "center", gap: "0.75rem",
                                    padding: "0.75rem 1rem", borderRadius: 8,
                                    background: "#f8fafc", border: "1px solid #e2e8f0",
                                    textDecoration: "none", transition: "all 0.2s"
                                }}
                            >
                                <div style={{ width: 36, height: 36, borderRadius: 8, background: a.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>{a.icon}</div>
                                <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#0f172a" }}>{a.label}</span>
                                <span style={{ marginLeft: "auto", color: "#94a3b8", fontSize: "0.8rem" }}>→</span>
                            </Link>
                        ))}
                    </div>

                    {/* Client ID */}
                    <div style={{ marginTop: "1.25rem", padding: "0.875rem", background: "#f0f4ff", borderRadius: 8, border: "1px solid #c7d9fd" }}>
                        <div style={{ fontSize: "0.7rem", color: "#4361ee", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Your Client ID</div>
                        <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", letterSpacing: "0.05em" }}>{user?.clientId}</div>
                        <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "0.25rem" }}>Use this ID when placing orders</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
