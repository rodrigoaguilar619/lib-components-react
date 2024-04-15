export interface TemplateHeaderStateI {
    title?: string;
    subtitle?: string;
}
  
export interface TemplateHeaderActionI extends TemplateHeaderStateI {
    type: string;
}