import { CSidebar, CSidebarFooter, CSidebarToggler } from '@coreui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppMenusItemsPropsDataI, AppMenusPropsI } from '@app/@types/components/layout/appMenuLayout';
import { CoreuiSideBarStateI } from '@app/@types/templates/environments/coreui/controllers/reducers/coreuiSideBarReducer';
import { setSidebarShowAction, setSidebarShowFoldableAction } from '@app/templates/environments/coreui/controllers/actions/coreuiSideBarAction';
import { SidebarNavLayout } from './sidebarNavLayout';
import { transformNav } from '@app/utils/templateUtil/menuCoreuiUtil';
import { TemplateMenuStateI } from '@app/@types/controller/reducers/templateMenuReducer';

const MenuLayout: React.FC<AppMenusPropsI> = (props) => {
  const dispatch = useDispatch();
  const coreuiSideBarState: CoreuiSideBarStateI = useSelector((state: any) => state.coreuiSideBarState);
  const templateMenuState: TemplateMenuStateI = useSelector((state: any) => state.templateMenuState);

  const menuItems: AppMenusItemsPropsDataI[] = transformNav( props.menuItems?.length ? props.menuItems : templateMenuState.menus);

  
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
    <CSidebarFooter className="border-top d-none d-lg-flex" style={{ cursor: 'pointer' }}
      onClick={() => dispatch(setSidebarShowFoldableAction(!coreuiSideBarState.sidebarUnfoldable))}
    >
      <CSidebarToggler/>
    </CSidebarFooter>
  </CSidebar>
)
};

export default React.memo(MenuLayout);