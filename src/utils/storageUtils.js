const currentStorage = window.localStorage;

const getItem = (key) => {
  try {
    const value = currentStorage.getItem(key);
    return JSON.parse(value);
  } catch (err) {
    return undefined;
  }
};

const setItem = (key, value) => {
  currentStorage.setItem(key, JSON.stringify(value));
};

const removeItem = (key) => {
  currentStorage.removeItem(key);
};

export const storage = { getItem, setItem, removeItem };
