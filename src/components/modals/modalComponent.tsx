import React, { Suspense } from "react";
import { ModalPropsI } from "@app/@types/components/modals/modal";
import { ComponentTypeEnum } from "@app/catalogs/enumCatalog";
import AlertLayout from "@app/templates/environments/coreui/template/layouts/alertLayout";
import { Dialog } from "primereact/dialog";
import { useDispatch } from "react-redux";
import { removeTemplateAlertsMessageAction } from "@app/controller/actions/templateAlertAction";

const getModalStyles = (size: string | undefined) => {
    let styles = {};
    let maximizable = false;

    switch (size) {
        case "sm":
            styles = { top: "50px", width: '70%', minHeight: '10%' };
            break;
        case "md":
            styles = { top: "50px", width: '80%', minHeight: '30%' };
            break;
        case "lg":
            styles = { width: '95%', minHeight: '90%' };
            maximizable = true;
            break;
        default:
            styles = { top: "50px", width: '80%', minHeight: '10%' };
    }

    return { styles, maximizable };
};

const ModalComponent: React.FC<ModalPropsI> = (props) => {

    const dispatch = useDispatch();
    const { styles, maximizable } = getModalStyles(props.size);
    const position: "center" | "top" | undefined = "top";

    const onHide = () => {
        dispatch(removeTemplateAlertsMessageAction(ComponentTypeEnum.POPUP));
        props.selectorCloseModal();
    };

    if (!props.visible) return null;

    return (
        <Dialog
            appendTo={document.body}
            header={props.title}
            visible={props.visible}
            maximizable={maximizable}
            position={position}
            style={styles}
            onHide={() => onHide()}
            pt={{ content: { className: 'custom-dialog' } }}
            {...props.extraProps}
        >
            <AlertLayout componentType={ComponentTypeEnum.POPUP} />
            <Suspense fallback={<div>Loading form...</div>}>{props.body}</Suspense>
        </Dialog>
    );
}

export default ModalComponent