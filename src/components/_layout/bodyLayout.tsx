import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { BodyLayoutPropsI } from '@app/@types/components/layout/bodyLayout'
import { TemplateSessionStateI } from '@app/@types/controller/reducers/templateSessionReducer'
import { _APP_SECURITY_ENABLED_ } from '@app/catalogs/constantCatalog'
import { ROUTE_LOGIN, ROUTE_LOGOUT } from '@app/catalogs/routesCatalog'
import { refreshSessionService } from '@app/controller/services/authService'
import { debug, generateDebugClassModule } from '@app/utils/webUtils/debugUtil'

const BodyLayout: React.FC<BodyLayoutPropsI> = (props) => {

  const location = useLocation();
  const [isShowContent, setIsShowContent] = React.useState(false);
  const [isRedirect, setIsRedirect] = React.useState(false);

  const templateSessionState: TemplateSessionStateI = useSelector((state: any) => state.templateSessionState);

  useEffect(() => {
    
    if(_APP_SECURITY_ENABLED_ === true && location.pathname !== ROUTE_LOGIN && location.pathname !== ROUTE_LOGOUT) {
      console.warn("init refresh session");
      initRefreshSession();
    }
    
    if(_APP_SECURITY_ENABLED_ !== true)
      setIsShowContent(true);

    window.scrollTo(0, 0);
  }, [location.pathname]);

  const initRefreshSession = () => {

    let debugClass = generateDebugClassModule("init refresh session");
    debug(debugClass, "start");

    setIsShowContent(false);
    axios.all([refreshSessionService()])
      .then(axios.spread((refreshSessionData) => {

        debug(debugClass, "result", refreshSessionData);
        setIsShowContent(true);
      }))
      .catch((error) => {
        setIsRedirect(true);
      });
  }

  return (<div>
      {isRedirect ? <Navigate to={ROUTE_LOGIN} /> : null}
      {templateSessionState.isRedirectLogout === true ? <Navigate to={ROUTE_LOGIN} state={{ isLogout: true }} /> : null}
      {templateSessionState.isSessionExpired === true ? <Navigate to={ROUTE_LOGIN} state={{ isSessionExpiredApp: true }} /> : null}
      {props.body(isShowContent)}
    </div>
  )
}

export default BodyLayout