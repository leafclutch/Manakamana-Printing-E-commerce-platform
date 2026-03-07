import toast from "react-hot-toast";

export const notify = {
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    info: (message: string) =>
        toast(message, {
            icon: "ℹ️",
        }),
    whatsapp: (message: string) =>
        toast.success(message, {
            icon: "💬",
            duration: 4000,
        }),
    lock: () =>
        toast("Please login to access printing services", {
            icon: "🔒",
            duration: 3000,
        }),
};
