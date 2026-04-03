import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAllNotifications, markNotificationAsRead } from "../api/notifiaction";

// Notification type matching the given shape
export interface Notification {
  notificationId: string;
  type: string;
  title: string;
  message: string;
  referenceId?: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  fetchAllNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  deleteNotification: (notificationId: string) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,

      fetchAllNotifications: async () => {
        try {
          const notifications: Notification[] = await getAllNotifications();
          set({
            notifications: notifications,
            unreadCount: notifications.filter((n) => !n.isRead).length,
          });
        } catch (error) {
          // Optionally handle error: set to empty or log etc.
          set({
            notifications: [],
            unreadCount: 0,
          });
        }
      },

      markAsRead: async (notificationId) => {
        try {
          await markNotificationAsRead(notificationId);
          set((state) => {
            const updated = state.notifications.map((n) =>
              n.notificationId === notificationId ? { ...n, isRead: true } : n
            );
            return {
              notifications: updated,
              unreadCount: updated.filter((n) => !n.isRead).length,
            };
          });
        } catch (error) {
          // Optionally handle error (e.g., show toast)
        }
      },

      markAllAsRead: () => {
        set((state) => {
          const updated = state.notifications.map((n) => ({ ...n, isRead: true }));
          return {
            notifications: updated,
            unreadCount: 0,
          };
        });
      },

      clearAll: () => {
        set({ notifications: [], unreadCount: 0 });
      },

      deleteNotification: (notificationId) => {
        set((state) => {
          const updated = state.notifications.filter((n) => n.notificationId !== notificationId);
          return {
            notifications: updated,
            unreadCount: updated.filter((n) => !n.isRead).length,
          };
        });
      },
    }),
    {
      name: "notification-storage",
    }
  )
);
