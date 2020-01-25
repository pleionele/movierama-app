import { movieDetailsService } from './movieDetailsService';
import { getMovieReviews } from '../api/get-movie-reviews';
import { getMovieSimilar } from '../api/get-movie-similar';
import { getMovieVideo } from '../api/get-movie-video';
// @ts-ignore
import * as payloadPayNowMovie from '../api/stubs/payload-pay-now-movie.json';

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
    (getMovieVideo as jest.Mock).mockReturnValue(payloadPayNowMovie);
    (getMovieSimilar as jest.Mock).mockReturnValue(payloadPayNowMovie);
    (getMovieReviews as jest.Mock).mockReturnValue(payloadPayNowMovie);

    movieDetailsService('1212');
    expect(getMovieVideo).toHaveBeenCalledTimes(1);
    expect(getMovieReviews).toHaveBeenCalledTimes(1);
    expect(getMovieSimilar).toHaveBeenCalledTimes(1);
  });
});
