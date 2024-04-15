import { combineReducers, Reducer } from 'redux';
import { RootTemplateStateI } from '@app/@types/controller/reducers/_rootTemplateReducer';
import { templateHeaderReducer } from './templateHeaderReducer';
import { templateFooterReducer } from './templateFooterReducer';
import { templateMenuReducer } from './templateMenuReducer';
import { buildTemplateAlertReducer } from './templateAlertsReducer';
import { templateLoadingReducer } from './templateLoadingReducer';
import { ComponentTypeEnum } from '@app/catalogs/enumCatalog';

export const rootReducerGroup = {
  templateHeaderState: templateHeaderReducer,
  templateFooterState: templateFooterReducer,
  templateMenuState: templateMenuReducer,
  templateAlertState: buildTemplateAlertReducer(ComponentTypeEnum.MODULE),
  templateAlertPopUpState: buildTemplateAlertReducer(ComponentTypeEnum.POPUP),
  templateLoadingState: templateLoadingReducer,
}

const rootReducer: Reducer<RootTemplateStateI, any> = combineReducers(rootReducerGroup);

export default rootReducer;