import {useState, createContext, useContext} from 'react';
import React from 'react';
import PageLoader from '../../Common/component/Loader/PageLoader';

const AuthenticationContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const login = () => {
    setIsAuthenticated(true);
    // setIsLoaded(false);
  };
  const logout = () => {
    setIsLoading(true);

    setIsAuthenticated(false);
  };

  return (
    <>
      {!isLoading ? (
        <AuthenticationContext.Provider
          value={{isAuthenticated, login, logout}}>
          {children}
        </AuthenticationContext.Provider>
      ) : (
        <PageLoader />
      )}
    </>
  );
};

export const useAuth = () => useContext(AuthenticationContext);
