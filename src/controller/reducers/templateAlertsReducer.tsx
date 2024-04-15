import { TemplateAlertStateI } from "@app/@types/controller/reducers/templateAlertsReducer";
import { ACTION_TEMPLATE_ALERT_MESSAGE_LIST_SET, ACTION_TEMPLATE_ALERT_MESSAGE_REMOVE, ACTION_TEMPLATE_ALERT_MESSAGE_SET } from "@app/controller/actions/templateAlertAction";
import { ComponentTypeEnum } from "@app/catalogs/enumCatalog";

const initialState: TemplateAlertStateI = {
    messages: [],
}

const templateAlertReducer = (type: ComponentTypeEnum) => {
    return function reducer(state: TemplateAlertStateI = initialState, action: any) {
        switch (action.type) {
            case ACTION_TEMPLATE_ALERT_MESSAGE_SET + "_" + type:
                return {
                    ...state, messages: [...state.messages,
                    {
                        message: action.message, alertType: action.alertType, id: action.id,
                        summary: action.summary, timerShowMessageFunction: action.timerShowMessageFunction
                    }]
                }
            case ACTION_TEMPLATE_ALERT_MESSAGE_LIST_SET + "_" + type:
                return { ...state, messages: action.messages }
            case ACTION_TEMPLATE_ALERT_MESSAGE_REMOVE + "_" + type:
                return { ...state, messages: state.messages.filter((message) => { if (message.id != action.id) return message }) }
            default:
                return state
        }
    }
}

export const buildTemplateAlertReducer = (type: ComponentTypeEnum) => {
    return templateAlertReducer(type);
}