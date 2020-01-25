import { getMovieSearchResults } from '../api/get-movie-search-results';
import { getPlayNowMovies } from '../api/get-playnow-movies';

export const scrollingService = (searchValue = '', page: number) => {
  if (searchValue && searchValue.length > 0) {
    return getMovieSearchResults(searchValue, page);
  }
  return getPlayNowMovies(page);
};
