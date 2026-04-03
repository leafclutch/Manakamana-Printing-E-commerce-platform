"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDesignStore } from "@/store/designStore";
import { formatDate } from "@/utils/helpers";
import { FiArrowLeft, FiInbox, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";

export default function DesignHistoryPage() {
    const { fetchAllDesigns, designs, loading } = useDesignStore();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        fetchAllDesigns();
    }, [fetchAllDesigns]);

    const totalPages = Math.ceil((Array.isArray(designs) ? designs.length : 0) / pageSize);
    const paginatedDesigns = Array.isArray(designs) 
        ? designs.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        : [];

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "APPROVED":
                return {
                    bg: "bg-green-50",
                    text: "text-green-700",
                    border: "border-green-200",
                    icon: <FiCheckCircle className="w-3.5 h-3.5" />
                };
            case "REJECTED":
                return {
                    bg: "bg-red-50",
                    text: "text-red-700",
                    border: "border-red-200",
                    icon: <FiXCircle className="w-3.5 h-3.5" />
                };
            default:
                return {
                    bg: "bg-amber-50",
                    text: "text-amber-700",
                    border: "border-amber-200",
                    icon: <FiClock className="w-3.5 h-3.5" />
                };
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <Link 
                            href="/templates" 
                            className="p-2.5 bg-white border border-[#e2e8f0] rounded-xl text-[#64748b] hover:text-[#1a56db] hover:border-[#1a56db] transition-all shadow-sm active:scale-95"
                        >
                            <FiArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Design Submission History</h1>
                            <p className="text-sm text-[#64748b] font-medium">Track your custom design approvals and feedback</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white p-1.5 border border-[#e2e8f0] rounded-2xl shadow-sm">
                        <div className="px-4 py-2 bg-[#f1f5f9] rounded-xl">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8]">Total Submissions</p>
                            <p className="text-lg font-black text-[#0f172a]">{designs.length}</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white border border-[#e2e8f0] rounded-3xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-[#64748b]">Submission ID</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-[#64748b]">Template / Type</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-[#64748b]">Design Title</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-[#64748b]">Design Code</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-[#64748b]">Status</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-[#64748b]">Submitted At</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-[#64748b]">Feedback</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f1f5f9]">
                                <AnimatePresence mode="popLayout">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-20 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-10 h-10 border-4 border-[#1a56db] border-t-transparent rounded-full animate-spin"></div>
                                                    <p className="text-sm font-bold text-[#64748b] animate-pulse">Fetching your history...</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : paginatedDesigns.length > 0 ? (
                                        paginatedDesigns.map((design, idx) => {
                                            const statusStyle = getStatusStyles(design.status);
                                            return (
                                                <motion.tr 
                                                    key={design.submissionId}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    className="hover:bg-[#fbfcfe] transition-colors group"
                                                >
                                                    <td className="px-6 py-5">
                                                        <span className="font-mono text-[0.7rem] bg-[#f1f5f9] px-2 py-1 rounded text-[#475569] font-bold">
                                                            {design.submissionId.slice(0, 8)}...
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <p className="text-sm font-black text-[#0f172a]">{design.template?.title || "Custom Design"}</p>
                                                        <p className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-tighter mt-0.5">ID: {design.template?.id?.slice(0, 8)}</p>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <p className="text-sm font-bold text-[#475569] truncate max-w-[150px]">{design.title || "---"}</p>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <p className="text-sm font-bold text-[#475569] truncate max-w-[150px]">
                                                            {design.approvedDesign?.designCode ? design.approvedDesign.designCode : "---"}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                                                            {statusStyle.icon}
                                                            <span className="text-[10px] font-black uppercase tracking-widest">{design.status}</span>
                                                        </div>
                                                        {design.approvedDesignId && (
                                                            <div className="mt-1.5 flex items-center gap-1 text-[9px] font-bold text-green-600 bg-green-50/50 px-1.5 py-0.5 rounded border border-green-100 w-fit">
                                                                <FiCheckCircle className="w-2.5 h-2.5" />
                                                                VERIFIED: {design.approvedDesignId.slice(0, 6)}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <p className="text-sm font-bold text-[#64748b]">{formatDate(design.submittedAt)}</p>
                                                        <p className="text-[10px] text-[#94a3b8] font-medium uppercase mt-0.5">{new Date(design.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <p className="text-xs font-medium text-[#64748b] italic leading-relaxed max-w-[200px]">
                                                            "{design.feedbackMessage || "No feedback from admin yet."}"
                                                        </p>
                                                    </td>
                                                </motion.tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-24 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-20 h-20 bg-[#f8fafc] rounded-full flex items-center justify-center mb-6">
                                                        <FiInbox className="w-10 h-10 text-[#cbd5e1]" />
                                                    </div>
                                                    <h3 className="text-xl font-black text-[#0f172a] mb-2">No Submissions Found</h3>
                                                    <p className="text-[#64748b] text-sm max-w-xs mx-auto leading-relaxed">
                                                        You haven't submitted any custom designs yet. Head back to the Design Centre to get started.
                                                    </p>
                                                    <Link 
                                                        href="/templates"
                                                        className="mt-8 px-8 py-3 bg-[#1a56db] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#1d4ed8] transition-all shadow-lg shadow-blue-100 active:scale-95"
                                                    >
                                                        Go to Design Centre
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-5 bg-[#fbfcfe] border-t border-[#f1f5f9] flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8]">
                                Page {currentPage} of {totalPages}
                            </p>
                            
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                        currentPage === 1 
                                        ? "text-[#cbd5e1] cursor-not-allowed bg-transparent" 
                                        : "text-[#1a56db] border-2 border-[#1a56db] hover:bg-[#1a56db] hover:text-white"
                                    }`}
                                >
                                    Previous
                                </button>
                                
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-black transition-all ${
                                                currentPage === page
                                                ? "bg-[#1a56db] text-white shadow-lg shadow-blue-100"
                                                : "text-[#64748b] hover:bg-[#f1f5f9]"
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                        currentPage === totalPages 
                                        ? "text-[#cbd5e1] cursor-not-allowed bg-transparent" 
                                        : "text-[#1a56db] border-2 border-[#1a56db] hover:bg-[#1a56db] hover:text-white"
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
