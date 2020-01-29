import App from './App';
import * as React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
// @ts-ignore
import * as payloadPayNowMovie from '../../api/stubs/payload-pay-now-movie.json';
import { playNowMoviesService } from '../../services/playNowMovieService';
import { getMovieSearchResults } from '../../api/get-movie-search-results';
import { getPlayNowMovies } from '../../api/get-playnow-movies';

import { act } from 'react-dom/test-utils';
jest.mock('../../api/get-movie-search-results');
jest.mock('../../api/get-playnow-movies');

jest.mock('../../services/playNowMovieService', () => {
  return {
    playNowMoviesService: jest.fn(),
  };
});

describe('<App />', () => {
  beforeEach(() => {
    (getPlayNowMovies as jest.Mock).mockImplementation(() => {
      Promise.resolve(payloadPayNowMovie);
    });
    (getMovieSearchResults as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ test: 'test' })
    );
  });
  afterEach(() => {
    (playNowMoviesService as jest.Mock).mockClear();
    (getMovieSearchResults as jest.Mock).mockClear();
  });

  it('should display', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('appComponent')).toBeTruthy();
  });

  it('should have a search box', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('appSearchBox')).toBeTruthy();
  });

  it('should match the snapshot', () => {
    act(async () => {
      const { asFragment } = render(<App />);
      await Promise.resolve();
      expect(asFragment()).toMatchSnapshot();
    });
  });
  it('should show results from the search api when the user tries to search', async () => {
    const { getByTestId } = render(<App />);
    const searchInput = getByTestId('appSearchBox');
    await wait(() => {
      fireEvent.change(searchInput, { target: { value: 'test' } });
      expect(getMovieSearchResults).toHaveBeenCalledTimes(1);

      expect(getMovieSearchResults).toHaveBeenCalledWith('test', 1);
    });
  });

  it('should show results from the playnow api when the user removes search term', async () => {
    const { getByTestId } = render(<App />);
    const searchInput = getByTestId('appSearchBox');
    await wait(() => {
      fireEvent.change(searchInput, { target: { value: 'test' } });
      expect(getMovieSearchResults).toHaveBeenCalled();
      expect(getPlayNowMovies).toHaveBeenCalledTimes(0);
    });
    // user deletes the search term
    await wait(() => {
      fireEvent.change(searchInput, { target: { value: '' } });
      expect(getMovieSearchResults).toHaveBeenCalledTimes(1);
      expect(getPlayNowMovies).toHaveBeenCalledTimes(1);
    });
  });
});
