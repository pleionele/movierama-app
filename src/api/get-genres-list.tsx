import { fetchAsJson } from '../queries/fetch-as-json';
import { Config } from '../config/default';

export const getGenresList = () => {
  return fetchAsJson(Config.MovieRamaUrl + Config.GenresListUrl, {
    api_key: Config.ApiKey,
  });
};
