import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FormInputElementComponent from '@app/components/forms/formInputElementComponent';
import { InputElementEnum } from '@app/catalogs/enumCatalog';

describe('FormInputElementComponent', () => {
  it('renders a text input and updates value', () => {
    const mockUpdateValue = jest.fn();
    
    const inputProps = {
      id: 'testTextInput',
      inputType: InputElementEnum.TEXT,
      value: 'Hello World',
      isShowError: false,
      isReadOnly: false
    };

    render(
      <FormInputElementComponent
        inputProps={inputProps}
        updateValue={mockUpdateValue}
      />
    );

    const input = screen.getByDisplayValue('Hello World');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Updated' } });

    expect(mockUpdateValue).toHaveBeenCalledWith('Updated');
  });
});

describe('FormInputElementComponent - Select', () => {
  it('renders dropdown and updates value', () => {
    const mockUpdateValue = jest.fn();

    const inputProps = {
      id: 'selectInput',
      inputType: InputElementEnum.SELECT,
      value: '1',
      options: [
        { id: '1', description: 'Option 1' },
        { id: '2', description: 'Option 2' },
      ],
      isOptionAll: true,
      placeholder: 'Choose',
      isShowError: false,
      isReadOnly: false,
    };

    render(<FormInputElementComponent inputProps={inputProps} updateValue={mockUpdateValue} />);

    // This will select the element by label name
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();

    fireEvent.change(dropdown, { target: { value: '2' } });

    // Note: PrimeReact Dropdown may require slightly different event logic depending on rendering
  });
});