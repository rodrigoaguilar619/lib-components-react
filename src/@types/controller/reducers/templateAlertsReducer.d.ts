import { AlertsDataI } from "@app/@types/components/alerts/alerts";
import { AlertTypeEnum } from "@app/catalogs/enumCatalog";

export interface TemplateAlertMessageDataI extends AlertsDataI {
}

export interface TemplateAlertStateI {
    messages: TemplateAlertMessageDataI[];
}

export interface TemplateAlertActionI extends TemplateAlertStateI {
    type: string;
}