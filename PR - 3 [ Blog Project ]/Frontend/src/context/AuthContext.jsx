import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const storedAuth = localStorage.getItem("auth");
      return storedAuth ? JSON.parse(storedAuth) : { token: null, user: null };
    } catch (error) {
      console.error("Failed to parse auth from localStorage:", error);
      return { token: null, user: null };
    }
  });

  useEffect(() => {
    if (auth?.token && auth?.user) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};


const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
