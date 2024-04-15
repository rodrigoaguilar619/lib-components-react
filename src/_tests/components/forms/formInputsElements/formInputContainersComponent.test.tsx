import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormInputColumnsComponent from '@app/components/forms/formInputsElements/formInputColumnsComponent';
import { InputElementEnum } from '@app/catalogs/enumCatalog';
import { FormInputColumnPropsI } from '@app/@types/components/formInputs/formInputs';

describe('FormInputColumnsComponent', () => {
  it('calls updateFormData when input value changes', () => {
    const inputColumns: FormInputColumnPropsI[] = [{ id: 'column1', label: 'Column 1', inputProps: { inputType: InputElementEnum.TEXT, value: 'Value 1', updateValue: () => { } } }];
    const formData = { column1: '' };
    const selectorUpdateFormData = jest.fn();
    const validatorControl = { current: { message: jest.fn() } };
    const executeOnChange = jest.fn();

    const { getByText } = render(
      <FormInputColumnsComponent
        inputColumns={inputColumns}
        formData={formData}
        selectorUpdateFormData={selectorUpdateFormData}
        validatorControl={validatorControl}
        executeOnChange={executeOnChange}
        width='100%'
      />
    );

    const labelElement = getByText('Column 1') as HTMLElement;
    const inputElement = labelElement.nextSibling as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'New Value' } });

    expect(selectorUpdateFormData).toHaveBeenCalledWith({ ...formData, column1: 'New Value' });
  });
});
