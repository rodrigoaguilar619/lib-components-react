import { _APP_ENVIRONMENT_ } from "@app/catalogs/constantCatalog";
import { EnvironmentEnum } from "@app/catalogs/enumCatalog";
import { ButtonCustomComponent } from "@app/components/elements/buttonComponents";
import { faWpforms } from "@fortawesome/free-brands-svg-icons";

export const setDevButtonDefaultData = (buttons: any[], setDefaultData: any) => {

    if (_APP_ENVIRONMENT_ !== EnvironmentEnum.DEVELOPMENT)
        return;
    
    buttons.unshift(<ButtonCustomComponent key="set-default-button" label="Set default data" icon={faWpforms} onClick={setDefaultData} />);
}