export const ACTION_TEMPLATE_USER_RESTART = "ACTION_TEMPLATE_USER_RESTART";
export const ACTION_TEMPLATE_USER_DATA_SET = "ACTION_TEMPLATE_USER_DATA_SET";

export const setTemplateUserDataAction = (userName: string, userRols: string[]) => ({
    type: ACTION_TEMPLATE_USER_DATA_SET,
    userName: userName,
    userRols: userRols
  });

export const setTemplateUserRestartAction = () => ({
    type: ACTION_TEMPLATE_USER_RESTART,
    userName: "",
    userRols: [],
  })