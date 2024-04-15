class DebugClass {

    private moduleName: string;
    private debugColor: string | undefined;
    
    constructor(moduleName: string, debugColor?: string) {
        this.moduleName = moduleName;
        this.debugColor = debugColor;
    }

    getModuleName() {
        return this.moduleName;
    }

    getDebugColor() {
        return this.debugColor;
    }
}

export default DebugClass;