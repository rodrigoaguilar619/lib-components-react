import CIcon from '@coreui/icons-react'
import {
  cilPuzzle,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { ROUTE_DATATABLE_DATA, ROUTE_FORMS_FORM_INPUTS, ROUTE_FORMS_INPUT_ELEMENTS, ROUTE_FORMS_INPUTS_MULTIPLE } from '@app/_moduleTest/config/catalogs/routesCatalog'

const _nav = [
  {
    component: CNavTitle,
    name: 'Modules',
  },
  {
    component: CNavGroup,
    name: 'Datatable',
    to: '/dataTable',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Datatable Data',
        to: ROUTE_DATATABLE_DATA,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    to: '/forms',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Input elements',
        to: ROUTE_FORMS_INPUT_ELEMENTS,
      },
      {
        component: CNavItem,
        name: 'Form inputs',
        to: ROUTE_FORMS_FORM_INPUTS,
      },
      {
        component: CNavItem,
        name: 'Form input multiple',
        to: ROUTE_FORMS_INPUTS_MULTIPLE,
      },
    ],
  }
]

export default _nav
