import { getCache, setCache } from './genres-cache';

describe('Cache', () => {
  describe('getCache', () => {
    it('should get the cache', () => {
      Storage.prototype.getItem = jest.fn().mockReturnValue(15);
      // tslint:disable-next-line: no-console
      console.warn = jest.fn();
      getCache('test');

      expect(Storage.prototype.getItem).toHaveBeenCalledTimes(1);
      expect(Storage.prototype.getItem).toHaveBeenLastCalledWith('test');
      // tslint:disable-next-line: no-console
      expect(console.warn).toHaveBeenCalledTimes(0);
    });
    it('should throw a warning if cache invalid', () => {
      Storage.prototype.getItem = jest.fn().mockReturnValue({ test: 15 });
      // tslint:disable-next-line: no-console
      console.warn = jest.fn();

      getCache('test');
      expect(Storage.prototype.getItem).toHaveBeenCalledTimes(1);
      // tslint:disable-next-line: no-console
      expect(console.warn).toHaveBeenCalledTimes(1);
    });
  });
  describe('setCache', () => {
    it('should set the cache', () => {
      Storage.prototype.setItem = jest.fn();
      // tslint:disable-next-line: no-console
      console.warn = jest.fn();
      setCache('test', JSON.parse('15'));

      expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
      expect(Storage.prototype.setItem).toHaveBeenLastCalledWith('test', '15');
      // tslint:disable-next-line: no-console
      expect(console.warn).toHaveBeenCalledTimes(0);
    });
    it('should throw a warning if cache invalid', () => {
      Storage.prototype.setItem = jest.fn().mockImplementationOnce(() => {
        throw new Error('Error');
      });
      // tslint:disable-next-line: no-console
      console.warn = jest.fn();

      setCache('test', 15);
      expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
      // tslint:disable-next-line: no-console
      expect(console.warn).toHaveBeenCalledTimes(1);
    });
  });
});
