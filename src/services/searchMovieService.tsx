import { getMovieSearchResults } from '../api/get-movie-search-results';

// this service will receive the search
// and sanitize the data

export const searchMovieService = (searchValue: string) => {
  const searchResults: any = getMovieSearchResults(searchValue);
  // data sanitazation will happen here

  return searchResults;
};
