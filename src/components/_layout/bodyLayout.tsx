import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { BodyLayoutPropsI } from '@app/@types/components/layout/bodyLayout'
import { TemplateSessionStateI } from '@app/@types/controller/reducers/templateSessionReducer'
import { _APP_SECURITY_ENABLED_ } from '@app/catalogs/constantCatalog'
import { ROUTE_LOGIN } from '@app/catalogs/routesCatalog'
import { debug, generateDebugClassModule } from '@app/utils/webUtils/debugUtil';
import { getUserDataService, verifySessionService } from '@app/controller/services/authService';
import { setTemplateLoadingActiveMessageAction, setTemplateLoadingIsActiveAction } from '@app/controller/actions/templateLoadingAction';
import { setTemplateUserDataAction } from '@app/controller/actions/templateUserDataAction'

const BodyLayout: React.FC<BodyLayoutPropsI> = (props) => {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowContent, setIsShowContent] = React.useState(false);
  const [isSessionVerified, setIsSessionVerified] = React.useState(false);

  const templateSessionState: TemplateSessionStateI = useSelector((state: any) => state.templateSessionState);

  useEffect(() => {

    axios.all([initVerifySession()])
      .then(() => {
        return axios.all([initGetUserData()])
      })
      .then(() => {
        setIsShowContent(true);
      });
  }, []);

  useEffect(() => {

    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
      initVerifySession();
}, [location, navigate]);

  const initVerifySession = () => {

    if (_APP_SECURITY_ENABLED_ === false) {
      setIsSessionVerified(true);
      return;
    }

    if(localStorage.getItem('userName') == undefined || localStorage.getItem('token') == undefined
      || localStorage.getItem('userName') == null || localStorage.getItem('token') == null) {
      navigate(ROUTE_LOGIN);
      return;
    }

    let debugClass = generateDebugClassModule("init verify session routes layout");
    debug(debugClass, "start");

    setIsSessionVerified(false);
    dispatch(setTemplateLoadingActiveMessageAction(true, "Verifying session..."));
    return axios.all([verifySessionService()])
        .then(axios.spread((verifySessionData) => {

            debug(debugClass, "result", verifySessionData);

        }))
        .catch((error) => {
            debug(debugClass, "Error verifying session on routing", error);
            navigate(ROUTE_LOGIN, { state: { isSessionExpiredApp: true } });
        })
        .finally(() => {
          dispatch(setTemplateLoadingIsActiveAction(false));
          setIsSessionVerified(true);
        });
}

  const initGetUserData = () => {

    let debugClass = generateDebugClassModule("init get user data");
    debug(debugClass, "start");

    dispatch(setTemplateLoadingActiveMessageAction(true, "Getting user data..."));
    return axios.all([getUserDataService()])
        .then(axios.spread((userData) => {

            debug(debugClass, "result", userData);
            dispatch(setTemplateUserDataAction(userData.data.userName, userData.data.userRols));

        }))
        .catch((error) => {
            debug(debugClass, "Error getting user data", error);
        })
        .finally(() => {
          dispatch(setTemplateLoadingIsActiveAction(false));
        });
  }

  return (<div>
      {templateSessionState.isRedirectLogout === true ? <Navigate to={ROUTE_LOGIN} state={{ isLogout: true }} /> : null}
      {templateSessionState.isSessionExpired === true ? <Navigate to={ROUTE_LOGIN} state={{ isSessionExpiredApp: true }} /> : null}
      {props.body(isSessionVerified && isShowContent)}
    </div>
  )
}

export default BodyLayout