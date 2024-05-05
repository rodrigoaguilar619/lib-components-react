import { AppRoutesPropsI, AppRoutesPropsRouteI } from '@app/@types/components/layout/appRoutesLayout';
import { ROUTE_LOGOUT } from '@app/catalogs/routesCatalog';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LogoutLayout from './logoutLayout';

const AppRoutesLayout: React.FC<AppRoutesPropsI> = (props) => {

    useEffect(() => {

        if (process.env.APP_USERNAME_DEFAULT != undefined) {
            console.warn("Setting into localstorage username default: ", process.env.APP_USERNAME_DEFAULT);
            localStorage.setItem('userName', process.env.APP_USERNAME_DEFAULT);
        }
    }, []);

    return (
        <div className='body-content'>
            <Routes>
                {props.routes.map((route: AppRoutesPropsRouteI, idx: number) => {
                    return (
                        route.element && (
                            <Route
                                key={route.path}
                                path={route.path}
                                index={route.exact}
                                element={<route.element />}
                            />
                        )
                    )
                })}
                <Route path={ROUTE_LOGOUT} element={<LogoutLayout />} />
                <Route path="/" element={<Navigate to={props.routeStart} replace />} />
            </Routes>
        </div>
    );
}

export default AppRoutesLayout;