import * as React from 'react';
import './Movie.scss';
import { Config } from '../../config/default';

export const MovieItem: React.FC<any> = props => {
  const {
    title,
    overview,
    release_date,
    vote_average,
    genres,
    poster_path,
  } = props;
  const genresItems = genres.map((name: string, index: number) => (
    <li key={index}>{name}</li>
  ));

  return (
    <div className="layout__item">
      <h2>{title}</h2>
      <img src={Config.ImageUrl + poster_path} alt="movie poster" width={120} />
      <p>{overview}</p>
      <div>Release Date: {release_date}</div>
      <div>Vote Average: {vote_average}</div>
      <ul>{genresItems}</ul>
    </div>
  );
};
