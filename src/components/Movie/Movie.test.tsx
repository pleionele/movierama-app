import * as React from 'react';
import { render } from '@testing-library/react';
import { mockMovie } from '../__helpers__/mockData';
import { MovieItem } from './Movie';

describe('MovieItem', () => {
  it('should render all the details', () => {
    const { getByTestId, getByAltText } = render(<MovieItem {...mockMovie} />);
    expect(getByAltText('movie poster')).toBeTruthy();
    expect(getByTestId('releaseYear')).toBeTruthy();
    expect(getByTestId('voteAverage')).toBeTruthy();
    expect(getByTestId('genres')).toBeTruthy();
  });

  //   it('should display the more details section onClick', () => {
  //     const { getByAltText, getByTestId } = render(<MovieItem {...mockMovie} />);
  //     const poster = getByAltText('movie poster');
  //     fireEvent.click(poster);
  //     expect(getByTestId('genres')).toBeTruthy();
  //   });
});
