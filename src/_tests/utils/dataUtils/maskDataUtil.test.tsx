import { maskData } from "@app/utils/dataUtils/maskDataUtil"; // Adjust the import path as needed
import { MaskDataTypeEnum } from "@app/catalogs/enumCatalog";

describe("formatDataUtil", () => {
    describe("maskData", () => {
        it("should mask data according to the provided MaskDataPropsI", () => {
            // Test cases for currency masking
            const currencyMaskProps = {
                maskType: MaskDataTypeEnum.CURRENCY,
                maskDataProps: {
                    decimalPlaces: 2,
                    addZeroPad: true,
                    addSeparateComma: true,
                    addSymbol: true,
                },
            };
            expect(maskData(1234.5678, currencyMaskProps)).toBe("$ 1,234.56");

            // Test cases for answer masking
            const answerMaskProps = {
                maskType: MaskDataTypeEnum.ANSWER,
            };
            expect(maskData(true, answerMaskProps)).toBe("Yes");
        });

        it("should handle null values based on the isShowNull flag", () => {
            // Test cases
            const currencyMaskProps = {
                maskType: MaskDataTypeEnum.CURRENCY,
                maskDataProps: {
                    decimalPlaces: 2,
                    addZeroPad: true,
                    addSeparateComma: true,
                    addSymbol: true,
                },
            };
            const nullMaskProps = {
                maskType: MaskDataTypeEnum.CURRENCY,
                isShowNull: true,
            };
            expect(maskData(null, currencyMaskProps)).toBe("");
            expect(maskData(null, nullMaskProps)).toBe("null");
        });
    });
});
