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
  return fetch(`${endpoint}` + `${queryString}`, { ...options, headers })
    .then(verifyStatusCode)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};
