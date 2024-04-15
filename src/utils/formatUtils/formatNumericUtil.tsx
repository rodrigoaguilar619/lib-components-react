/**
 * Function to count the number of decimal places in a given number.
 *
 * @param {any} number - the number to count decimals for
 * @return {number} the count of decimal places
 */
export function countDecimals(number: any) {
    let numberString = number.toString().trim();
    if (numberString.includes("\.") === false)
        return 0;
    else
        return numberString.split(".")[1].length;
}

/**
 * Formats a number by separating the integer part with commas.
 *
 * @param {any} number - the number to be formatted
 * @return {string} the formatted number as a string
 */
export function formatNumberSeparateComma(number: any) {
    let parts = number.toString().split(".");
    
    const numberFormatter = Intl.NumberFormat('en-US');
    const formatted = numberFormatter.format(parts[0]);

    return (formatted + (parts.length > 1 ? ("." + parts[1]) : "")) ;
}

/**
 * Formats a number to a specific decimal limit.
 *
 * @param {any} number - the number to be formatted
 * @param {number} decimalSpaces - the limit of decimal spaces
 * @return {string} the formatted number
 */
export function formatDecimalsLimit(number: any, decimalSpaces: number) {
    if (decimalSpaces == 0)
        return number.toString().replace(/\.(.*?\d*)/g, "");
    let regex = new RegExp("^-?\\d+(?:\\.\\d{0," + decimalSpaces + "})?");
    return number.toString().match(regex)[0];
}

/**
 * Formats a number with zero padding to a specified number of decimal spaces. ex; currency = 4, (12.14 -> 12.1400)
 *
 * @param {any} number - the number to be formatted
 * @param {number} decimalSpaces - the number of decimal spaces to pad the number with
 * @return {string} the formatted number with zero padding
 */
export function formatZeroPad(number: any, decimalSpaces: number) {
    let numberString = number.toString().trim();
    let numberDecimals = countDecimals(number);
    if (numberDecimals >= decimalSpaces)
        return numberString;
    else if (numberDecimals == 0)
        return numberString + "." + ("0".repeat(decimalSpaces));
    else
        return numberString + ("0".repeat(decimalSpaces - numberDecimals));
}

/**
 * Formats the answer data based on the input value.
 *
 * @param {any} value - the input value to be formatted
 * @return {string} the formatted answer data
 */
export function formatAnswerData(value: any) {

    if (value)
        return "Yes";
    else
        return "No";
}

/**
 * Formats a number with decimal spaces, zero padding, and separate comma.
 *
 * @param {any} number - the number to be formatted
 * @param {number | undefined} decimalSpaces - the number of decimal spaces (optional)
 * @param {boolean} addZeroPad - whether to add zero padding
 * @param {boolean} addSeparateComma - whether to add separate comma
 * @return {any} the formatted number
 */
export function formatNumberDecimal(number: any, decimalSpaces: number | undefined, addZeroPad: boolean, addSeparateComma: boolean) {
    try {
        let result = number;
        if (addZeroPad)
            result = formatZeroPad(number, decimalSpaces ?? 2);
        if (decimalSpaces !== undefined && decimalSpaces !== null)
            result = formatDecimalsLimit(result, decimalSpaces);
        if (addSeparateComma)
            result = formatNumberSeparateComma(result);
        return result;
    }
    catch (error) {
        return "!ErrorFormat (" + number + ")";
    }
}

/**
 * Formats the given number as a currency string with the specified options.
 *
 * @param {any} number - The number to be formatted as currency
 * @param {number | undefined} decimalSpaces - The number of decimal spaces (optional)
 * @param {boolean} addZeroPad - Whether to add zero padding to the decimal part
 * @param {boolean} addSeparateComma - Whether to add a comma as a separator for thousands
 * @param {boolean} addSymbolCurrency - Whether to add the currency symbol
 * @return {string} The formatted currency string
 */
export function formatCurrency(number: any, decimalSpaces: number | undefined, addZeroPad: boolean, addSeparateComma: boolean, addSymbolCurrency: boolean, addSymbolPercentage?: boolean) {
    return ((addSymbolCurrency === true) ? "$ ": "") + formatNumberDecimal(number, decimalSpaces, addZeroPad, addSeparateComma) + ((addSymbolPercentage === true) ? " %": "");
}