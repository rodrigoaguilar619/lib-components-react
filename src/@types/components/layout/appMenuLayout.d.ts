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
    items?: AppSidebarNavItem[];
}

export interface AppMenusPropsDataI {
    text?: string;
    url?: string;
    icon?: string | React.ReactNode;
    children?: AppMenusPropsDataI[];
}

export interface AppMenusPropsI {
    menu?: AppMenusPropsDataI[];            //for backend, after to process and convert like AppMenusItemsPropsDataI
    menuItems?: AppMenusPropsDataI[];  //for hardcoded menu, defined on project
    isFromApi?: boolean
}


export interface AppMenusSideBarPropsI {
    items: AppMenusItemsPropsDataI[];
}