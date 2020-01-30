import { getMovieReviews } from '../api/get-movie-reviews';
import { getMovieSimilar } from '../api/get-movie-similar';
import { getMovieVideo } from '../api/get-movie-video';
import { MoreDetails } from '../domain/movie';

export const moreDetailsService = (id: number): Promise<MoreDetails> => {
  const idToString = id.toString();
  const reviews: any = getMovieReviews(idToString);
  const similarMovies: any = getMovieSimilar(idToString);
  const video: any = getMovieVideo(idToString);

  return Promise.all([reviews, similarMovies, video]).then(results => {
    return Object.defineProperties(
      {},
      {
        reviews: { value: reviewsAdapter(results[0]) },
        similarMovies: { value: similarMoviesAdapter(results[1]) },
        video: { value: trailerAdapter(results[2]) },
      }
    );
  });
};

const similarMoviesAdapter = (movies: any) => {
  try {
    if (movies.results.length > 0) {
      // We show up up to 6
      return movies.results.slice(0, 6);
    }
    return [];
  } catch (e) {
    return [];
  }
};

const trailerAdapter = (movies: any) => {
  try {
    if (movies.results.length > 0) {
      const trailers = movies.results.map((item: any, i: number) => {
        if (item.type === 'Trailer') {
          return item.key;
        }
      });
      return trailers.length > 0 ? trailers[0] : undefined;
    }
  } catch (e) {
    return undefined;
  }
};
const reviewsAdapter = (reviews: any) => {
  try {
    if (reviews.results.length > 0) {
      // We show up 2 reviews
      return reviews.results.slice(0, 2);
    }
    return [];
  } catch (e) {
    return [];
  }
};
