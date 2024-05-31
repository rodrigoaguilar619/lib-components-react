import { LoadingState } from '@app/@types/components/_hooks/loadingHook';
import { useState } from 'react';

const useHookLoading = (): [LoadingState, () => void, () => void] => {
    const [loadingState, setLoadingState] = useState<LoadingState>({
        isLoading: true,
    });

    const setLoading = () => {
        setLoadingState(prevState => ({
            ...prevState,
            isLoading: true,
        }));
    };

    const clearLoading = () => {
        setLoadingState(prevState => ({
            ...prevState,
            isLoading: false,
        }));
    };

    return [loadingState, setLoading, clearLoading];
};

export default useHookLoading;