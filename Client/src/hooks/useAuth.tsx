"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthUser {
    clientId: string;
    companyName: string;
    contactPerson: string;
    email: string;
}

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    login: (clientId: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_CREDENTIALS = {
    clientId: "CL102",
    password: "manakamana123",
    user: {
        clientId: "CL102",
        companyName: "ABC Traders Pvt. Ltd.",
        contactPerson: "Ram Sharma",
        email: "abc@gmail.com",
    },
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("mk_auth_user");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                // ignore parse errors
            }
        }
    }, []);

    const login = (clientId: string, password: string): boolean => {
        if (
            clientId === MOCK_CREDENTIALS.clientId &&
            password === MOCK_CREDENTIALS.password
        ) {
            setUser(MOCK_CREDENTIALS.user);
            localStorage.setItem("mk_auth_user", JSON.stringify(MOCK_CREDENTIALS.user));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("mk_auth_user");
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
