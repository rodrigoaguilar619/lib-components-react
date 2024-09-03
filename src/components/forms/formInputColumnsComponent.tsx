import { useEffect } from "react";
import { Col } from "react-bootstrap";
import InputElementComponent from "@app/components/forms/formInputElementComponent";
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { LabelInputComponent } from "@app/components/elements/labelComponents";
import { FormInputColumnPropsI } from "@app/@types/components/formInputs/formInputs";
import { FormInputColumnsPropsI } from "@app/@types/components/formInputColumns/formInputColumns";

const FormInputColumnsComponent: React.FC<FormInputColumnsPropsI> = (props) => {

    useEffect(() => {

        return () => {
        };
    }, []);

    const updateFormData = (formData: Record<string, any>, inputId: string, value: string) => {
        let formDataUpdated = { ...formData, [inputId]: value };
        props.selectorUpdateFormData(formDataUpdated);

        return formDataUpdated;
    }

    const buildValidator = (inputColumnProps: FormInputColumnPropsI) => {

        return ((inputColumnProps.validations === undefined || props.validatorControl === undefined))
            ? null :
            (<div>{props.validatorControl.current.message(inputColumnProps.validations.idValidation,
                props.formData[inputColumnProps.inputProps.id], inputColumnProps.validations.validatorRules)}
            </div>);
    }

    const buildColumn = (inputColumnProps: FormInputColumnPropsI, width: string) => {

        const buildValidatorSection = buildValidator(inputColumnProps);
        let valueInput = props.formData[inputColumnProps.inputProps.id] ?? "";
        let isShowError: boolean = buildValidatorSection?.props.children !== undefined;
        let widthColumn = inputColumnProps.columnWidth !== undefined ? inputColumnProps.columnWidth : width;
        
        return (<Col key={inputColumnProps.inputProps.id} md={"auto"} style={{ width: widthColumn, paddingTop: "3px" }}>
            <LabelInputComponent label={inputColumnProps.label} icon={faQuestionCircle} tooltipHelpText={inputColumnProps.tooltipText} />
            <InputElementComponent inputProps={{
                ...inputColumnProps.inputProps,
                value: valueInput,
                isShowError: isShowError,
            }} updateValue={updateFormData.bind(null, props.formData, inputColumnProps.inputProps.id)} />
            <div style={{ paddingLeft: "3px" }}>{buildValidatorSection}</div>
        </Col>);
    }

    const buildFormColumns = (inputColumns: FormInputColumnPropsI[], width: string) => {

        let columns = inputColumns.map((inputColumnProps: FormInputColumnPropsI) => {

            if (inputColumnProps.showColumn === false) {
                return null;
            }
            return buildColumn(inputColumnProps, width);
        })

        return (columns);
    }

    let formInputColumns = buildFormColumns(props.inputColumns, props.width);
    return (formInputColumns);
}

export default FormInputColumnsComponent