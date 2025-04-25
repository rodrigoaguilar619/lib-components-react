import { maskData } from "@app/utils/dataUtils/maskDataUtil";
import { MaskDataTypeEnum } from "@app/catalogs/enumCatalog";
import { MaskDataPropsI } from '@app/@types/components/dataTable/dataTable';

// Mock the imported formatters
jest.mock('@app/utils/formatUtils/formatNumericUtil', () => ({
  formatCurrency: jest.fn(() => '$ 1,000.00'),
  formatAnswerData: jest.fn(value => (value ? 'Yes' : 'No'))
}));

jest.mock('@app/utils/formatUtils/formatDateUtil', () => ({
  formatDate: jest.fn((date, format) => `formatted-${date}-${format}`)
}));

describe('maskData', () => {
  it('returns "null" if value is null and isShowNull is true', () => {
    const props: MaskDataPropsI = {
      maskType: MaskDataTypeEnum.CURRENCY,
      isShowNull: true
    };
    expect(maskData(null, props)).toBe('null');
  });

  it('returns empty string if value is null and isShowNull is false', () => {
    const props: MaskDataPropsI = {
      maskType: MaskDataTypeEnum.CURRENCY,
      isShowNull: false
    };
    expect(maskData(null, props)).toBe('');
  });

  it('formats currency correctly with given props', () => {
    const props: MaskDataPropsI = {
      maskType: MaskDataTypeEnum.CURRENCY,
      maskDataProps: {
        decimalPlaces: 2,
        addZeroPad: true,
        addSeparateComma: true,
        addSymbolCurrency: true,
        addSymbolPercent: false
      },
      isShowNull: false
    };
    expect(maskData(1000, props)).toBe('$ 1,000.00');
  });

  it('formats answer correctly for boolean true', () => {
    const props: MaskDataPropsI = {
      maskType: MaskDataTypeEnum.ANSWER,
      isShowNull: false
    };
    expect(maskData(true, props)).toBe('Yes');
  });

  it('formats answer correctly for boolean false', () => {
    const props: MaskDataPropsI = {
      maskType: MaskDataTypeEnum.ANSWER,
      isShowNull: false
    };
    expect(maskData(false, props)).toBe('No');
  });

  it('formats date correctly with format string', () => {
    const props: MaskDataPropsI = {
      maskType: MaskDataTypeEnum.DATE,
      isShowNull: false,
      maskDataProps: {
        format: 'DD-MM-YYYY'
      }
    };
    expect(maskData('2025-04-22', props)).toBe('formatted-2025-04-22-DD-MM-YYYY');
  });

  it('returns raw value if no maskDataProps are passed', () => {
    expect(maskData('raw')).toBe('raw');
  });
});
