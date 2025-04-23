import { deepClone, dataWithValue, compareDatesWithoutTime } from '@app/utils/dataUtils/dataUtil';

describe('Utility Functions', () => {

  describe('deepClone', () => {
    it('should deeply clone an object', () => {
      const original = { a: 1, b: { c: 2 } };
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original); // Ensure different reference
      expect(cloned.b).not.toBe(original.b); // Nested object should also be cloned
    });
  });

  describe('dataWithValue', () => {
    it('should return false for undefined, null, or empty string', () => {
      expect(dataWithValue(undefined)).toBe(false);
      expect(dataWithValue(null)).toBe(false);
      expect(dataWithValue("")).toBe(false);
    });

    it('should return true for valid values', () => {
      expect(dataWithValue("hello")).toBe(true);
      expect(dataWithValue(0)).toBe(true); // 0 is considered a value
      expect(dataWithValue(false)).toBe(true); // false is considered a value
    });
  });

  describe('compareDatesWithoutTime', () => {
    it('should return true if two dates are on the same day (ignoring time)', () => {
      const date1 = new Date('2023-05-01T10:00:00');
      const date2 = new Date('2023-05-01T23:59:59');

      expect(compareDatesWithoutTime(date1, date2)).toBe(true);
    });

    it('should return false if dates differ in day, month, or year', () => {
      const date1 = new Date('2023-05-01');
      const date2 = new Date('2023-05-02');
      const date3 = new Date('2023-06-01');
      const date4 = new Date('2022-05-01');

      expect(compareDatesWithoutTime(date1, date2)).toBe(false);
      expect(compareDatesWithoutTime(date1, date3)).toBe(false);
      expect(compareDatesWithoutTime(date1, date4)).toBe(false);
    });
  });

});
