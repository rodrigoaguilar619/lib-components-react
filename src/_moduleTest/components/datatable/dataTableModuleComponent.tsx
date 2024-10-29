import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { faHammer, faHome, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getDataTableDataService } from '@app/_moduleTest/controller/services/dataTableService';
import ModalComponent from '@app/components/modals/modalComponent';
import DataTableComponent from '@app/components/dataTable/dataTableComponent';
import FilterAccoridionComponent from '@app/components/filterAccordion/filterAccordionComponent';
import { debug, generateDebugClassModule } from '@app/utils/webUtils/debugUtil';
import { manageAlertModuleError } from '@app/utils/webUtils/httpManagerUtil';
import { buildAlertErrorRedux, buildAlertSuccessRedux } from '@app/utils/componentUtils/alertUtil';
import { buildFormDataContainers, setExucuteOnChangeToAllColumnsContainerDefList, setOptionsToColumnsDefList } from '@app/utils/componentUtils/formUtil';
import { setTemplateLoadingActiveMessageAction, setTemplateLoadingIsActiveAction } from '@app/controller/actions/templateLoadingAction';
import { setTemplateHeaderSubTitleAction } from '@app/controller/actions/templateHeaderAction';
import { columnsList, filterData, inputIds } from './dataTableModuleConfig';
import { tableOptionsTemplateDefault } from '@app/components/dataTable/tableConfigDefault';
import useHookModal from '@app/hookStates/modalHookState';
import { TooltipConfigButtonNestedOptions, TooltipConfigCustom, TooltipConfigInputHelp } from '@app/components/tooltip/tooltipConfigComponents';
import { ButtonCustomComponent, ButtonDataTableOptionComponent, ButtonDataTableOptionNestedComponent, ButtonWithNestedOptionsComponent, ButtonsOrganizerComponent } from '@app/components/elements/buttonComponents';
import { ComponentTypeEnum } from '@app/catalogs/enumCatalog';
import { ROUTE_FORMS_FORM_INPUTS } from '@app/_moduleTest/config/catalogs/routesCatalog';
import { useNavigate } from 'react-router-dom';
import { DataTableColumnOptionsPropsI } from '@app/@types/components/dataTable/dataTable';
import { DataTableModulePropsI } from '@app/_moduleTest/_propTypes/components/datatable/dataTableModule';
import { getCatalogDataService } from '@app/_moduleTest/controller/services/catalogService';
import LoadingModuleComponent from '@app/components/loadings/loadingModuleComponent';
import useHookLoading from '@app/hookStates/loadingHookState';
import ModalConfirmComponent from '@app/components/modals/modalConfirmComponent';

