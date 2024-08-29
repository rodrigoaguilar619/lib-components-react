import { FormInputContainerPropsI } from "@app/@types/components/formInputs/formInputs";
import { InputElementEnum, InputMaskEnum } from "@app/catalogs/enumCatalog";

export const inputIds = {
    text_normal: "text_normal",
    text_default_value: "text_default_value",
    select_normal: "select_normal",
    select_answer: "select_answer",
    calendar_normal: "calendar_normal",
    calendar_format: "calendar_format",
    validate_email: "validate_email",
    validate_numeric: "validate_numeric",
    validate_number_1: "validate_number_1",
    validate_number_2: "validate_number_2",
    file: "file"
}

const cities: any[] = [
    { description: 'New York', id: 'NY' },
    { description: 'Rome', id: 'RM' },
    { description: 'London', id: 'LDN' },
    { description: 'Istanbul', id: 'IST' },
    { description: 'Paris', id: 'PRS' }
];

const answers: any[] = [
    { description: 'Yes', id: true },
    { description: 'No', id: false }
];

const inputSectionOne: FormInputContainerPropsI = {
    inputColumns: [
        {
            label: "Text Input required", tooltipText: "Text input type required",
            inputProps: {
                id: inputIds.text_normal,
                inputType: InputElementEnum.TEXT, value: '', updateValue: () => { }
            },
            validations: {
                idValidation: inputIds.text_normal, validatorRules: ["required"]
            }
        },
        {
            label: "Text Input default value",
            inputProps: {
                id: inputIds.text_default_value,
                inputType: InputElementEnum.TEXT, value: 'Text 2 default', updateValue: () => { }, isReadOnly: true
            },
            validations: {
                idValidation: inputIds.text_default_value, validatorRules: ["required"]
            }
        },
        {
            label: "Select normal",
            inputProps: {
                id: inputIds.select_normal,
                inputType: InputElementEnum.SELECT, value: null, updateValue: () => { }, options: cities,
                placeholder: "Select city"
            },
            validations: {
                idValidation: inputIds.select_normal, validatorRules: ["required"]
            }
        },
        {
            label: "Select answer",
            inputProps: {
                id: inputIds.select_answer,
                inputType: InputElementEnum.SELECT, value: null, updateValue: () => { }, options: answers,
                placeholder: "Select answer"
            },
            validations: {
                idValidation: inputIds.select_answer, validatorRules: ["required"]
            }
        },
        {
            label: "calendar 1",
            inputProps: {
                id: inputIds.calendar_normal,
                inputType: InputElementEnum.CALENDAR, value: null, updateValue: () => { }
            },
            validations: {
                idValidation: inputIds.calendar_normal, validatorRules: ["required"]
            }
        },
        {
            label: "calendar format yy/mm/dd",
            inputProps: {
                id: inputIds.calendar_format,
                inputType: InputElementEnum.CALENDAR, value: null, updateValue: () => { }, dateFormat: "yy/mm/dd"
            },
            validations: {
                idValidation: inputIds.calendar_format, validatorRules: ["required"]
            }
        },
    ],
    columnstotal: 6,
    containerWidth: "100%"
}

const inputSectionTwo: FormInputContainerPropsI = {
    inputColumns: [
        {
            label: "Validate email",
            inputProps: {
                id: inputIds.validate_email,
                inputType: InputElementEnum.TEXT, value: '', updateValue: () => { }
            },
            validations: {
                idValidation: inputIds.validate_email, validatorRules: ["required", "email"]
            }
        },
        {
            label: "Validate numeric with 2 decimals",
            inputProps: {
                id: inputIds.validate_numeric,
                inputType: InputElementEnum.MASK, value: '', updateValue: () => { },
                maskType: InputMaskEnum.NUMBER, maskProps: { totalDecimals: 2 }
            },
            validations: {
                idValidation: inputIds.validate_email, validatorRules: ["required", "numeric"]
            }
        }
    ],
    columnstotal: 2,
    containerWidth: "80%"
}

const inputSectionThree: FormInputContainerPropsI = {
    inputColumns: [
        {
            label: "Validate number 1",
            tooltipText: "This field must be greater than " + inputIds.validate_number_1 + "."
                + "<br/>la rule is added into the component because needs parameter value which be compare to dinamically",
            inputProps: {
                id: inputIds.validate_number_1,
                inputType: InputElementEnum.TEXT, value: '', updateValue: () => { }
            },
            validations: {
                idValidation: "validation_number_1", validatorRules: ["required"]
            }
        },
        {
            label: "Validate number 2",
            inputProps: {
                id: inputIds.validate_number_2,
                inputType: InputElementEnum.TEXT, value: '', updateValue: () => { },
            },
            validations: {
                idValidation: "validation_number_2", validatorRules: ["required"]
            }
        },
    ],
    columnstotal: 2,
    containerWidth: "80%"
}

const inputSectionFour: FormInputContainerPropsI = {
    inputColumns: [
        {
            label: "load file",
            tooltipText: "load file",
            inputProps: {
                id: inputIds.file,
                inputType: InputElementEnum.FILE, value: null, updateValue: () => { }
            },
            validations: {
                idValidation: "file", validatorRules: ["required"]
            }
        }
    ],
    columnstotal: 1,
    containerWidth: "100%"
}

const inputSectionFive: FormInputContainerPropsI = {
    inputColumns: [
        {
            label: "Text Input required", tooltipText: "Text input type required",
            columnWidth: "33%",
            showColumn: false,
            inputProps: {
                id: inputIds.text_normal,
                inputType: InputElementEnum.TEXT, value: '', updateValue: () => { }
            },
            validations: {
                idValidation: inputIds.text_normal, validatorRules: ["required"]
            }
        },
        {
            label: "Text Input default value",
            columnWidth: "33%",
            inputProps: {
                id: inputIds.text_default_value,
                inputType: InputElementEnum.TEXT, value: 'Text 2 default', updateValue: () => { }, isReadOnly: true
            },
            validations: {
                idValidation: inputIds.text_default_value, validatorRules: ["required"]
            }
        },
        {
            label: "Select normal",
            columnWidth: "33%",
            inputProps: {
                id: inputIds.select_normal,
                inputType: InputElementEnum.SELECT, value: null, updateValue: () => { }, options: cities,
                placeholder: "Select city"
            },
            validations: {
                idValidation: inputIds.select_normal, validatorRules: ["required"]
            }
        },
        {
            label: "calendar 1",
            columnWidth: "66%",
            inputProps: {
                id: inputIds.calendar_normal,
                inputType: InputElementEnum.CALENDAR, value: null, updateValue: () => { }
            },
            validations: {
                idValidation: inputIds.calendar_normal, validatorRules: ["required"]
            }
        }
    ],
    //columnstotal: 6,
    containerWidth: "100%"
}

export const formContainers: FormInputContainerPropsI[] = [inputSectionOne, inputSectionTwo, inputSectionThree];
export const formContainers2: FormInputContainerPropsI[] = [inputSectionFour, inputSectionFive];