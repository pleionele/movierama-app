import { fetchAsJson } from '../queries/fetch-as-json';
import { Config } from '../config/default';
import { replaceMovieId } from './helpers';

export const getMovieVideo = (id: string) => {
  return fetchAsJson(
    Config.MovieRamaUrl + replaceMovieId(Config.VideoUrl, id),
    {
      api_key: Config.ApiKey,
    }
  );
};
