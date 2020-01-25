import * as React from 'react';
import { MovieItem } from '../Movie/Movie';

export const MovieList = ({ apiResults, movieGenres }: any) => {
  return apiResults.map((match: any, index: any) => {
    try {
      console.log('aaaaaaa');
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
            poster_path={match.poster_path}
          />
        </React.Fragment>
      );
    } catch (e) {
      // tslint:disable-next-line: no-console
      console.log(e);
    }
  });
};
