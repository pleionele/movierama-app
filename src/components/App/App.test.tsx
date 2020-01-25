import App from './App';
import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
// @ts-ignore
import * as payloadPayNowMovie from '../../api/stubs/payload-pay-now-movie.json';
import { playNowMoviesService } from '../../services/playNowMovieService';
import { searchMovieService } from '../../services/searchMovieService';
import debounce from 'lodash.debounce';

jest.mock('../../services/playNowMovieService', () => {
  return {
    playNowMoviesService: jest.fn(),
  };
});

jest.mock('../../services/searchMovieService', () => {
  return {
    searchMovieService: jest.fn(),
  };
});

describe('<App />', () => {
  beforeEach(() => {
    (debounce as jest.Mock) = jest.fn(searchTerm => {
      searchMovieService(searchTerm);
    });
    (playNowMoviesService as jest.Mock).mockReturnValue(payloadPayNowMovie);
  });

  afterEach(() => {
    (debounce as jest.Mock).mockClear();
  });

  it('should display', () => {
    // @ts-ignore
    playNowMoviesService.mockReturnValue(payloadPayNowMovie);
    const { getByTestId } = render(<App name="world" />);
    expect(getByTestId('appComponent')).toBeTruthy();
  });

  it('should have a search box', () => {
    // @ts-ignore
    playNowMoviesService.mockReturnValue(payloadPayNowMovie);
    const { getByTestId } = render(<App name="world" />);
    expect(getByTestId('appSearchBox')).toBeTruthy();
  });

  // it('should show results from the search api when the user tries to search', () => {
  //   const { getByTestId } = render(<App name="world" />);
  //   // expect(searchMovieService).toHaveBeenCalledTimes(0);

  //   const searchInput = getByTestId('appSearchBox');
  //   fireEvent.change(searchInput, { target: { value: 'test' } });
  //   expect(debounce).toHaveBeenCalled();
  // });
});
