import { ModalPropsI } from "./modal";

export interface ModalConfirmPropsI extends ModalPropsI {
    executeOnConfirmFunction?: (() => void) | Function;
}