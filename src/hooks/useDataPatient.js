import React, { useContext } from "react";
import DataContext from "../context/DataContext";

export const useDataPatient = () => {
  const context = useContext(DataContext);
  if (!context)
    throw new Error("useDataData must be used within an DataProvider");
  return context;
};
