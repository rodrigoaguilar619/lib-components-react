import {
    buildSimpleReactValidator,
    addValidatorRule,
    getLabelFieldLabelToCompare,
    addValidatorRuleIsGreaterThan
  } from '@app/utils/pluginUtils/simpleReactValidatorUtil';
  
  import { FormInputContainerPropsI } from '@app/@types/components/formInputs/formInputs';
  
  describe('formInputsUtil', () => {
    describe('buildSimpleReactValidator', () => {
      it('creates an instance of SimpleReactValidator with custom rules', () => {
        const validator = buildSimpleReactValidator();
        expect(validator).toBeDefined();
        expect(typeof validator.message).toBe('function');
      });
    });
  
    describe('addValidatorRule', () => {
      const mockFormContainers: FormInputContainerPropsI[] = [
        {
          inputColumns: [
            {
              inputProps: { id: 'field1', value: '' },
              label: 'Field 1',
              validations: {
                idValidation: 'field1',
                validatorRules: ['required']
              }
            }
          ]
        }
      ];
  
      it('adds a new validator rule to the correct field', () => {
        addValidatorRule('field1', mockFormContainers, 'isGreaterThan:OtherField,100');
        expect(mockFormContainers[0].inputColumns[0].validations?.validatorRules).toContain('isGreaterThan:OtherField,100');
      });
  
      it('replaces the existing validator rule with the same name', () => {
        addValidatorRule('field1', mockFormContainers, 'required');
        const rules = mockFormContainers[0].inputColumns[0].validations?.validatorRules;
        expect(rules?.filter(rule => rule === 'required').length).toBe(1);
      });
    });
  
    describe('getLabelFieldLabelToCompare', () => {
      const mockFormContainers: FormInputContainerPropsI[] = [
        {
          inputColumns: [
            {
              inputProps: { id: 'compareField', value: '' },
              label: 'Compare Field'
            }
          ]
        }
      ];
  
      it('returns the correct label for the given field id', () => {
        const label = getLabelFieldLabelToCompare(mockFormContainers, 'compareField');
        expect(label).toBe('Compare Field');
      });
    });
  
    describe('addValidatorRuleIsGreaterThan', () => {
      let mockFormContainers: FormInputContainerPropsI[];
  
      beforeEach(() => {
        mockFormContainers = [
          {
            inputColumns: [
              {
                inputProps: { id: 'targetField', value: '' },
                label: 'Target Field',
                validations: {
                  idValidation: 'targetField',
                  validatorRules: []
                }
              },
              {
                inputProps: { id: 'compareField', value: '' },
                label: 'Compare Label'
              }
            ]
          }
        ];
      });
  
      it('adds a "isGreaterThan" rule with correct format', () => {
        addValidatorRuleIsGreaterThan('targetField', mockFormContainers, 'compareField', '123');
        const rules = mockFormContainers[0].inputColumns[0].validations?.validatorRules;
        expect(rules?.some(rule => rule.startsWith('isGreaterThan:Compare Label,123'))).toBe(true);
      });
  
      it('warns if labelFieldLabelToCompare is undefined', () => {
        console.warn = jest.fn();
        addValidatorRuleIsGreaterThan('targetField', mockFormContainers, 'missingField', '123');
        expect(console.warn).toHaveBeenCalled();
      });
    });
  });

  describe('customValidators - isGreaterThan', () => {
    const validator: any = buildSimpleReactValidator();
  
    describe('rule function', () => {
      test('returns true when value is greater than parameter', () => {
        const result = validator.rules.isGreaterThan.rule('10', ['Minimum', '5']);
        expect(result).toBe(true);
      });
  
      test('returns false when value is equal to parameter', () => {
        const result = validator.rules.isGreaterThan.rule('10', ['Minimum', '10']);
        expect(result).toBe(false);
      });
  
      test('returns false when value is less than parameter', () => {
        const result = validator.rules.isGreaterThan.rule('3', ['Minimum', '5']);
        expect(result).toBe(false);
      });
  
      test('handles missing parameter gracefully (defaults to 0)', () => {
        const result = validator.rules.isGreaterThan.rule('1', ['Minimum']);
        expect(result).toBe(true);
      });
  
      test('handles non-numeric input gracefully', () => {
        const result = validator.rules.isGreaterThan.rule('abc', ['Minimum', '5']);
        expect(result).toBe(false);
      });
    });
  
    describe('messageReplace function', () => {
      test('replaces :fieldToCompare placeholder with actual label', () => {
        const replacedMessage = validator.rules.isGreaterThan.messageReplace(
          'This field is not greater than ":fieldToCompare"',
          ['Minimum', '5']
        );
        expect(replacedMessage).toBe('This field is not greater than "Minimum"');
      });
    });
  });