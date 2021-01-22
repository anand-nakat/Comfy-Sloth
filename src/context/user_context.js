import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const {
    isAuthenticated,
    logout,
    loginWithRedirect,
    user,
    isLoading,
  } = useAuth0();

  const [myUser, setMyUser] = useState(null);
  useEffect(() => {
    if (isAuthenticated) {
      setMyUser(user);
    } else {
      setMyUser(false);
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{ myUser, isAuthenticated, loginWithRedirect, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
