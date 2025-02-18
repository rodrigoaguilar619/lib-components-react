export interface TemplateMenuStateI {
    menus?: AppMenusPropsDataI;
}

export interface TemplateMenuActionI extends TemplateMenuStateI {
    type: string;
}