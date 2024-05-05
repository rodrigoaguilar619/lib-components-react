import { TemplateHeaderStateI } from "./templateHeaderReducer";
import { TemplateFooterStateI } from "./templateFooterReducer";
import { TemplateMenuStateI } from "./templateMenuReducer";
import { TemplateAlertStateI } from "./templateAlertsReducer";
import { TemplateLoadingStateI } from "./templateLoadingReducer";
import { TemplateSessionStateI } from "./templateSessionReducer";

export interface RootTemplateStateI {
    templateSessionState: TemplateSessionStateI;
    templateHeaderState: TemplateHeaderStateI;
    templateFooterState: TemplateFooterStateI;
    templateMenuState: TemplateMenuStateI;
    templateAlertState: TemplateAlertStateI;
    templateAlertPopUpState: TemplateAlertStateI,
    templateLoadingState: TemplateLoadingStateI,
}