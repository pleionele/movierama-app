import { getMovieSearchResults } from '../api/get-movie-search-results';
import { getPlayNowMovies } from '../api/get-playnow-movies';

export const apiServiceHandler = (searchValue = '', page = 1) => {
  if (searchValue && searchValue.length > 0) {
    return getMovieSearchResults(searchValue, page);
  }
  return getPlayNowMovies(page);
};
