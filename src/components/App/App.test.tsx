import App from './App';
import * as React from 'react';
import { render } from '@testing-library/react';
jest.mock('../../queries/fetch-as-json');

describe('<App />', () => {
  it('should display', () => {
    const { getByTestId } = render(<App name="world" />);
    expect(getByTestId('appComponent')).toBeTruthy();
  });
});
