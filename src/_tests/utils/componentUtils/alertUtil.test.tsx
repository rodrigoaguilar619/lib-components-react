  import { buildAlertRedux, buildAlertErrorRedux, removeAlertRedux, buildAlertSuccessRedux } from '@app/utils/componentUtils/alertUtil';
  import { removeTemplateAlertMessageAction, setTemplateAlertMessageAction } from '@app/controller/actions/templateAlertAction';
  import { ComponentTypeEnum, AlertTypeEnum } from '@app/catalogs/enumCatalog';
  import { _APP_ALERT_TIME_TOAST_MILLIS_ } from '@app/catalogs/constantCatalog';
  import { AlertsDataI } from '@app/@types/components/alerts/alerts';
  
  jest.mock('@app/controller/actions/templateAlertAction', () => ({
    setTemplateAlertMessageAction: jest.fn(),
    removeTemplateAlertMessageAction: jest.fn()
  }));
  
  const mockDispatch = jest.fn();
  const originalScrollTo = window.scrollTo;
  const mockScrollTo = jest.fn();
  window.scrollTo = mockScrollTo;
  
  jest.useFakeTimers();
  
  describe('alertUtils', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe('buildAlertRedux', () => {
      it('dispatches alert and schedules removal for MODULE type', () => {
        buildAlertRedux(mockDispatch, ComponentTypeEnum.MODULE, 'Summary', 'Message', AlertTypeEnum.SUCCESS);
  
        expect(setTemplateAlertMessageAction).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalled();
        expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  
        jest.advanceTimersByTime(_APP_ALERT_TIME_TOAST_MILLIS_);
  
        expect(removeTemplateAlertMessageAction).toHaveBeenCalled();
      });
  
      it('calls dialogScrollTop for DIALOG type', () => {
        const mockDialogScrollTop = jest.fn();
        jest.mock('@app/utils/componentUtils/dialogUtil', () => ({
          dialogScrollTop: mockDialogScrollTop
        }));
  
        buildAlertRedux(mockDispatch, ComponentTypeEnum.POPUP, 'Summary', 'Message', AlertTypeEnum.SUCCESS);
      });
    });
  
    describe('buildAlertErrorRedux', () => {
      it('calls buildAlertRedux with ERROR type', () => {
        buildAlertErrorRedux(mockDispatch, ComponentTypeEnum.MODULE, 'Something went wrong');
        expect(setTemplateAlertMessageAction).toHaveBeenCalledWith(
          ComponentTypeEnum.MODULE,
          'ERROR',
          'Something went wrong',
          AlertTypeEnum.ERROR,
          expect.any(Number),
          expect.any(Object)
        );
      });
    });
  
    describe('buildAlertSuccessRedux', () => {
      it('calls buildAlertRedux with SUCCESS type', () => {
        buildAlertSuccessRedux(mockDispatch, ComponentTypeEnum.POPUP, 'Success!');
        expect(setTemplateAlertMessageAction).toHaveBeenCalledWith(
          ComponentTypeEnum.POPUP,
          'SUCCESS',
          'Success!',
          AlertTypeEnum.SUCCESS,
          expect.any(Number),
          expect.any(Object)
        );
      });
    });
  
    describe('removeAlertRedux', () => {
      it('clears the timer and dispatches removal', () => {
        const fakeTimer = setTimeout(() => {}, 1000);
        const alertsList: AlertsDataI[] = [
          {
            id: 123,
            message: 'Hi',
            summary: 'Alert',
            alertType: AlertTypeEnum.WARNING,
            timerShowMessageFunction: fakeTimer
          }
        ];
  
        removeAlertRedux(mockDispatch, ComponentTypeEnum.POPUP, alertsList, 123);
  
        expect(removeTemplateAlertMessageAction).toHaveBeenCalledWith(ComponentTypeEnum.POPUP, 123);
      });
    });
  });
  
  afterAll(() => {
    window.scrollTo = originalScrollTo;
  });
  