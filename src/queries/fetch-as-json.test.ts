import { fetchAsJson } from './fetch-as-json';
import 'isomorphic-fetch';

const mockBodyResponse = { hello: 'world' };
const mockSuccessResponse = new Response(JSON.stringify(mockBodyResponse), {
  status: 200,
});

describe('fetchAsJson', () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockSuccessResponse));
  });
  it('should convert query params into query string', () => {
    fetchAsJson('/test-url', { hello: 'world', hello1: 'world1' });
    expect(fetch).toHaveBeenCalledWith('/test-url?hello=world&hello1=world1', {
      headers: {},
      method: 'GET',
    });
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
