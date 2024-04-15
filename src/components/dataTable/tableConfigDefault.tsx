import { DataTableColumnOptionsPropsI, DataTableConfigPropsI } from "@app/@types/components/dataTable/dataTable"

export const tableConfigDefault: DataTableConfigPropsI = {
    aligns: { alignHeader: "center", alignCell: "center" },
    pluginProps: { sortable: true }
}

export const tableOptionsTemplateDefault: DataTableColumnOptionsPropsI = {
    header: "Options",
    tableConfig: {
        aligns: { alignCell: "center" },
        styleCss: { width: "5%" },
    }
}