import React, { createContext, useEffect, useState} from "react";
import { pasienService } from "../services/patient/patient.service";
import useAuth from "../hooks/useAuth";

const initialState = {
  patient: null,
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

  // function to get data patient
  const getPatient = async (token, page, search) => {
    try {
      setState({ ...state, isLoading: true });
      const { data } = await pasienService(token, page, search); // get data from api
      setState({ ...state, patient: data, isLoading: false, error: null });
    } catch (error) {
      setState({ ...state, error: error.message });
      console.log(error);
    }
  };
  return (
    <DataContext.Provider value={{ ...state, setState, getPatient }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
