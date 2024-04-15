import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilterAccoridionComponent from '@app/components/filterAccordion/filterAccordionComponent';
import { InputElementEnum } from '@app/catalogs/enumCatalog';
import { FormInputContainerPropsI } from '@app/@types/components/formInputs/formInputs';

describe('FilterAccoridionComponent', () => {
    it('renders accordion with title and form container', () => {
        const title = 'Filter';
        const formContainer: FormInputContainerPropsI = {
            columnstotal: 2,
            containerWidth: '100%',
            inputColumns: [
                { label: 'Column 1', id: 'column1', inputProps: { inputType: InputElementEnum.TEXT, value: '', updateValue: () => { } } },
                { label: 'Column 2', id: 'column2', inputProps: { inputType: InputElementEnum.TEXT, value: '', updateValue: () => { } } }
            ],
        };
        const formData = { column1: '', column2: '' };
        const selectorUpdateFormData = jest.fn();
        const executeFilterSearch = jest.fn();

        const { getByText, getByLabelText } = render(
            <FilterAccoridionComponent
                title={title}
                formContainer={formContainer}
                formData={formData}
                selectorUpdateFormData={selectorUpdateFormData}
                executeFilterSearch={executeFilterSearch}
            />
        );

        const accordionTitle = getByText(title);
        expect(accordionTitle).toBeInTheDocument();
    });

    it('does not render search button if executeFilterSearch is undefined', () => {
        const title = 'Filter';
        const formContainer: FormInputContainerPropsI = {
            columnstotal: 2,
            inputColumns: [
                { label: 'Column 1', id: 'column1', inputProps: { inputType: InputElementEnum.TEXT, value: '', updateValue: () => { } } },
                { label: 'Column 2', id: 'column2', inputProps: { inputType: InputElementEnum.TEXT, value: '', updateValue: () => { } } }
            ],
        };
        const formData = { column1: '', column2: '' };
        const selectorUpdateFormData = jest.fn();

        const { queryByText } = render(
            <FilterAccoridionComponent
                title={title}
                formContainer={formContainer}
                formData={formData}
                selectorUpdateFormData={selectorUpdateFormData}
            />
        );

        const searchButton = queryByText('Search');
        expect(searchButton).toBeNull();
    });

    /*it('returns null when formData is empty', () => {
        const title = 'Filter';
        const formContainer: FormInputContainerPropsI = {
            columnstotal: 2,
            containerWidth: '100%',
            inputColumns: [
                { label: 'Column 1', id: 'column1', inputProps: { inputType: InputElementEnum.TEXT, value: '', updateValue: () => { } } },
                { label: 'Column 2', id: 'column2', inputProps: { inputType: InputElementEnum.TEXT, value: '', updateValue: () => { } } }
            ],
        };
        const formData = {};
        const selectorUpdateFormData = jest.fn();
        const executeFilterSearch = jest.fn();
      
        const { container } = render(
          <FilterAccoridionComponent
            title={title}
            formContainer={formContainer}
            formData={formData}
            selectorUpdateFormData={selectorUpdateFormData}
            executeFilterSearch={executeFilterSearch}
          />
        );
      
        expect(container.firstChild).toBeNull();
      });*/
});
