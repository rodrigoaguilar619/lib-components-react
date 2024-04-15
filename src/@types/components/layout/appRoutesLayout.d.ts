export interface AppRoutesPropsRouteI {
    path: string;
    exact?: boolean;
    element: React.ComponentType<any>;
}

export interface AppRoutesPropsI {
    routes: AppContentPropsRouteI[];
    routeStart: string
}