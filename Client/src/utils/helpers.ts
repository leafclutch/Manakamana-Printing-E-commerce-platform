import { OrderStatus } from "@/types";

export const getStatusColor = (status: OrderStatus): string => {
    const colors: Record<OrderStatus, string> = {
        ORDER_PLACED: "bg-blue-100 text-blue-700 border border-blue-200",
        ORDER_ACCEPTED: "bg-purple-100 text-purple-700 border border-purple-200",
        ORDER_PROCESSING: "bg-yellow-100 text-yellow-700 border border-yellow-200",
        ORDER_DISPATCHED: "bg-orange-100 text-orange-700 border border-orange-200",
        ORDER_DELIVERED: "bg-green-100 text-green-700 border border-green-200",
        ORDER_CANCELLED: "bg-red-100 text-red-700 border border-red-200",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
};

export const getStatusLabel = (status: OrderStatus): string => {
    const labels: Record<OrderStatus, string> = {
        ORDER_PLACED: "Placed",
        ORDER_ACCEPTED: "Accepted",
        ORDER_PROCESSING: "Processing",
        ORDER_DISPATCHED: "Dispatched",
        ORDER_DELIVERED: "Delivered",
        ORDER_CANCELLED: "Cancelled",
    };
    return labels[status] || status;
};

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
