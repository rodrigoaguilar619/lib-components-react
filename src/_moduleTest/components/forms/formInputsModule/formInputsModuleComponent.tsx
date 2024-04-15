import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { formContainers, formContainers2, inputIds } from './formInputsModuleConfig';
import FormInputContainersComponent from '@app/components/forms/formInputsElements/formInputContainersComponent';
import { buildFormDataContainers, getParameterCall } from '@app/utils/componentUtils/formUtil';
import { addValidatorRuleIsGreaterThan, buildSimpleReactValidator } from '@app/utils/pluginUtils/simpleReactValidatorUtil';
import useHookModal from '@app/hookStates/modalHookState';
import ModalComponent from '@app/components/modals/modalComponent';
import { faWpforms } from '@fortawesome/free-brands-svg-icons';
import { ButtonCustomComponent, ButtonSubmitComponent, ButtonsOrganizerComponent } from '@app/components/elements/buttonComponents';
import { dispatchTemplateHeaderSubTitleAction } from '@app/utils/componentUtils/templateUtil';
import { buildAlertErrorRedux } from '@app/utils/componentUtils/alertUtil';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { showDataDevelopment } from '@app/utils/webUtils/debugUtil';
import { FormInputsModulePropsI } from '@app/_moduleTest/_propTypes/components/forms/formInputsModule';

const FormInputsModuleComponent: React.FC<FormInputsModulePropsI> = (props) => {

    const dispatch = useDispatch();
    const location = useLocation();
    const [count, setCount] = useState<number>(0);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isForceUpdate, setIsForceUpdate] = useState<boolean>(false);
    const [modalState, setOpenModal, setCloseModal, setBodyModal, setTitleModal] = useHookModal();
    const validatorControl: any = useRef(buildSimpleReactValidator());

    useEffect(() => {
        dispatchTemplateHeaderSubTitleAction(dispatch, props.componentType, "Form Inputs");
        setFormData(buildFormDataContainers(formContainers));

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

    const setDefaultData = () => {
        setFormData({
            ...formData,
            [inputIds.text_normal]: "Texto normal",
            [inputIds.select_normal]: "NY",
            [inputIds.calendar_normal]: 1708322400000,
            [inputIds.calendar_format]: 1709100000000,
            [inputIds.validate_email]: "h3sXO@example.com",
            [inputIds.validate_numeric]: 5.5,
            [inputIds.validate_number_1]: 10,
            [inputIds.validate_number_2]: 5
        });
    };

    const handleClickShowAlertError = () => {
        buildAlertErrorRedux(dispatch, props.componentType, "Test error " + count);
        setCount(count + 1);
    };

    let buttons = [
        <ButtonCustomComponent key="show-alert-error-button" label="Show Alert Error" icon={faWarning} onClick={handleClickShowAlertError} />,
        <ButtonCustomComponent key="set-default-button" label="Set default data" icon={faWpforms} onClick={setDefaultData} />,
        <ButtonSubmitComponent key="save-button" label="Save" onClick={handleClick} />
    ]

    addValidatorRuleIsGreaterThan(inputIds.validate_number_1, formContainers, inputIds.validate_number_2, formData[inputIds.validate_number_2]);
    return (<div>
        <ModalComponent title={modalState.titleModal} visible={modalState.showModal} selectorCloseModal={setCloseModal}
            body={modalState.bodyModal} size="sm" />
        <div>Id getted from parent: <b>{getParameterCall(location, props, "id") ?? "no id"}</b></div>
        <br></br>
        <FormInputContainersComponent formContainers={formContainers} formData={formData}
            validatorControl={validatorControl} selectorUpdateFormData={setFormData} />
        <br></br>
        <FormInputContainersComponent formContainers={formContainers2} formData={formData}
            validatorControl={validatorControl} selectorUpdateFormData={setFormData} />
        <br></br>
        <ButtonsOrganizerComponent buttonOptions={buttons} justifyContent="right" />
        <br></br>
        {showDataDevelopment("formData", formData)}
    </div>
    );
}

export default FormInputsModuleComponent