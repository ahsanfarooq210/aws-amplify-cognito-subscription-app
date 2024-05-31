import { createContext, useContext,useState } from "react";
import React from "react";

const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
  // State to hold the user information
  const [user, setUser] = useState(null);
  const [signout, setSignout] = useState(() => () => {
    console.log("Default function");
  })

  return (
    <AppContext.Provider value={{ user, setUser, signout, setSignout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppConextProvider");
  }
  return context;
};
