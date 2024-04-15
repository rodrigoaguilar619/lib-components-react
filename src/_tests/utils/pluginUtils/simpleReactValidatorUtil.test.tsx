import { FormInputContainerPropsI } from '@app/@types/components/formInputs/formInputs';
import { buildSimpleReactValidator, addValidatorRule, getLabelFieldLabelToCompare, addValidatorRuleIsGreaterThan } from '@app/utils/pluginUtils/simpleReactValidatorUtil';
import SimpleReactValidator from "simple-react-validator";

describe('Simple React Validator', () => {
    let validator: any;

    beforeEach(() => {
        validator = buildSimpleReactValidator();
    });

    /*it('should build SimpleReactValidator with custom messages and validators', () => {
        expect(validator).toBeInstanceOf(SimpleReactValidator);
        expect(validator.messages).toEqual({
            required: 'This field is required',
            email: 'This field must be a valid email address',
        });
        expect(validator.validators).toEqual({
            isGreaterThan: {
                message: "This field is not greater than \":fieldToCompare\"",
                rule: expect.any(Function),
                messageReplace: expect.any(Function),
            },
        });
    });*/

    it('should build SimpleReactValidator execute validation greater than', () => { 
        const formContainers: FormInputContainerPropsI[] = [
            {
                inputColumns: [
                    {
                        id: 'inputField',
                        label: 'Input Label',
                        inputProps: {
                            value: '',
                            inputType: 'text',
                            updateValue: () => {},
                        },
                        validations: {
                            idValidation: "id",
                            validatorRules: ["isGreaterThan:Input Label Field To Compare,10"],
                        },
                    },
                    {
                        id: 'fieldToCompare',
                        label: 'Input Label Field To Compare',
                        inputProps: {
                            value: '',
                            inputType: 'text',
                            updateValue: () => {},
                        },
                        validations: {
                            idValidation: "id",
                            validatorRules: [],
                        },
                    },
                ],
                columnstotal: 1,
            },
        ];
        validator.message(formContainers[0].inputColumns[0].validations?.idValidation, "11", formContainers[0].inputColumns[0].validations?.validatorRules)
        expect(validator.allValid()).toEqual(true);
        validator.message(formContainers[0].inputColumns[0].validations?.idValidation, "9", formContainers[0].inputColumns[0].validations?.validatorRules)
        expect(validator.allValid()).toEqual(false);
    });

    it('should add validator rule to input column', () => {
        const formContainers: FormInputContainerPropsI[] = [
            {
                inputColumns: [
                    {
                        id: 'inputField',
                        label: 'Input Label',
                        inputProps: {
                            value: '',
                            inputType: 'text',
                            updateValue: () => {},
                        },
                        validations: {
                            idValidation: "id",
                            validatorRules: [],
                        },
                    },
                ],
                columnstotal: 1,
            },
        ];

        addValidatorRule('inputField', formContainers, 'required');

        expect(formContainers[0].inputColumns[0].validations?.validatorRules).toEqual(['required']);
    });

    it('should get label field label to compare', () => {
        const formContainers: FormInputContainerPropsI[] = [
            {
                inputColumns: [
                    {
                        id: 'inputField',
                        label: 'Input Label',
                        inputProps: {
                            value: '',
                            inputType: 'text',
                            updateValue: () => {},
                        },
                        validations: {
                            idValidation: "id",
                            validatorRules: [],
                        },
                    },
                ],
                columnstotal: 1,
            },
        ];

        const label = getLabelFieldLabelToCompare(formContainers, 'inputField');
        expect(label).toEqual('Input Label');
    });

    it('should add validator rule isGreaterThan', () => {
        const formContainers: FormInputContainerPropsI[] = [
            {
                inputColumns: [
                    {
                        id: 'inputField',
                        label: 'Input Label',
                        inputProps: {
                            value: '',
                            inputType: 'text',
                            updateValue: () => {},
                        },
                        validations: {
                            idValidation: "id",
                            validatorRules: [],
                        },
                    },
                    {
                        id: 'fieldToCompare',
                        label: 'Input Label Field To Compare',
                        inputProps: {
                            value: '2',
                            inputType: 'text',
                            updateValue: () => {},
                        },
                        validations: {
                            idValidation: "id",
                            validatorRules: [],
                        },
                    },
                ],
                columnstotal: 1,
            },
        ];

        addValidatorRuleIsGreaterThan('inputField', formContainers, 'fieldToCompare', '10');

        expect(formContainers[0].inputColumns[0].validations?.validatorRules).toEqual(['isGreaterThan:Input Label Field To Compare,10']);
    });

    it('should add validator rule isGreaterThan when value is empty', () => {
        const formContainers: FormInputContainerPropsI[] = [
            {
                inputColumns: [
                    {
                        id: 'inputField',
                        label: 'Input Label',
                        inputProps: {
                            value: '',
                            inputType: 'text',
                            updateValue: () => {},
                        },
                        validations: {
                            idValidation: "id",
                            validatorRules: [],
                        },
                    },
                    {
                        id: 'fieldToCompare',
                        label: 'Input Label Field To Compare',
                        inputProps: {
                            value: '2',
                            inputType: 'text',
                            updateValue: () => {},
                        },
                        validations: {
                            idValidation: "id",
                            validatorRules: [],
                        },
                    },
                ],
                columnstotal: 1,
            },
        ];

        addValidatorRuleIsGreaterThan('inputField', formContainers, 'fieldToCompareNotExist', '10');

        expect(formContainers[0].inputColumns[0].validations?.validatorRules).toEqual([]);
    });

    it('should add validator rule isGreaterThan when rule already exists', () => {
        const formContainers: FormInputContainerPropsI[] = [
            {
                inputColumns: [
                    {
                        id: 'inputField',
                        label: 'Input Label',
                        inputProps: {
                            value: '',
                            inputType: 'text',
                            updateValue: () => {},
                        },
                        validations: {
                            idValidation: "id",
                            validatorRules: ["isGreaterThan:Input Label Field To Compare,10"],
                        },
                    },
                    {
                        id: 'fieldToCompare',
                        label: 'Input Label Field To Compare',
                        inputProps: {
                            value: '2',
                            inputType: 'text',
                            updateValue: () => {},
                        },
                        validations: {
                            idValidation: "id",
                            validatorRules: [],
                        },
                    },
                ],
                columnstotal: 1,
            },
        ];

        addValidatorRuleIsGreaterThan('inputField', formContainers, 'fieldToCompare', '10');

        expect(formContainers[0].inputColumns[0].validations?.validatorRules).toEqual(['isGreaterThan:Input Label Field To Compare,10']);
    });
});
