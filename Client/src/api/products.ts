import api from "./axios";

// Fetch all products
export const fetchAllProducts = async () => {
    try {
        const response = await api.get('/v1/products');
        // Assuming products are in response.data.data
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Fetch product variants for a given productId
export const fetchProductVariants = async (productId: string) => {
    try {
        const response = await api.get(`/v1/products/${productId}/variants`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Fetch options for a given product variant
export const fetchProductVariantOptions = async (variantId: string) => {
    try {
        const response = await api.get(`/v1/product-variants/${variantId}/options`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};