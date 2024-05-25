import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataTableColumnOptionsPropsI } from '@app/@types/components/dataTable/dataTable';
import { DataTableModulePropsI } from '@app/_moduleTest/_propTypes/components/datatable/dataTableModule';
import { getDataTableExpandDataService } from '@app/_moduleTest/controller/services/dataTableService';
import DataTableComponent from '@app/components/dataTable/dataTableComponent';
import { tableOptionsTemplateDefault } from '@app/components/dataTable/tableConfigDefault';
import { ButtonDataTableOptionComponent, ButtonDataTableOptionNestedComponent, ButtonWithNestedOptionsComponent, ButtonsOrganizerComponent } from '@app/components/elements/buttonComponents';
import { TooltipConfigButtonNestedOptions, TooltipConfigCustom, TooltipConfigInputHelp } from '@app/components/tooltip/tooltipConfigComponents';
import { setTemplateHeaderSubTitleAction } from '@app/controller/actions/templateHeaderAction';
import { setTemplateLoadingActiveMessageAction, setTemplateLoadingIsActiveAction } from '@app/controller/actions/templateLoadingAction';
import { debug, generateDebugClassModule } from '@app/utils/webUtils/debugUtil';
import { manageAlertModuleError } from '@app/utils/webUtils/httpManagerUtil';
import { faHammer, faHome, faTrash } from '@fortawesome/free-solid-svg-icons';
import { columnsAddressList, columnsList } from './dataTableExpandModuleConfig';

const DataTableExpandModuleComponent: React.FC<DataTableModulePropsI> = (props) => {
    
    const dispatch = useDispatch();
    const [dataTableList, setDataTableList] = useState<[]>([]);
    const optionsTemplate: DataTableColumnOptionsPropsI = tableOptionsTemplateDefault;
    
    useEffect(() => {
        
        dispatch(setTemplateHeaderSubTitleAction("Datatable Expand list"));
        optionsTemplate.actionTemplate = actionTemplate;

        initModule();
        return () => {
        };
    }, []);

    const initModule = () => {

        let debugClass = generateDebugClassModule("init datatable list module");
        debug(debugClass, "start");

        dispatch(setTemplateLoadingActiveMessageAction(true, "Loading datatable list module"));
        axios.all([getDataTableExpandDataService(1)])
            .then(axios.spread((dataTableData) => {

                debug(debugClass, "result", dataTableData);
                setDataTableList(dataTableData.data);
                dispatch(setTemplateLoadingIsActiveAction(false));

            }))
            .catch((error) => {
                manageAlertModuleError(dispatch, props.componentType, debugClass, error);
                dispatch(setTemplateLoadingIsActiveAction(false));
            });
    }

    const actionTemplate = (rowData: any, column: any) => {

        let buttonOptions = [];
        let buttonNestedOptions = [];

        buttonNestedOptions.push(<ButtonDataTableOptionNestedComponent icon={faHammer} onClick={() => {  }} tooltip="Show modal row data" />);
        buttonNestedOptions.push(<ButtonDataTableOptionNestedComponent icon={faTrash} onClick={() => { }} tooltip="trash" />);

        buttonOptions.push(<ButtonDataTableOptionComponent icon={faHome} onClick={() => { }} tooltip='Open form input module on route' />);
        buttonOptions.push(<ButtonDataTableOptionComponent icon={faHammer} onClick={() => { }} tooltip='Open form input module on popup' />);
        buttonOptions.push(<ButtonWithNestedOptionsComponent idTooltip={rowData.id} buttonOptions={buttonNestedOptions} />);

        return (<ButtonsOrganizerComponent buttonOptions={buttonOptions} />);
    }
    
    const rowExpansionTemplate = (data: any) => {
        return (
            <div className="p-3">
                <DataTableComponent
                    title='Table Address title'
                    columnDefList={columnsAddressList}
                    columnDataList={data.addressList}
                    totalRows={dataTableList.length}
                    isShowRowsPage={false}
                />
            </div>
        );
    };

    return (<div>
        <br></br>
        <DataTableComponent
            title='Table title'
            columnDefList={columnsList}
            columnDataList={dataTableList}
            columnOptionsTemplate={optionsTemplate}
            totalRows={dataTableList.length}
            rowExpansionTemplate={rowExpansionTemplate}
        />
        <br></br>
        <TooltipConfigInputHelp />
        <TooltipConfigCustom />
        <TooltipConfigButtonNestedOptions />
    </div>
    );
}

export default DataTableExpandModuleComponent