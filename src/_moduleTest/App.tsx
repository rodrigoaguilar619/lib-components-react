import 'react-app-polyfill/stable'
import 'core-js'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './controller/store/store'
import { initConfigMocks as initConfigMocksAxios } from '@app/utils/webUtils/axiosUtil'
import { initConfigMocks as initConfigMocksFetch } from '@app/utils/webUtils/fetchUtil'
import { _APP_API_MOCK_IS_LOAD_, _APP_ROUTE_START_ } from '@app/catalogs/constantCatalog'
import MainApp from '@app/templates/environments/coreui/mainApp'
//import MainApp from '@app/templates/environments/primeReact/mainApp'
import routes from '@app/_moduleTest/config/routers/routes'
import _nav from '@app/_moduleTest/config/navs/_nav'
import { mockApiConfigList } from './config/mock/mockApiConfig'
import LoginCoreUI from '@app/templates/logins/loginCoreUI'

const App = () => {

  useEffect(() => {

    if (_APP_API_MOCK_IS_LOAD_ === true) {
      console.warn("DEV: init configs mocks");
      initConfigMocksAxios(mockApiConfigList);
      initConfigMocksFetch(mockApiConfigList);
    }
  }, []);

  return (
    <Provider store={store}>
    <MainApp
      routesSection={{ routes: routes, routeStart: _APP_ROUTE_START_ }}
      menusSection={{ menuItems: _nav }}
      loginTemplate={LoginCoreUI}
    />
    </Provider>)
}

export default App