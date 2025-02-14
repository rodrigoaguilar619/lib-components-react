export interface AppRoutesPropsRouteI {
    path: string;
    exact?: boolean;
    element: React.ReactNode | null;
}

export interface AppRoutesPropsI {
    routes: AppContentPropsRouteI[];
    routeStart: string
}