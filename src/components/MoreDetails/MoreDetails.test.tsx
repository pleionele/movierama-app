import * as React from 'react';
import MoreDetails from './MoreDetails';
import '@testing-library/jest-dom/extend-expect';
import { render, wait, fireEvent } from '@testing-library/react';
import { moreDetailsService } from '../../services/moreDetailsService';
// @ts-ignore
import * as payloadMoreDetails from '../../api/stubs/payload-more-details.json';
import { act } from 'react-dom/test-utils';

jest.mock('../../services/moreDetailsService', () => {
  return {
    moreDetailsService: jest.fn(),
  };
});

jest.setTimeout(5000);
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

  it('should display', async () => {
    await wait(() => {
      const { getByTestId } = render(<MoreDetails movieId={1323} />);
      expect(getByTestId('youtubeTrailer')).toBeTruthy();
      expect(getByTestId('reviewsList')).toBeTruthy();
    });
  });
  it('should fetch data from the right api', async () => {
    await wait(() => {
      render(<MoreDetails movieId={1323} />);
      expect(moreDetailsService).toHaveBeenCalled();
    });
  });
  it('should toggle trailer tab', async () => {
    await wait(() => {
      const { getByTestId, getByTitle } = render(
        <MoreDetails movieId={1323} />
      );
      const element = getByTestId('youtubeTrailer');
      fireEvent(
        element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );

      expect(element).toBeVisible();
    });
  });
});
