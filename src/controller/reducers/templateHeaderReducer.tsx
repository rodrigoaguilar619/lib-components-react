import { Reducer } from "redux";
import { ACTION_TEMPLATE_HEADER_TITLE_SET, ACTION_TEMPLATE_HEADER_SUBTITLE_SET } from "@app/controller/actions/templateHeaderAction";
import { TemplateHeaderStateI, TemplateHeaderActionI } from "@app/@types/controller/reducers/templateHeaderReducer";
import { _APP_TITLE_ } from "@app/catalogs/constantCatalog";

const initialState: TemplateHeaderStateI = {
    title: _APP_TITLE_,
    subtitle: ""
}

export const templateHeaderReducer: Reducer<TemplateHeaderStateI, TemplateHeaderActionI> = (state: TemplateHeaderStateI = initialState, action: TemplateHeaderActionI) => {
    switch (action.type) {
      case ACTION_TEMPLATE_HEADER_TITLE_SET:
        return { ...state, title: action.title }
      case ACTION_TEMPLATE_HEADER_SUBTITLE_SET:
        return { ...state, subtitle: action.subtitle }
      default:
        return state
    }
  }