import { apiServiceHandler } from './apiServiceHandler';
import { getMovieSearchResults } from '../api/get-movie-search-results';
import { getPlayNowMovies } from '../api/get-playnow-movies';
// @ts-ignore
import * as payloadPayNowMovie from '../api/stubs/payload-pay-now-movie.json';

jest.mock('../api/get-playnow-movies', () => {
  return {
    getPlayNowMovies: jest.fn(),
  };
});
jest.mock('../api/get-movie-search-results', () => {
  return {
    getMovieSearchResults: jest.fn(),
  };
});

describe('apiServiceHandler', () => {
  beforeEach(() => {
    (getPlayNowMovies as jest.Mock).mockReturnValue(payloadPayNowMovie);
    (getMovieSearchResults as jest.Mock).mockReturnValue(payloadPayNowMovie);
  });

  afterEach(() => {
    (getPlayNowMovies as jest.Mock).mockClear();
    (getMovieSearchResults as jest.Mock).mockClear();
  });
  it('should call the /movie/now_playing api when no search value is provided', () => {
    apiServiceHandler('', 1);
    expect(getMovieSearchResults).toHaveBeenCalledTimes(0);

    expect(getPlayNowMovies).toHaveBeenCalledTimes(1);
    expect(getPlayNowMovies).toHaveBeenCalledWith(1);
  });
  it('should call the /search/movie api when search value is provided', () => {
    apiServiceHandler('test', 1);
    expect(getPlayNowMovies).toHaveBeenCalledTimes(0);

    expect(getMovieSearchResults).toHaveBeenCalledTimes(1);
    expect(getMovieSearchResults).toHaveBeenCalledWith('test', 1);
  });
});
