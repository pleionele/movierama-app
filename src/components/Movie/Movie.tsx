import * as React from 'react';
import './Movie.scss';
import { Config } from '../../config/default';

interface MovieItemProps {
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genres: [string];
  poster_path: string;
  movieId: number;
}

// @ts-ignore
const MoreDetailsLazy = React.lazy(() => import('../MoreDetails/MoreDetails'));

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
  return (
    // tslint:disable-next-line: jsx-no-lambda
    <div className="movie w3-modal" onClick={() => setDisplayMoreDetails(true)}>
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
          <div data-testid="releaseYear">Year: {release_date}</div>
          <div data-testid="voteAverage">Votes: {vote_average} /10</div>
          <div data-testid="genres">{genresItems}</div>
        </div>
      </div>

      {displayMoreDetails && (
        <React.Suspense fallback={null}>
          <div className="w3-modal-content w3-animate-top">
            <MoreDetailsLazy
              movieId={movieId}
              closePopup={async () => {
                await setDisplayMoreDetails(false);
                // console.log('test', displayMoreDetails);
              }}
            />
          </div>
        </React.Suspense>
      )}
    </div>
  );
};
