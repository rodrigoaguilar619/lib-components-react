export interface TemplateSessionStateI {
    isRedirectLogout: boolean
    isSessionExpired: boolean
}

export interface TemplateSessionActionI extends TemplateSessionStateI {
    type: string;
}