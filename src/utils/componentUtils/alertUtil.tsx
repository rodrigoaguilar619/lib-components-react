import { AlertsDataI } from "@app/@types/components/alerts/alerts";
import { _APP_ALERT_TIME_TOAST_MILLIS_ } from "@app/catalogs/constantCatalog";
import { AlertTypeEnum, ComponentTypeEnum } from "@app/catalogs/enumCatalog";
import { removeTemplateAlertMessageAction, setTemplateAlertMessageAction } from "@app/controller/actions/templateAlertAction";

export const buildAlertRedux = (dispatch: any, type: ComponentTypeEnum, summary: string, message: string, alertType: AlertTypeEnum) => {
    
    let id: number = new Date().getTime();
    let timer: NodeJS.Timeout = setTimeout(() => {

        dispatch(removeTemplateAlertMessageAction(type, id));
        }, _APP_ALERT_TIME_TOAST_MILLIS_ );
    
    dispatch(setTemplateAlertMessageAction(type, summary, message, alertType, id, timer ));
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Builds a Redux alert for an error message.
 *
 * @param {any} dispatch - the Redux dispatch function
 * @param {string} message - The error message
 * @return {type} The constructed Redux alert
 */
export const buildAlertErrorRedux = (dispatch: any, componentType: ComponentTypeEnum, message: string) => {
    buildAlertRedux(dispatch, componentType, "ERROR", message, AlertTypeEnum.ERROR);
}

export const buildAlertSuccessRedux = (dispatch: any, componentType: ComponentTypeEnum, message: string) => {
    buildAlertRedux(dispatch, componentType, "SUCCESS", message, AlertTypeEnum.SUCCESS);
}

/**
 * Removes an alert from the Redux store based on the provided ID.
 *
 * @param {any} dispatch - the Redux dispatch function
 * @param {number} id - the ID of the alert to be removed
 * @return {void} 
 */
export const removeAlertRedux = (dispatch: any, type: ComponentTypeEnum, alertList: AlertsDataI[], id: number) => {

    alertList.forEach((message) => {
        if (message.id === id) {
            clearTimeout(message.timerShowMessageFunction);
        }
    });

    dispatch(removeTemplateAlertMessageAction(type, id));
}