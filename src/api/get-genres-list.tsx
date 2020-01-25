import { fetchAsJson } from '../queries/fetch-as-json';
import { Config } from '../config/default';
import { getCache, setCache } from './genres-cache';

export const getGenresList = () => {
  console.log('aaaaa');
  const url = Config.MovieRamaUrl + Config.GenresListUrl;
  // const cached = getCache(url);

  // if (cached) {
  //   // console.log('IN HERE');
  //   return Promise.resolve(cached);
  // }

  return fetchAsJson(url, {
    api_key: Config.ApiKey,
  });
    // .then(response => setCache(url, response));
};
