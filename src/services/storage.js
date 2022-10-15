export const AUTH_TOKEN_KEY = '__auth-token'

export const setLocalStorageKey = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(error, 'There is no API to use LocalStorage');
  }
}

export const getLocalStorageKey = (key) => {
  let value;

  try {
    value = JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    console.warn(error, 'There is no API to use LocalStorage');
  }

  return value;
}
