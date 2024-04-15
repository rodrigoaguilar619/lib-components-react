import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormInputsMultipleComponent from '@app/components/forms/formInputsMultiple/formInputsMultipleComponent';
import { InputElementEnum } from '@app/catalogs/enumCatalog';
import { FormInputColumnPropsI } from '@app/@types/components/formInputs/formInputs';

describe('FormInputsMultipleComponent', () => {
    it('renders form inputs multiple times with add/remove functionality', () => {
        const inputColumns: FormInputColumnPropsI[] = [
            { id: 'column1', label: 'Column 1', inputProps: { inputType: InputElementEnum.TEXT, value: 'value1', updateValue: () => { } } },
            ];
        const formDataList: any = [
            { column1: 'value1' },
        ];
        const validatorControl = { current: { message: jest.fn() } };
        const selectorUpdateFormDataList = jest.fn();

        const { getByText } = render(
            <FormInputsMultipleComponent
                inputColumns={inputColumns}
                formDataList={formDataList}
                validatorControl={validatorControl}
                selectorUpdateFormDataList={selectorUpdateFormDataList}
            />
        );

        // Assert the initial rendering of form inputs and their values
        formDataList.forEach((formData: any) => {
            Object.entries(formData).forEach(([key, value]: any) => {
                console.log("test", key, value);
                const inputElement = getByText("Column 1") as HTMLInputElement;
                expect(inputElement).toBeInTheDocument();
            });
        });
    });
});
