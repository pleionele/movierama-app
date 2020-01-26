import { moreDetailsService } from './moreDetailsService';
import { getMovieReviews } from '../api/get-movie-reviews';
import { getMovieSimilar } from '../api/get-movie-similar';
import { getMovieVideo } from '../api/get-movie-video';
// @ts-ignore
import * as payloadMovieReviews from '../api/stubs/payload-movie-reviews.json';
// @ts-ignore
import * as payloadSimilarMovies from '../api/stubs/payload-similar-movies.json';
// @ts-ignore
import * as payloadMovieVideo from '../api/stubs/payload-movie-video.json';

jest.mock('../api/get-movie-reviews', () => {
  return {
    getMovieReviews: jest.fn(),
  };
});
jest.mock('../api/get-movie-similar', () => {
  return {
    getMovieSimilar: jest.fn(),
  };
});

jest.mock('../api/get-movie-video', () => {
  return {
    getMovieVideo: jest.fn(),
  };
});

describe('playNowMovieService', () => {
  it('should make the correct api calls', () => {
    (getMovieVideo as jest.Mock).mockReturnValue(payloadMovieVideo);
    (getMovieSimilar as jest.Mock).mockReturnValue(payloadSimilarMovies);
    (getMovieReviews as jest.Mock).mockReturnValue(payloadMovieReviews);

    moreDetailsService(1212);
    expect(getMovieVideo).toHaveBeenCalledTimes(1);
    expect(getMovieVideo).toHaveBeenCalledWith('1212');

    expect(getMovieReviews).toHaveBeenCalledTimes(1);
    expect(getMovieReviews).toHaveBeenCalledWith('1212');

    expect(getMovieSimilar).toHaveBeenCalledTimes(1);
    expect(getMovieSimilar).toHaveBeenCalledWith('1212');
  });
});
