import api from "./axios";

// Fetch wallet details
export const fetchWalletApi = async () => {
    try {
        const response = await api.get('/v1/wallet/balance');
        console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Fetch wallet transactions
export const fetchWalletTransactionsApi = async () => {
    try {
        const response = await api.get('/v1/client/wallet/transactions');
        return response.data.data.items;
    } catch (error) {
        throw error;
    }
};

// Fetch all top-up requests
export const fetchTopupRequestsApi = async () => {
    try {
        const response = await api.get('/v1/wallet/topup-requests');
        return response.data.data.items;
    } catch (error) {
        throw error;
    }
};

// Submit a new wallet top-up request
export const submitWalletTopupApi = async (formData: FormData) => {
    try {
        const response = await api.post(
            '/v1/wallet/topup-requests',
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        // console.log(response.data)
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Fetch payment (bank) details for top-up
export const fetchPaymentDetailsApi = async () => {
    try {
        const response = await api.get('/v1/wallet/payment-details');
        // console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        throw error;
    }
};