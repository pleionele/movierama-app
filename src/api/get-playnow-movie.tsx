import { fetchAsJson } from '../queries/fetch-as-json';
import { Config } from '../config/default';

export const getPlayNowMovies = () => {
  return fetchAsJson(Config.MovieRamaUrl + Config.MoviRamaPlayNowUrl, {
    api_key: Config.ApiKey,
  });
};
