import { _APP_ENVIRONMENT_ } from "@app/catalogs/constantCatalog";
import DebugClass from "@app/classes/debugClass";
import { EnvironmentEnum } from "@app/catalogs/enumCatalog";
import { generateDebugClassModule, generateDebugClassService, debug, debugError } from "@app/utils/webUtils/debugUtil";

describe('debugUtils', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should generate DebugClass instances for modules with random colors', () => {
    const moduleName = 'Module1';
    const debugClass = generateDebugClassModule(moduleName);

    expect(debugClass.getModuleName()).toContain(moduleName);
    expect(debugClass.getDebugColor()).toBeDefined();
  });

  it('should generate DebugClass instances for services with random colors', () => {
    const serviceName = 'Service1';
    const debugClass = generateDebugClassService(serviceName);

    expect(debugClass.getModuleName()).toContain(serviceName);
    expect(debugClass.getDebugColor()).toBeDefined();
  });

  it('should log debug message when environment is not production', () => {
    const debugClass = new DebugClass('Test Module', 'color: white; background-color: black;');
    debug(debugClass, 'Debug message');

    // Construct the expected log message with the correct styling
    const expectedMessage = expect.stringContaining('%cTest Module');
    const expectedStyling = 'color: white; background-color: black;';
    expect(console.log).toHaveBeenCalledWith(expectedMessage, expectedStyling, 'Debug message');
  });

  it('should log with debugColor when _APP_ENVIRONMENT_ is equal to EnvironmentEnum.PRODUCTION and debugColor is defined', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const debugClass = new DebugClass('Test Module', 'color: white; background-color: black;');
    debugClass.getDebugColor = () => 'color: red; background-color: white;';
    debug(debugClass, 'test');
    expect(consoleLogSpy).toHaveBeenCalled();
    consoleLogSpy.mockRestore();
  });

  it('should log with debugColor when _APP_ENVIRONMENT_ is equal to EnvironmentEnum.PRODUCTION and debugColor is undefined', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const debugClass = new DebugClass('Test Module');
    debugClass.getDebugColor = () => 'color: red; background-color: white;';
    debug(debugClass, 'test');
    expect(consoleLogSpy).toHaveBeenCalled();
    consoleLogSpy.mockRestore();
  });

  it('should log error message with debugError', () => {
    const debugClass = new DebugClass('Test Module', 'color: white; background-color: black;');
    debugError(debugClass, 'Error message');
  
    // Construct the expected log message with the correct styling
    const expectedMessage = expect.stringContaining('%cTest Module');
    const expectedStyling = 'color: white; background-color: black;';
    expect(console.error).toHaveBeenCalledWith(expectedMessage, expectedStyling, 'Error message');
  });

  it('should log error message with debugError default color style', () => {
    const debugClass = new DebugClass('Test Module');
    debugError(debugClass, 'Error message');
  
    // Construct the expected log message with the correct styling
    const expectedMessage = expect.stringContaining('%cTest Module');
    const expectedStyling = 'color: white; background-color: #E1901A';
    expect(console.error).toHaveBeenCalledWith(expectedMessage, expectedStyling, 'Error message');
  });
});
