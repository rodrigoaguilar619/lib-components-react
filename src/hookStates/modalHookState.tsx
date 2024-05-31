import { ModalState } from '@app/@types/components/_hooks/modalHook';
import { useState, ReactNode } from 'react';

const useHookModal = (): [ModalState, () => void, () => void, (body: ReactNode) => void, (title: string) => void, (size: "sm" | "md" | "lg") => void] => {
    const [modalState, setModalState] = useState<ModalState>({
        showModal: false,
        bodyModal: undefined,
        titleModal: '',
        size: "md",
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

    const setSizeModal = (size: "sm" | "md" | "lg") => {
        setModalState(prevState => ({
            ...prevState,
            size: size,
        }));
    };

    return [modalState, setOpenModal, setCloseModal, setBodyModal, setTitleModal, setSizeModal];
};

export default useHookModal;