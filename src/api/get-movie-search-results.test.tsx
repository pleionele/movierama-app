import { getMovieSearchResults } from './get-movie-search-results';
import { fetchAsJson } from '../queries/fetch-as-json';
jest.mock('../queries/fetch-as-json');

describe('getMovieSearchResults', () => {
  it('should call fetch with the correct params', () => {
    getMovieSearchResults('Test');
    expect(fetchAsJson).toHaveBeenLastCalledWith(
      'https://api.themoviedb.org/3/search/movie',
      {
        api_key: 'bc50218d91157b1ba4f142ef7baaa6a0',
        page: 1,
        query: 'Test',
      }
    );
  });

  it('should call fetch with the correct page', () => {
    getMovieSearchResults('Test', 3);
    expect(fetchAsJson).toHaveBeenLastCalledWith(
      'https://api.themoviedb.org/3/search/movie',
      {
        api_key: 'bc50218d91157b1ba4f142ef7baaa6a0',
        page: 3,
        query: 'Test',
      }
    );
  });
});
