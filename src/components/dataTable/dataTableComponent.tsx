import { DataTable, DataTableExpandedRows, DataTableValueArray } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { maskData } from '@app/utils/dataUtils/maskDataUtil';
import { DataTableColumnOptionsPropsI, DataTableComponentI } from '@app/@types/components/dataTable/dataTable';
import { ButtonsOrganizerComponent } from '../elements/buttonComponents';

const buildColumnOptions = (columnOptionsTemplate: DataTableColumnOptionsPropsI | undefined) => {

    if (columnOptionsTemplate === undefined)
        return undefined;

    return (<Column key={"datatable_options"}
        //field={"options"}
        header={columnOptionsTemplate.header}
        alignHeader={"center"}
        /*align={columnOptionsTemplate.tableConfig.aligns?.alignCell ?? tableConfigDefault.aligns?.alignCell}*/
        style={columnOptionsTemplate.tableConfig.styleCss}
        body={columnOptionsTemplate.actionTemplate}
    />);
};

const DataTableComponent: React.FC<DataTableComponentI> = (props) => {

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);
    const [totalRecordsData, setTotalRecordsData] = useState({ totalRecordsGlobalFilter: null });
    const dt = useRef<DataTable<any>>(null);

    const updateTotalRecords = (fieldName: string, value: number | null) => {
        setTotalRecordsData({ ...totalRecordsData, [fieldName]: value });
    };

    //get total rows using as filter the variable "filterGlobalValue"
    const getCountRowsfilterData = (filterGlobalValue: string) => {
        const filteredData = props.columnDataList.filter((item: any) =>
            Object.values(item).some((value) =>
                value && JSON.stringify(value).toLowerCase().includes(filterGlobalValue.toLowerCase())
            )
        );
        return filteredData.length;
    }

    // get the total rows, if  totalRecordsGlobalFilter has data, will takes the total rows with the filter,
    //otherwise return totalRecords 
    const getTotalRows = () => {
        return totalRecordsData.totalRecordsGlobalFilter ?? props.totalRows;
    };

    //event for when input text for global filter is change
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const totalRows = getCountRowsfilterData(value);
        setGlobalFilterValue(value);
        updateTotalRecords("totalRecordsGlobalFilter", (value !== null && value !== "") ? totalRows : null);
    };

    const showRowsPage = () => {
        
        if(props.isShowFooter === false)
            return undefined;

        return (props.isShowRowsPage === undefined || props.isShowRowsPage === true) ? { rows: 10, rowsPerPageOptions: [10, 20, 50], paginator: true } : undefined;
    };

    const renderSearch = () => {

        return (<span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </span>);
    }

    const renderHeader = () => {

        if(props.isShowHeader === false)
            return undefined;

        return (
            <div className="flex justify-content-end">
                <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ textAlign: "center", width: "20%", lineHeight: "30px" }}></div>
                    <div style={{ textAlign: "center", width: "60%", lineHeight: "30px" }}><div><b>{props.title}</b></div></div>
                    <div style={{ textAlign: "right", width: "20%" }}>
                        {props.isShowSearch === undefined || props.isShowSearch === true ? renderSearch() : null}
                    </div>
                </div>
            </div>
        );
    };

    const renderFooter = () => {

        if(props.isShowFooter === false)
            return undefined;

        let contentSideRight = undefined;

        if (props.footerButtons !== undefined)
            contentSideRight = <ButtonsOrganizerComponent buttonOptions={props.footerButtons} />

        return (<div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ alignSelf: "flex-start" }}>Total records: {getTotalRows()}</div>
            <div style={{ alignSelf: "flex-end" }}>{contentSideRight}</div>
        </div>)
    };

    const generateRowExpansionTemplate = () => {
        if (props.rowExpansionTemplate === undefined)
             return undefined;

        return {
            rowExpansionTemplate: props.rowExpansionTemplate,
            expandedRows: expandedRows,
            onRowToggle: (e: any) => { setExpandedRows(e.data)}
        };
    };
 
    const header = renderHeader();
    const footer = renderFooter();

    let setMaskData = props.customMaskData ?? maskData;

    return (
        <div style={{ width: props.tableWidth }}>
            <DataTable ref={dt} value={props.columnDataList} tableStyle={{ minWidth: '50rem' }} stripedRows
                header={header} globalFilter={globalFilterValue} {...showRowsPage()} footer={footer}
                selectionMode="single" onSelectionChange={(e) => setSelectedRow(e.value)} selection={selectedRow}
                {...generateRowExpansionTemplate()}
                {...props.extraProps}>
                {props.rowExpansionTemplate !== undefined ? <Column expander={true} style={{ width: '2%' }} /> : undefined}
                {buildColumnOptions(props.columnOptionsTemplate)}
                {props.columnDefList.map((col) => (
                    <Column key={col.field}
                        field={col.field}
                        header={col.header}
                        sortable={col.tableConfig.isSortable}
                        alignHeader={"center"}
                        /*align={col.tableConfig.aligns?.alignCell ?? tableConfigDefault.aligns?.alignCell}*/
                        style={col.tableConfig.styleCss}
                        {...col.tableConfig.pluginProps}
                        body={(rowData) => { return setMaskData(rowData[col.field], col.maskProps ?? undefined); }}
                    />
                ))}
            </DataTable>
        </div>
    )
}

export default DataTableComponent