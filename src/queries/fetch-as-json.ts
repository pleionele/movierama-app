const convertObjectToQueryString = (obj: any) => {
  const urlParams = Object.keys(obj)
    .map(key => key + '=' + encodeURIComponent(obj[key]))
    .join('&');
  return urlParams ? `?${urlParams}` : '';
};

const verifyStatusCode = (response: any) => {
  if (response.ok) return response;
  throw new Error(
    `Error with code: ${response.status} and statusText: ${response.statusText}`
  );
};

export const fetchAsJson = (
  endpoint: string,
  queryParams = {},
  headers = {},
  options = { method: 'GET' }
) => {
  const queryString = convertObjectToQueryString(queryParams);
  return (
    fetch(`${endpoint}${queryString}`, { ...options, headers })
      // return fetch(
      //   `https://api.themoviedb.org/3/movie/now_playing?api_key=bc50218d91157b1ba4f142ef7baaa6a0`,
      //   { ...options, headers }
      // )
      .then(verifyStatusCode)
      .then(response => response.json())
      .then(data => {
        return data;
      })
  );
};
