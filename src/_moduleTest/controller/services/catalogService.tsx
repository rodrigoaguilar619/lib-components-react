import { HttpMethodEnum } from "@app/catalogs/enumCatalog";
import { manageAxiosCallApiAuthPromise } from "@app/utils/webUtils/httpManagerUtil";
import { generateDebugClassService } from "@app/utils/webUtils/debugUtil";
import { URL_CATALOG_DATA_LIST_GET } from "@app/_moduleTest/catalogs/uriCatalog";

export function getCatalogDataService(catalogName: string) {

    let debugClass = generateDebugClassService("Get Catalog list");

    let params = { catalogName: catalogName };
    let url = URL_CATALOG_DATA_LIST_GET;
    
    return manageAxiosCallApiAuthPromise(debugClass, url, params, {}, HttpMethodEnum.POST);
}