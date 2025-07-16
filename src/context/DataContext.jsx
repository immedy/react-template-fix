import React, { createContext, useState, useCallback } from "react";
import { patientService, patientByIdService } from "../services/patient/patient.service";

const initialState = {
  patient: null,
  selectedPatient: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  search: "",
};

const DataContext = createContext({
  ...initialState,
});

export const DataProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getPatient = useCallback(async (token, page, search) => {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true, error: null }));
      const response = await patientService(token, page, search); // This returns { data, success, error }

      if (response && response.success) {
        setState((prevState) => ({ ...prevState, patient: response.data, isLoading: false }));
      } else {
        setState((prevState) => ({ 
          ...prevState, 
          error: response?.error || "Gagal mengambil daftar pasien.", 
          isLoading: false 
        }));
      }
      // PENTING: Kembalikan objek respons agar komponen pemanggil bisa mendestrukturisasi
      return response; 
    } catch (error) {
      setState((prevState) => ({ ...prevState, error: error.message, isLoading: false }));
      console.error("Error in getPatient (list) catch block:", error);
      // PENTING: Kembalikan objek error agar komponen pemanggil bisa menanganinya
      return { success: false, error: error.message || "Terjadi kesalahan tak terduga." };
    }
  }, []); 

  const getPasienByID = useCallback(async (token, id) => {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true, error: null }));
      const response = await patientByIdService(token, id); // This returns { data, success, error }

      if (response && response.success) {
        setState((prevState) => ({ ...prevState, selectedPatient: response.data, isLoading: false }));
      } else {
        setState((prevState) => ({ 
          ...prevState, 
          error: response?.error || "Gagal mengambil data pasien.", 
          isLoading: false 
        }));
      }
      // PENTING: Kembalikan objek respons agar komponen pemanggil bisa mendestrukturisasi
      return response; 
    } catch (error) {
      setState((prevState) => ({ ...prevState, error: error.message, isLoading: false }));
      console.error("Error in getPasienByID (detail) catch block:", error);
      // PENTING: Kembalikan objek error agar komponen pemanggil bisa menanganinya
      return { success: false, error: error.message || "Terjadi kesalahan tak terduga." };
    }
  }, []); 

  return (
    <DataContext.Provider
      value={{
        ...state,
        setState,
        getPatient,
        getPasienByID, // Pastikan fungsi ini diekspos
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;