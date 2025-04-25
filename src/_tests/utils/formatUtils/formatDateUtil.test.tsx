import { parseDate, formatDate } from '@app/utils/formatUtils/formatDateUtil';

describe('formatDateUtil', () => {

  describe('parseDate', () => {
    it('should return a valid Date object for a valid timestamp', () => {
      const timestamp = 1609459200000; // Jan 1, 2021
      const result = parseDate(timestamp);
      expect(result).toBeInstanceOf(Date);
      expect(result?.getUTCFullYear()).toBe(2021);
    });

    it('should return null for undefined', () => {
      const result = parseDate(undefined as any);
      expect(result).toBeNull();
    });

    it('should return null for null', () => {
      const result = parseDate(null as any);
      expect(result).toBeNull();
    });
  });

  describe('formatDate', () => {
    it('should return a formatted date string for a valid timestamp', () => {
      const timestamp = 1609459200000; // Jan 1, 2021
      const format = 'YYYY-MM-DD';
      const result = formatDate(timestamp, format);
      expect(result).toBe('2021-01-01');
    });

    it('should return a formatted date string for a valid string timestamp', () => {
      const timestamp = '1609459200000'; // Jan 1, 2021
      const format = 'MMMM D, YYYY';
      const result = formatDate(timestamp, format);
      expect(result).toBe('January 1, 2021');
    });

    it('should return empty string if value is undefined', () => {
      const result = formatDate(undefined as any, 'YYYY-MM-DD');
      expect(result).toBe('');
    });

    it('should return empty string if value is null', () => {
      const result = formatDate(null as any, 'YYYY-MM-DD');
      expect(result).toBe('');
    });

    it('should return error string for invalid timestamp', () => {
      const result = formatDate('invalid' as any, 'YYYY-MM-DD');
      expect(result.startsWith('!ErrorFormat')).toBe(true);
    });
  });

});
