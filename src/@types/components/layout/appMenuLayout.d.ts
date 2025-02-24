export interface AppMenusItemsPropsDataI
{
    component: React.ElementType;
    name: string;
    badge?: {
        color: string;
        text: string;
    };
    icon?: React.ReactNode;
    to?: string;
    href?: string;
    attributes?: any;
    items?: AppSidebarNavItem[];
}

export interface AppMenusPropsDataI {
    text?: string;
    url?: string;
    icon?: string | React.ReactNode;
    isOpenExternal?: boolean;
    children?: AppMenusPropsDataI[];
}

export interface AppMenusPropsI {
    menuItems?: AppMenusPropsDataI[];
}


export interface AppMenusSideBarPropsI {
    items: AppMenusItemsPropsDataI[];
}