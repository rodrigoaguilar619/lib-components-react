import { MockConfigI } from  '@app/@types/utils/httpUtil';

const requestHandler = (_url: string, options: RequestInit = {}): RequestInit => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('userName');

    // Add Authorization header if token exists
    const headers: any = options.headers || {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if(!options.body) {
        options.body = JSON.stringify({});
    }

    // Add username to body if it exists
    if (username && options.body) {
        const body = JSON.parse(options.body as string);
        body.userName = username;
        options.body = JSON.stringify(body);
    }

    return {
        ...options,
        headers,
    };
};

export async function fetchInstance(endpoint: string, options: any = {}): Promise<any> {
    const requestOptions = requestHandler(endpoint, options);

    const response: any = await fetch(`${endpoint}`, requestOptions);
    const data = options.headers?.['Content-Type'] === 'application/json' ? await response.json() : await response.text();

    if (!response.ok) {
        const error: any = new Error(`Request failed with status ${response.status}`);
        error.response = {
            status: response.status,
            data: data,
            message: response.message
        };

        throw error;
    }

    return data;
}

export async function fetchFluxInstance(endpoint: string, options: RequestInit = {}, onData?: (chunks: string[]) => void // Callback to process each emitted chunk
): Promise<void> {
    const requestOptions = requestHandler(endpoint, options);
    const response = await fetch(`${endpoint}`, requestOptions);

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'An error occurred');
    }

    if (!response.body) {
        throw new Error('ReadableStream is not supported in this environment.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    try {
        while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            const chunk = decoder.decode(value, { stream: true });

            const chunks: any[] = [];

            chunk.split('\n').forEach((line) => {
                
                if (line.trim() === '') return;

                const dataJson = JSON.parse(line);

                if(dataJson.statusCodeValue == 200)
                    chunks.push(dataJson.body);
                else
                    throw new Error(dataJson.body.message);
            });

            if (onData) {
                onData(chunks); // Process each emitted chunk
            }
        }
    } finally {
        reader.releaseLock();
    }
}

export function initConfigMocks(mockConfigs: MockConfigI[]) {
    
    const originalFetch = globalThis.fetch;

    globalThis.fetch = async (url: RequestInfo | URL, options?: RequestInit): Promise<any> => {

        const config = mockConfigs.find((mockConfig) => url.toString().endsWith(mockConfig.url) && options?.method === 'POST');

        if (config) {
            return {
                status: config.status,
                headers: { 'Content-Type': 'application/json' },
                data: config.response,
            };
        }

        // If no mock config matches, fall back to the original fetch
        return originalFetch(url, options);
    };
}