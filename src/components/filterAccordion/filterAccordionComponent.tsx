import { useEffect } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Col, Container, Row } from 'react-bootstrap';
import FormInputColumnsComponent from '@app/components/forms/formInputsElements/formInputColumnsComponent';
import { ButtonSearchComponent } from '@app/components/elements/buttonComponents';
import { FilterAccordionPropsI } from '@app/@types/components/filterAccordion/filterAccordion';
import { FormInputContainerPropsI } from '@app/@types/components/formInputs/formInputs';

const FilterAccoridionComponent: React.FC<FilterAccordionPropsI> = (props) => {

    useEffect(() => {

        return () => {
        };
    }, []);

    const buildContainer = (formContainer: FormInputContainerPropsI, formData: Record<string, any>, selectorUpdateFormData: any) => {

        if (Object.keys(formData).length === 0) {
            return null;
        }

        let widthColumns = 100 / formContainer.columnstotal;
        let styles: Record<string, string> = {};

        if (formContainer.containerWidth !== undefined) {
            styles.width = formContainer.containerWidth;
        }

        return (<Container style={styles}><Row>
            <FormInputColumnsComponent
                inputColumns={formContainer.inputColumns}
                width={widthColumns + "%"}
                formData={formData}
                selectorUpdateFormData={selectorUpdateFormData}
                executeOnChange={props.executeFilterSearchOnChange}>
            </FormInputColumnsComponent>
            {buildButtonFilter(widthColumns + "%")}
        </Row></Container>);
    }

    const buildButtonFilter = (width: string) => {

        return (<Col key={"buttonSearch"} md={"auto"} style={{ width: width, paddingTop: "3px" }} className="align-self-end">
            {props.executeFilterSearch !== undefined ? <ButtonSearchComponent label="Search" onClick={props.executeFilterSearch} /> : null}
        </Col>);
    }

    return (<div>
        <Accordion activeIndex={0} /*onTabChange={(e) => setShowAccordion(e.index === 0)}*/>
            <AccordionTab header={props.title}>
                {buildContainer(props.formContainer, props.formData, props.selectorUpdateFormData)}
            </AccordionTab>
        </Accordion>
    </div>
    );
}

export default FilterAccoridionComponent