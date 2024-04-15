export interface ParentComponentPropsI {
    componentType: ComponentTypeEnum
    executeParentFunction?: (() => void) | Function;
}