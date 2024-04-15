import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AlertsComponent from '@app/components/alerts/alertsComponent';
import { AlertTypeEnum } from '@app/catalogs/enumCatalog';
import { removeAlertRedux } from '@app/utils/componentUtils/alertUtil';
import { AlertsDataI } from '@app/@types/components/alerts/alerts';
import { ComponentTypeEnum } from '@app/catalogs/enumCatalog';

const mockDispatch = jest.fn();
// Mocking react-redux useDispatch
jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

// Mocking removeAlertRedux function
jest.mock('@app/utils/componentUtils/alertUtil', () => ({
  removeAlertRedux: jest.fn()
}));

describe('AlertsComponent', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  const alertList: AlertsDataI[] = [
    { id: 1, summary: 'Test Summary 1', message: 'Test Message 1', alertType: AlertTypeEnum.ERROR, timerShowMessageFunction: setTimeout(() => { }, 1000) },
    { id: 2, summary: 'Test Summary 2', message: 'Test Message 2', alertType: AlertTypeEnum.SUCCESS, timerShowMessageFunction: setTimeout(() => { }, 1000) }
  ];

  it('renders alerts correctly', () => {
    const { getByText } = render(<AlertsComponent alertList={alertList} componentType={ComponentTypeEnum.MODULE} />);

    expect(getByText('Test Summary 1')).toBeInTheDocument();
    expect(getByText('Test Message 1')).toBeInTheDocument();
    expect(getByText('Test Summary 2')).toBeInTheDocument();
    expect(getByText('Test Message 2')).toBeInTheDocument();
  });

  it('calls removeAlertRedux when alert is closed', () => {
    const { getAllByRole } = render(<AlertsComponent alertList={alertList} componentType={ComponentTypeEnum.MODULE} />);
    const closeButtons = getAllByRole('button', { name: /close/i });

    fireEvent.click(closeButtons[0]); // Click close button of the first alert

    expect(removeAlertRedux).toHaveBeenCalledTimes(1);
  });
});