import { DataTablePropsI } from "@app/@types/components/dataTable/dataTable";

export const inputIds = {
    text_normal: "text_normal",
    select_normal: "select_normal",
    calendar_normal: "calendar_normal",
}

export const columnsList: DataTablePropsI[] = [
    {
        field: 'id', header: 'Id', tableConfig: {
            styleCss: { width: "5%", textAlign: "center" },
            isSortable: true
        }
    },
    {
        field: 'name', header: 'Name', tableConfig: {
            styleCss: { width: "5%", textAlign: "center" },
            isSortable: true
        }
    },
    {
        field: 'surname', header: 'Surname', tableConfig: {
            styleCss: { width: "5%", textAlign: "center" },
            isSortable: true
        }
    },
    {
        field: 'age', header: 'Age', tableConfig: {
            styleCss: { width: "5%", textAlign: "center" },
            isSortable: true
        }
    }

]

export const columnsAddressList: DataTablePropsI[] = [
    {
        field: 'streetAddress', header: 'Street Address', tableConfig: {
            styleCss: { width: "5%", textAlign: "center" },
            isSortable: true
        }
    },
    {
        field: 'city', header: 'City', tableConfig: {
            styleCss: { width: "5%", textAlign: "center" },
            isSortable: true
        }
    },
    {
        field: 'state', header: 'State', tableConfig: {
            styleCss: { width: "5%", textAlign: "center" },
            isSortable: true
        }
    },
    {
        field: 'zip', header: 'Zip', tableConfig: {
            styleCss: { width: "5%", textAlign: "center" },
            isSortable: true
        }
    }
];