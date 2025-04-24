import React from "react";
import { faCancel, faCheck } from "@fortawesome/free-solid-svg-icons";
import { ModalConfirmPropsI } from "@app/@types/components/modals/modalConfirm";
import { ButtonComponent, ButtonsOrganizerComponent } from "../elements/buttonComponents";
import ModalComponent from "./modalComponent";

const ModalConfirmComponent: React.FC<ModalConfirmPropsI> = (props) => {

    const footerContent = () => {

        let buttons = [];

        buttons.push(
            <ButtonComponent label="Cancel" icon={faCancel} onClick={() => props.selectorCloseModal()} />
        );

        buttons.push(
            <ButtonComponent label="Confirm" icon={faCheck} onClick={() => {
                if (props.executeOnConfirmFunction !== undefined) {
                    props.executeOnConfirmFunction();
                }
            }}
            />
        );

        return <ButtonsOrganizerComponent buttonOptions={buttons} justifyContent="end" />
    };

    return (
        <ModalComponent
            title={props.title}
            visible={props.visible}
            selectorCloseModal={props.selectorCloseModal}
            body={props.body}
            size={props.size ?? "sm"}
            extraProps={{...props.extraProps, style:{ width: '30vw', top: '12vw' }, footer:footerContent }}
        />
    );
}

export default ModalConfirmComponent