
/**
 * Returns a string with the first letter capitalized.
 * @param {string} str The string to capitalize
 * @returns {string} The capitalized string
 */
export function formatToCapitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}