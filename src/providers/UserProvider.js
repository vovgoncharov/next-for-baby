import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const UserContext = createContext({ user: null, updateUser: null });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = useCallback(data => {
    setUser(data)
  }, []);

  const value = useMemo(() => ({
    user,
    updateUser,
  }), [user, updateUser])


  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext);
