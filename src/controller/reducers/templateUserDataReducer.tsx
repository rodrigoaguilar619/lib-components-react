import { Reducer } from "redux";
import { TemplateUserActionI, TemplateUserStateI } from "@app/@types/controller/reducers/templateUserReducer";
import { ACTION_TEMPLATE_USER_DATA_SET, ACTION_TEMPLATE_USER_RESTART } from "@app/controller/actions/templateUserDataAction";

const initialState: TemplateUserStateI = {
  userName: "",
  userRols: []
}

export const templateUserDataReducer: Reducer<TemplateUserStateI, any> = (state: TemplateUserStateI = initialState, action: TemplateUserActionI) => {
    switch (action.type) {
      case ACTION_TEMPLATE_USER_DATA_SET:
        return { ...state, userName: action.userName, userRols: action.userRols }
      case ACTION_TEMPLATE_USER_RESTART:
        return { ...state, userName: action.userName, userRols: action.userRols }
      default:
        return state
    }
  }