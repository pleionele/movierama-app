import { getGenresList } from './get-genres-list';
import { fetchAsJson } from '../queries/fetch-as-json';
jest.mock('../queries/fetch-as-json');

describe('getPlayNowMovies', () => {
  it('should call fetch with the correct params', () => {
    (fetchAsJson as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ test: test })
    );
    getGenresList();
    expect(fetchAsJson).toHaveBeenLastCalledWith(
      'https://api.themoviedb.org/3/genre/movie/list',
      {
        api_key: 'bc50218d91157b1ba4f142ef7baaa6a0',
      }
    );
  });
});
