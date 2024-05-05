import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarNav, CSidebarToggler } from '@coreui/react'
import SimpleBar from 'simplebar-react'

import { setSidebarShowFoldableAction, setSidebarShowAction } from '@app/templates/environments/coreui/controllers/actions/coreuiSideBarAction';
import { CoreuiSideBarStateI } from '@app/@types/templates/environments/coreui/controllers/reducers/coreuiSideBarReducer'
import { SidebarNavLayout } from './sidebarNavLayout'
import { AppMenusItemsPropsDataI, AppMenusPropsI } from '@app/@types/components/layout/appMenuLayout';
import { NAV_LOGOUT } from '@app/catalogs/navCatalog';
import { _APP_NAV_LOGOUT_ENABLED_ } from '@app/catalogs/constantCatalog';

const MenuLayout: React.FC<AppMenusPropsI> = (props) => {
  const dispatch = useDispatch();
  const coreuiSideBarState: CoreuiSideBarStateI = useSelector((state: any) => state.coreuiSideBarState);

  const menuLogout: AppMenusItemsPropsDataI[] = _APP_NAV_LOGOUT_ENABLED_ ? [NAV_LOGOUT] : [];
  const menuItems: AppMenusItemsPropsDataI[] = [...props.menuItems ?? [], ...menuLogout];

  return (
    <CSidebar className="sidebar-content"
      position="fixed"
      unfoldable={coreuiSideBarState.sidebarUnfoldable}
      visible={coreuiSideBarState.sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(setSidebarShowAction(visible))
      }}
    >
      
      <CSidebarNav>
        <SimpleBar>
          {<SidebarNavLayout items={menuItems} />}
        </SimpleBar>
    </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch(setSidebarShowFoldableAction(!coreuiSideBarState.sidebarUnfoldable))}
      />
    </CSidebar>
  )
};

export default React.memo(MenuLayout);