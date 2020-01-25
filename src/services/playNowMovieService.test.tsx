import { playNowMoviesService } from './playNowMovieService';
import { getGenresList } from '../api/get-genres-list';
import { getPlayNowMovies } from '../api/get-playnow-movies';
// @ts-ignore
import * as payloadPayNowMovie from '../api/stubs/payload-pay-now-movie.json';

jest.mock('../api/get-playnow-movies', () => {
  return {
    getPlayNowMovies: jest.fn(),
  };
});
jest.mock('../api/get-genres-list', () => {
  return {
    getGenresList: jest.fn(),
  };
});

describe('playNowMovieService', () => {
  it('should make the correct api calls', () => {
    (getPlayNowMovies as jest.Mock).mockReturnValue(payloadPayNowMovie);

    playNowMoviesService();
    expect(getGenresList).toHaveBeenCalledTimes(1);
    expect(getGenresList).toHaveBeenCalledWith();
    expect(getPlayNowMovies).toHaveBeenCalledTimes(1);
    expect(getPlayNowMovies).toHaveBeenCalledWith();
  });
});
