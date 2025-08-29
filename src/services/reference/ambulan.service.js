import axios from "axios";
import { data } from "react-router";
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

/**
 * @param {string} token
 * @param {string} id
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
const getTujuanAmbulanById = async (token, id) => {
    try {
        const response = await axios.get(`${BASE_URL}ambulance/getTujuanAmbulan/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return {
            success: true,
            data: response.data
        };
    } catch (error){
        console.error (`Error Saat Ambil Data ${id}:`, error);
        if (error.response?.status === 400){
            return {
                success: false,
                error: "Data Tidak Ditemukan",
            };
        }
        return {
            success: false,
            error: error.response?.data?.message || "Gagal Mengambil Data"
        };
    }
};

/**
 * @param {string} token
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */

const getTindakanJenazah = async (token) =>{
    try {
        const response = await axios.get(`${BASE_URL}getTindakanJenazah`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return {
            success:true,
            data: response.data,
        };
    } catch (error){
        console.error("Kesalahan Dalam Mengambil Data Ambulan", error);
        return {
            success: false,
            error: error.response?.data?.message || "Gagal Mengambil data"
        };
    }
};

/**
 * Mengambil Data tindakan Berdasarkan ID dari API
 * @param {string} token - JWT token untuk autentikasi.
 * @param {string} id - ID pasien yang ingin diambil.
 * @returns {Promise<{ success: boolean, data?: any, error?: string }>}
 */

const getTindakanJenazahById = async (token, id) => {
    try {
        const response = await axios.get(`${BASE_URL}getTindakanJenazah/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error(`Error saat mengambil data tindakan jenazah dengan ID ${id}:`, error);
        
        if (error.response?.status === 404) {
            return {
                success: false,
                error: "Data tidak ditemukan.",
            };
        }
        
        return {
            success: false,
            error: error.response?.data?.message || "Gagal mengambil data tindakan jenazah",
        };
    }
};

/**
 * @param {string} token
 * @param {object} formData
 * @returns {object}
 */
const upsertTindakanJenazah= async (token, formData) =>{
    try{
        const response = await axios.post(`${BASE_URL}createTindakanJenazah`, formData,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error){
        console.error(`Error Saat Patch Data`, error);
        return {
            success: false,
            error: error.response?.data?.message || "Gagal Simpan Data",
        };
    }
}

export const ambulanService = {
    getTujuanAmbulan, 
    getTindakanJenazah,
    getTindakanJenazahById,
    upsertTindakanJenazah,
};