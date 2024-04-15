import { Reducer } from "redux";
import { TemplateMenuActionI, TemplateMenuStateI } from "@app/@types/controller/reducers/templateMenuReducer";
import { ACTION_TEMPLATE_MENU_LIST_SET } from "@app/controller/actions/templateMenuAction";

const initialState: TemplateMenuStateI = {
  menus: []
}

export const templateMenuReducer: Reducer<TemplateMenuStateI, TemplateMenuActionI> = (state: TemplateMenuStateI = initialState, action: TemplateMenuActionI) => {
    switch (action.type) {
      case ACTION_TEMPLATE_MENU_LIST_SET:
        return { ...state, menus: action.menus }
      default:
        return state
    }
  }