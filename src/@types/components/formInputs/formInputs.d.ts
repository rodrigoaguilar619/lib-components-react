export interface FormInputColumnPropsI {
    inputProps: InputElementPropsListI;
    columnWidth?: string;
    showColumn?: boolean = true;
    label: string;
    tooltipText?: string;
    validations?: {
        idValidation: string;
        validatorRules: any[];
    };
}

export interface FormInputContainerPropsI {
    inputColumns: FormInputColumnPropsI[];
    columnstotal?: number;
    containerWidth?: string;
}

export interface FormInputsComponentI {
    formContainers: FormInputContainerPropsI[];
    formData: Record<string, any>;
    selectorUpdateFormData: (formData: any) => void;
    validatorControl?: any;
}