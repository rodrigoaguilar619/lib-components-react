import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { formContainers, inputSectionMultiple } from './formInputsMultipleModuleConfig';
import FormInputContainersComponent from '@app/components/forms/formInputsElements/formInputContainersComponent';
import { buildFormDataContainers, buildFormDataMultiple } from '@app/utils/componentUtils/formUtil';
import { buildSimpleReactValidator } from '@app/utils/pluginUtils/simpleReactValidatorUtil';
import useHookModal from '@app/hookStates/modalHookState';
import ModalComponent from '@app/components/modals/modalComponent';
import FormInputsMultipleComponent from '@app/components/forms/formInputsMultiple/formInputsMultipleComponent';
import { ButtonSubmitComponent, ButtonsOrganizerComponent } from '@app/components/elements/buttonComponents';
import { dispatchTemplateHeaderSubTitleAction } from '@app/utils/componentUtils/templateUtil';
import { showDataDevelopment } from '@app/utils/webUtils/debugUtil';
import { FormInputsMultipleModulePropsI } from '@app/_moduleTest/_propTypes/components/forms/formInputsMultipleModule';

const FormInputsMultipleModuleComponent: React.FC<FormInputsMultipleModulePropsI> = (props) => {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [formDataList, setFormDataList] = useState<Record<string, any>[]>([]);
    const [isForceUpdate, setIsForceUpdate] = useState<boolean>(false);
    const [modalState, setOpenModal, setCloseModal, setBodyModal, setTitleModal] = useHookModal();
    const validatorControl: any = useRef(buildSimpleReactValidator());

    useEffect(() => {
        dispatchTemplateHeaderSubTitleAction(dispatch, props.componentType, "Form Inputs Multiple");
        setFormData(buildFormDataContainers(formContainers));
        setFormDataList([...buildFormDataMultiple(inputSectionMultiple)])

        return () => {
        };
    }, []);

    const handleClick = () => {

        if (validatorControl.current.allValid()) {
            setOpenModal();
            setBodyModal(<div><p>Form Submitted {JSON.stringify(formData) + " " + JSON.stringify(formData)}</p></div>);
            setTitleModal("Form Submitted");
        } else {
            validatorControl.current.showMessages();
            setIsForceUpdate(!isForceUpdate);
        }
    };

    let buttons = [<ButtonSubmitComponent key="save-button" label="Save" onClick={handleClick}/>]

    return (<div>
        <ModalComponent title={modalState.titleModal} visible={modalState.showModal} selectorCloseModal={setCloseModal}
            body={modalState.bodyModal} size="sm" />
        <FormInputContainersComponent formContainers={formContainers} formData={formData}
            validatorControl={validatorControl} selectorUpdateFormData={setFormData} />
        <br></br>
        Inputs multiple selection:
        <FormInputsMultipleComponent
            inputColumns={inputSectionMultiple}
            formDataList={formDataList}
            validatorControl={validatorControl}
            selectorUpdateFormDataList={setFormDataList}
        />
        <br></br>
        <ButtonsOrganizerComponent buttonOptions={buttons} justifyContent="right" />
        <br></br>
        {showDataDevelopment("formData", formData)}
        {showDataDevelopment("formDataList", formDataList)}
    </div>
    );
}

export default FormInputsMultipleModuleComponent