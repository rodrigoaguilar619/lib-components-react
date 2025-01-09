import React from 'react';
import { AppMenusPropsI } from '@app/@types/components/layout/appMenuLayout';
import { Menubar } from 'primereact/menubar';
import { transformNav } from '@app/utils/templateUtil/menuPrimeReactUtil';

const MenuLayout: React.FC<AppMenusPropsI> = (props) => {

const menuItems = transformNav(props.menuItems ?? []);
  
return (
    <div className="menu">
        <Menubar model={menuItems} />
    </div>
  )
};

export default React.memo(MenuLayout);