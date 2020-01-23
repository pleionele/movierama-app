import { fetchAsJson } from './fetch-as-json';
import 'isomorphic-fetch';
import { FetchMock } from 'jest-fetch-mock';

const mockBodyResponse = { hello: 'world' };
const mockSuccessResponse = new Response(JSON.stringify(mockBodyResponse), {
  status: 200,
});

describe('fetchAsJson', () => {
  describe('Success Status', () => {
    beforeEach(() => {
      //  @ts-ignore
      (fetch as FetchMock).mockResponse(mockSuccessResponse);
    });

    beforeEach(() => {
      (fetch as FetchMock).resetMocks();
    });
    it('should convert query params into query string', () => {
      fetchAsJson('/test-url', { hello: 'world', hello1: 'world1' });
      expect(fetch).toHaveBeenCalledWith(
        '/test-url?hello=world&hello1=world1',
        {
          headers: {},
          method: 'GET',
        }
      );
    });

    it('should add no query string when there are no query params', () => {
      fetchAsJson('/test-url', {});
      expect(fetch).toHaveBeenCalledWith('/test-url', {
        headers: {},
        method: 'GET',
      });
    });

    it('should return encoded query params', () => {
      fetchAsJson('/test-url', { dateTime: '2020-01-23T09:00:00.000Z' });
      expect(fetch).toHaveBeenCalledWith(
        '/test-url?dateTime=2020-01-23T09%3A00%3A00.000Z',
        {
          headers: {},
          method: 'GET',
        }
      );
    });
  });
  describe('Error Status', () => {
    [400, 404, 500].forEach(errorCode => {
      it(`should throw an error if ${errorCode} response is received`, async () => {
        const mockErrorResponse = new Response(JSON.stringify({}), {
          status: errorCode,
        });
        // @ts-ignore
        (fetch as FetchMock).mockRejectOnce(mockErrorResponse);
        expect(
          fetchAsJson('/test-url', { dateTime: '2020-01-23T09:00:00.000Z' })
        ).rejects.toThrow();
      });
    });
  });
});
