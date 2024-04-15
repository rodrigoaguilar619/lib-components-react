import { FormInputColumnPropsI, FormInputContainerPropsI } from "@app/@types/components/formInputs/formInputs";
import { InputElementEnum } from "@app/catalogs/enumCatalog";

export const inputIds = {
    text_normal: "text_normal",
    text_default_value: "text_default_value",
    select_normal: "select_normal",
    calendar_normal: "calendar_normal",
    calendar_format: "calendar_format",
}

export const inputMultipleIds = {
    text: "text",
    select: "select",
    calendar: "calendar",
}

const cities: any[] = [
    { description: 'New York', id: 'NY' },
    { description: 'Rome', id: 'RM' },
    { description: 'London', id: 'LDN' },
    { description: 'Istanbul', id: 'IST' },
    { description: 'Paris', id: 'PRS' }
];

const inputSectionInputIndividual: FormInputContainerPropsI = {
    inputColumns: [
        {
            id: inputIds.text_normal, label: "Text Input required", tooltipText: "Text input type required",
            inputProps: {
                inputType: InputElementEnum.TEXT, value: '', updateValue: () => { }
            },
            validations: {
                idValidation: inputIds.text_normal, validatorRules: ["required"]
            }
        },
        {
            id: inputIds.text_default_value, label: "Text Input default value",
            inputProps: {
                inputType: InputElementEnum.TEXT, value: 'Text 2 default', updateValue: () => { }
            },
            validations: {
                idValidation: inputIds.text_default_value, validatorRules: ["required"]
            }
        },
        {
            id: inputIds.select_normal, label: "Select normal",
            inputProps: {
                inputType: InputElementEnum.SELECT, value: null, updateValue: () => { }, options: cities,
                placeholder: "Select city"
            },
            validations: {
                idValidation: inputIds.select_normal, validatorRules: ["required"]
            }
        },
        {
            id: inputIds.calendar_normal, label: "calendar 1",
            inputProps: {
                inputType: InputElementEnum.CALENDAR, value: null, updateValue: () => { }
            },
            validations: {
                idValidation: inputIds.calendar_normal, validatorRules: ["required"]
            }
        },
        {
            id: inputIds.calendar_format, label: "calendar format yy/mm/dd",
            inputProps: {
                inputType: InputElementEnum.CALENDAR, value: null, updateValue: () => { }, dateFormat: "yy/mm/dd"
            },
            validations: {
                idValidation: inputIds.calendar_format, validatorRules: ["required"]
            }
        },
    ],
    columnstotal: 5,
    containerWidth: "100%"
}

export const inputSectionMultiple: FormInputColumnPropsI[] = [
    {
        id: inputMultipleIds.text, label: "TEXT INPUT",
        inputProps: {
            inputType: InputElementEnum.TEXT, value: '', updateValue: () => { }
        },
        validations: {
            idValidation: inputMultipleIds.text, validatorRules: ["required"]
        }
    },
    {
        id: inputMultipleIds.select, label: "SELECT INPUT",
        inputProps: {
            inputType: InputElementEnum.SELECT, value: null, updateValue: () => { }, options: cities,
            placeholder: "Select city"
        },
        validations: {
            idValidation: inputMultipleIds.select, validatorRules: ["required"]
        }
    },
    {
        id: inputMultipleIds.calendar, label: "CALENDAR INPUT",
        inputProps: {
            inputType: InputElementEnum.CALENDAR, value: null, updateValue: () => { }
        },
        validations: {
            idValidation: inputMultipleIds.calendar, validatorRules: ["required"]
        }
    },
]

export const formContainers: FormInputContainerPropsI[] = [inputSectionInputIndividual];