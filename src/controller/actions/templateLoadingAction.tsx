export const ACTION_TEMPLATE_LOADING_ACTIVE_MESSAGE_SET = "ACTION_TEMPLATE_LOADING_ACTIVE_MESSAGE_SET";
export const ACTION_TEMPLATE_LOADING_IS_ACTIVE_SET = "ACTION_TEMPLATE_LOADING_IS_ACTIVE_SET";

export const setTemplateLoadingActiveMessageAction = (isActive: boolean, text: string) => ({
    type: ACTION_TEMPLATE_LOADING_ACTIVE_MESSAGE_SET,
    isActive: isActive,
    text: text
  });

  export const setTemplateLoadingIsActiveAction = (isActive: boolean) => ({
    type: ACTION_TEMPLATE_LOADING_IS_ACTIVE_SET,
    isActive: isActive
  });