import * as React from 'react';
import './App.scss';
import { getPlayNowMovies } from '../../api/get-playnow-movies';
import { playNowMoviesService } from '../../services/playNowMovieService';
import { searchMovieService } from '../../services/searchMovieService';
import { MovieList } from '../MovieList/MovieList';
import { SearchBox } from '../Searchbox/SearchBox';
import debounce from 'lodash.debounce';
import { scrollingService } from '../../services/scrollingService';

export default class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      movieResults: [],
      movieGenres: [],
      page: 1,
      loading: false,
      searchInput: '',
      // TOTALPAGES
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

    const { movieResults, page, searchInput } = this.state;
    const newMovies = await scrollingService(searchInput, page + 1);
    const allmovies = movieResults.concat(newMovies.results);
    this.setState({ movieResults: allmovies, loading: false, page: page + 1 });
  };

  searchHandler = debounce(async (searchInput: string) => {
    this.setState({ searchInput });

    const searchResults = await searchMovieService(searchInput);
    this.setState({
      page: searchResults.page,
      movieResults: searchResults.results,
    });
  }, 500);

  public render() {
    const { movieResults, movieGenres, loading, searchInput } = this.state;
    return (
      <div className="page">
        <header className="section header-container">
          <h1 className="header">MovieRama</h1>
          <SearchBox searchHandler={this.searchHandler} />
        </header>
        <div className="movie-container" data-testid="appComponent">
          <div className="movie-grid">
            {movieResults && (
              <MovieList apiResults={movieResults} movieGenres={movieGenres} />
            )}
          </div>
          {loading && <div>Please wait for Loading</div>}
        </div>
      </div>
    );
  }
}
