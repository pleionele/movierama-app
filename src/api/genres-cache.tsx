export const getCache = (key: string) => {
  try {
    // console.log('IN HERE');
    return JSON.parse(sessionStorage.getItem(key) as string);
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
