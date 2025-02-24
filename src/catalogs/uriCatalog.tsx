import { _APP_URL_CONTEXT_PATH_ } from "@app/catalogs/constantCatalog";

const _URL_API_MAIN_ = _APP_URL_CONTEXT_PATH_;
export const URL_AUTH_LOGIN = _URL_API_MAIN_ + "auth/login";
export const URL_AUTH_LOGOUT = _URL_API_MAIN_ + "auth/logout";
export const URL_VALIDATE_SESSION = _URL_API_MAIN_ + "auth/validateSession";
export const URL_REFRESH_SESSION = _URL_API_MAIN_ + "auth/refresh";
export const URL_API_USER_DATA_GET = _URL_API_MAIN_ + "api/user/getUserData";