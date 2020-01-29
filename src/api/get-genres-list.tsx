import { fetchAsJson } from '../queries/fetch-as-json';
import { Config } from '../config/default';
import { getCache, setCache } from './genres-cache';

export const getGenresList = () => {
  const url = Config.MovieRamaUrl + Config.GenresListUrl;
  const cached = getCache(url);
  if (cached) {
    return Promise.resolve(cached);
  }

  return fetchAsJson(url, {
    api_key: Config.ApiKey,
  }).then(response => {
    setCache(url, response);
    return response;
  });
};
