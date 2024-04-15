import { buildAlertRedux, buildAlertErrorRedux, removeAlertRedux } from '@app/utils/componentUtils/alertUtil';
import { AlertTypeEnum, ComponentTypeEnum } from '@app/catalogs/enumCatalog';
import { removeTemplateAlertMessageAction, setTemplateAlertMessageAction } from '@app/controller/actions/templateAlertAction';
import { AlertsDataI } from '@app/@types/components/alerts/alerts';

// Mocking dispatch function
const mockDispatch = jest.fn();

// Mocking setTimeout
jest.useFakeTimers();

/*describe('buildAlertRedux', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    it('should dispatch setTemplateAlertMessageAction', () => {
        const summary = 'Test Summary';
        const message = 'Test Message';
        const alertType = AlertTypeEnum.ERROR;
        
        buildAlertRedux(mockDispatch, ComponentTypeEnum.MODULE, summary, message, alertType);
        
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
});

describe('buildAlertErrorRedux', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    it('should dispatch setTemplateAlertMessageAction', () => {
        const errorMessage = 'Test Error Message';
        
        buildAlertErrorRedux(mockDispatch, ComponentTypeEnum.MODULE, errorMessage);
        
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
});*/

describe('removeAlertRedux', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    it('should dispatch removeTemplateAlertMessageAction', () => {
        const idToRemove = 123;
        const alertList: AlertsDataI[] = [{ id: 123, timerShowMessageFunction: setTimeout(() => {}, 1000) , message: 'Test Message', alertType: AlertTypeEnum.ERROR, summary: 'Test Summary' }];
        
        removeAlertRedux(mockDispatch, ComponentTypeEnum.MODULE, alertList, idToRemove);
        
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
});