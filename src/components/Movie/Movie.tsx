import * as React from 'react';
import { Movie } from '../../domain/movie';
import './Movie.scss';

export const MovieItem: React.FC<any> = props => {
  const { title, overview, release_date, vote_average, genres } = props;
  const genresItems = genres.map((name: string, index: number) => (
    <li key={index}>{name}</li>
  ));

  return (
    <div className="layout__item">
      <h2>{title}</h2>
      <p>{overview}</p>
      <div>Release Date: {release_date}</div>
      <div>Vote Average: {vote_average}</div>
      <ul>{genresItems}</ul>
    </div>
  );
};

export const MovieList = ({ apiResults, movieGenres }: any) => {
  console.log('aaaaaa');
  return apiResults.map((match: any, index: any) => {
    try {
      const namedGenres = match.genre_ids.map((id: any) => {
        const elementPos = movieGenres
          .map((x: { id: any }) => x.id)
          .indexOf(id);
        const genreFound = movieGenres[elementPos];
        return genreFound.name;
      });

      return (
        <React.Fragment key={index}>
          <MovieItem
            title={match.title}
            overview={match.overview}
            release_date={match.release_date}
            vote_average={match.vote_average}
            genres={namedGenres}
          />
        </React.Fragment>
      );
    } catch (e) {
      // tslint:disable-next-line: no-console
      console.log(e);
    }
  });
};
