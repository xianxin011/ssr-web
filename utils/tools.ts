// 向localstorage设置值
export const setLocalStorageValue = (key: string, value: any) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

// 取localstorage值
export const getLocalStorageValue = (key: string) => {
  return localStorage.getItem(key);
};
