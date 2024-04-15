import { FormInputContainerPropsI } from "@app/@types/components/formInputs/formInputs";
import { buildFormDataContainers, buildFormDataColumns, buildFormDataMultiple } from "@app/utils/componentUtils/formUtil";
  
  describe("FormDataUtils", () => {
    describe("buildFormDataContainers", () => {
      it("should build form data from form containers", () => {
        // Prepare test data
        const formContainers: FormInputContainerPropsI[] = [
          {
            inputColumns: [
              { id: "id1", label: "label1", inputProps: { value: "value1", inputType: "text 1", updateValue: () => {} } },
              { id: "id2", label: "label2", inputProps: { value: "value2", inputType: "text 2", updateValue: () => {} } }
            ],
            columnstotal: 2
          },
        ];
  
        // Execute the function
        const formData = buildFormDataContainers(formContainers);
  
        // Assert the result
        expect(formData).toEqual({ id1: "value1", id2: "value2" });
      });
    });
  
    describe("buildFormDataColumns", () => {
      it("should build form data columns from form inputs", () => {
        // Prepare test data
        const formInputs = [
            { id: "id1", label: "label1", inputProps: { value: "value1", inputType: "text 1", updateValue: () => {} } },
            { id: "id2", label: "label2", inputProps: { value: "value2", inputType: "text 2", updateValue: () => {} } }
        ];
  
        // Execute the function
        const formData = buildFormDataColumns(formInputs);
  
        // Assert the result
        expect(formData).toEqual({ id1: "value1", id2: "value2" });
      });
    });
  
    describe("buildFormDataMultiple", () => {
      it("should build form data for multiple form inputs", () => {
        // Prepare test data
        const formInputs = [
            { id: "id1", label: "label1", inputProps: { value: "value1", inputType: "text 1", updateValue: () => {} } },
            { id: "id2", label: "label2", inputProps: { value: "value2", inputType: "text 2", updateValue: () => {} } }
        ];
  
        // Execute the function
        const formDataArray = buildFormDataMultiple(formInputs);
  
        // Assert the result
        expect(formDataArray).toHaveLength(1);
        expect(formDataArray[0]).toEqual({ id1: "value1", id2: "value2" });
      });
    });
  });
  