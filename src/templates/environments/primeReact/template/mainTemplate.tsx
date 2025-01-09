import React, { Component, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { MainTemplatePropsI } from '@app/@types/templates/environments/primeReact/template/mainTemplate';
import LoginLayout from '@app/components/_layout/loginLayout';
import { _APP_CONTEXT_PATH_ } from '@app/catalogs/constantCatalog';

const MainLayout = React.lazy(() => import('./mainLayout'))

const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )

class MainTemplate extends Component<MainTemplatePropsI> {

  constructor(props: MainTemplatePropsI) {
      super(props);
  }

  renderRoutesList() {
    
    let routesList: JSX.Element[] = [];

    if (this.props.loginTemplate != undefined)
        routesList.push(<Route key={'login'} index path={ _APP_CONTEXT_PATH_ + 'login'} element={<LoginLayout loginTemplate={this.props.loginTemplate} />} />);

    //routesList.push(<Route index path="/404" element={<Page404 />} />);
    routesList.push(<Route key={'main'} path="*" element={<MainLayout {...this.props} />} />);

    return routesList;
  }

    render() {
        return (
          <HashRouter>
            <Suspense fallback={loading}>
              <Routes>
                {this.renderRoutesList()}
              </Routes>
            </Suspense>
          </HashRouter>
        )
      }
}

export default MainTemplate;