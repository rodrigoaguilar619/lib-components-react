import { Reducer } from "redux";
import { TemplateSessionActionI, TemplateSessionStateI } from "@app/@types/controller/reducers/templateSessionReducer";
import { ACTION_TEMPLATE_SESSION_RESTART, ACTION_TEMPLATE_SESSION_REDIRECT_LOGOUT_SET, ACTION_TEMPLATE_SESSION_REDIRECT_EXPIRED_SET } from "@app/controller/actions/templateSessionAction";

const initialState: TemplateSessionStateI = {
  isRedirectLogout: false,
  isSessionExpired: false
}

export const templateSessionReducer: Reducer<TemplateSessionStateI, any> = (state: TemplateSessionStateI = initialState, action: TemplateSessionActionI) => {
    switch (action.type) {
      case ACTION_TEMPLATE_SESSION_REDIRECT_LOGOUT_SET:
        return { ...state, isRedirectLogout: action.isRedirectLogout }
      case ACTION_TEMPLATE_SESSION_REDIRECT_EXPIRED_SET:
        return { ...state, isSessionExpired: action.isSessionExpired }
      case ACTION_TEMPLATE_SESSION_RESTART:
        return { ...state, isRedirectLogout: action.isRedirectLogout, isSessionExpired: action.isSessionExpired }
      default:
        return state
    }
  }