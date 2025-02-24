export interface TemplateUserStateI {
    userName: string
    userRols: string[]
}

export interface TemplateUserActionI extends TemplateUserStateI {
    type: string;
}