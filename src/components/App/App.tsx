import * as React from 'react';
import './App.scss';
import { getPlayNowMovies } from '../../api/get-playnow-movie';
import { playNowMoviesService } from '../../services/playNowMovieService';
import { MovieList } from '../Movie/Movie';
import { getGenresList } from '../../api/get-genres-list';
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
      loading: true,
    };
  }

  async componentDidMount() {
    const results = await playNowMoviesService();
    // tslint:disable-next-line: no-console
    // console.log('===>', results.results);
    window.addEventListener('scroll', this.handleScroll);
    // tslint:disable-next-line: no-unused-expression
    results &&
      results.results &&
      this.setState({
        movieResults: results.results,
        movieGenres: results.genres,
      });

    // tslint:disable-next-line: no-console
    console.log(results.genres);
  }
  handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    console.log('Need more results');
    return this.fetchMoreMovies();
    // call api for more results
  };

  fetchMoreMovies = async () => {
    const newpage = this.state.page + 1;
    await getPlayNowMovies(this.state.page + 1).then(results => {
      console.log('second pair of results', results);
      // tslint:disable-next-line: no-unused-expression
      results &&
        results.results &&
        this.setState({
          movieResults: results.results,
          page: newpage,
        });
    });
  };

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
        {this.state.loading ? <p className="App-intro">loading ...</p> : ''}
      </div>
    );
  }
}
