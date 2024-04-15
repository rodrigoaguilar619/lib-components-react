import { createStoreTemplateCoreui } from '@app/utils/reduxUtils/storeUtils/storeTemplateCoreuiUtil';

describe('createStoreTemplateCoreui', () => {
  it('should create a store with valid combinedReducersGroupExtra', () => {
    const combinedReducersGroupExtra: any[] = [
      {
        test: 'test',
      },
    ];
    const store = createStoreTemplateCoreui(combinedReducersGroupExtra);
    expect(store).toBeDefined();
  });

  it('should create a store with empty combinedReducersGroupExtra', () => {
    const combinedReducersGroupExtra: [] = [];
    const store = createStoreTemplateCoreui(combinedReducersGroupExtra);
    expect(store).toBeDefined();
  });

  it('should create a store with null combinedReducersGroupExtra', () => {
    const combinedReducersGroupExtra = null;
    const store = createStoreTemplateCoreui(combinedReducersGroupExtra);
    expect(store).toBeDefined();
  });
});