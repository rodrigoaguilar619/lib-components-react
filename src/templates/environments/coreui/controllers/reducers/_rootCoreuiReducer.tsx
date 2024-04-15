import { combineReducers, Reducer } from 'redux';
import { coreuiSideBarReducer } from './coreuiSideBarReducer';
import { RootCoreuiTemplateStateI } from '@app/@types/templates/environments/coreui/controllers/reducers/_rootCoreuiReducer';

export const rootCoreuiReducerGroup = {
  coreuiSideBarState: coreuiSideBarReducer
}

const rootCoreuiReducer: Reducer<RootCoreuiTemplateStateI, any> = combineReducers(rootCoreuiReducerGroup);

export default rootCoreuiReducer;