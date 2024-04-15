import { ModalState } from '@app/@types/components/_hooks/modalHook';
import { useState, ReactNode } from 'react';

const useHookModal = (): [ModalState, () => void, () => void, (body: ReactNode) => void, (title: string) => void] => {
    const [modalState, setModalState] = useState<ModalState>({
        showModal: false,
        bodyModal: undefined,
        titleModal: '',
    });

    const setOpenModal = () => {
        setModalState(prevState => ({
            ...prevState,
            showModal: true,
        }));
    };
    
    const setCloseModal = () => {
        setModalState(prevState => ({
            ...prevState,
            showModal: false,
        }));
    };
    
    const setBodyModal = (body: ReactNode) => {
        setModalState(prevState => ({
            ...prevState,
            bodyModal: body,
        }));
    };
    
    const setTitleModal = (title: string) => {
        setModalState(prevState => ({
            ...prevState,
            titleModal: title,
        }));
    };

    return [modalState, setOpenModal, setCloseModal, setBodyModal, setTitleModal];
};

export default useHookModal;