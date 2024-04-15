import { createStoreCustom } from '@app/utils/reduxUtils/storeUtils/_storeUtil';

describe('createStoreCustom', () => {
  it('should create custom Redux store with combined reducers and middleware', () => {
    const combinedReducersGroupExtra: [] = [];
    const titleDevTools = 'Custom DevTools';
    const store = createStoreCustom(combinedReducersGroupExtra, titleDevTools);
    expect(store).toBeDefined();
  });

  it('should create custom Redux store with combined reducers and middleware when additional combined reducers is empty', () => {
    const combinedReducersGroupExtra:[] = [];
    const titleDevTools = 'Custom DevTools';
    const store = createStoreCustom(combinedReducersGroupExtra, titleDevTools);
    expect(store).toBeDefined();
  });

  it('should create custom Redux store with combined reducers and middleware when title for Redux DevTools is empty', () => {
    const combinedReducersGroupExtra:[] = [];
    const titleDevTools = '';
    const store = createStoreCustom(combinedReducersGroupExtra, titleDevTools);
    expect(store).toBeDefined();
  });
});