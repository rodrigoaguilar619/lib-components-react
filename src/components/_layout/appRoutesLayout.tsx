import { AppRoutesPropsI, AppRoutesPropsRouteI } from '@app/@types/components/layout/appRoutesLayout';
import { ROUTE_LOGOUT } from '@app/catalogs/routesCatalog';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LogoutLayout from './logoutLayout';
import { _APP_SECURITY_ENABLED_, _APP_USERNAME_DEFAULT_ } from '@app/catalogs/constantCatalog';

const AppRoutesLayout: React.FC<AppRoutesPropsI> = (props) => {

    useEffect(() => {

        if (!_APP_SECURITY_ENABLED_ && _APP_USERNAME_DEFAULT_ != null) {
            console.warn("Setting into localstorage username default: ", _APP_USERNAME_DEFAULT_);
            localStorage.setItem('userName', _APP_USERNAME_DEFAULT_);
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