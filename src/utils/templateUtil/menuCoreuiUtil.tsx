import { AppMenusItemsPropsDataI, AppMenusPropsDataI } from "@app/@types/components/layout/appMenuLayout";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

function setAttributeUrl(isOpenExternal: boolean | undefined) {
  if (isOpenExternal) {
    return {target: "_blank"};
  }
  return {};
}

export function transformNav(inputNav: AppMenusPropsDataI[]): AppMenusItemsPropsDataI[] {
  const transformItem = (navItem: AppMenusPropsDataI): AppMenusItemsPropsDataI => {
    return {
      component: navItem?.children?.length ? CNavGroup : CNavItem,
      name: navItem.text ?? '',
      to: navItem.url,
      icon: navItem.icon,
      attributes: setAttributeUrl(navItem.isOpenExternal),
      items: navItem?.children?.map(transformItem), // Recursive call for children
    };
  };

  const transformedNav: AppMenusItemsPropsDataI[] = [
    {
      component: CNavTitle,
      name: 'Modules',
    },
    ...inputNav.map(transformItem), // Map each top-level item
  ];

  return transformedNav;
}