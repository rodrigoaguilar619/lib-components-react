import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { generateDebugClassModule, generateDebugClassService, debug, debugError, showDataDevelopment } from '@app/utils/webUtils/debugUtil';
import DebugClass from '@app/classes/debugClass';

jest.mock('@app/catalogs/constantCatalog', () => ({
  _APP_ENVIRONMENT_: 'development', // default mock
}));

describe('debugUtil', () => {

  beforeEach(() => {
    jest.spyOn(global.crypto, 'getRandomValues').mockImplementation((array: any) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = 123; // deterministic
      }
      return array;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('generateDebugClassModule returns DebugClass instance with MODULE tag', () => {
    const debugClass = generateDebugClassModule('TestModule');
    expect(debugClass.getModuleName()).toMatch(/MODULE: TestModule/);
    expect(debugClass.getDebugColor()).toContain('background-color');
  });

  test('generateDebugClassService returns DebugClass instance with SERVICE tag', () => {
    const debugClass = generateDebugClassService('TestService');
    expect(debugClass.getModuleName()).toMatch(/SERVICE: TestService/);
    expect(debugClass.getDebugColor()).toContain('background-color');
  });

  test('debug logs to console in non-production env', () => {
    const consoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    const mockClass = new DebugClass('TestModule', 'color: blue');
    debug(mockClass, 'Hello');
    expect(consoleLog).toHaveBeenCalledWith('%cTestModule', 'color: blue', 'Hello');
  });

  test('debugError logs error to console', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    const mockClass = new DebugClass('TestModule', 'color: red');
    debugError(mockClass, 'Something went wrong');
    expect(consoleError).toHaveBeenCalledWith('%cTestModule', 'color: red', 'Something went wrong');
  });

  describe('showDataDevelopment', () => {
    const mockConstantPath = '@app/catalogs/constantCatalog';
  
    afterEach(() => {
      jest.resetModules(); // clear cached modules to reapply mocks
    });
  
    test('renders formatted JSON object if environment is development', async () => {
      jest.doMock(mockConstantPath, () => ({
        _APP_ENVIRONMENT_: 'development',
      }));
  
      const { showDataDevelopment } = await import('@app/utils/webUtils/debugUtil');
  
      render(showDataDevelopment('User', { name: 'Alice', age: 30 }) as JSX.Element);
  
      expect(screen.getByText('User:')).toBeInTheDocument();
      expect(screen.getByText('"name"')).toBeInTheDocument();
      expect(screen.getByText('"Alice"')).toBeInTheDocument();
      expect(screen.getByText('"age"')).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument();
    });
  
    test('renders formatted array if environment is development', async () => {
      jest.doMock(mockConstantPath, () => ({
        _APP_ENVIRONMENT_: 'development',
      }));
  
      const { showDataDevelopment } = await import('@app/utils/webUtils/debugUtil');
  
      render(showDataDevelopment('Items', ['apple', 'banana']) as JSX.Element);
  
      expect(screen.getByText('Items:')).toBeInTheDocument();
      expect(screen.getByText('"apple"')).toBeInTheDocument();
      expect(screen.getByText('"banana"')).toBeInTheDocument();
    });
  
    test('renders primitive value if environment is development', async () => {
      jest.doMock(mockConstantPath, () => ({
        _APP_ENVIRONMENT_: 'development',
      }));
  
      const { showDataDevelopment } = await import('@app/utils/webUtils/debugUtil');
  
      render(showDataDevelopment('Count', 42) as JSX.Element);
  
      expect(screen.getByText('Count:')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
    });
  });
});
