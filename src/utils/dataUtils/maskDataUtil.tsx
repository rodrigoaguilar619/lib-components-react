import { MaskDataTypeEnum } from "@app/catalogs/enumCatalog";
import { formatAnswerData, formatCurrency } from "../formatUtils/formatNumericUtil";
import { MaskDataCurrencyPropsI, MaskDataDatePropsI, MaskDataPropsI } from "@app/@types/components/dataTable/dataTable";
import { formatDate } from "../formatUtils/formatDateUtil";

export function maskData(value: any, maskDataProps?: MaskDataPropsI) {

    let valueFormated = value;

    if (maskDataProps !== undefined && maskDataProps !== null) {

        if ((valueFormated === null || valueFormated === undefined) && maskDataProps.isShowNull)
            return "null";
        else if ((valueFormated === null || valueFormated === undefined) && !maskDataProps.isShowNull)
            return "";

        switch (maskDataProps.maskType) {

            case MaskDataTypeEnum.CURRENCY: {
                let maskCurrencyProps = maskDataProps.maskDataProps as MaskDataCurrencyPropsI;
                valueFormated = formatCurrency(valueFormated, maskCurrencyProps?.decimalPlaces, maskCurrencyProps?.addZeroPad ?? false,
                    maskCurrencyProps?.addSeparateComma ?? false, maskCurrencyProps?.addSymbolCurrency ?? false, maskCurrencyProps?.addSymbolPercent ?? false);
                break;
            }
            case MaskDataTypeEnum.ANSWER: {
                valueFormated = formatAnswerData(value);
                break;
            }
            case MaskDataTypeEnum.DATE: {
                let maskDateProps = maskDataProps.maskDataProps as MaskDataDatePropsI;
                valueFormated = formatDate(value, maskDateProps.format);
                break;
            }
        }
    }

    return valueFormated;
}