import {useState, createContext, useContext} from 'react';
import React from 'react';
import PageLoader from '../../Common/component/Loader/PageLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from '../Remote/utils/Helpers';

const AuthenticationContext = createContext({
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (id: string, password: string) => {},
  logout: () => {},
  token: '',
  id: '',
  errorMsg: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setError: (error: string) => {},
  checkToken: () => {},
});

export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [errorMsg, setError] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const login = (id: string, password: string) => {
    setIsLoading(true);
    try {
      fetch(baseUrl + 'login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id, password: password}),
      }).then(response => {
        if (response.status === 200) {
          response.json().then(data => {
            setId(id);
            AsyncStorage.setItem('id', id);
            AsyncStorage.setItem('token', data.token);
            setToken(data.token);
            setIsAuthenticated(true);
          });
        } else {
          if (response.status === 401) {
            setError('Invalid credentials');
            return;
          }
          if (response.status === 403) {
            setError('Forbidden');
            return;
          }
          if (response.status === 404) {
            setError('Not found');
            return;
          }
          if (response.status === 500) {
            setError('Internal server error');
            return;
          }
          setError('Error');
        }
      });
    } catch (error) {
      setIsLoading(false);
      setError('Error');
      console.error(error);
    }
    setIsLoading(false);
  };
  const logout = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('id');
    setIsAuthenticated(false);
  };

  const checkToken = () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        setToken(token);
        AsyncStorage.getItem('id').then(id => {
          if (id) {
            setId(id);
          }
        });
        setIsAuthenticated(true);
      }
    });
  };

  return (
    <>
      {!isLoading ? (
        <AuthenticationContext.Provider
          value={{
            isAuthenticated,
            login,
            logout,
            token,
            id,
            errorMsg,
            setError,
            checkToken,
          }}>
          {children}
        </AuthenticationContext.Provider>
      ) : (
        <PageLoader />
      )}
    </>
  );
};

export const useAuth = () => useContext(AuthenticationContext);
