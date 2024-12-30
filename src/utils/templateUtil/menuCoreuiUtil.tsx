import { AppMenusItemsPropsDataI, AppMenusPropsDataI } from "@app/@types/components/layout/appMenuLayout";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

export function transformNav(inputNav:AppMenusPropsDataI[]) {
    
  const transformedNav: AppMenusItemsPropsDataI[] = [
      {
        component: CNavTitle,
        name: 'Modules',
      },
    ];
  
    inputNav.forEach((navItem) => {
      const transformedItem: AppMenusItemsPropsDataI = {
        component: navItem?.children?.length ? CNavGroup :  CNavItem,
        name: navItem.text || '',
        to: navItem.url,
        icon: navItem.icon,
        items: navItem?.children?.map((subItem) => ({
          component: 'CNavItem',
          name: subItem.text,
          to: subItem.url,
        })),
      };
  
      transformedNav.push(transformedItem);
    });
  
    return transformedNav;
  }