const DataTableModuleComponent: React.FC<DataTableModulePropsI> = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [count, setCount] = useState<number>(0);
    const [rowIdSelected, setRowIdSelected] = useState<number | null>(null);
    const [dataTableList, setDataTableList] = useState<any[]>([]);
    const [formFilterData, setFormFilterData] = useState<Record<string, any>>({});
    const [modalState, setOpenModal, setCloseModal, setBodyModal, setTitleModal] = useHookModal();
    const [modalConfirmState, setOpenModalConfirm, setCloseModalConfirm, setBodyModalConfirm, setTitleModalConfirm] = useHookModal();
    const [loadingState, setLoading] = useHookLoading();
    const optionsTemplate: DataTableColumnOptionsPropsI = tableOptionsTemplateDefault;

    const FormInputsModuleComponent = React.lazy(() => import('@app/_moduleTest/components/forms/formInputsModule/formInputsModuleComponent'))

    useEffect(() => {

        dispatch(setTemplateHeaderSubTitleAction("Datatable list"));
        optionsTemplate.actionTemplate = actionTemplate;
        setFormFilterData(buildFormDataContainers([filterData]));
        
        setExucuteOnChangeToAllColumnsContainerDefList([filterData], executeFilterSearchOnchage);

        initModule();
        return () => {
        };
    }, []);

    const openFormInputModuleRoute = (id: string) => {
        navigate(ROUTE_FORMS_FORM_INPUTS, { state: { id: id } });
    };

    const actionTemplate = (rowData: any, column: any) => {

        let modalBody = <div>rowData:&nbsp;{JSON.stringify(rowData)}<br></br>columns:&nbsp;{JSON.stringify(column.field)}</div>;

        let buttonOptions = [];
        let buttonNestedOptions = [];

        buttonNestedOptions.push(<ButtonDataTableOptionNestedComponent icon={faHammer} onClick={() => {
            setTitleModal("DATA ROW"); setBodyModal(modalBody); setOpenModal() 
        }} tooltip="Show modal row data" />);

        buttonOptions.push(<ButtonDataTableOptionComponent icon={faHome} onClick={() => {
            openFormInputModuleRoute(rowData.id) 
        }} tooltip='Open form input module on route' />);

        buttonOptions.push(<ButtonDataTableOptionComponent icon={faHammer} onClick={() => {
            setTitleModal("FORM INPUTS TEST"); setBodyModal(<FormInputsModuleComponent componentType={ComponentTypeEnum.POPUP} id={rowData.id} />); setOpenModal()
        }} tooltip='Open form input module on popup' />);

        buttonOptions.push(<ButtonDataTableOptionNestedComponent icon={faTrash} onClick={() => {
            setTitleModalConfirm("Modal confirm for row id: " + rowData.id); setRowIdSelected(rowData.id);
            setBodyModalConfirm("Are you sure you want to delete this row?"); setOpenModalConfirm()
        }} tooltip="trash" />);

        buttonOptions.push(<ButtonWithNestedOptionsComponent idTooltip={rowData.id} buttonOptions={buttonNestedOptions} />);

        return (<ButtonsOrganizerComponent buttonOptions={buttonOptions} />);
    }

    const initModule = () => {

        let debugClass = generateDebugClassModule("init datatable list module");
        debug(debugClass, "start");

        dispatch(setTemplateLoadingActiveMessageAction(true, "Loading datatable list module"));
        axios.all([getDataTableDataService(1, formFilterData), getCatalogDataService(inputIds.select_normal)])
            .then(axios.spread((dataTableData, catalogData) => {

                debug(debugClass, "result", dataTableData);
                setDataTableList(dataTableData.data);
                setOptionsToColumnsDefList(filterData.inputColumns, catalogData.data, inputIds.select_normal);
                dispatch(setTemplateLoadingIsActiveAction(false));
                setLoading(false);

            }))
            .catch((error) => {
                manageAlertModuleError(dispatch, props.componentType, debugClass, error);
                dispatch(setTemplateLoadingIsActiveAction(false));
            });
    }

    const executeGetDataTableList = () => {

        let debugClass = generateDebugClassModule("init datatable list");
        debug(debugClass, "start");

        dispatch(setTemplateLoadingActiveMessageAction(true, "Loading datatable list"));
        axios.all([getDataTableDataService(1, formFilterData)])
            .then(axios.spread((dataDataTable) => {

                debug(debugClass, "result", dataDataTable);
                setDataTableList(dataDataTable.data);
                dispatch(setTemplateLoadingIsActiveAction(false));

            }))
            .catch((error) => {
                manageAlertModuleError(dispatch, props.componentType, debugClass, error);
                dispatch(setTemplateLoadingIsActiveAction(false));
            });
    }

    const executeFilterSearchOnchage = (formData: Record<string, any>) => {
        alert(JSON.stringify(formData));
    }

    const executeFilterSearch = () => {
        alert(JSON.stringify(formFilterData));
        executeGetDataTableList();
    }

    const showAlertError = () => {
        buildAlertErrorRedux(dispatch, props.componentType, "Test error " + count);
        setCount(count + 1);
    };

    const showAlertSuccess = () => {
        buildAlertSuccessRedux(dispatch, props.componentType, "Test success " + count);
        setCount(count + 1);
    };

    const handleDeleteRow = () => {
        setCloseModalConfirm();
        let newDataTableList: any[] = dataTableList.filter((item: any) => item.id !== rowIdSelected);
        setDataTableList(newDataTableList);
        buildAlertSuccessRedux(dispatch, props.componentType, "Row " + rowIdSelected + " deleted successfully");
    }

    let footerButtons = [];

    footerButtons.push(<ButtonCustomComponent label="Generate alert success" onClick={showAlertSuccess} />);
    footerButtons.push(<ButtonCustomComponent label="Generate alert error" onClick={showAlertError} />);
    
    if(loadingState.isLoading)
        return <LoadingModuleComponent />
    
    return (<div>
        <ModalComponent title={modalState.titleModal} visible={modalState.showModal} selectorCloseModal={setCloseModal}
            body={modalState.bodyModal} size='sm' />
        <ModalConfirmComponent title={modalConfirmState.titleModal} visible={modalConfirmState.showModal} selectorCloseModal={setCloseModalConfirm}
            body={modalConfirmState.bodyModal} size='sm' executeOnConfirmFunction={handleDeleteRow} />
        <div style={{ display: "flex", gap: "3px" }}>
            {<ButtonCustomComponent label="Generate alert success" onClick={showAlertSuccess} />}
            {<ButtonCustomComponent label="Generate alert error" onClick={showAlertError} />}
        </div>
        <br></br>
        <FilterAccoridionComponent
            formContainer={filterData}
            title="Filter"
            formData={formFilterData}
            executeFilterSearch={executeFilterSearch}
            selectorUpdateFormData={setFormFilterData} />
        <DataTableComponent
            title='Table title'
            columnDefList={columnsList}
            columnDataList={dataTableList}
            columnOptionsTemplate={optionsTemplate}
            totalRows={dataTableList.length}
            footerButtons={footerButtons}
        />
        <br></br>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <DataTableComponent
                title='Table title not header search and footer'
                tableWidth='85%'
                columnDefList={columnsList}
                columnDataList={dataTableList}
                columnOptionsTemplate={optionsTemplate}
                totalRows={dataTableList.length}
                footerButtons={footerButtons}
                isShowSearch={false}
                isShowFooter={false}
            />
        </div>
        <TooltipConfigInputHelp />
        <TooltipConfigCustom />
        <TooltipConfigButtonNestedOptions />
    </div>
    );
}

export default DataTableModuleComponent