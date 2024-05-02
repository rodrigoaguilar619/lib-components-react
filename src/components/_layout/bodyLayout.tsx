import { BodyLayoutPropsI } from '@app/@types/components/layout/bodyLayout'
import { _APP_SECURITY_ENABLED_ } from '@app/catalogs/constantCatalog'
import { ROUTE_LOGIN } from '@app/catalogs/routesCatalog'
import { refreshSessionService } from '@app/controller/services/authService'
import { debug, generateDebugClassModule } from '@app/utils/webUtils/debugUtil'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const BodyLayout: React.FC<BodyLayoutPropsI> = (props) => {

  const location = useLocation();
  const [isShowContent, setIsShowContent] = React.useState(false);
  const [isRedirect, setIsRedirect] = React.useState(false);

  useEffect(() => {
    
    if(_APP_SECURITY_ENABLED_ === true && location.pathname !== ROUTE_LOGIN) {
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
        console.log("test error ", ROUTE_LOGIN);
        setIsRedirect(true);
      });
  }

  return (<div>
      {isRedirect ? <Navigate to={ROUTE_LOGIN} replace /> : null}
      {props.body(isShowContent)}
    </div>
  )
}

export default BodyLayout