export const ACTION_TEMPLATE_SESSION_RESTART = "ACTION_TEMPLATE_SESSION_RESTART";
export const ACTION_TEMPLATE_SESSION_REDIRECT_LOGOUT_SET = "ACTION_TEMPLATE_SESSION_REDIRECT_LOGOUT_SET";
export const ACTION_TEMPLATE_SESSION_REDIRECT_EXPIRED_SET = "ACTION_TEMPLATE_SESSION_REDIRECT_EXPIRED_SET";

export const setRedirectLogoutAction = (isRedirectLogout: boolean) => ({
    type: ACTION_TEMPLATE_SESSION_REDIRECT_LOGOUT_SET,
    isRedirectLogout,
  });

export const setSessionExpiredAction = (isSessionExpired: boolean) => ({
    type: ACTION_TEMPLATE_SESSION_REDIRECT_EXPIRED_SET,
    isSessionExpired
  });

export const setRedirectSessionRestartAction = () => ({
    type: ACTION_TEMPLATE_SESSION_RESTART,
    isRedirectLogout: false,
    isSessionExpired: false
  })