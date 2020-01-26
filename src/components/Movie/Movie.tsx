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
    <li key={index}>{name}</li>
  ));
  const [displayMoreDetails, setDisplayMoreDetails] = React.useState(false);
  return (
    // tslint:disable-next-line: jsx-no-lambda
    <div className="layout__item" onClick={() => setDisplayMoreDetails(true)}>
      <h2>{title}</h2>
      <img src={Config.ImageUrl + poster_path} alt="movie poster" width={120} />
      <p>{overview}</p>
      <div onClick={() => setDisplayMoreDetails(true)}>
        Release Date: {release_date}
      </div>
      <div>Vote Average: {vote_average}</div>
      <ul>{genresItems}</ul>
      {displayMoreDetails && (
        <React.Suspense fallback={null}>
          <MoreDetailsLazy
            movieId={movieId}
            closePopup={async () => {
              await setDisplayMoreDetails(false);
              console.log('test', displayMoreDetails);
            }}
          />
        </React.Suspense>
      )}
    </div>
  );
};
