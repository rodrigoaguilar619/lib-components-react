export const _APP_ENVIRONMENT_: string = process.env.NODE_ENV;                          //environment (development|production)
export const _APP_TITLE_: string = process.env.APP_TITLE ?? "TITLE DEFAULT";            //app title to shoe on header
export const _APP_ROUTE_START_: string = process.env.APP_ROUTE_START ?? "/";            //main route to start when page starts
export const _APP_URL_CONTEXT_PATH_: string = process.env.APP_URL_CONTEXT_PATH ?? "/";  //context path of project. Ex: https://www.project.com
export const _APP_ALERT_TIME_TOAST_MILLIS_: number = Number(process.env.APP_ALERT_TIME_TOAST_MILLIS ?? 5000);   //time in millis for alerts duration to disappear
export const _APP_REDUX_IS_LOAD_LOGGER_: boolean = JSON.parse(process.env.APP_REDUX_IS_LOAD_LOGGER ?? "true");  //boolean for define if load redux logger console for browser devtools
export const _APP_API_MOCK_IS_LOAD_: boolean = JSON.parse(process.env.APP_API_MOCK_IS_LOAD ?? "true");          //boolean to determine if load mock apis