import * as React from 'react';
import { Movie } from '../../domain/movie';

export const MovieItem: React.FC<any> = props => {
  const { title, overview } = props;
  return (
    <div>
      <h2>{title}</h2>
      <p>{overview}</p>
    </div>
  );
};

export const MovieList = ({ apiResults }: any) => {
  return apiResults.map((match: any, index: any) => (
    <React.Fragment key={index}>
      <MovieItem title={match.title} overview={match.overview} />
    </React.Fragment>
  ));
};
