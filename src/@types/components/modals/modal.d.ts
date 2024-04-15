export interface ModalPropsI {
    title: string;
    visible: boolean;
    selectorCloseModal: () => void;
    body: ReactNode;
    size?: "sm" | "md" | "lg"
}