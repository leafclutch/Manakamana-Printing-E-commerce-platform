
"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";

interface AuthUser {
    clientId: string;
    companyName: string;
    contactPerson: string;
    email: string;
}

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (clientId: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem("mk_auth_user");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch (error) {
                console.error("Failed to restore session:", error);
                localStorage.removeItem("mk_auth_user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = useCallback((clientId: string, password: string): boolean => {
        if (clientId === MOCK_CREDENTIALS.clientId && password === MOCK_CREDENTIALS.password) {
            const authUser = MOCK_CREDENTIALS.user;
            setUser(authUser);
            localStorage.setItem("mk_auth_user", JSON.stringify(authUser));
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem("mk_auth_user");
    }, []);

    const value = useMemo(() => ({
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
    }), [user, isLoading, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}