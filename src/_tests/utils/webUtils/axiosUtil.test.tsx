import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance, initConfigMocks } from '@app/utils/webUtils/axiosUtil';
import { MockConfigI } from '@app/@types/utils/httpUtil';

describe('axiosConfig', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance as any);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should intercept requests and add username', async () => {
    const requestData = { someKey: 'someValue' };
    const responseData = { responseKey: 'responseValue' };

    mock.onPost('/some/url').reply(200, responseData);

    const response = await axiosInstance.post('/some/url', requestData);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);

    // Check if the username was added to the request
    expect(mock.history.post.length).toBe(1); // Should have made one POST request
    const interceptedRequestData = JSON.parse(mock.history.post[0].data);
    expect(interceptedRequestData.userName).toBe('ADMIN');
  });

  it('should initialize mock configs correctly', async () => {
    const mockConfigs: MockConfigI[] = [
      { method: 'post', url: '/test/url', status: 200, response: { message: 'Mock response' } },
    ];

    initConfigMocks(mockConfigs);

    const testData = { key: 'value' };

    mockConfigs.forEach(async (config: any) => {
      mock.onPost(config.url).reply(config.status, config.response);
      const response = await axiosInstance.post(config.url, testData);
      expect(response.status).toBe(config.status);
      expect(response.data).toEqual(config.response);
    });
  });

  it('should handle errors when initializing mock configs', async () => {
    const mockConfigs: any = [
      { url: '/another/url', status: 404, response: { error: 'Not Found' } }
    ];

    // MockAdapter will throw an error if a request is made to a URL that hasn't been mocked
    // This test case ensures that the initialization of mock configs is correct and no error is thrown
    initConfigMocks(mockConfigs);

    const testData = { key: 'value' };

    // Ensure that requests made to non-mocked URLs throw an error
    const nonMockedUrl = '/unmocked/url';
    mock.onPost(nonMockedUrl).reply(404);

    try {
      await axiosInstance.post(nonMockedUrl, testData);
    } catch (error: any) {
      expect(error.message).toContain('Request failed with status code 404');
    }
  });

  // Add more test cases as needed for other functionality
});
