import {
  countDecimals,
  formatNumberSeparateComma,
  formatDecimalsLimit,
  formatZeroPad,
  formatAnswerData,
  formatNumberDecimal,
  formatCurrency
} from '@app/utils/formatUtils/formatNumericUtil'; // Adjust the path as needed

describe('Number Format Utils', () => {
  describe('countDecimals', () => {
    it('counts decimal places correctly', () => {
      expect(countDecimals(123)).toBe(0);
      expect(countDecimals(123.45)).toBe(2);
      expect(countDecimals("123.4567")).toBe(4);
    });
  });

  describe('formatNumberSeparateComma', () => {
    it('formats integer part with commas', () => {
      expect(formatNumberSeparateComma(1000000)).toBe("1,000,000");
      expect(formatNumberSeparateComma("1234567.89")).toBe("1,234,567.89");
    });
  });

  describe('formatDecimalsLimit', () => {
    it('limits decimal spaces', () => {
      expect(formatDecimalsLimit(12.34567, 2)).toBe("12.34");
      expect(formatDecimalsLimit("987.654321", 4)).toBe("987.6543");
      expect(formatDecimalsLimit(123.999, 0)).toBe("123");
    });
  });

  describe('formatZeroPad', () => {
    it('adds zero padding when needed', () => {
      expect(formatZeroPad(12.1, 3)).toBe("12.100");
      expect(formatZeroPad("15", 2)).toBe("15.00");
      expect(formatZeroPad(123.4567, 2)).toBe("123.4567");
    });
  });

  describe('formatAnswerData', () => {
    it('formats boolean-like values as "Yes" or "No"', () => {
      expect(formatAnswerData(true)).toBe("Yes");
      expect(formatAnswerData(1)).toBe("Yes");
      expect(formatAnswerData(false)).toBe("No");
      expect(formatAnswerData(0)).toBe("No");
    });
  });

  describe('formatNumberDecimal', () => {
    it('formats number with padding and comma', () => {
      expect(formatNumberDecimal(1234.5, 2, true, true)).toBe("1,234.50");
      expect(formatNumberDecimal(12.123456, 4, false, false)).toBe("12.1234");
      expect(formatNumberDecimal(1000, undefined, true, true)).toBe("1,000.00");
    });

    it('handles errors gracefully', () => {
      expect(formatNumberDecimal(undefined, 2, true, true)).toContain('!ErrorFormat');
    });
  });

  describe('formatCurrency', () => {
    it('formats with currency symbol and comma', () => {
      expect(formatCurrency(1234.56, 2, true, true, true)).toBe("$ 1,234.56");
      expect(formatCurrency(78.9, 4, true, false, true)).toBe("$ 78.9000");
      expect(formatCurrency(56, 2, true, true, true, true)).toBe("$ 56.00 %");
    });
  });
});    