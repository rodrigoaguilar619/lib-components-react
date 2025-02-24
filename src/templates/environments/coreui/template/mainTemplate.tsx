import React, { Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { MainTemplatePropsI } from '@app/@types/templates/environments/coreui/template/mainTemplate';
import LoginLayout from '@app/components/_layout/loginLayout';
import { _APP_CONTEXT_PATH_ } from '@app/catalogs/constantCatalog';

const MainLayout = React.lazy(() => import('./mainLayout'))

const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )

  const MainTemplate: React.FC<MainTemplatePropsI> = (props) => {

    function renderRoutesList() {
    
      let routesList: JSX.Element[] = [];
  
      if (props.loginTemplate != undefined)
          routesList.push(<Route key={'login'} index path={ _APP_CONTEXT_PATH_ + 'login'} element={<LoginLayout loginTemplate={props.loginTemplate} />} />);
  
      //routesList.push(<Route index path="/404" element={<Page404 />} />);
      routesList.push(<Route key={'main'} path="*" element={<MainLayout {...props} />} />);
  
      return routesList;
    }

    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            {renderRoutesList()}
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }

  export default MainTemplate