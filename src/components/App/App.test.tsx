import App from './App';
import * as React from 'react';
import { render } from '@testing-library/react';
// @ts-ignore
import * as payloadPayNowMovie from '../../api/stubs/payload-pay-now-movie.json';
import { playNowMoviesService } from '../../services/playNowMovieService';

jest.mock('../../services/playNowMovieService', () => {
  return {
    playNowMoviesService: jest.fn(),
  };
});

describe('<App />', () => {
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
});
