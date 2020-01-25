import { fetchAsJson } from '../queries/fetch-as-json';
import { Config } from '../config/default';

export const getMovieSearchResults = (searchQuery: string, pagenumber = 1) => {
  return fetchAsJson(Config.MovieRamaUrl + Config.SearchUrl, {
    api_key: Config.ApiKey,
    page: pagenumber,
    query: searchQuery,
  });
};
