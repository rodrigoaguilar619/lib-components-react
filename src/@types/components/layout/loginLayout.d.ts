import { ComponentLoginMessageTypeEnum } from "@app/catalogs/enumCatalog"

export interface LoginLayoutPropsI {
    loginTemplate: React.ComponentType<LoginChildrenPropsI>
}

export interface LoginChildrenPropsI {
    isLoading: boolean
    loadingText: string
    messageType?: ComponentLoginMessageTypeEnum
    currentMessage: string
    updatePassword: (password: string) => void
    updateUserName: (userName: string) => void
    executeSubmitLogin: () => void
}