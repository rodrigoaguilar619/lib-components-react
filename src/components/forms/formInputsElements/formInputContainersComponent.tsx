import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import FormInputColumnsComponent from "./formInputColumnsComponent";
import { TooltipConfigInputHelp } from "@app/components/tooltip/tooltipConfigComponents";
import { FormInputContainerPropsI, FormInputsComponentI } from "@app/@types/components/formInputs/formInputs";

const FormInputContainersComponent: React.FC<FormInputsComponentI> = (props) => {

    useEffect(() => {

        return () => {
        };
    }, []);

    const buildFormContainers = (formContainers: FormInputContainerPropsI[]) => {

        if (Object.keys(props.formData).length === 0) {
            return null;
        }

        let formContainersComponents = formContainers.map((formContainerProps: FormInputContainerPropsI, index: number) => {

            let widthColumns = 100 / formContainerProps.columnstotal;
            let styles: Record<string, string> = {};

            if (formContainerProps.containerWidth !== undefined) {
                styles.width = formContainerProps.containerWidth;
            }

            return <Container key={index} style={styles}><Row>
                <FormInputColumnsComponent
                    inputColumns={formContainerProps.inputColumns}
                    width={widthColumns + "%"}
                    formData={props.formData}
                    validatorControl={props.validatorControl}
                    selectorUpdateFormData={props.selectorUpdateFormData}>
                </FormInputColumnsComponent>
            </Row></Container>
        });

        return (<div>{formContainersComponents}</div>);
    }

    let formContainersComponents = buildFormContainers(props.formContainers);
    return (<div>{formContainersComponents}<TooltipConfigInputHelp /></div>);
}

export default FormInputContainersComponent