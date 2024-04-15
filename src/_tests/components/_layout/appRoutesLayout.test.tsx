import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutesLayout from '@app/components/_layout/appRoutesLayout';
import '@testing-library/jest-dom/extend-expect';

describe('AppRoutesLayout', () => {
  it('renders AppRoutesLayout component', () => {
    const routes = [{ path: '/home', exact: true, element: () => <div>Home</div> }];
    const routeStart = '/home';
    const { getByText } = render(
      <MemoryRouter initialEntries={[routeStart]}>
        <AppRoutesLayout routes={routes} routeStart={routeStart} />
      </MemoryRouter>
    );
    expect(getByText('Home')).toBeInTheDocument(); // Use toBeInTheDocument() matcher
  });
});