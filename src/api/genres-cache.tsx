export const getCache = (key: string) => {
  try {
    const returnedValue = sessionStorage.getItem(key);

    return returnedValue && JSON.parse(returnedValue);
  } catch (e) {
    console.warn('Error from cache', { error: e });
  }
};

export const setCache = (key: string, value: any) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Error from cache', { error: e });
  }
};
