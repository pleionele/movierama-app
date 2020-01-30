export interface Movie {
  id: number;
  overview: string;
  vote_average: number;
  genre_ids: [number];
  title: string;
  release_date: string;
}

export interface MovieResults {
  results: [Movie];
  page: number;
}

export interface MoreDetails {
  reviews: [];
  similarMovies: [];
  video: string;
}
