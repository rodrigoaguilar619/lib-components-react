type InputElementPropsListI = InputElementTextPropsI | InputElementSelectPropsI | InputElementCalendarPropsI 
    | InputElementFilePropsI | InputElementMaskPropsI;

export interface InputDropDownValueI {
    id: string;
    description: string;
}

export interface InputElementPropsI {
    id: string;
    inputType: InputElementEnum;
    value: string;
    isShowError?: boolean;
    updateValue: (value: any) => void;
    isReadOnly?: boolean;
    executeOnChange?: (formData: Record<string, any>) => void;
}

export interface InputElementMaskPropsI extends InputElementPropsI {
    maskType: InputElementMaskEnum;
    maskProps: InputMaskPropsI
}

export interface InputElementTextPropsI extends InputElementPropsI {
}

export interface InputElementSelectPropsI extends InputElementPropsI {
    options: InputDropDownValueI[],
    placeholder?: string,
    isOptionAll?: boolean 
}

export interface InputElementCalendarPropsI extends InputElementPropsI {
    value: number | undefined | null;
    dateFormat?: string;
}

export interface InputElementFilePropsI extends InputElementPropsI {
    value: File | null | undefined;
}

export interface InputMaskPropsI {
    totalDecimals?: number;
}

export interface InputElementComponentI {
    inputProps: InputElementPropsListI;
}