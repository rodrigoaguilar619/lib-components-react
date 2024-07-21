# Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Structure
    - @types. Typescript definitions
    - catalogs. Definition of default catalogs for input types, auth configuracion and routes
    - components. Implementation of datatable, forms, modals, and tooltip components
    - _ModuleTest. Module to implement components as examples of how they work
    - _tests. Unit tests
    - utils. Utilities
    - webpack. Webpack configuration
    - templates. Templates and logins where the layout structure of the app is defined

## How to implement layout in your project

### `Define menu navs in your project.`
In the project directory, add the menu navs in the navs file. Example:
```javascript
const _nav = [
  {
    component: CNavTitle,
    name: 'Modules',
  },
  {
    component: CNavItem,
    name: 'Module',
    to: '/module',
    icon: <CIcon icon={cilViewModule} customClassName="nav-icon" />,
  }
]
```

### `Define routes in your project`
In the project directory, add the routes in the routes file. Example:
```javascript
let routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/admin', name: 'Admin', element: () => <AdminComponent /> },
  { path: '/module', name: 'Module', element: () => <ModuleComponent /> }
]
```

### `Define mock axios in your project`
In the project directory, add the mock axios in the mock file. Example:
```javascript
export const mockApiConfigList = [
    { method: 'post', url: "/admin/data", response: { id: 1, title: 'Mocked Post' }, status: 200 },
    { method: 'post', url: "/admin/export", response: { message: "error business logic" }, status: 422 }
  ];
```

### `Add the layout in your project`
In the project directory, add the layout component in the layout file. Import menus, mock, SCSS and routes. Example:
```javascript
import 'react-app-polyfill/stable'
import 'core-js'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { mockApiConfigList } from './config/mock/mockApiConfig'
import { initConfigMocks } from 'lib-components-react/lib/utils/webUtils/axiosUtil'
import { _APP_API_MOCK_IS_LOAD_, _APP_ROUTE_START_ } from 'lib-components-react/lib/catalogs/constantCatalog'
import MainApp from 'lib-components-react/lib/templates/environments/coreui/mainApp'
import LoginCoreUI from 'lib-components-react/lib/templates/logins/loginCoreUI'
import routes from '@app/_projectConfig/config/routers/routes'
import _nav from '@app/_projectConfig/config/navs/_nav'
import store from '@app/controller/stores/store'
import '@app/scss/style.scss';

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
      routesSection={{ routes: routes, routeStart: _APP_ROUTE_START_  }}
      menusSection={{ menuItems: _nav, isFromApi: false }}
      loginTemplate={LoginCoreUI}
    />
    </Provider>)
}

export default App
```


## Available Scripts
In the project directory, you can run:

### `npm run start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run start-dev`
Runs the app in the development mode with webpack dev server and hot reload.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build-publish-scss`
Build the scss on the project into /lib

### `npm run build-publish-types`
Build the types in src/@types on the project into /lib

### `npm run build-publish-tsc`
Transpile the project typescript code into /lib

### `npm run build-publish`
Build the scss on the project into /lib
Build the types in src/@types on the project into /lib
Transpile the project typescript code into /lib

### `npm run build-dev`
Build project with webpack in mode development

### `npm run build-prod`
Build project with webpack in mode production

### `npm run sonarqube`
Scan project with sonarqube

### `npm run test`
Launches the test runner with jest.