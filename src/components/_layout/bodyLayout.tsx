import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { BodyLayoutPropsI } from '@app/@types/components/layout/bodyLayout'
import { TemplateSessionStateI } from '@app/@types/controller/reducers/templateSessionReducer'
import { _APP_SECURITY_ENABLED_ } from '@app/catalogs/constantCatalog'
import { ROUTE_LOGIN } from '@app/catalogs/routesCatalog'
import { debug, generateDebugClassModule } from '@app/utils/webUtils/debugUtil';
import { verifySessionService } from '@app/controller/services/authService';
import { setTemplateLoadingActiveMessageAction } from '@app/controller/actions/templateLoadingAction';

const BodyLayout: React.FC<BodyLayoutPropsI> = (props) => {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowContent, setIsShowContent] = React.useState(false);

  const templateSessionState: TemplateSessionStateI = useSelector((state: any) => state.templateSessionState);

  useEffect(() => {

    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {

    if (_APP_SECURITY_ENABLED_)
      initVerifySession();
    else
      setIsShowContent(true);

}, [location, navigate]);

  const initVerifySession = () => {

    let debugClass = generateDebugClassModule("init verify session routes layout");
    debug(debugClass, "start");

    setIsShowContent(false);
    dispatch(setTemplateLoadingActiveMessageAction(true, "Verifying session..."));
    axios.all([verifySessionService()])
        .then(axios.spread((verifySessionData) => {

            debug(debugClass, "result", verifySessionData);

        }))
        .catch((error) => {
            debug(debugClass, "Error verifying session on routing", error);
            navigate(ROUTE_LOGIN, { state: { isSessionExpiredApp: true } });
        })
        .finally(() => {
            setIsShowContent(true);
        });
}

  return (<div>
      {templateSessionState.isRedirectLogout === true ? <Navigate to={ROUTE_LOGIN} state={{ isLogout: true }} /> : null}
      {templateSessionState.isSessionExpired === true ? <Navigate to={ROUTE_LOGIN} state={{ isSessionExpiredApp: true }} /> : null}
      {props.body(isShowContent)}
    </div>
  )
}

export default BodyLayout