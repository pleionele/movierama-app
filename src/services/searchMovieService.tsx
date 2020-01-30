import { getMovieSearchResults } from '../api/get-movie-search-results';

// this service will receive the search results
// and sanitize the data

export const searchMovieService = (searchValue: string) => {
  // TODO add code for defensive approach if the search value is not provided

  const searchResults: any = getMovieSearchResults(searchValue);
  // data sanitazation will happen here

  return searchResults;
};
