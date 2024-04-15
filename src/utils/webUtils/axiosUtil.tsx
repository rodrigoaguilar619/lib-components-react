import { MockConfigI } from '@app/@types/utils/axiosUtil';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const requestHandler = (request: any) => {
    //TODO: Get username correctly
    if(process.env.APP_USERNAME_DEFAULT != undefined) {
        console.warn("Setting username default: ", process.env.APP_USERNAME_DEFAULT);
        request.data.userName = process.env.APP_USERNAME_DEFAULT;
    }
    return request;
}

// Init Axios
export const axiosInstance = axios.create({
    baseURL: '',
    //withCredentials: true
})

// Add interceptors
axiosInstance.interceptors.request.use(
    request => requestHandler(request)
)

//config mocks for development
export function initConfigMocks(mockConfigs: MockConfigI[]) {
    const mock = new MockAdapter(axiosInstance);

    mockConfigs.forEach((config: MockConfigI) => {
        mock.onPost(config.url).reply(config.status, config.response);
    });
}