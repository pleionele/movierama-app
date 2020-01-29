import * as React from 'react';
import MoreDetails from './MoreDetails';
import {
  render,
  waitForElement,
  getByTestId,
  wait,
} from '@testing-library/react';
import { moreDetailsService } from '../../services/moreDetailsService';
// @ts-ignore
import * as payloadMoreDetails from '../../api/stubs/payload-more-details.json';
import { act } from 'react-dom/test-utils';

jest.mock('../../services/moreDetailsService', () => {
  return {
    moreDetailsService: jest.fn(),
  };
});
describe('More Details', () => {
  beforeEach(() => {
    (moreDetailsService as jest.Mock).mockReturnValue(
      Promise.resolve(payloadMoreDetails)
    );
  });

  it('should match the snapshot', () => {
    act(async () => {
      const { asFragment } = render(<MoreDetails movieId={323} />);
      Promise.resolve();
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
