import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedInStorage = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (isLoggedInStorage === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
    console.log(isLoggedIn);
  };

  const logoutHandler = () => {
    localStorage.setItem("isLoggedIn", "0");
    setIsLoggedIn(false);
    console.log(isLoggedIn);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
