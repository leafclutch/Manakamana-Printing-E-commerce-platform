import { fetchAllProducts, fetchProductVariants, fetchProductVariantOptions } from '@/api/products';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Product = {
  id: string;
  product_code: string;
  name: string;
  description: string;
  production_days: number;
  categoryId: string;
  images: string[];
  fields: any[];
  // add other fields as necessary
};

type Variant = {
  id: string;
  name: string;
  productId: string;
  // add other fields as necessary
};

type Option = {
  id: string;
  name: string;
  variantId: string;
  // add other fields as necessary
};

type ProductStore = {
  products: Product[];
  productVariants: Record<string, Variant[]>;
  variantOptions: Record<string, Option[]>;
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchVariants: (productId: string) => Promise<void>;
  fetchOptions: (variantId: string) => Promise<void>;
};

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      productVariants: {},
      variantOptions: {},
      loading: false,
      error: null,

      fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
          const data = await fetchAllProducts();
          set({
            products: Array.isArray(data) ? data : [],
            loading: false,
          });
        } catch (error: any) {
          set({ error: error?.message || "Unknown error", loading: false });
        }
      },

      fetchVariants: async (productId: string) => {
        set({ loading: true, error: null });
        try {
          const data = await fetchProductVariants(productId);
          set(state => ({
            productVariants: {
              ...state.productVariants,
              [productId]: Array.isArray(data) ? data : [],
            },
            loading: false,
          }));
        } catch (error: any) {
          set({ error: error?.message || "Unknown error", loading: false });
        }
      },

      fetchOptions: async (variantId: string) => {
        set({ loading: true, error: null });
        try {
          const data = await fetchProductVariantOptions(variantId);
          set(state => ({
            variantOptions: {
              ...state.variantOptions,
              [variantId]: Array.isArray(data) ? data : [],
            },
            loading: false,
          }));
        } catch (error: any) {
          set({ error: error?.message || "Unknown error", loading: false });
        }
      },
    }),
    {
      name: 'product-store', // unique name for localStorage
      partialize: (state) => ({
        products: state.products,
        productVariants: state.productVariants,
        variantOptions: state.variantOptions,
      }), // only persist entities, not loading/error
    }
  )
);