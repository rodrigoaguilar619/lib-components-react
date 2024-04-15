import { countDecimals, formatNumberSeparateComma, formatDecimalsLimit, formatZeroPad, formatAnswerData,
    formatNumberDecimal, formatCurrency} from "@app/utils/formatUtils/formatNumericUtil";
  
  describe("NumberFormattingUtils", () => {
    describe("countDecimals", () => {
      it("should count the number of decimal places in a given number", () => {
        // Test cases
        expect(countDecimals(12.34)).toBe(2);
        expect(countDecimals(100)).toBe(0);
        expect(countDecimals(0.001)).toBe(3);
        expect(countDecimals("12.345")).toBe(3); // Should handle string input
      });
    });
  
    describe("formatNumberSeparateComma", () => {
      it("should format a number by separating the integer part with commas", () => {
        // Test cases
        expect(formatNumberSeparateComma(1234)).toBe("1,234");
        expect(formatNumberSeparateComma(12345.67)).toBe("12,345.67");
        expect(formatNumberSeparateComma(1000.1234)).toBe("1,000.1234");
        expect(formatNumberSeparateComma(0)).toBe("0");
      });
    });
  
    describe("formatDecimalsLimit", () => {
      it("should format a number to a specific decimal limit", () => {
        // Test cases
        expect(formatDecimalsLimit(12.3456, 2)).toBe("12.34");
        expect(formatDecimalsLimit(100, 2)).toBe("100");
        expect(formatDecimalsLimit(0.00123, 3)).toBe("0.001");
        expect(formatDecimalsLimit("12.345", 1)).toBe("12.3");
        expect(formatDecimalsLimit("12.345", 0)).toBe("12");
      });
    });
  
    describe("formatZeroPad", () => {
      it("should format a number with zero padding to a specified number of decimal spaces", () => {
        // Test cases
        expect(formatZeroPad(12.34, 4)).toBe("12.3400");
        expect(formatZeroPad(100, 3)).toBe("100.000");
        expect(formatZeroPad(0.00123, 2)).toBe("0.00123");
        expect(formatZeroPad(12, 3)).toBe("12.000");
      });
    });
  
    describe("formatAnswerData", () => {
      it("should format the answer data based on the input value", () => {
        // Test cases
        expect(formatAnswerData(true)).toBe("Yes");
        expect(formatAnswerData(false)).toBe("No");
        expect(formatAnswerData(null)).toBe("No");
        expect(formatAnswerData(undefined)).toBe("No");
      });
    });
  
    describe("formatNumberDecimal", () => {
      it("should format a number with decimal spaces, zero padding, and separate comma", () => {
        // Test cases
        expect(formatNumberDecimal(1234.5678, 2, true, true)).toBe("1,234.56");
        expect(formatNumberDecimal(1234, 2, true, true)).toBe("1,234.00");
        expect(formatNumberDecimal(1234, 2, false, true)).toBe("1,234");
        expect(formatNumberDecimal(1234, undefined, true, false)).toBe("1234.00");
        expect(formatNumberDecimal("texto", 2, true, false)).toBe("!ErrorFormat (texto)");
      });
    });
  
    describe("formatCurrency", () => {
      it("should format the given number as a currency string with the specified options", () => {
        // Test cases
        expect(formatCurrency(1234.5678, 2, true, true, true)).toBe("$ 1,234.56");
        expect(formatCurrency(1234, 2, true, true, false)).toBe("1,234.00");
        expect(formatCurrency(1234, 2, false, true, true)).toBe("$ 1,234");
        expect(formatCurrency(1234, undefined, true, false, false)).toBe("1234.00");
      });
    });
  });
  