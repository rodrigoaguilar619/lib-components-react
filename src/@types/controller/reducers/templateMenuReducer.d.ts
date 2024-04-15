
export interface TemplateMenuDataI {
    text?: string;
    url?: string;
    icon?: string;
    children?: TemplateMenuDataI
}

export interface TemplateMenuStateI {
    menus?: TemplateMenuDataI[];
}

export interface TemplateMenuActionI extends TemplateMenuStateI {
    type: string;
}