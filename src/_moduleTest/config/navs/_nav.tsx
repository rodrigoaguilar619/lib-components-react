import { ROUTE_DATATABLE_DATA, ROUTE_DATATABLE_EXPAND_DATA, ROUTE_FORMS_FORM_INPUTS, ROUTE_FORMS_INPUT_ELEMENTS, ROUTE_FORMS_INPUTS_MULTIPLE } from '@app/_moduleTest/config/catalogs/routesCatalog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPuzzlePiece, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faWpforms } from '@fortawesome/free-brands-svg-icons'
import { ROUTE_LOGOUT } from '@app/catalogs/routesCatalog'
import { AppMenusPropsDataI } from '@app/@types/components/layout/appMenuLayout'

const _nav: AppMenusPropsDataI[] = [
  {
    text: 'Datatable',
    url: '/dataTable',
    icon: <FontAwesomeIcon icon={faPuzzlePiece} className="nav-icon" />,
    children: [
      {
        text: 'Datatable Data',
        url: ROUTE_DATATABLE_DATA,
      },
      {
        text: 'Datatable Expand Data',
        url: ROUTE_DATATABLE_EXPAND_DATA,
      },
    ],
  },
  {
    text: 'Forms',
    url: '/forms',
    icon: <FontAwesomeIcon icon={faWpforms} className="nav-icon" />,
    children: [
      {
        text: 'Input elements',
        url: ROUTE_FORMS_INPUT_ELEMENTS,
      },
      {
        text: 'Form inputs',
        url: ROUTE_FORMS_FORM_INPUTS,
      },
      {
        text: 'Form input multiple',
        url: ROUTE_FORMS_INPUTS_MULTIPLE,
      },
    ],
  },
  {
    text: 'Logout',
    url: ROUTE_LOGOUT,
    icon: <FontAwesomeIcon icon={faRightFromBracket} className="nav-icon" />
  }
]

export default _nav
