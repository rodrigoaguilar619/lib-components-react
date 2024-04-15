import { Reducer } from "redux";
import { TemplateFooterActionI, TemplateFooterStateI } from "@app/@types/controller/reducers/templateFooterReducer";
import { ACTION_TEMPLATE_FOOTER_TEXT_SET } from "@app/controller/actions/templateFooterAction";

const initialState: TemplateFooterStateI = {
    text: "",
}

export const templateFooterReducer: Reducer<TemplateFooterStateI, TemplateFooterActionI> = (state: TemplateFooterStateI = initialState, action: TemplateFooterActionI) => {
    switch (action.type) {
      case ACTION_TEMPLATE_FOOTER_TEXT_SET:
        return { ...state, text: action.text }
      default:
        return state
    }
  }