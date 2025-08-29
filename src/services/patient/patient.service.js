import axios from "axios";
// Remove this line if 'data' from 'react-router' is not being used.
// import { data } from "react-router"; 

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

    // Assume the list of patients is directly in response.data
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error saat mengambil data pasien:", error);

    return {
      success: false,
      // Use optional chaining safely for error.response.data.message
      error: error?.response?.data?.message || "Gagal mengambil data pasien.",
    };
  }
};

/**
 * Mengambil Data Pasien Berdasarkan ID dari API
 * @param {string} token - JWT token untuk autentikasi.
 * @param {string} id - ID pasien yang ingin diambil.
 * @returns {Promise<{ success: boolean, data?: any, error?: string }>}
 */
export const patientByIdService = async (token, id) => {
  try {
    const response = await axios.get(`${BASE_URL}getdatapasien/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      success: true,
      data: response.data, // This line might need to be `response.data.data`
    };
  } catch (error) {
    console.error(`Error Saat Ambil Data Pasien dengan ID ${id}:`, error);

    // This part is good, consistently returning an error object
    if (error.response && error.response.status === 400) {
      return {
        success: false,
        error: "Pasien Tidak ditemukan. (Status 400)", // More specific error message
      };
    }
    return {
      success: false,
      error: error?.response?.data?.message || `Gagal Mengambil Data pasien dengan Id ${id}.`,
    };
  }
};