export interface FilterAccordionPropsI {
    formContainer: FormInputContainerPropsI;
    title: string;
    formData: Record<string, any>;
    selectorUpdateFormData: any;
    executeFilterSearch?: () => void;
    executeFilterSearchOnChange?: (filterData: Record<string, any>) => void;
}