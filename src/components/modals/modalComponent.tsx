import { ModalPropsI } from "@app/@types/components/modals/modal";
import { ComponentTypeEnum } from "@app/catalogs/enumCatalog";
import AlertLayout from "@app/templates/environments/coreui/template/layouts/alertLayout";
import { Dialog } from "primereact/dialog";
import { useEffect } from "react";

const ModalComponent: React.FC<ModalPropsI> = (props) => {

    useEffect(() => {

        return () => {
        };
    }, []);

    let styles = {};
    let maximizable = false;
    let position: "center" | "top" | undefined = "top";

    if (props.size === "sm") {
        styles = { top: "50px", width: '70%', minHeight: '10%' };
    } else if (props.size === "md") {
        styles = { top: "50px", width: '80%', minHeight: '30%' };
    } else if (props.size === "lg") {
        styles = { width: '95%', minHeight: '90%' };
        maximizable = true;
    }
    else {
        styles = { top: "50px", width: '80%', minHeight: '10%' };
    }

    return (<Dialog header={props.title} visible={props.visible} maximizable={maximizable}
        position={position} style={styles} onHide={() => props.selectorCloseModal()}>
        <AlertLayout componentType={ComponentTypeEnum.POPUP} />
        {props.body}
    </Dialog>
    );
}

export default ModalComponent