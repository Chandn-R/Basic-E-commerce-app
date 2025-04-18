import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

export const useProductStore = create((set, get) => ({

    // products state
    products: [],
    loading: false,
    error: null,

    // form state
    formData: {
        name: "",
        price: "",
        image: ""
    },

    setFormData: (formData) => set({ formData }),
    resetFormData: () => set({ formData: { name: "", price: "", image: "" } }),

    addProduct: async (formData) => {
        set({ loading: true });
        try {
            const response = await axios.post(`${BASE_URL}/api/products`, formData);
            set((state) => ({
                products: [...state.products, response.data.data],
                loading: false,
            }));
            toast.success("Product added successfully");
        } catch (error) {
            set({ error: error.message, loading: false });
            toast.error("Error adding product")
        }
    },

    fetchProducts: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/api/products`);
            set({ products: response.data.data, loading: false });
        } catch (error) {
            if (error.status == 429) {
                set({ error: "Too many requests, please try again later", products: [], loading: false });
            }
            else {
                set({ error: error.message, loading: false });
            }

        }
    },

    deleteProduct: async (id) => {
        set({ loading: true });
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            set((state) => ({
                products: state.products.filter((product) => product.id !== id),
                loading: false,
            }));
            toast.success("Product deleted successfully");
        } catch (error) {
            set({ error: error.message, loading: false });
            toast.error("Error deleting product")
        }
    },

    fetchProduct: async (id) => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/api/products/${id}`);
            set({ product: response.data.data, formData: response.data.data, loading: false });
        } catch (error) {
            if (error.status == 429) {
                set({ error: "Too many requests, please try again later", products: [], loading: false });
            }
            else {
                set({ error: error.message, loading: false });
            }

        }
    },

    updateProduct: async (id, formData) => {
        set({ loading: true });
        try {
            const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
            set((state) => ({
                products: state.products.map((product) => product.id === id ? response.data.data : product),
                loading: false,
            }));
            toast.success("Product updated successfully");
        } catch (error) {
            set({ error: error.message, loading: false });
            toast.error("Error updating product");

        }
    }
}));