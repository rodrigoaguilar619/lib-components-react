import { Location, NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { setRedirectLogoutAction, setRedirectSessionRestartAction, setSessionExpiredAction } from "@app/controller/actions/templateSessionAction";

export function getContextPath(): string {
    const contextPath = window.location.origin.replace("#", "") + window.location.pathname.replace("#/", "");
    return contextPath;
}

export function getSafeLocation(): Location | null {
    try {
        return useLocation();
    } catch (error) {
        return null;
    }
}

export function getSafeNavigate(): NavigateFunction | null {
    try {
        return useNavigate();
    } catch (error) {
        return null;
    }
}

export function redirectSamePage(navigate: NavigateFunction | null, uri: string, params: Record<string, any>) {
    if (navigate != null) {
        navigate(uri, { state: { ...params } });
    }
    else {
        window.location.href = getContextPath() + "#" + uri + "?" + new URLSearchParams(params).toString();
    }
}

export function redirectSessionExpired(dispatch: any, isSessionExpired: boolean) {
    dispatch(setSessionExpiredAction(isSessionExpired));
}
export function redirectLogout(dispatch: any, isRedirectLogout: boolean) {
    dispatch(setRedirectLogoutAction(isRedirectLogout));
}

export function setRedirectSessionRestart(dispatch: any) {
    dispatch(setRedirectSessionRestartAction());
}