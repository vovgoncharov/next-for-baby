import { useUser } from 'providers/UserProvider';
import { useCallback } from 'react';
import { AUTH_TOKEN_KEY, setLocalStorageKey } from 'services/storage';

export const useLogout = () => {
  const { updateUser } = useUser()

  return useCallback(() => {
    setLocalStorageKey(AUTH_TOKEN_KEY, null);
    updateUser(null);
  }, [updateUser])
}
