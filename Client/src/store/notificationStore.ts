import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Notification } from "@/types";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "isRead" | "createdAt">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  deleteNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [
        {
          id: "1",
          title: "Order Placed",
          message: "Your ID Card order has been placed successfully.",
          type: "ORDER",
          isRead: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Wallet Top-up",
          message: "Your wallet top-up of Rs. 1000 was successful.",
          type: "WALLET",
          isRead: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        }
      ],
      unreadCount: 1,

      addNotification: (notification) => {
        const newNotif: Notification = {
          ...notification,
          id: Math.random().toString(36).substring(2, 9),
          isRead: false,
          createdAt: new Date().toISOString(),
        };
        set((state) => {
          const updated = [newNotif, ...state.notifications];
          return {
            notifications: updated,
            unreadCount: updated.filter((n) => !n.isRead).length,
          };
        });
      },

      markAsRead: (id) => {
        set((state) => {
          const updated = state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          );
          return {
            notifications: updated,
            unreadCount: updated.filter((n) => !n.isRead).length,
          };
        });
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

      deleteNotification: (id) => {
        set((state) => {
          const updated = state.notifications.filter((n) => n.id !== id);
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
