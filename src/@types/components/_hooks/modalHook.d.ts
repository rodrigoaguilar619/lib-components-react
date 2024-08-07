export interface ModalState {
    showModal: boolean;
    bodyModal: ReactNode | undefined;
    titleModal: string;
    size: "sm" | "md" | "lg";
}