import 'react-app-polyfill/stable'
import 'core-js'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './controller/store/store'
import { initConfigMocks } from '@app/utils/webUtils/axiosUtil'
import { _APP_API_MOCK_IS_LOAD_, _APP_ROUTE_START_ } from '@app/catalogs/constantCatalog'
import MainApp from '@app/templates/environments/coreui/mainApp'
import routes from '@app/_moduleTest/config/routers/routes'
import _nav from '@app/_moduleTest/config/navs/_nav'
import { mockApiConfigList } from './config/mock/mockApiConfig'

const App = () => {

  useEffect(() => {

    if (_APP_API_MOCK_IS_LOAD_ === true) {
      console.log("DEV: init configs mocks");
      initConfigMocks(mockApiConfigList);
    }
  }, []);

  return (
    <Provider store={store}>
    <MainApp
      routesSection={{ routes: routes, routeStart: _APP_ROUTE_START_ }}
      menusSection={{ menuItems: _nav, isFromApi: false }}
    />
    </Provider>)
}

export default App