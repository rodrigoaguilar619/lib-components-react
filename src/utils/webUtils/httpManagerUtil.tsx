import { HttpStatusCode } from "axios";
import DebugClass from "@app/classes/debugClass";
import { axiosInstance } from "./axiosUtil";
import { ComponentTypeEnum, HttpMethodEnum } from "@app/catalogs/enumCatalog";
import { debug, debugError } from "./debugUtil";
import { buildAlertErrorRedux } from "@app/utils/componentUtils/alertUtil";

/**
 * Manages the API call with authentication and returns a Promise.
 *
 * @param {DebugClass} debugClass - the debug class for logging
 * @param {string} url - the URL for the API call
 * @param {Record<string, any>} params - the parameters for the API call
 * @param {Record<string, any>} config - the configuration for the API call
 * @param {HttpMethodEnum} httpMethod - the HTTP method for the API call
 * @return {Promise<any>} a Promise that resolves to the response data or rejects with an error
 */
export function manageCallApiAuthPromise(debugClass: DebugClass, url: string, params: Record<string, any>, config: Record<string, any>, httpMethod: HttpMethodEnum) {

    debug(debugClass, "start", { url: url, params });

    const axiosMethod = httpMethod === HttpMethodEnum.POST ? axiosInstance.post : axiosInstance.get;

    return axiosMethod(url, params, config)
        .then(({ data }) => {

            debug(debugClass, "result", data);
            return Promise.resolve(data);
        })
        .catch((error) => {
            debugError(debugClass, error);
            return Promise.reject(error);
        });
}

/**
 * Manages error handling for the alert module.
 *
 * @param {any} store - The store object for managing state
 * @param {DebugClass} debugClass - The debug class for logging errors
 * @param {any} error - The error object to be managed
 * @return {void} 
 */
export function manageAlertModuleError(dispatch: any, componentType: ComponentTypeEnum, debugClass: DebugClass, error: any) {

    try {

        let errorMessage = "";

        if (error.response !== undefined) {
            
            if(error.response.status === HttpStatusCode.UnprocessableEntity) {
                errorMessage = error.response.data.message;
            }
            else if(error.response.status === HttpStatusCode.NotFound) {
                errorMessage = "Error api not found";
            }
            else if(error.response.status === HttpStatusCode.InternalServerError) {
                errorMessage = "Error internal server";
            }
            else
                errorMessage = "Error with status:" + error.response.status;
        }
        else if (error.message !== undefined) {
            errorMessage = error.message;
        }
        else
            errorMessage = "Error unhandled";

        debugError(debugClass, "<" + errorMessage + ">", error);
        buildAlertErrorRedux(dispatch, componentType, errorMessage);
    }
    catch(errorCatch) {
        debugError(debugClass, "Error manage module", errorCatch);
    }
}