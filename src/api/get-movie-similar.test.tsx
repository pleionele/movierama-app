import { getMovieSimilar } from './get-movie-similar';
import { fetchAsJson } from '../queries/fetch-as-json';
jest.mock('../queries/fetch-as-json');

describe('getMovieVideo', () => {
  it('should call fetch with the correct url', () => {
    getMovieSimilar('232132');
    expect(fetchAsJson).toHaveBeenLastCalledWith(
      'https://api.themoviedb.org/3/movie/232132/similar',
      {
        api_key: 'bc50218d91157b1ba4f142ef7baaa6a0',
      }
    );
  });
});
