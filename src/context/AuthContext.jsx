import { createContext, useEffect, useReducer, useMemo } from "react";
import { getMeService, loginService } from "../services/auth/auth.service";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false,
};

// Cek token valid (belum expired)
const isValidToken = (accessToken) => {
  if (!accessToken) return false;
  try {
    const decoded = jwtDecode(accessToken);
    return decoded.exp > Date.now() / 1000;
  } catch (err) {
    console.error("Token decode error:", err);
    return false;
  }
};

// Set atau hapus token dari localStorage & axios default
const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        isInitialized: true,
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  token: null,
  login: () => Promise.resolve(),
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Function untuk login
  const login = async (username, password) => {
    const { data } = await loginService(username, password);
    const { token } = data;

    setSession(token);

    const userRes = await getMeService(token);
    const user = userRes.data;

    dispatch({ type: "LOGIN", payload: { user } });
  };

  // Function untuk logout
  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  // Init saat pertama kali load
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const userRes = await getMeService(accessToken);
          const user = userRes.data;

          dispatch({ type: "INIT", payload: { isAuthenticated: true, user } });
        } else {
          dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
        }
      } catch (err) {
        console.error("Initialization error:", err);
        dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
      }
    };
    initialize();
  }, []);

  const contextValue = useMemo(
    () => ({
      ...state,
      method: "JWT",
      login,
      logout,
      token: localStorage.getItem("accessToken"), // ✅ token diinject ke context
    }),
    [state]
  );

  if (!state.isInitialized) return "Loading...";

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
