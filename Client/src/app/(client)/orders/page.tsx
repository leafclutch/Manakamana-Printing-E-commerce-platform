"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_ORDERS } from "@/constants";
import { getStatusColor, getStatusLabel, formatDate } from "@/utils/helpers";
import { OrderStatus } from "@/types";

const STATUS_FILTERS: { label: string; value: string }[] = [
    { label: "All Orders", value: "ALL" },
    { label: "Placed", value: "ORDER_PLACED" },
    { label: "Accepted", value: "ORDER_ACCEPTED" },
    { label: "Processing", value: "ORDER_PROCESSING" },
    { label: "Dispatched", value: "ORDER_DISPATCHED" },
    { label: "Delivered", value: "ORDER_DELIVERED" },
    { label: "Cancelled", value: "ORDER_CANCELLED" },
];

export default function OrdersPage() {
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [search, setSearch] = useState("");

    const filtered = MOCK_ORDERS.filter((o) => {
        const matchStatus = statusFilter === "ALL" || o.status === statusFilter;
        const matchSearch = search === "" || o.orderName.toLowerCase().includes(search.toLowerCase()) || o.service.toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchSearch;
    });

    return (
        <div>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                    <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a" }}>Order History</h1>
                    <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: "0.25rem" }}>Track all your printing orders and their current status.</p>
                </div>
                <Link href="/orders/create" className="btn-primary">➕ New Order</Link>
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.25rem", alignItems: "center" }}>
                {/* Search */}
                <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "0.9rem" }}>🔍</span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search orders…"
                        className="form-input"
                        style={{ paddingLeft: "2.25rem", width: 220, padding: "0.5rem 0.875rem 0.5rem 2.25rem" }}
                    />
                </div>
                {/* Status filter chips */}
                {STATUS_FILTERS.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => setStatusFilter(f.value)}
                        style={{
                            padding: "0.35rem 0.875rem", borderRadius: "50px",
                            border: statusFilter === f.value ? "none" : "1.5px solid #e2e8f0",
                            background: statusFilter === f.value ? "linear-gradient(90deg,#1a56db,#2563eb)" : "#fff",
                            color: statusFilter === f.value ? "#fff" : "#475569",
                            fontWeight: 600, fontSize: "0.72rem", cursor: "pointer"
                        }}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Name</th>
                            <th>Service</th>
                            <th>Quantity</th>
                            <th>Paper / Finish</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ textAlign: "center", padding: "3rem", color: "#94a3b8" }}>
                                    No orders found
                                </td>
                            </tr>
                        ) : filtered.map((order) => (
                            <tr key={order.id}>
                                <td style={{ color: "#1a56db", fontWeight: 700, fontSize: "0.8rem" }}>{order.id}</td>
                                <td style={{ fontWeight: 600 }}>{order.orderName}</td>
                                <td>
                                    <div style={{ fontSize: "0.82rem" }}>{order.service}</div>
                                    <div style={{ fontSize: "0.68rem", color: "#94a3b8", marginTop: "0.1rem" }}>{order.orderType}</div>
                                </td>
                                <td style={{ color: "#475569" }}>{order.quantity.toLocaleString()}</td>
                                <td>
                                    <div style={{ fontSize: "0.78rem" }}>{order.paperType}</div>
                                    <div style={{ fontSize: "0.68rem", color: "#94a3b8" }}>{order.finishingOption}</div>
                                </td>
                                <td>
                                    <span className={`badge ${getStatusColor(order.status as OrderStatus)}`}>
                                        {getStatusLabel(order.status as OrderStatus)}
                                    </span>
                                </td>
                                <td style={{ color: "#64748b", fontSize: "0.82rem" }}>{formatDate(order.date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p style={{ textAlign: "right", marginTop: "0.875rem", fontSize: "0.72rem", color: "#94a3b8" }}>
                Showing {filtered.length} of {MOCK_ORDERS.length} orders
            </p>
        </div>
    );
}
