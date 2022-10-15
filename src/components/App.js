import { API_HOST } from 'constants/api';
import { useLogout } from 'hooks/useLogout';
import { useRouter } from 'next/router';
import { useUser } from 'providers/UserProvider';
import { useEffect } from 'react';
import { axios } from 'services/axios';
import { AUTH_TOKEN_KEY, getLocalStorageKey } from 'services/storage';

export const App = ({ children }) => {
  const { user, updateUser } = useUser();
  const { push } = useRouter();
  const logout = useLogout();

  useEffect(() => {
    if (!user) {
      axios.get(`${API_HOST}/me`, {
        headers: {
          Authorization: `Bearer ${getLocalStorageKey(AUTH_TOKEN_KEY)}`,
        }
      })
        .then(({ data }) => {
          // USER object from backend
          updateUser(data);
        })
        .catch((error) => {
          console.warn('User not logged in')
        })
    }
  }, [user, updateUser])

  return (
    <div>
      {user && (
        <div>
          <p>User: <span style={{ color: 'blue', fontWeight: 'bold'}}>{user.name}</span></p>
          <button type="button" onClick={logout}>Logout</button>
        </div>
      )}
      {!user && (
        <button type="button" onClick={() => push('/login')}>Sign in</button>
      )}
      {children}
    </div>
  );
}
