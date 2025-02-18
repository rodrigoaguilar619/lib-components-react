import { AppMenusPropsDataI } from "@app/@types/components/layout/appMenuLayout";

export const ACTION_TEMPLATE_MENU_LIST_SET = "ACTION_TEMPLATE_MENU_LIST_SET";

export const setTemplateMenuListAction = (menus: AppMenusPropsDataI[]) => ({
    type: ACTION_TEMPLATE_MENU_LIST_SET,
    menus,
  });