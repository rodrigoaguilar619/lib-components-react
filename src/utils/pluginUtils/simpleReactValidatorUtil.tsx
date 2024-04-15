import { FormInputColumnPropsI, FormInputContainerPropsI } from "@app/@types/components/formInputs/formInputs";
import SimpleReactValidator from "simple-react-validator";

const messagesValidator: any = {
    required: 'This field is required',
    email: 'This field must be a valid email address',
}

const customValidators: any = {

    isGreaterThan: {
        message: "This field is not greater than \":fieldToCompare\"",
        rule: (val: any, params: any, _validator: any) => {
            console.log("test custom isGreaterThan", val, params);
            return (parseFloat(val) > parseFloat(params[1] ?? 0));
        },
        messageReplace: (message: any, params: any) => message.replace(':fieldToCompare', params[0]),
    },
    /*isRequired: {
        message: "This field is required",
        rule: (val: any, params: any, _validator: any) => {
            console.log("test custom isRequired", val, params);
            return (val !== undefined && val !== null && val !== "");
        },
    },*/
}

/**
 * Creates a new instance of SimpleReactValidator with the specified configuration.
 *
 * @return {SimpleReactValidator} A new instance of SimpleReactValidator
 */
export function buildSimpleReactValidator() {

    return new SimpleReactValidator({
        className: 'text-danger',
        messages: messagesValidator,
        validators: customValidators
    })
}

/**
 * Adds a validator rule to the specified form config column if the input column ID matches the provided ID field.
 *
 * @param {string} idField - the ID of the input column to which the validator rule will be added
 * @param {FormInputContainerPropsI[]} formContainers - the array of form input column props
 * @param {string} validtorRule - the validator rule to be added
 */
export function addValidatorRule(idField: string, formContainers: FormInputContainerPropsI[], validtorRule: string) {
    formContainers.forEach((formContainer: FormInputContainerPropsI) => {

        formContainer.inputColumns.forEach((inputColumnProps: FormInputColumnPropsI) => {

            if (inputColumnProps.id === idField) {

                let validatorRuleName = validtorRule.substring(0, validtorRule.indexOf(":"));
                let indexValidatorRule = inputColumnProps.validations?.validatorRules.findIndex(element => element.startsWith(validatorRuleName));
                
                if (indexValidatorRule !== undefined && indexValidatorRule >= 0)
                    inputColumnProps.validations?.validatorRules.splice(indexValidatorRule, 1);

                inputColumnProps.validations?.validatorRules.push(validtorRule);
            }
        });
    });
}

/**
 * Retrieves the label to compare for the specified field label from the array of form input containers.
 *
 * @param {FormInputContainerPropsI[]} formContainers - the array of form input containers
 * @param {string} idFieldLabelToCompare - the field label to compare
 * @return {string} the label to compare for the specified field label, or null if not found
 */
export function getLabelFieldLabelToCompare(formContainers: FormInputContainerPropsI[], idFieldLabelToCompare: string) {
    let labelFieldLabelToCompare = null;
    
    formContainers.forEach((formContainer: FormInputContainerPropsI) => {
        
        labelFieldLabelToCompare = formContainer.inputColumns.find((element) => { return element.id === idFieldLabelToCompare })?.label;
    });
    return labelFieldLabelToCompare;
}

/**
 * Function to add a validator rule to form containers specifications on the corresponding field.
 * This function is used for checking if a field value is greater than a specified value.
 *
 * @param {string} idField - the ID of the field to apply the validator rule
 * @param {FormInputContainerPropsI[]} formContainers - the form containers to search for the fields
 * @param {string} idFieldLabelToCompare - the label of the field to compare
 * @param {string} fieldValueToCompare - the value to compare against
 */
export function addValidatorRuleIsGreaterThan(idField: string, formContainers: FormInputContainerPropsI[], idFieldLabelToCompare: string, fieldValueToCompare: string) {
    
    let labelFieldLabelToCompare = getLabelFieldLabelToCompare(formContainers, idFieldLabelToCompare);
    
    if (labelFieldLabelToCompare === undefined) {
        console.warn("labelFieldLabelToCompare is undefined. idField: " + idField + ", idFieldLabelToCompare: " + idFieldLabelToCompare);
        return;
    }
    
    let validtorRule = "isGreaterThan:" + labelFieldLabelToCompare + "," + fieldValueToCompare;
    addValidatorRule(idField, formContainers, validtorRule);
}