import { Reducer } from "redux"
import { TemplateLoadingStateI } from "@app/@types/controller/reducers/templateLoadingReducer"
import { ACTION_TEMPLATE_LOADING_ACTIVE_MESSAGE_SET, ACTION_TEMPLATE_LOADING_IS_ACTIVE_SET } from "@app/controller/actions/templateLoadingAction"

const initialState: TemplateLoadingStateI = {
    isActive: false,
    text: "Loading"
}

export const templateLoadingReducer: Reducer<TemplateLoadingStateI, any> = (state: TemplateLoadingStateI = initialState, action: any) => {
    switch (action.type) {
        case ACTION_TEMPLATE_LOADING_ACTIVE_MESSAGE_SET:
            return { ...state, isActive: action.isActive, text: action.text }
        case ACTION_TEMPLATE_LOADING_IS_ACTIVE_SET:
            return { ...state, isActive: action.isActive }
        default:
            return state
    }
}