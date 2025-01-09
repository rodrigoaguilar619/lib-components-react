import { TemplateAlertStateI } from "@app/@types/controller/reducers/templateAlertsReducer";
import { useSelector } from "react-redux";
import AlertsComponent from "@app/components/alerts/alertsComponent";
import { ComponentTypeEnum } from "@app/catalogs/enumCatalog";

const AlertLayout = (props: { componentType: ComponentTypeEnum }) => {

    const templateAlertState: TemplateAlertStateI = useSelector((state: any) =>  ComponentTypeEnum.MODULE === props.componentType ? state.templateAlertState : state.templateAlertPopUpState);

    return (
        <AlertsComponent alertList={templateAlertState.messages} componentType={props.componentType} />
    )
}

export default AlertLayout