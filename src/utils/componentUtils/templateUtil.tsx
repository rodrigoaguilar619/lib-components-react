import { ComponentTypeEnum } from "@app/catalogs/enumCatalog";
import { setTemplateHeaderSubTitleAction } from "@app/controller/actions/templateHeaderAction";

export const dispatchTemplateHeaderSubTitleAction = (dispatch: any, componentType: ComponentTypeEnum, title: string) => {
    if (componentType === ComponentTypeEnum.MODULE) {
        dispatch(setTemplateHeaderSubTitleAction(title));
    }
}