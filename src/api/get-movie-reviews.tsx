import { fetchAsJson } from '../queries/fetch-as-json';
import { Config } from '../config/default';
import { replaceMovieId } from './helpers';

export const getMovieReviews = (id: string) => {
  return fetchAsJson(
    Config.MovieRamaUrl + replaceMovieId(Config.ReviewsUrl, id),
    {
      api_key: Config.ApiKey,
    }
  );
};
