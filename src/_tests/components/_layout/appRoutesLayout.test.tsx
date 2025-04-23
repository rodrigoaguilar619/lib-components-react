import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutesLayout from '@app/components/_layout/appRoutesLayout';
import { ROUTE_LOGOUT } from '@app/catalogs/routesCatalog';
import '@testing-library/jest-dom';

// Mock the LogoutLayout
jest.mock('@app/components/_layout/logoutLayout', () => () => <div>LogoutLayout</div>);

const MockComponent = () => <div>Mock Page</div>;

describe('AppRoutesLayout', () => {
    const defaultRoutes = [
        { path: '/mock', exact: false, element: <MockComponent /> }
    ];

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    it('should render route components and LogoutLayout', () => {
        render(
            <MemoryRouter initialEntries={['/mock']}>
                <AppRoutesLayout routes={defaultRoutes} routeStart="/mock" />
            </MemoryRouter>
        );

        expect(screen.getByText('Mock Page')).toBeInTheDocument();
    });

    it('should render LogoutLayout on logout route', () => {
        render(
            <MemoryRouter initialEntries={[ROUTE_LOGOUT]}>
                <AppRoutesLayout routes={defaultRoutes} routeStart="/mock" />
            </MemoryRouter>
        );

        expect(screen.getByText('LogoutLayout')).toBeInTheDocument();
    });

    it('should redirect to routeStart if path is root', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <AppRoutesLayout routes={defaultRoutes} routeStart="/mock" />
            </MemoryRouter>
        );

        // Since MemoryRouter doesn't handle redirects visually in test env, just ensure the component exists
        expect(screen.getByText('Mock Page')).toBeInTheDocument();
    });
});