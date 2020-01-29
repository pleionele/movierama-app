import * as React from 'react';
import { MovieItem } from '../Movie/Movie';

export const MovieList = ({ apiResults, movieGenres }: any) => {
  return apiResults.map((match: any, index: any) => {
    try {
      const namedGenres = match.genre_ids.map((id: any) => {
        const elementPos = movieGenres
          .map((x: { id: any }) => x.id)
          .indexOf(id);
        const genreFound = movieGenres[elementPos];
        return genreFound && genreFound.name;
      });
      return (
        <React.Fragment key={index}>
          <MovieItem
            title={match && match.title}
            overview={match && match.overview}
            release_date={match && match.release_date}
            vote_average={match && match.vote_average}
            genres={namedGenres}
            poster_path={match && match.poster_path}
            movieId={match && match.id}
          />
        </React.Fragment>
      );
    } catch (e) {
      // tslint:disable-next-line: no-console
      console.log(e);
    }
  });
};
