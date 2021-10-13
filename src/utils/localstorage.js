export const getItem = (key) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

export const setItem = (key, value) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  return null;
};

export const removeItem = (key) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem(key);
  }
  return null;
};

export const clear = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.clear();
  }
  return null;
};
