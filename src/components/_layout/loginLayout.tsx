import { Navigate, useLocation } from 'react-router-dom'
import { setRedirectSessionRestart } from '@app/utils/webUtils/httpManagerUtil'
import { useDispatch } from 'react-redux'
import axios, { HttpStatusCode } from 'axios'
import React, { useEffect } from 'react'
import {
    CCol,
    CContainer,
    CRow
} from '@coreui/react'
import { LoginLayoutPropsI } from '@app/@types/components/layout/loginLayout'
import { _APP_ENVIRONMENT_ } from '@app/catalogs/constantCatalog'
import { ComponentLoginMessageTypeEnum, EnvironmentEnum } from '@app/catalogs/enumCatalog'
import DebugClass from '@app/classes/debugClass'
import { loginService, verifySessionService } from '@app/controller/services/authService'
import { debug, debugError, generateDebugClassModule, showDataDevelopment } from '@app/utils/webUtils/debugUtil'

const LoginLayout: React.FC<LoginLayoutPropsI> = (props) => {

    window.history.replaceState({}, '')
    
    const dispatch = useDispatch();
    let location = useLocation();
    const [isRedirect, setIsRedirect] = React.useState(false);
    const [messageType, setMessageType] = React.useState<ComponentLoginMessageTypeEnum | undefined>(undefined);
    const [currentMessage, setCurrentMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [loadingText, setLoadingText] = React.useState("Loading...");
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');

    useEffect(() => {

        setRedirectSessionRestart(dispatch);
        if ( !location.state?.isLogout && localStorage.getItem('userName') != undefined && localStorage.getItem('token') != undefined) {
            initVerifySession();
        }

    }, []);

    useEffect(() => {
        if (location.state?.isSessionExpiredApp)
            setMessageType(ComponentLoginMessageTypeEnum.SESSION_EXPIRED);
        else if (location.state?.isLogout)
            setMessageType(ComponentLoginMessageTypeEnum.LOGOUT);

    }, [location.state]);

    async function pauseExecution(seconds: number) {
        await new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    const manageSessionExpired = (debugClass: DebugClass, error: any) => {

        let errorMessage = "";

        if (error.response !== undefined) {

            if (error.response.status === HttpStatusCode.Unauthorized) {
                setMessageType(ComponentLoginMessageTypeEnum.SESSION_EXPIRED);

                localStorage.removeItem('userName');
                localStorage.removeItem('token');
            }
            else {
                setMessageType(ComponentLoginMessageTypeEnum.ERROR);
                setCurrentMessage(errorMessage);
                errorMessage = "Error with status: " + error.response.status;
            }
        }

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

        setMessageType(ComponentLoginMessageTypeEnum.ERROR);
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
                        {showDataDevelopment("messageType", messageType)}
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
            {isRedirect ? <Navigate to={"/"} replace /> : null}
            <props.loginTemplate
            isLoading={isLoading}
            loadingText={loadingText}
            messageType={messageType}
            currentMessage={currentMessage}
            updateUserName={setUserName}
            updatePassword={setPassword}
            executeSubmitLogin={executeSubmitLogin}
            />
        </div>
    )
}

export default LoginLayout