import { fetchAsJson } from '../queries/fetch-as-json';
import { Config } from '../config/default';
import { replaceMovieId } from './helpers';

export const getMovieSimilar = (id: string) => {
  return fetchAsJson(
    Config.MovieRamaUrl + replaceMovieId(Config.SimilarUrl, id),
    {
      api_key: Config.ApiKey,
    }
  );
};
