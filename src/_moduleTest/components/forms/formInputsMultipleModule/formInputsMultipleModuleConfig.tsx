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
            label: "Text Input required", tooltipText: "Text input type required",
            inputProps: {
                id: inputIds.text_normal, 
                inputType: InputElementEnum.TEXT, value: ''
            },
            validations: {
                idValidation: inputIds.text_normal, validatorRules: ["required"]
            }
        },
        {
            label: "Text Input default value",
            inputProps: {
                id: inputIds.text_default_value,
                inputType: InputElementEnum.TEXT, value: 'Text 2 default'
            },
            validations: {
                idValidation: inputIds.text_default_value, validatorRules: ["required"]
            }
        },
        {
            label: "Select normal",
            inputProps: {
                id: inputIds.select_normal,
                inputType: InputElementEnum.SELECT, value: null, options: cities,
                placeholder: "Select city"
            },
            validations: {
                idValidation: inputIds.select_normal, validatorRules: ["required"]
            }
        },
        {
            label: "calendar 1",
            inputProps: {
                id: inputIds.calendar_normal,
                inputType: InputElementEnum.CALENDAR, value: null
            },
            validations: {
                idValidation: inputIds.calendar_normal, validatorRules: ["required"]
            }
        },
        {
            label: "calendar format yy/mm/dd",
            inputProps: {
                id: inputIds.calendar_format,
                inputType: InputElementEnum.CALENDAR, value: null, dateFormat: "yy/mm/dd"
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
        label: "TEXT INPUT",
        inputProps: {
            id: inputMultipleIds.text,
            inputType: InputElementEnum.TEXT, value: ''
        },
        validations: {
            idValidation: inputMultipleIds.text, validatorRules: ["required"]
        }
    },
    {
        label: "SELECT INPUT",
        inputProps: {
            id: inputMultipleIds.select,
            inputType: InputElementEnum.SELECT, value: null, options: cities,
            placeholder: "Select city"
        },
        validations: {
            idValidation: inputMultipleIds.select, validatorRules: ["required"]
        }
    },
    {
        label: "CALENDAR INPUT",
        inputProps: {
            id: inputMultipleIds.calendar,
            inputType: InputElementEnum.CALENDAR, value: null
        },
        validations: {
            idValidation: inputMultipleIds.calendar, validatorRules: ["required"]
        }
    },
]

export const formContainers: FormInputContainerPropsI[] = [inputSectionInputIndividual];