export const getCache = (key: string) => {
  try {
    const returnedValue = sessionStorage.getItem(key);

    return returnedValue && JSON.parse(returnedValue);
  } catch (e) {
    // tslint:disable-next-line: no-console
    console.warn('Error from cache', { error: e });
  }
};

export const setCache = (key: string, value: any) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // tslint:disable-next-line: no-console
    console.warn('Error from cache', { error: e });
  }
};
