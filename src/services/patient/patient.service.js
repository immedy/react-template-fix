import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Mengambil daftar pasien dari API.
 * @param {string} token - JWT token untuk autentikasi.
 * @param {number} page - Halaman yang ingin diambil.
 * @param {string} search - Kata kunci pencarian pasien.
 * @returns {Promise<{ success: boolean, data?: any, error?: string }>}
 */
export const patientService = async (token, page = 1, search = "") => {
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
    console.error("Error saat mengambil data pasien:", error);

    return {
      success: false,
      error: error?.response?.data?.message || "Gagal mengambil data pasien.",
    };
  }
};
