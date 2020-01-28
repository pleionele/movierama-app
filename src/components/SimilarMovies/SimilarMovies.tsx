import * as React from 'react';
import { Config } from '../../config/default';
import './SimilarMovies.scss';

const MovieItem = (props: any) => {
  return (
    <div data-testid="similarMovieItem" className="">
      <img
        className="container__image"
        src={Config.ImageUrl + props.poster_path}
        alt="similar movie poster"
        width={120}
      />
    </div>
  );
};

export const SimilarMoviesList = (props: any) => {
  const { movies } = props;
  const children =
    movies.length === 0 ? (
      <div>No similar movies found</div>
    ) : (
      movies.map((item: any, index: number) => {
        // TODO Change this logic
        if (index < 6) {
          return <MovieItem {...item} key={item.author} />;
        }
      })
    );

  return (
    <div data-testid="similarMoviesList" className="sml-contaner">
      {children}
    </div>
  );
};
