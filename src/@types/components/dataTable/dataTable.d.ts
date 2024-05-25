
export interface MaskDataCurrencyPropsI {
    decimalPlaces?: number,
    addZeroPad?: boolean,
    addSeparateComma?: boolean,
    addSymbolCurrency?: boolean,
    addSymbolPercent?: boolean
}

export interface MaskDataDatePropsI {
    format: string
}

export interface MaskDataPropsI {
    maskType: MaskDataTypeEnum;
    isShowNull?: boolean;
    maskDataProps?: MaskDataCurrencyPropsI | MaskDataDatePropsI,
}

export interface DataTableAlignsPropsI {
    alignHeader?: "center" | "left" | "right",
    alignCell?: "center" | "left" | "right"
}

export interface DataTableConfigPropsI {
    isSortable?: boolean,
    aligns?: DataTableAlignsPropsI, //properties for align header and columns
    styleCss?: CSSProperties,       //properties css for column
    pluginProps?: any                //properties extra for plugin
}

export interface DataTablePropsI {
    field: string,
    header: string,
    tableConfig: DataTableConfigPropsI,
    maskProps?: MaskDataPropsI,
}

export interface DataTableComponentI {
    columnDefList: DataTablePropsI[],
    columnDataList: any[],
    columnOptionsTemplate?: DataTableColumnOptionsPropsI,
    title: string,
    totalRows: number,
    isShowRowsPage?: boolean,
    isSortable?: boolean,
    footerButtons?: any,
    customMaskData?: Function | undefined,
    rowExpansionTemplate?: any,
    extraProps?: any,
    isShowSearch?: boolean,
    isShowHeader?: boolean,
    isShowFooter?: boolean,
}

export interface DataTableColumnOptionsPropsI {
    header: string,
    tableConfig: DataTableConfigPropsI,
    actionTemplate?: any,
}