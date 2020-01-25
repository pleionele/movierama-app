import { getMovieReviews } from '../api/get-movie-reviews';
import { getMovieSimilar } from '../api/get-movie-similar';
import { getMovieVideo } from '../api/get-movie-video';

export const movieDetailsService = (id: string) => {
  const reviews: any = getMovieReviews(id);
  const similarMovies: any = getMovieSimilar(id);
  const video: any = getMovieVideo(id);

  return Promise.all([reviews, similarMovies, video]).then(results => {
    return Object.assign(results[0], results[1], results[2]);
  });
};
