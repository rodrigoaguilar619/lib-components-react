import axios, { HttpStatusCode } from 'axios'
import React, { useEffect } from 'react'
import { LoginLayoutPropsI } from '@app/@types/components/layout/loginLayout'
import { _APP_CONTEXT_PATH_, _APP_ENVIRONMENT_ } from '@app/catalogs/constantCatalog'
import { EnvironmentEnum } from '@app/catalogs/enumCatalog'
import DebugClass from '@app/classes/debugClass'
import { loginService, verifySessionService } from '@app/controller/services/authService'
import { debug, debugError, generateDebugClassModule, showDataDevelopment } from '@app/utils/webUtils/debugUtil'
import {
    CCol,
    CContainer,
    CRow
} from '@coreui/react'
import { Navigate } from 'react-router-dom'

const LoginLayout: React.FC<LoginLayoutPropsI> = (props) => {

    const [isRedirect, setIsRedirect] = React.useState(false);
    const [isSessionExpired, setIsSessionExpired] = React.useState(false);
    const [isLoginError, setIsLoginError] = React.useState(false);
    const [currentMessage, setCurrentMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [loadingText, setLoadingText] = React.useState("Loading...");
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');

    useEffect(() => {

        if (localStorage.getItem('userName') != undefined && localStorage.getItem('token') != undefined) {
            initVerifySession();
        }

    }, []);

    async function pauseExecution(seconds: number) {
        await new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    const manageSessionExpired = (debugClass: DebugClass, error: any) => {

        let errorMessage = "";

        if (error.response !== undefined) {

            if (error.response.status === HttpStatusCode.Unauthorized) {
                setIsSessionExpired(true);
                errorMessage = "Session expired";

                localStorage.removeItem('userName');
                localStorage.removeItem('token');
            }
            else {
                setIsLoginError(true);
                errorMessage = "Error with status: " + error.response.status;
            }
        }

        setCurrentMessage(errorMessage);
        debugError(debugClass, "<" + errorMessage + ">", error);
    }

    const manageLoginError = (debugClass: DebugClass, error: any) => {

        let errorMessage = "";

        if (error.response !== undefined) {

            if (error.response.status === HttpStatusCode.UnprocessableEntity) {
                errorMessage = error.response.data.message;
            }
            else
                errorMessage = "Error with status: " + error.response.status;
        }

        setIsLoginError(true);
        setCurrentMessage(errorMessage);
        debugError(debugClass, "<" + errorMessage + ">", error);
    }

    const initVerifySession = () => {

        let debugClass = generateDebugClassModule("init verify session");
        debug(debugClass, "start");

        setIsLoading(true);
        setLoadingText("Verifying session...");
        axios.all([verifySessionService()])
            .then(axios.spread((verifySessionData) => {

                debug(debugClass, "result", verifySessionData);
                setIsRedirect(true);

            }))
            .catch((error) => {
                manageSessionExpired(debugClass, error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const executeSubmitLogin = async () => {

        let debugClass = generateDebugClassModule("init submit login");
        debug(debugClass, "start");

        setIsLoginError(false);
        setIsSessionExpired(false);
        setIsLoading(true);
        setLoadingText("Logging in...");
        await pauseExecution(1);
        axios.all([loginService(userName, password)])
            .then(axios.spread((loginData) => {

                debug(debugClass, "result", loginData);
                localStorage.setItem('userName', loginData.data.userName);
                localStorage.setItem('token', loginData.data.token);
                setIsRedirect(true);

            }))
            .catch((error) => {
                manageLoginError(debugClass, error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const renderDevData = () => {

        if (_APP_ENVIRONMENT_ !== EnvironmentEnum.DEVELOPMENT)
            return;

        return (<div className="bg-light d-flex flex-row">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={4}>
                        {showDataDevelopment("isSessionExpired", isSessionExpired + "")}
                        {showDataDevelopment("isLoginError", isLoginError + "")}
                        {showDataDevelopment("userName", userName)}
                        {showDataDevelopment("password", password)}
                    </CCol>
                </CRow>
            </CContainer>
        </div>)
    }

    return (
        <div>
            {renderDevData()}
            {isRedirect ? <Navigate to={_APP_CONTEXT_PATH_} replace /> : null}
            <props.loginTemplate
            isLoading={isLoading}
            loadingText={loadingText}
            isSessionExpired={isSessionExpired}
            isLoginError={isLoginError}
            currentMessage={currentMessage}
            updateUserName={setUserName}
            updatePassword={setPassword}
            executeSubmitLogin={executeSubmitLogin}
            />
        </div>
    )
}

export default LoginLayout