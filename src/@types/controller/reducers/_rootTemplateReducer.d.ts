import { TemplateHeaderStateI } from "./templateHeaderReducer";
import { TemplateFooterStateI } from "./templateFooterReducer";
import { TemplateMenuStateI } from "./templateMenuReducer";
import { TemplateAlertStateI } from "./templateAlertsReducer";
import { TemplateLoadingStateI } from "./templateLoadingReducer";
import { TemplateSessionStateI } from "./templateSessionReducer";
import { templateUserDataStateI } from "./templateUserReducer";

export interface RootTemplateStateI {
    templateUserDataState: templateUserDataStateI;
    templateSessionState: TemplateSessionStateI;
    templateHeaderState: TemplateHeaderStateI;
    templateFooterState: TemplateFooterStateI;
    templateMenuState: TemplateMenuStateI;
    templateAlertState: TemplateAlertStateI;
    templateAlertPopUpState: TemplateAlertStateI,
    templateLoadingState: TemplateLoadingStateI,
}