import { DataTablePropsI } from "@app/@types/components/dataTable/dataTable";

export const inputIds = {
    text_normal: "text_normal",
    select_normal: "select_normal",
    calendar_normal: "calendar_normal",
}

export const columnsList: DataTablePropsI[] = [
    {
        field: 'id', header: 'Id', tableConfig: {
            aligns: { alignCell: "center" },
            styleCss: { width: "5%" },
            isSortable: true
        }
    },
    {
        field: 'name', header: 'Name', tableConfig: {
            aligns: { alignCell: "center" },
            styleCss: { width: "5%" },
            isSortable: true
        }
    },
    {
        field: 'surname', header: 'Surname', tableConfig: {
            aligns: { alignCell: "center" },
            styleCss: { width: "5%" },
            isSortable: true
        }
    },
    {
        field: 'age', header: 'Age', tableConfig: {
            aligns: { alignCell: "center" },
            styleCss: { width: "5%" },
            isSortable: true
        }
    }

]

export const columnsAddressList: DataTablePropsI[] = [
    {
        field: 'streetAddress', header: 'Street Address', tableConfig: {
            aligns: { alignCell: "center" },
            styleCss: { width: "5%" },
            isSortable: true
        }
    },
    {
        field: 'city', header: 'City', tableConfig: {
            aligns: { alignCell: "center" },
            styleCss: { width: "5%" },
            isSortable: true
        }
    },
    {
        field: 'state', header: 'State', tableConfig: {
            aligns: { alignCell: "center" },
            styleCss: { width: "5%" },
            isSortable: true
        }
    },
    {
        field: 'zip', header: 'Zip', tableConfig: {
            aligns: { alignCell: "center" },
            styleCss: { width: "5%" },
            isSortable: true
        }
    }
];