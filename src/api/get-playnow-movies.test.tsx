import { getPlayNowMovies } from './get-playnow-movies';
import { fetchAsJson } from '../queries/fetch-as-json';
jest.mock('../queries/fetch-as-json');

describe('getPlayNowMovies', () => {
  it('should call fetch with the correct params', () => {
    getPlayNowMovies();
    expect(fetchAsJson).toHaveBeenLastCalledWith(
      'https://api.themoviedb.org/3/movie/now_playing',
      {
        api_key: 'bc50218d91157b1ba4f142ef7baaa6a0',
        page: 1,
      }
    );
  });

  it('should call fetch with the correct page', () => {
    getPlayNowMovies(3);
    expect(fetchAsJson).toHaveBeenLastCalledWith(
      'https://api.themoviedb.org/3/movie/now_playing',
      {
        api_key: 'bc50218d91157b1ba4f142ef7baaa6a0',
        page: 3,
      }
    );
  });
});
