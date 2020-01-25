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
      loading: false,
    };
  }

  async componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    const results = await playNowMoviesService();
    // tslint:disable-next-line: no-unused-expression
    results &&
      results.results &&
      this.setState({
        movieResults: results.results,
        movieGenres: results.genres,
      });
  }

  handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      return this.fetchMoreMovies();
    }
  };

  fetchMoreMovies = async () => {
    this.setState({ loading: true });

    const { movieResults, page } = this.state;
    const newMovies = await getPlayNowMovies(page + 1);
    const allmovies = movieResults.concat(newMovies.results);
    this.setState({ movieResults: allmovies, loading: false, page: page + 1 });
  };

  public render() {
    const { movieResults, movieGenres, loading } = this.state;
    return (
      <div className="app" data-testid="appComponent">
        <span className="app__text">Hello {this.props.name}!</span>
        <div className="layout">
          {movieResults && (
            <MovieList apiResults={movieResults} movieGenres={movieGenres} />
          )}
        </div>
        {loading && <div>Please wait for Loading</div>}
      </div>
    );
  }
}
