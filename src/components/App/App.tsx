import * as React from 'react';
import './App.scss';
import { getPlayNowMovies } from '../../api/get-playnow-movie';
import { playNowMoviesService } from '../../services/playNowMovieService';
import { MovieList } from '../Movie/Movie';
interface AppProps {
  name: string;
}

export default class App extends React.Component<AppProps, any> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      movieResults: [],
      movieGenres: [],
      page: 1,
    };
  }

  async componentDidMount() {
    const results = await playNowMoviesService();
    // tslint:disable-next-line: no-console
    // console.log('===>', results.results);
    // tslint:disable-next-line: no-unused-expression
    results &&
      results.results &&
      this.setState({
        movieResults: results.results,
        movieGenres: results.genres,
      });
    // tslint:disable-next-line: no-console
    // console.log(results.genres);
  }
  public render() {
    const { movieResults, movieGenres } = this.state;
    return (
      <div className="app" data-testid="appComponent">
        <span className="app__text">Hello {this.props.name}!</span>
        <div className="layout">
          {movieResults && (
            <MovieList apiResults={movieResults} movieGenres={movieGenres} />
          )}
        </div>
        <button onClick={getPlayNowMovies}>Please fetch movies</button>
      </div>
    );
  }
}
