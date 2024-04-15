export interface AlertsDataI {
    id: number;
    message: string;
    alertType: AlertTypeEnum;
    summary: string;
    timerShowMessageFunction: NodeJS.Timeout;
}

export interface AlertsPropsI {
    isActive: boolean;
    text: string;
}

export interface AlertsComponentI {
    alertList: AlertsDataI[];
    componentType: ComponentTypeEnum;
}