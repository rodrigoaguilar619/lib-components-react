import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import FormInputColumnsComponent from "@app/components/forms/formInputsElements/formInputColumnsComponent";
import { buildFormDataColumns } from "@app/utils/componentUtils/formUtil";
import { deepClone } from "@app/utils/dataUtils/dataUtil";
import { TooltipConfigInputHelp } from "@app/components/tooltip/tooltipConfigComponents";
import { ButtonCustomComponent, ButtonsOrganizerComponent } from "@app/components/elements/buttonComponents";
import { FormInputColumnPropsI } from "@app/@types/components/formInputs/formInputs";
import { FormInputsMultipleComponentI } from "@app/@types/components/formInputsMultiple/formInputsMultiple";

const FormInputsMultipleComponent: React.FC<FormInputsMultipleComponentI> = (props) => {

    const columnInputWidth = "94%";
    const columnOptionsWidth = "6%";

    useEffect(() => {

        return () => {
        };
    }, []);

    const updateFormDataList = (index: number, formDataList: Record<string, any>[], formData: Record<string, any>) => {
        const newFormDataList = [...formDataList];
        newFormDataList[index] = { ...newFormDataList[index], ...formData };
        props.selectorUpdateFormDataList(newFormDataList);
    }

    const removeFormRow = (index: number, formDataList: Record<string, any>[]) => {

        const newFormDataList = [...formDataList];
        newFormDataList.splice(index, 1);
        props.selectorUpdateFormDataList(newFormDataList);
    };

    const addFormRow = (index: number, formDataList: Record<string, any>[], inputColumns: FormInputColumnPropsI[]) => {

        const newFormDataList = [...formDataList];
        newFormDataList.push(buildFormDataColumns(inputColumns));
        props.selectorUpdateFormDataList(newFormDataList);
    };

    const buildColumnOptions = (index: number, formDataList: Record<string, any>[], inputColumns: FormInputColumnPropsI[]) => {

        let buttonsOptions = [];
        buttonsOptions.push(<ButtonCustomComponent icon={faTrash} onClick={removeFormRow.bind(null, index, props.formDataList)} />);

        if (index === formDataList.length - 1)
            buttonsOptions.push(<ButtonCustomComponent icon={faPlus} onClick={addFormRow.bind(null, index, props.formDataList, inputColumns)} />);

        return (<div style={{ width: "100%" }}><ButtonsOrganizerComponent buttonOptions={buttonsOptions} justifyContent="center" /></div>);
    }

    const buildHeaderLabels = (inputColumns: FormInputColumnPropsI[], widthColumns: string) => {

        let columns = inputColumns.map((inputColumnProps: FormInputColumnPropsI) => {
            return (
                <Col key={inputColumnProps.id} md={"auto"} style={{ width: widthColumns, paddingTop: "3px", textAlign: "center" }}>
                    <b>{inputColumnProps.label}</b>
                </Col>
            );
        });

        return <Row key={"header"} style={{ width: "100%" }}>
            <Col md={"auto"} style={{ width: columnInputWidth }}>
                <Row style={{ width: "100%" }}>{columns}</Row>
            </Col>
            <Col md={"auto"} style={{ width: columnOptionsWidth }}>
                <Col key={"options"} md={"auto"} style={{ width: "100%", paddingTop: "3px", textAlign: "center" }}>
                    <b>OPTIONS</b>
                </Col>
            </Col>
        </Row>;
    }

    const buildFormMultiple = () => {

        let widthColumns = 100 / (props.inputColumns.length);

        let cloneInputColumns = deepClone(props.inputColumns);

        cloneInputColumns.map((inputColumnProps: FormInputColumnPropsI) => {
            inputColumnProps.label = "";
            inputColumnProps.tooltipText = undefined;
        });

        let inputColumnsComponents = [buildHeaderLabels(props.inputColumns, widthColumns + "%")];

        if (props.formDataList.length > 0) {
            inputColumnsComponents = inputColumnsComponents.concat(
                props.formDataList.map((formData: Record<string, any>, index: number) => {

                    return (
                        <Row key={index} style={{ width: "100%" }}>
                            <Col md={"auto"} style={{ width: columnInputWidth }}>
                                <Row>
                                    <FormInputColumnsComponent
                                        inputColumns={cloneInputColumns}
                                        width={widthColumns + "%"}
                                        formData={formData}
                                        validatorControl={props.validatorControl}
                                        selectorUpdateFormData={updateFormDataList.bind(null, index, props.formDataList)}>
                                    </FormInputColumnsComponent>
                                </Row>
                            </Col>
                            <Col md={"auto"} style={{ width: columnOptionsWidth, paddingTop: "4px", paddingRight: "0" }}>
                                {buildColumnOptions(index, props.formDataList, props.inputColumns)}
                            </Col>
                        </Row>)
                })
            );
        }
        else {
            inputColumnsComponents = inputColumnsComponents.concat(
                <div key={"add_row_when_empty"} style={{ textAlign: "center", paddingRight: "100px" }}>
                    <ButtonCustomComponent icon={faPlus} onClick={addFormRow.bind(null, 0, props.formDataList, props.inputColumns)} />
                </div>);
        }

        return (<div>
            <Container style={{ width: "100%", paddingRight: "0" }}>{inputColumnsComponents}</Container>
        </div>);
    }

    let formContainersComponents = buildFormMultiple();
    return (<div>{formContainersComponents}<TooltipConfigInputHelp /></div>);
}

export default FormInputsMultipleComponent