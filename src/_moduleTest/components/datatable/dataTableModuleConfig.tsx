import { DataTablePropsI } from "@app/@types/components/dataTable/dataTable";
import { FormInputContainerPropsI } from "@app/@types/components/formInputs/formInputs";
import { CATALOG_DEFAULT_TRUE_FALSE } from "@app/catalogs/defaultCatalog";
import { InputElementEnum, MaskDataTypeEnum } from "@app/catalogs/enumCatalog";

export const inputIds = {
    text_normal: "text_normal",
    select_normal: "select_normal",
    calendar_normal: "calendar_normal",
}

export const columnsList: DataTablePropsI[] = [
    {
        field: 'answer', header: 'Answer', tableConfig: {
            aligns: { alignCell: "center" },
            styleCss: { width: "7%" },
            isSortable: true
        },
        maskProps: {
            maskType: MaskDataTypeEnum.ANSWER,
            isShowNull: true
        }
        
    },
    {
        field: 'currency', header: 'Currency', tableConfig: {
            aligns: { alignCell: "left" },
            styleCss: { width: "7%" }
        },
        maskProps: {
            maskType: MaskDataTypeEnum.CURRENCY
        }
    },
    {
        field: 'currencyZeroPad', header: 'Currency zeropad 5', tableConfig: {
            aligns: { alignCell: "left" },
            styleCss: { width: "7%" }
        },
        maskProps: {
            maskType: MaskDataTypeEnum.CURRENCY,
            maskDataProps: {
                decimalPlaces: 5,
                addZeroPad: true
            }
        }
    },
    {
        field: 'currencySymbol', header: 'Currency Simbol', tableConfig: {
            aligns: { alignCell: "left" },
            styleCss: { width: "7%" }
        },
        maskProps: {
            maskType: MaskDataTypeEnum.CURRENCY,
            maskDataProps: {
                addSymbolCurrency: true
            }
        }
    },
    {
        field: 'percentageSymbol', header: 'Percentage Simbol', tableConfig: {
            aligns: { alignCell: "left" },
            styleCss: { width: "7%" }
        },
        maskProps: {
            maskType: MaskDataTypeEnum.CURRENCY,
            maskDataProps: {
                addSymbolPercent: true
            }
        }
    },
    {
        field: 'currencyComma', header: 'Currency Commma', tableConfig: {
            aligns: { alignCell: "left" },
            styleCss: { width: "7%" }
        },
        maskProps: {
            maskType: MaskDataTypeEnum.CURRENCY,
            maskDataProps: {
                addSeparateComma: true
            }
        }
    },
    {
        field: 'currencyInteger', header: 'Currency Integer', tableConfig: {
            aligns: { alignCell: "left" },
            styleCss: { width: "7%" }
        },
        maskProps: {
            maskType: MaskDataTypeEnum.CURRENCY,
            maskDataProps: {
                addSeparateComma: true,
                decimalPlaces: 0
            }
        }
    },
    {
        field: 'currencyAllOptions', header: 'Currency All Options', tableConfig: {
            aligns: { alignCell: "left" },
            styleCss: { width: "7%" }
        },
        maskProps: {
            maskType: MaskDataTypeEnum.CURRENCY,
            maskDataProps: {
                decimalPlaces: 5,
                addZeroPad: true,
                addSymbolCurrency: true,
                addSeparateComma: true
            }
        }
    },
    {
        field: 'dateMillis', header: 'Date', tableConfig: {
            aligns: { alignCell: "left" },
            styleCss: { width: "7%" }
        },
        maskProps: {
            maskType: MaskDataTypeEnum.DATE,
            maskDataProps: {
                format: "DD/MM/yyyy"
            }
        }
    },
];

export const filterData: FormInputContainerPropsI = {
    inputColumns: [
        {
            id: inputIds.text_normal, label: "Text Input required", tooltipText: "Text input type required",
            inputProps: {
                inputType: InputElementEnum.TEXT, value: '', updateValue: () => { }
            }
        },
        {
            id: inputIds.select_normal, label: "Select normal",
            inputProps: {
                inputType: InputElementEnum.SELECT, value: null, updateValue: () => { }, options: [],
                placeholder: "Select city"
            }
        },
        {
            id: inputIds.calendar_normal, label: "calendar 1",
            inputProps: {
                inputType: InputElementEnum.CALENDAR, value: null, updateValue: () => { }
            }
        },
        {
            id: "anwser_default", label: "Select normal",
            inputProps: {
                inputType: InputElementEnum.SELECT, value: null, updateValue: () => { }, options: CATALOG_DEFAULT_TRUE_FALSE,
                placeholder: "Select answer"
            }
        },
    ],
    columnstotal: 4,
    containerWidth: "100%"
}