// services/patient/patient.service.js
import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_URL;

/**
 * @param {string} token
 * @param {number} page
 * @param {string} search
 * @returns {Promise<{ success : boolean, data?: any, error?: string}>}
 */
export const pasienService = async (token, page = 1, search = "") => {
    try {
        const response = await axios.get(`${BASE_URL}listpasien`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                page,
                search,
            },
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error("Error Saat Ambil Data Pasien", error);
        return {
            success: false,
            error: error?.response?.data?.message || "Gagal Ambil Data Pasien",
        };
    }
};
