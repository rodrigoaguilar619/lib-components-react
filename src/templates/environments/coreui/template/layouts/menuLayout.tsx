import { CSidebar, CSidebarFooter, CSidebarToggler } from '@coreui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppMenusItemsPropsDataI, AppMenusPropsI } from '@app/@types/components/layout/appMenuLayout';
import { CoreuiSideBarStateI } from '@app/@types/templates/environments/coreui/controllers/reducers/coreuiSideBarReducer';
import { _APP_NAV_LOGOUT_ENABLED_ } from '@app/catalogs/constantCatalog';
import { NAV_LOGOUT } from '@app/catalogs/navCatalog';
import { setSidebarShowAction, setSidebarShowFoldableAction } from '@app/templates/environments/coreui/controllers/actions/coreuiSideBarAction';
import { SidebarNavLayout } from './sidebarNavLayout';

const MenuLayout: React.FC<AppMenusPropsI> = (props) => {
  const dispatch = useDispatch();
  const coreuiSideBarState: CoreuiSideBarStateI = useSelector((state: any) => state.coreuiSideBarState);

  const menuLogout: AppMenusItemsPropsDataI[] = _APP_NAV_LOGOUT_ENABLED_ ? [NAV_LOGOUT] : [];
  const menuItems: AppMenusItemsPropsDataI[] = [...props.menuItems ?? [], ...menuLogout];

  
return (
  <CSidebar
    className="border-end"
    colorScheme="dark"
    position="fixed"
    unfoldable={coreuiSideBarState.sidebarUnfoldable}
      visible={coreuiSideBarState.sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(setSidebarShowAction(visible))
      }}
  >
    <SidebarNavLayout items={menuItems} />
    <CSidebarFooter className="border-top d-none d-lg-flex">
      <CSidebarToggler
        onClick={() => dispatch(setSidebarShowFoldableAction(!coreuiSideBarState.sidebarUnfoldable))}
      />
    </CSidebarFooter>
  </CSidebar>
)
};

export default React.memo(MenuLayout);