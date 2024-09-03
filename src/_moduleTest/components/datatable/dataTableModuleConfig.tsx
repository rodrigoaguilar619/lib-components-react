import { DataTablePropsI } from "@app/@types/components/dataTable/dataTable";
import { FormInputContainerPropsI } from "@app/@types/components/formInputs/formInputs";
import { CATALOG_DEFAULT_TRUE_FALSE } from "@app/catalogs/defaultCatalog";
import { InputElementEnum, MaskDataTypeEnum } from "@app/catalogs/enumCatalog";

export const inputIds = {
    text_required: "text_required",
    text_normal: "text_normal",
    select_normal: "select_normal",
    calendar_normal: "calendar_normal",
}

export const columnsList: DataTablePropsI[] = [
    {
        field: 'answer', header: 'Answer', tableConfig: {
            styleCss: { width: "7%", textAlign: "center" },
            isSortable: true
        },
        maskProps: {
            maskType: MaskDataTypeEnum.ANSWER,
            isShowNull: true
        }
        
    },
    {
        field: 'currency', header: 'Currency', tableConfig: {
            styleCss: { width: "7%", textAlign: "left" }
        },
        maskProps: {
            maskType: MaskDataTypeEnum.CURRENCY
        }
    },
    {
        field: 'currencyZeroPad', header: 'Currency zeropad 5', tableConfig: {
            styleCss: { width: "7%", textAlign: "left" }
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
            styleCss: { width: "7%", textAlign: "left" }
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
            styleCss: { width: "7%", textAlign: "left" }
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
            styleCss: { width: "7%", textAlign: "left" }
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
            styleCss: { width: "7%", textAlign: "left" }
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
            styleCss: { width: "7%", textAlign: "left" }
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
            styleCss: { width: "7%", textAlign: "left" }
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
            label: "Text Input required", tooltipText: "Text input type required",
            inputProps: {
                id: inputIds.text_required,
                inputType: InputElementEnum.TEXT, value: '',
            }
        },
        {
            label: "Select normal",
            inputProps: {
                id: inputIds.select_normal,
                inputType: InputElementEnum.SELECT, value: null, options: [],
                placeholder: "Select city"
            }
        },
        {
            label: "calendar 1",
            inputProps: {
                id: inputIds.calendar_normal,
                inputType: InputElementEnum.CALENDAR, value: null
            }
        },
        {
            label: "Select normal",
            inputProps: {
                id: "anwser_default",
                inputType: InputElementEnum.SELECT, value: null, options: CATALOG_DEFAULT_TRUE_FALSE,
                placeholder: "Select answer"
            }
        },
    ],
    columnstotal: 4,
    containerWidth: "100%"
}