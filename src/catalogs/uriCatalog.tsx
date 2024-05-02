import { _APP_URL_CONTEXT_PATH_ } from "@app/catalogs/constantCatalog";

const _URL_API_MAIN_ = _APP_URL_CONTEXT_PATH_;
export const URL_AUTH_LOGIN = _URL_API_MAIN_ + "auth/login";
export const URL_VALIDATE_SESSION = _URL_API_MAIN_ + "auth/validateSession";
export const URL_REFRESH_SESSION = _URL_API_MAIN_ + "auth/refresh";