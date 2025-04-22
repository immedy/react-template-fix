import { createContext, useContext, useState, useEffect, Children } from "react";
import { useNavigate } from "react-router";
import { Axios } from "axios";

const AuthContext = createContext();
export const AuthProider = ({ children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

}