import axios from 'axios';
import * as React from 'react';

export const AuthContext = React.createContext();

function AuthProvider(props) {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function getUser() {
      try {
        const { data } = await axios.get('/api/auth/current');
        setUser(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }

    getUser();
  }, []);

  const login = React.useCallback(async ({ email, password }) => {
    try {
      const { data } = await axios.post('/api/auth/login', {
        email,
        password,
      });
      setUser(data);
      setError(false);
    } catch (error) {
      setError(true);
    }
  }, []);

  const logout = React.useCallback(async () => {
    await axios.get('/api/auth/logout');
    setUser(null);
  }, []);

  if (isLoading) {
    return null;
  }
  return (
    <AuthContext.Provider value={{ user, login, logout, error }} {...props} />
  );
}
function useAuth() {
  const state = React.useContext(AuthContext);

  const isAuthenticated = !!state.user;
  return {
    ...state,
    isAuthenticated,
  };
}

export { AuthProvider, useAuth };
