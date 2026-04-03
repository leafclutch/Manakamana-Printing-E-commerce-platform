"use client";

import { useWalletStore } from "@/store/useWalletStore";
import React, { useEffect, useState } from "react";
import { BiWallet } from "react-icons/bi";
import { FaMoneyBillWave, FaArrowDown, FaArrowUp, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";


export default function TransactionHistoryPage() {

    const { fetchTopupRequests, topupRequests, wallet } = useWalletStore()

    useEffect(() => {
      fetchTopupRequests()
    }, [])
    

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "APPROVED": return <FaCheckCircle className="text-green-500" />;
            case "PENDING_REVIEW": return <FaClock className="text-amber-500" />;
            case "REJECTED": return <FaTimesCircle className="text-red-500" />;
            default: return null;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "APPROVED": 
                return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200 uppercase tracking-wide">Approved</span>;
            case "PENDING_REVIEW": 
                return <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full border border-amber-200 uppercase tracking-wide">Pending</span>;
            case "REJECTED": 
                return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full border border-red-200 uppercase tracking-wide">Rejected</span>;
            default: return <span>{status}</span>;
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                        <BiWallet className="text-green-600" /> Transaction History
                    </h1>
                    <p className="text-gray-500">View your wallet deposits and payments</p>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-lg text-green-600">
                        <BiWallet className="text-2xl" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Current Balance</p>
                        <p className="text-2xl font-black text-gray-800">Rs. {wallet?.availableBalance}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
                                <th className="py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">Transaction Details</th>
                                <th className="py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                                <th className="py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {topupRequests.map((txn,idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-6 align-top">
                                        <p className="font-semibold text-gray-800 text-sm whitespace-nowrap">
                                            {new Date(txn?.submittedAt).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            {new Date(txn?.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </td>
                                    <td className="py-4 px-6 align-top">
                                        <p className="font-bold text-gray-800 text-sm mb-1">{txn.paymentMethod}</p>
                                        {/* <div className="flex flex-col gap-1 text-xs text-gray-500">
                                            <span><span className="font-semibold text-gray-600">Ref:</span> {txn.reference}</span>
                                            {txn.notes && <span className="truncate max-w-xs" title={txn.notes}><span className="font-semibold text-gray-600">Note:</span> {txn.notes}</span>}
                                        </div> */}
                                    </td>
                                    <td className="py-4 px-6 align-top">
                                        Rs. {txn.submittedAmount.toLocaleString()}
                                    </td>
                                    <td className="py-4 px-6 align-top text-center">
                                        <div className="flex flex-col flex-wrap md:flex-row items-center justify-center gap-2">
                                            {getStatusBadge(txn.status)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {topupRequests.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        <FaMoneyBillWave className="mx-auto text-4xl text-gray-300 mb-3" />
                        <p className="font-semibold">No transactions found</p>
                        <p className="text-sm mt-1">Your wallet activity will appear here.</p>
                    </div>
                )}
            </div>
            
            <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
                <p>Showing {topupRequests.length} recent transactions</p>
            </div>
        </div>
    );
}
