import { HttpMethodEnum } from "@app/catalogs/enumCatalog";
import { generateDebugClassService } from "@app/utils/webUtils/debugUtil";
import { manageCallApiAuthPromise } from "@app/utils/webUtils/httpManagerUtil";
import { URL_AUTH_LOGIN, URL_AUTH_LOGOUT, URL_REFRESH_SESSION, URL_VALIDATE_SESSION } from "@app/catalogs/uriCatalog";

export function loginService(username: string, password: string) {

    let debugClass = generateDebugClassService("Login user");

    let params = { userName: username, pwd: password };
    let url = URL_AUTH_LOGIN;
    
    return manageCallApiAuthPromise(debugClass, url, params, {}, HttpMethodEnum.POST);
}

export function logoutService() {

    let debugClass = generateDebugClassService("Logout user");

    let params = {};
    let url = URL_AUTH_LOGOUT;
    
    return manageCallApiAuthPromise(debugClass, url, params, {}, HttpMethodEnum.POST);
}

export function verifySessionService() {

    let debugClass = generateDebugClassService("Verify Session");

    let params = {};
    let url = URL_VALIDATE_SESSION;
    
    return manageCallApiAuthPromise(debugClass, url, params, {}, HttpMethodEnum.POST);
}

export function refreshSessionService() {

    let debugClass = generateDebugClassService("Refresh Session");

    let params = {};
    let url = URL_REFRESH_SESSION;
    
    return manageCallApiAuthPromise(debugClass, url, params, {}, HttpMethodEnum.POST);
}