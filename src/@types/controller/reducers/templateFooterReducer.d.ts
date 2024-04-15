export interface TemplateFooterStateI {
    text?: string;
}
  
export interface TemplateFooterActionI extends TemplateFooterStateI {
    type: string;
}