
import { createStoreCustom } from './_storeUtil';
import { rootCoreuiReducerGroup } from '@app/templates/environments/coreui/controllers/reducers/_rootCoreuiReducer';

const titleDevTools = "Template mask CoreUI";

/**
 * Creates a CoreUI store template with the given combinedReducersGroupExtra.
 *
 * @param {any} combinedReducersGroupExtra - the combined reducers group extra
 * @return {any} the created store
 */
export function createStoreTemplateCoreui(combinedReducersGroupExtra: any) {

    const mergedReducers = {
        ...rootCoreuiReducerGroup,
        ...combinedReducersGroupExtra,
    };

    const store = createStoreCustom(mergedReducers, titleDevTools);
    return store;
}