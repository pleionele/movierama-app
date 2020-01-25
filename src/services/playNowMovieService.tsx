import { getGenresList } from '../api/get-genres-list';
import { getPlayNowMovies } from '../api/get-playnow-movies';

export const playNowMoviesService = () => {
  const playNowMovies: any = getPlayNowMovies();
  const genresList: any = getGenresList();

  return Promise.all([playNowMovies, genresList]).then(results => {
    return Object.assign(results[0], results[1]);
  });
};
