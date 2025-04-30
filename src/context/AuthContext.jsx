import { createContext, useEffect, useReducer } from "react";
import { getMeService, loginService } from "../services/auth/auth.service";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false,
};

// check token valid
const isValidToken = (accessToken) => {
  if (!accessToken) return false;
  try {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime; // valid if token not expired
  } catch (error) {
    console.log(error);
    return false;
  }
};

// save token and delete token
const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken); //set token to local storage
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken"); // remove token from local storage
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
      return { ...state, user, isAuthenticated, isInitialized: true };
    }
    case "LOGIN": {
      const { user } = action.payload;
      return { ...state, user, isAuthenticated: true };
    }
    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null };
    }
    case "REGISTER": {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }
    default: {
      return state;
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // function login
  const login = async (username, password) => {
    const { data } = await loginService(username, password); // excecute api login and get data
    const { token } = data; // get data authentication from data

    setSession(token); // set token from authentication to setSession

    const dataUser = await getMeService(token); // get data user from data
    const user = dataUser.data;

    dispatch({ type: "LOGIN", payload: { user } }); //send data user to reducer type login
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken"); // get token from local storage
        //check token valid
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await getMeService(accessToken); //get data user login
          const user = response.data;

          dispatch({
            type: "INIT",
            payload: { isAuthenticated: true, user },
          });
        } else {
          dispatch({
            type: "INIT",
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (err) {
        console.log(err);

        dispatch({
          type: "INIT",
          payload: { isAuthenticated: false, user: null },
        });
      }
    })();
  }, []);

  if (!state.isInitialized) return "Loading ...";

  return (
    <AuthContext.Provider value={{ ...state, method: "JWT", login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
