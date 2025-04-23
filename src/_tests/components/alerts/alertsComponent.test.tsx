import { render, screen, fireEvent } from '@testing-library/react';
import AlertsComponent from '@app/components/alerts/alertsComponent';
import { AlertTypeEnum } from '@app/catalogs/enumCatalog';
import { ComponentTypeEnum } from '@app/catalogs/enumCatalog';
import * as alertUtil from '@app/utils/componentUtils/alertUtil';
import { useDispatch } from 'react-redux';
import { AlertsDataI } from '@app/@types/components/alerts/alerts';
import '@testing-library/jest-dom';

// Mock Redux dispatch
jest.mock('react-redux', () => ({
    useDispatch: jest.fn()
}));

// Mock removeAlertRedux
jest.mock('@app/utils/componentUtils/alertUtil', () => ({
    removeAlertRedux: jest.fn()
}));

describe('AlertsComponent', () => {
    const dispatchMock = jest.fn();

    beforeEach(() => {
        (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockAlertList: AlertsDataI[] = [
        {
            id: 1,
            alertType: AlertTypeEnum.SUCCESS,
            summary: 'Success!',
            message: 'Operation completed.',
            timerShowMessageFunction: setTimeout(() => { }, 5000)
        },
        {
            id: 2,
            alertType: AlertTypeEnum.ERROR,
            summary: 'Error!',
            message: 'Something went wrong.',
            timerShowMessageFunction: setTimeout(() => { }, 5000)
        },
        {
            id: 3,
            alertType: AlertTypeEnum.WARNING,
            summary: 'Warning!',
            message: 'Be careful.',
            timerShowMessageFunction: setTimeout(() => { }, 5000)
        }
    ];

    const componentType = ComponentTypeEnum.MODULE;

    it('renders alerts with correct types and messages', () => {
        render(
            <AlertsComponent alertList={mockAlertList} componentType={componentType} />
        );

        expect(screen.getByText('Success!')).toBeInTheDocument();
        expect(screen.getByText('Operation completed.')).toBeInTheDocument();

        expect(screen.getByText('Error!')).toBeInTheDocument();
        expect(screen.getByText('Something went wrong.')).toBeInTheDocument();

        expect(screen.getByText('Warning!')).toBeInTheDocument();
        expect(screen.getByText('Be careful.')).toBeInTheDocument();
    });

    it('calls removeAlertRedux when an alert is dismissed', () => {
        render(
            <AlertsComponent alertList={mockAlertList} componentType={componentType} />
        );

        const closeButtons = screen.getAllByRole('button', { name: /close/i });
        fireEvent.click(closeButtons[0]);

        expect(alertUtil.removeAlertRedux).toHaveBeenCalledWith(dispatchMock, componentType, mockAlertList, 1);
    });
});