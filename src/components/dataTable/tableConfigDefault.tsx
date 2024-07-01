import { DataTableColumnOptionsPropsI, DataTableConfigPropsI } from "@app/@types/components/dataTable/dataTable"

export const tableConfigDefault: DataTableConfigPropsI = {
    pluginProps: { sortable: true }
}

export const tableOptionsTemplateDefault: DataTableColumnOptionsPropsI = {
    header: "Options",
    tableConfig: {
        styleCss: { width: "5%", textAlign: "center" },
    }
}