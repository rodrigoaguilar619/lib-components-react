import { TemplateAlertMessageDataI } from "@app/@types/controller/reducers/templateAlertsReducer";
import { AlertTypeEnum, ComponentTypeEnum } from "@app/catalogs/enumCatalog";

export const ACTION_TEMPLATE_ALERT_MESSAGE_SET = "ACTION_TEMPLATE_ALERT_MESSAGE_SET";
export const ACTION_TEMPLATE_ALERT_MESSAGE_LIST_SET = "ACTION_TEMPLATE_ALERT_MESSAGE_LIST_SET";
export const ACTION_TEMPLATE_ALERT_MESSAGE_REMOVE = "ACTION_TEMPLATE_ALERT_MESSAGE_REMOVE";

export const setTemplateAlertMessageAction = (type: ComponentTypeEnum, summary: string, message: string, alertType: AlertTypeEnum, id: number, timerShowMessageFunction: NodeJS.Timeout) => ({
    type: ACTION_TEMPLATE_ALERT_MESSAGE_SET + "_" + type,
    message: message,
    alertType: alertType,
    id: id,
    summary: summary,
    timerShowMessageFunction: timerShowMessageFunction
});

export const setTemplateAlertMessagesAction = (type: ComponentTypeEnum, messages: TemplateAlertMessageDataI) => ({
    type: ACTION_TEMPLATE_ALERT_MESSAGE_LIST_SET + "_" + type,
    messages: messages
});

export const removeTemplateAlertMessageAction = (type: ComponentTypeEnum, id: number) => ({
    type: ACTION_TEMPLATE_ALERT_MESSAGE_REMOVE + "_" + type,
    id: id
});