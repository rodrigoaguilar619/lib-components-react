import { CNavItem } from "@coreui/react";
import { ROUTE_LOGOUT } from "./routesCatalog";
import { cilAccountLogout } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

export const NAV_LOGOUT = {
    component: CNavItem,
    name: 'Logout',
    to: ROUTE_LOGOUT,
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />
  };