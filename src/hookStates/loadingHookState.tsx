import { LoadingState } from '@app/@types/components/_hooks/loadingHook';
import { useState } from 'react';

const useHookLoading = (): [LoadingState, (loading: boolean) => void] => {
    const [loadingState, setLoadingState] = useState<LoadingState>({
        isLoading: true,
    });

    const setLoading = (loading: boolean) => {
        setLoadingState(prevState => ({
            ...prevState,
            isLoading: loading,
        }));
    };

    return [loadingState, setLoading];
};

export default useHookLoading;