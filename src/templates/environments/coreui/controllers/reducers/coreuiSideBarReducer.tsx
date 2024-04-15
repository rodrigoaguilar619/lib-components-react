import { Reducer } from "redux";
import { REDUCER_SET_SIDEBAR_SHOW, REDUCER_SET_SIDEBAR_SHOW_REDUCE } from "@app/templates/environments/coreui/controllers/actions/coreuiSideBarAction";
import { CoreuiSideBarStateI, CoreuiSideBarActionI } from "@app/@types/templates/environments/coreui/controllers/reducers/coreuiSideBarReducer";

const initialState: CoreuiSideBarStateI = {
  sidebarShow: true,
  sidebarUnfoldable: false
}

export const coreuiSideBarReducer: Reducer<CoreuiSideBarStateI, CoreuiSideBarActionI> = (state: CoreuiSideBarStateI = initialState, action: CoreuiSideBarActionI) => {
    switch (action.type) {
      case REDUCER_SET_SIDEBAR_SHOW_REDUCE:
        return { ...state, sidebarUnfoldable: action.sidebarUnfoldable }
      case REDUCER_SET_SIDEBAR_SHOW:
        return { ...state, sidebarShow: action.sidebarShow }
      default:
        return state
    }
  }