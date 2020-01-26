import { getMovieReviews } from '../api/get-movie-reviews';
import { getMovieSimilar } from '../api/get-movie-similar';
import { getMovieVideo } from '../api/get-movie-video';

export const moreDetailsService = (id: number) => {
  const idToString = id.toString();
  const reviews: any = getMovieReviews(idToString);
  const similarMovies: any = getMovieSimilar(idToString);
  const video: any = getMovieVideo(idToString);

  return Promise.all([reviews, similarMovies, video]).then(results => {
    return Object.assign(results[0], results[1], results[2]);
  });
};
