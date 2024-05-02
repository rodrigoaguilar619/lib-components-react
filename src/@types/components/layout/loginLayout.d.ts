export interface LoginLayoutPropsI {
    loginTemplate: React.ComponentType<LoginChildrenPropsI>
}

export interface LoginChildrenPropsI {
    isLoading: boolean
    loadingText: string
    isLoginError: boolean
    currentMessage: string
    isSessionExpired: boolean
    updatePassword: (password: string) => void
    updateUserName: (userName: string) => void
    executeSubmitLogin: () => void
}