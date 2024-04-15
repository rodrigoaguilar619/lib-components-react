
/**
 * Checks if the value is not null, not undefined, and not an empty string.
 *
 * @param {any} value - the value to be checked
 * @return {boolean} true if the value is not null, not undefined, and not an empty string, false otherwise
 */
export const verifyHasValue = (value: any) => {
    return value !== null && value !== undefined && value !== "";
}