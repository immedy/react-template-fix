import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * @param {string} token
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
const getTujuanAmbulan = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}getTujuanAmbulan`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error("Kesalahan dalam mengambil data Ambulan", error);
        return {
            success: false,
            error: error.response?.data?.message || "Gagal mengambil data",
        };
    }
};

// Ekspor objek ambulanService yang berisi fungsi getTujuanAmbulan
export const ambulanService = {
    getTujuanAmbulan,
};