import { _APP_ENVIRONMENT_ } from "@app/catalogs/constantCatalog";
import DebugClass from "@app/classes/debugClass";
import { EnvironmentEnum } from "@app/catalogs/enumCatalog";
import { formatArrayWithBoldKeys, formatJsonWithBoldKeys, formatParameter } from "../formatUtils/formatJsonUtil";

const colorsModuleList = [
    "#F91F1F", "#F9961F", "#F9C11F", "#D1BC06", "#A9D106", "#84D106", "#50D106",
    "#06D110", "#06D17E", "#06D1CE", "#06A0D1", "#0684D1", "#0669D1", "#063ED1",
    "#4106D1", "#8B06D1", "#D106C8", "#D1066C"];

const colorsServiceList = [
    "#FEE3DF", "#FEF3DF", "#FAFEDF", "#EFFEDF", "#E4FEDF", "#DFFEEF", "#DFFEF7",
    "#DFF7FE", "#DFEBFE", "#DFDFFE", "#ECDFFE", "#F5DFFE", "#FEDFFB", "#FEDFE7"];

/**
 * Generate a random number between 1 and 500 using crypto.getRandomValues.
 *
 * @return {number} The generated random number.
 */
function getRandomNumber() {
    let randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    let randomNumber = randomBuffer[0] % 500 + 1;

    return randomNumber;
}

/**
 * Generates a random integer within the specified range.
 *
 * @param {number} min - the minimum value of the range
 * @param {number} max - the maximum value of the range
 * @return {number} the random integer within the specified range
 */
function getRandomInt(min: number, max: number) {
    const range = max - min;
    const bytes = Math.ceil(Math.log2(range) / 8);
    const randomBytes = new Uint8Array(bytes);
    crypto.getRandomValues(randomBytes);
    const value = randomBytes.reduce((acc, byte) => (acc << 8) | byte, 0);
    return min + (value % range);
  }

export function generateDebugClassModule(moduleName: string) {
    let randomNumber = getRandomNumber();
    return new DebugClass(" " + randomNumber + " MODULE: " + moduleName + " ", "color: white; background-color: " + colorsModuleList[getRandomInt(0, colorsModuleList.length)] +";");
}

export function generateDebugClassService(moduleName: string) {
    let randomNumber = getRandomNumber();
    return new DebugClass(" " + randomNumber + " SERVICE: " + moduleName + " ", "color: black; background-color: " + colorsServiceList[getRandomInt(0, colorsServiceList.length)] +";");
}

export function debug(debugClass: DebugClass, ...params: any[]) {
    if (_APP_ENVIRONMENT_ !== EnvironmentEnum.PRODUCTION)
        console.log("%c" + debugClass.getModuleName(), debugClass.getDebugColor() !== undefined ? debugClass.getDebugColor() : 'color: white; background-color: #E1901A', ...params);
}

export function debugError(debugClass: DebugClass, ...params: any[]) {
    console.error("%c" + debugClass.getModuleName(), debugClass.getDebugColor() !== undefined ? debugClass.getDebugColor() : 'color: white; background-color: #E1901A', ...params);
}

/**
 * Show data in the development environment with specific formatting based on the type of data.
 *
 * @param {string} label - The label for the data
 * @param {any} data - The data to be displayed
 * @return {any} The formatted data based on its type
 */
export function showDataDevelopment(label: string, data: any) {
    if (_APP_ENVIRONMENT_ === EnvironmentEnum.DEVELOPMENT) {
        if (Array.isArray(data)) {
            return formatArrayWithBoldKeys(label, data);
        }
        else if (typeof data === 'object') {
            return formatJsonWithBoldKeys(label, data);
        } 
        else
            return formatParameter(label, data);
    }
}