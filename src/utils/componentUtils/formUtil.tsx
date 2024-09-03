import { FormInputColumnPropsI, FormInputContainerPropsI } from "@app/@types/components/formInputs/formInputs";
import { Location } from "react-router-dom";

/**
 * Builds a form data object from the given form containers.
 *
 * @param {FormInputContainerPropsI[]} formContainers - array of form input container properties
 * @return {Record<string, any>} the form data object
 */
export function buildFormDataContainers(formContainers: FormInputContainerPropsI[]) {

    let formData: Record<string, any> = {};

    formContainers.forEach((formContainerProps: FormInputContainerPropsI) => {
        formContainerProps.inputColumns.forEach((inputColumnProps: FormInputColumnPropsI) => {
            formData[inputColumnProps.inputProps.id] = inputColumnProps.inputProps.value;
        })
    });

    return formData;
}

/**
 * Builds form data columns from the given form inputs.
 *
 * @param {FormInputColumnPropsI[]} formInputs - array of form input column props
 * @return {Record<string, any>} the formData object containing form data columns
 */
export function buildFormDataColumns(formInputs: FormInputColumnPropsI[]) {

    let formData: Record<string, any> = {};

    formInputs.forEach((inputColumnProps: FormInputColumnPropsI) => {
        formData[inputColumnProps.inputProps.id] = inputColumnProps.inputProps.value;
    });

    return formData;
}

/**
 * Build form data for multiple form inputs.
 *
 * @param {FormInputColumnPropsI[]} formInputs - array of form input column props
 * @return {Array} array containing the form data columns
 */
export function buildFormDataMultiple(formInputs: FormInputColumnPropsI[]) {

    return [buildFormDataColumns(formInputs)];
}

/**
 * Retrieves the parameter call from either the location state or the props.
 *
 * @param {any} location - the location object
 * @param {any} props - the props object
 * @param {string} paramName - the name of the parameter
 * @return {any} the retrieved parameter call
 */
export function getParameterCall(location: Location<any>, props: any, paramName: string) {

    if (location.state?.[paramName]) {
        return location.state[paramName];
    }
    else if (props[paramName]) {
        return props[paramName];
    }
}

/**
 * Updates the options for a specific column in the inputColumns list.
 *
 * @param {FormInputColumnPropsI[]} inputColumns - the list of input columns
 * @param {Record<string, any>} options - the options to be set for the column
 * @param {string} id - the id of the column to update
 * @return {void} 
 */
export const setOptionsToColumnsDefList = (inputColumns: FormInputColumnPropsI[], options: Record<string, any>, id: string) => {

    inputColumns.forEach((column) => {
        if (column.inputProps.id === id) {
            column.inputProps.options = options;
        }
    });
}

/**
 * Sets the executeOnChange function to a specific column in the inputColumns list.
 *
 * @param {FormInputColumnPropsI[]} inputColumns - the list of input columns
 * @param {(formData: Record<string, any>) => void} executeOnChange - the function to be executed on change
 * @param {string} id - the id of the column to update
 * @return {void} 
 */
export const setExucuteOnChangeToColumnsDefList = (inputColumns: FormInputColumnPropsI[], executeOnChange: (formData: Record<string, any>) => void, id: string) => {

    inputColumns.forEach((column) => {
        if (column.inputProps.id === id) {
            column.inputProps.executeOnChange = executeOnChange;
        }
    });
}

/**
 * Sets options to the columns container definition list.
 *
 * @param {FormInputContainerPropsI[]} container - the input container list
 * @param {Record<string, any>} options - the options to set
 * @param {string} id - the identifier
 * @return {void} 
 */
export const setOptionsToColumnsContainerDefList = (container: FormInputContainerPropsI[], options: Record<string, any>, id: string) => {

    container.forEach((inputContainer: { inputColumns: FormInputColumnPropsI[]; }) => {

        if (inputContainer.inputColumns) {
            setOptionsToColumnsDefList(inputContainer.inputColumns, options, id);
        }
    });
}

/**
 * Sets the executeOnChange function to columns in the container definition list.
 *
 * @param {FormInputContainerPropsI[]} container - The list of input containers.
 * @param {(formData: Record<string, any>) => void} executeOnChange - The function to be executed on change.
 * @param {string} id - The identifier.
 * @return {void}
 */
export const setExucuteOnChangeToColumnsContainerDefList = (container: FormInputContainerPropsI[], executeOnChange: (formData: Record<string, any>) => void, id: string) => {

    container.forEach((inputContainer: { inputColumns: FormInputColumnPropsI[]; }) => {

        if (inputContainer.inputColumns) {
            setExucuteOnChangeToColumnsDefList(inputContainer.inputColumns, executeOnChange, id);
        }
    });
}

/**
 * Sets the executeOnChange function to all columns in the container definition list.
 *
 * @param {FormInputContainerPropsI[]} container - the input container list
 * @param {(formData: Record<string, any>) => void} executeOnChange - the function to be executed on change
 * @return {void} 
 */
export const setExucuteOnChangeToAllColumnsContainerDefList = (container: FormInputContainerPropsI[], executeOnChange: (formData: Record<string, any>) => void) => {

    container.forEach((inputContainer: { inputColumns: FormInputColumnPropsI[]; }) => {

        if (inputContainer.inputColumns) {

            inputContainer.inputColumns.forEach((column) => {
                column.inputProps.executeOnChange = executeOnChange;
            });
        }
    });
}