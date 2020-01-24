import * as React from 'react';
import { Movie } from '../../domain/movie';
import './Movie.scss';

export const MovieItem: React.FC<any> = props => {
  const { title, overview, release_date, vote_average } = props;
  return (
    <div className="layout__item">
      <h2>{title}</h2>
      <p>{overview}</p>
      <div>Release Date: {release_date}</div>
      <div>Vote Average: {vote_average}</div>
    </div>
  );
};
// ● Poster
// ● Year of release
// ● Genre(s)
export const MovieList = ({ apiResults }: any) => {
  return apiResults.map((match: any, index: any) => (
    <React.Fragment key={index}>
      <MovieItem
        title={match.title}
        overview={match.overview}
        release_date={match.release_date}
        vote_average={match.vote_average}
      />
    </React.Fragment>
  ));
};
