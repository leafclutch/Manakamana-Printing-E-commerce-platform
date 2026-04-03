"use client";

import { useNotificationStore } from "@/store/notificationStore";
import { FaBell, FaCheckDouble, FaTrashAlt, FaShoppingBag, FaWallet, FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";

export default function NotificationsPage() {
    const { 
        notifications,
        fetchAllNotifications,
        markAllAsRead,
        markAsRead
    } = useNotificationStore();

    const getIcon = (type: string) => {
        switch (type) {
            case "ORDER": return <FaShoppingBag className="text-blue-500" />;
            case "WALLET": return <FaWallet className="text-green-500" />;
            default: return <FaInfoCircle className="text-amber-500" />;
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchAllNotifications();
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
                            <FaBell className="text-white text-xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Notifications</h1>
                            <p className="text-sm text-gray-500 font-medium">Stay updated with your orders and activities</p>
                        </div>
                    </div>

                    {/* {notifications.length > 0 && (
                        <div className="flex gap-2">
                            <button
                                onClick={markAllAsRead}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                            >
                                <FaCheckDouble className="text-blue-500" />
                                Mark all as read
                            </button>
                            <button
                                onClick={clearAll}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all shadow-sm active:scale-95"
                            >
                                <FaTrashAlt />
                                Clear all
                            </button>
                        </div>
                    )} */}
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {notifications.length > 0 ? (
                            notifications.map((notif, idx) => (
                                <motion.div
                                    key={idx}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={`relative group bg-white border ${notif.isRead ? 'border-gray-100' : 'border-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.05)]'} rounded-2xl p-5 flex gap-4 transition-all hover:shadow-md`}
                                >
                                    {!notif.isRead && (
                                        <div className="absolute top-5 right-5 w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                                    )}

                                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                                        notif.type === 'ORDER' ? 'bg-blue-50' : 
                                        notif.type === 'WALLET' ? 'bg-green-50' : 'bg-amber-50'
                                    }`}>
                                        {getIcon(notif.type)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className={`font-bold truncate ${notif.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                                                {notif.title}
                                            </h3>
                                            <span className="text-[10px] font-bold text-gray-400 border border-gray-100 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                                date
                                            </span>
                                        </div>
                                        <p className={`text-sm leading-relaxed ${notif.isRead ? 'text-gray-500' : 'text-gray-700 font-medium'}`}>
                                            {notif.message}
                                        </p>

                                        <div className="mt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {!notif.isRead && (
                                                <button
                                                    onClick={() => markAsRead(notif.notificationId)}
                                                    className="cursor-pointer text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 underline underline-offset-4"
                                                >
                                                    Mark as read
                                                </button>
                                            )}
                                            {/* <button
                                                onClick={() => deleteNotification(notif.id)}
                                                className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 underline underline-offset-4"
                                            >
                                                Remove
                                            </button> */}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-3xl"
                            >
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-6">
                                    <FaBell className="text-gray-300 text-3xl" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">Queue is empty</h2>
                                <p className="text-gray-500 max-w-xs mx-auto text-sm">
                                    You're all caught up! No new notifications at the moment.
                                </p>
                                <Link 
                                    href="/"
                                    className="inline-block mt-8 px-8 py-3 bg-blue-600 text-white text-xs font-black tracking-widest uppercase rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100"
                                >
                                    Go Home
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
