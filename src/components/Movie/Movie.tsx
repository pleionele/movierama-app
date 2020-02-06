import * as React from 'react';
import './Movie.scss';
import { Config } from '../../config/default';
import MoreDetails from '../MoreDetails/MoreDetails';

interface MovieItemProps {
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genres: string[];
  poster_path: string;
  movieId: number;
}

// const MoreDetailsLazy = React.lazy(() => import('../MoreDetails/MoreDetails'));

export const MovieItem: React.FC<MovieItemProps> = props => {
  const {
    title,
    overview,
    release_date,
    vote_average,
    genres,
    poster_path,
    movieId,
  } = props;
  const genresItems = genres.map((name: string, index: number) => (
    <div key={index} className="genres__item">
      {name}
    </div>
  ));
  const [displayMoreDetails, setDisplayMoreDetails] = React.useState(false);

  React.useEffect(() => {
    setDisplayMoreDetails(false);
  }, [title]);
  const toggleDisplay = () => {
    setDisplayMoreDetails(!displayMoreDetails);
  };
  return (
    <div
      className="movie"
      onClick={toggleDisplay}
      // onMouseLeave={() => setDisplayMoreDetails(false)}
    >
      <div className="movie__title">
        <h2>{title}</h2>
      </div>
      <div className="movie__wrapper">
        <div className="container">
          <img
            className="container__image"
            src={Config.ImageUrl + poster_path}
            alt="movie poster"
            width={120}
          />
          <p className="container__text">{overview}</p>
        </div>
        <div className="section movie__overview">
          <div data-testid="releaseYear">
            Year: {new Date(release_date).getFullYear()}
          </div>
          <div data-testid="voteAverage">Votes: {vote_average} /10</div>
          <div data-testid="genres" className="genres">
            {genresItems}
          </div>
        </div>
      </div>
      {displayMoreDetails && (
        // <React.Suspense fallback={null}>
        <div
          data-testid="moreDetails"
          // onMouseLeave={() => setDisplayMoreDetails(false)}
        >
          <MoreDetails movieId={movieId} />
          {/* <MoreDetailsLazy movieId={movieId} /> */}
        </div>
        // </React.Suspense>
      )}
    </div>
  );
};
