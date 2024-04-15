import { TemplateMenuDataI } from "@app/@types/controller/reducers/templateMenuReducer";

export const ACTION_TEMPLATE_MENU_LIST_SET = "ACTION_TEMPLATE_MENU_LIST_SET";

export const setTemplateMenuListAction = (menus: TemplateMenuDataI[]) => ({
    type: ACTION_TEMPLATE_MENU_LIST_SET,
    menus,
  });