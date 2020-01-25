import { getMovieSearchResults } from '../api/get-movie-search-results';
import { searchMovieService } from './searchMovieService';
// @ts-ignore
import * as payloadPayNowMovie from '../api/stubs/payload-pay-now-movie.json';

jest.mock('../api/get-movie-search-results', () => {
  return {
    getMovieSearchResults: jest.fn(),
  };
});

describe('searchMovieService', () => {
  beforeEach(() => {
    (getMovieSearchResults as jest.Mock).mockReturnValue(payloadPayNowMovie);
  });

  afterEach(() => {
    (getMovieSearchResults as jest.Mock).mockClear();
  });
  //   it('should call the /movie/now_playing api when no search value is provided', () => {
  //     searchMovieService(undefined);
  //     expect(getMovieSearchResults).toHaveBeenCalledTimes(1);
  //     expect(getMovieSearchResults).toHaveBeenCalledWith(1);
  //   });
  it('should call the /search/movie api when search value is provided', () => {
    searchMovieService('test');
    expect(getMovieSearchResults).toHaveBeenCalledTimes(1);
    expect(getMovieSearchResults).toHaveBeenCalledWith('test');
  });
});
