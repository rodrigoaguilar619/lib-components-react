/*import { FormInputContainerPropsI } from "@app/@types/components/formInputs/formInputs";
import { buildFormDataContainers, buildFormDataColumns, buildFormDataMultiple } from "@app/utils/componentUtils/formUtil";
  
  describe("FormDataUtils", () => {
    describe("buildFormDataContainers", () => {
      it("should build form data from form containers", () => {
        // Prepare test data
        const formContainers: FormInputContainerPropsI[] = [
          {
            inputColumns: [
              { label: "label1", inputProps: { id: "id1", value: "value1", inputType: "text 1" } },
              { label: "label2", inputProps: { id: "id2", value: "value2", inputType: "text 2" } }
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
            { id: "id1", label: "label1", inputProps: { value: "value1", inputType: "text 1" } },
            { id: "id2", label: "label2", inputProps: { value: "value2", inputType: "text 2" } }
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
            { id: "id1", label: "label1", inputProps: { value: "value1", inputType: "text 1" } },
            { id: "id2", label: "label2", inputProps: { value: "value2", inputType: "text 2" } }
        ];
  
        // Execute the function
        const formDataArray = buildFormDataMultiple(formInputs);
  
        // Assert the result
        expect(formDataArray).toHaveLength(1);
        expect(formDataArray[0]).toEqual({ id1: "value1", id2: "value2" });
      });
    });
  });
  */

  import {
    buildFormDataContainers,
    buildFormDataColumns,
    buildFormDataMultiple,
    getParameterCall,
    setOptionsToColumnsDefList,
    setExucuteOnChangeToColumnsDefList,
    setOptionsToColumnsContainerDefList,
    setExucuteOnChangeToColumnsContainerDefList,
    setExucuteOnChangeToAllColumnsContainerDefList
  } from '@app/utils/componentUtils/formUtil';
  
  describe('formInputsUtils', () => {
  
    const sampleInputColumn = {
      inputProps: { id: 'field1', value: 'value1' },
      label: 'Label 1',
      showColumn: true
    };
  
    const sampleInputColumn2 = {
      inputProps: { id: 'field2', value: 'value2' },
      label: 'Label 2',
      showColumn: true
    };
  
    const sampleContainer = {
      inputColumns: [sampleInputColumn, sampleInputColumn2]
    };
  
    describe('buildFormDataContainers', () => {
      it('builds form data from form containers', () => {
        const result = buildFormDataContainers([sampleContainer]);
        expect(result).toEqual({ field1: 'value1', field2: 'value2' });
      });
    });
  
    describe('buildFormDataColumns', () => {
      it('builds form data from input columns', () => {
        const result = buildFormDataColumns([sampleInputColumn]);
        expect(result).toEqual({ field1: 'value1' });
      });
    });
  
    describe('buildFormDataMultiple', () => {
      it('wraps built form data in an array', () => {
        const result = buildFormDataMultiple([sampleInputColumn]);
        expect(result).toEqual([{ field1: 'value1' }]);
      });
    });
  
    describe('getParameterCall', () => {
      const location = {
        state: {
          myParam: 'fromLocation'
        }
      };
  
      it('gets param from location state if available', () => {
        const result = getParameterCall(location as any, {}, 'myParam');
        expect(result).toBe('fromLocation');
      });
  
      it('gets param from props if not in location', () => {
        const result = getParameterCall(null, { myParam: 'fromProps' }, 'myParam');
        expect(result).toBe('fromProps');
      });
  
      it('returns undefined if not found', () => {
        const result = getParameterCall(null, {}, 'unknownParam');
        expect(result).toBeUndefined();
      });
    });
  });
  