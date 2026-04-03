import api from "./axios";

// Get all notifications
export const getAllNotifications = async () => {
    try {
        const response = await api.get('/v1/wallet/notifications');
        console.log(response.data.data.items)
        return response.data.data.items || [];
    } catch (error) {
        throw error;
    }
};

// Mark a single notification as read by ID
export const markNotificationAsRead = async (notificationId: string) => {
    try {
        const response = await api.patch(`/v1/wallet/notifications/${notificationId}/read`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};