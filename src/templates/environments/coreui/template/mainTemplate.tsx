import { MainTemplatePropsI } from '@app/@types/templates/environments/coreui/template/mainTemplate';
import React, { Component, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

// Containers
const MainLayout = React.lazy(() => import('./mainLayout'))

// Pages
/*const Login = React.lazy(() => import('src/views/pages/login/Login'))
const Register = React.lazy(() => import('src/views/pages/register/Register'))
const Page404 = React.lazy(() => import('src/views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('src/views/pages/page500/Page500'))*/

const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )

class MainTemplate extends Component<MainTemplatePropsI> {

  constructor(props: MainTemplatePropsI) {
      super(props);
  }

    render() {
        return (
          <HashRouter>
            <Suspense fallback={loading}>
              <Routes>
                {//TODO: Develop components
                /*<Route index path="/login" element={<Login />} />
                <Route index path="/register" element={<Register />} />
                <Route index path="/404" element={<Page404 />} />
                <Route index path="/500" element={<Page500 />} />*/ }
                <Route path="*" element={<MainLayout {...this.props} />} />
              </Routes>
            </Suspense>
          </HashRouter>
        )
      }
}

export default MainTemplate;