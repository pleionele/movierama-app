import { SimilarMoviesList } from './SimilarMovies';
import * as React from 'react';
import { render, queryAllByAttribute } from '@testing-library/react';
// @ts-ignore
import * as payloadMoreDetails from '../../api/stubs/payload-more-details.json';
const mockData = [
  {
    path: 'https://',
  },
  {
    path: 'https://',
  },
  {
    path: 'https://',
  },
  {
    path: 'https://',
  },
  {
    path: 'https://',
  },
  {
    path: 'https://',
  },
  {
    path: 'https://',
  },
];
describe('<SimilarMoviesList />', () => {
  it('should render the component', () => {
    const { getByTestId } = render(
      <SimilarMoviesList movies={payloadMoreDetails.similarMovies} />
    );
    expect(getByTestId('similarMovies')).toBeTruthy();
    expect(getByTestId('similarMovieItem')).toBeTruthy();
  });
  it('should display up to 6 movies', () => {
    const component = render(<SimilarMoviesList movies={mockData} />);
    const similarmovies = queryAllByAttribute(
      'class',
      component.container,
      'container__image'
    );
    expect(similarmovies.length).toBe(6);
  });

  it('should show a message if movie array is empty', () => {
    const { queryByTestId } = render(<SimilarMoviesList movies={[]} />);
    expect(queryByTestId('noSimilar')).toBeTruthy();
    expect(queryByTestId('similarMovieItem')).toBeNull();
  });
});
