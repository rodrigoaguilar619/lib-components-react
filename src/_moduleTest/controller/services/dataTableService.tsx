import { URL_DATATABLE_EXPAND_LIST_GET, URL_DATATABLE_LIST_GET } from "@app/_moduleTest/catalogs/uriCatalog";
import { HttpMethodEnum } from "@app/catalogs/enumCatalog";
import { manageAxiosCallApiAuthPromise } from "@app/utils/webUtils/httpManagerUtil";
import { generateDebugClassService } from "@app/utils/webUtils/debugUtil";

export function getDataTableDataService(paramId: number, filterData?: Record<string, any>) {

    let debugClass = generateDebugClassService("Get datatable list");

    let params = { paramId: paramId, filterData: filterData };
    let url = URL_DATATABLE_LIST_GET;
    
    return manageAxiosCallApiAuthPromise(debugClass, url, params, {}, HttpMethodEnum.POST);
}

export function getDataTableExpandDataService(paramId: number) {

    let debugClass = generateDebugClassService("Get datatable list");

    let params = { paramId: paramId };
    let url = URL_DATATABLE_EXPAND_LIST_GET;
    
    return manageAxiosCallApiAuthPromise(debugClass, url, params, {}, HttpMethodEnum.POST);
}