import { AppRoutesPropsI, AppRoutesPropsRouteI } from '@app/@types/components/layout/appRoutesLayout';
import { Navigate, Route, Routes } from 'react-router-dom';

const AppRoutesLayout: React.FC<AppRoutesPropsI> = (props) => {
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
                    <Route path="/" element={<Navigate to={props.routeStart} replace />} />
                </Routes>
            </div>
        );
    }

export default AppRoutesLayout;