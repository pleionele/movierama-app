const convertObjectToQueryString = (obj: any) => {
  const urlParams = Object.keys(obj)
    .map(key => key + '=' + encodeURIComponent(obj[key]))
    .join('&');
  return urlParams ? `?${urlParams}` : '';
};

export const fetchAsJson = (
  endpoint: string,
  queryParams = {},
  headers = {},
  options = { method: 'GET' }
) => {
  const queryString = convertObjectToQueryString(queryParams);
  return fetch(`${endpoint}${queryString}`, { ...options, headers })
    .then(response => response.json())
    .then(data => {
      console.log('Success', data);
    });
};
