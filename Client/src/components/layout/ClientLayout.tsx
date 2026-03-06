"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { notify } from "@/utils/notifications";

const navItems = [
    { href: "/dashboard", icon: "📊", label: "Dashboard" },
    { href: "/services", icon: "🖨️", label: "Services" },
    { href: "/templates", icon: "🎨", label: "Templates" },
    { href: "/orders/create", icon: "➕", label: "Create Order" },
    { href: "/orders", icon: "📦", label: "Order History" },
    { href: "/profile", icon: "👤", label: "Profile" },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isAuthenticated) {
            notify.lock();
            router.replace("/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    const handleLogout = () => {
        logout();
        notify.success("Logged out successfully");
        router.push("/");
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#f0f4ff" }}>
            {/* Sidebar */}
            <aside className="sidebar" style={{ display: "flex", flexDirection: "column" }}>
                {/* Logo */}
                <div style={{ padding: "1.25rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
                        <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg,#1a56db,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🖨️</div>
                        <div>
                            <div style={{ color: "#fff", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.05em" }}>MANAKAMANA</div>
                            <div style={{ color: "#475569", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Printing Press</div>
                        </div>
                    </Link>
                </div>

                {/* User info */}
                <div style={{ padding: "1rem", borderBottom: "1px solid rgba(255,255,255,0.06)", margin: "0 0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#e91e8c,#5c35a8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>
                            {user?.contactPerson?.[0] || "C"}
                        </div>
                        <div>
                            <div style={{ color: "#fff", fontSize: "0.78rem", fontWeight: 600 }}>{user?.companyName}</div>
                            <div style={{ color: "#64748b", fontSize: "0.65rem" }}>{user?.clientId}</div>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav style={{ flex: 1, padding: "0.75rem 0" }}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`sidebar-link ${pathname === item.href || (item.href !== "/orders" && pathname.startsWith(item.href) && item.href !== "/") ? "active" : pathname === "/orders" && item.href === "/orders" ? "active" : ""}`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Logout */}
                <div style={{ padding: "0.75rem 0.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <button
                        onClick={handleLogout}
                        className="sidebar-link"
                        style={{ width: "100%", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", justifyContent: "flex-start" }}
                    >
                        <span>🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main style={{ flex: 1, overflow: "auto" }}>
                {/* Client Topbar */}
                <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 1.5rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                            {navItems.find((n) => pathname.startsWith(n.href))?.label || "Dashboard"}
                        </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <button style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", position: "relative" }}>
                            🔔
                            <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} />
                        </button>
                        <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                            👋 <strong>{user?.contactPerson}</strong>
                        </div>
                    </div>
                </header>

                <div style={{ padding: "1.75rem" }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
