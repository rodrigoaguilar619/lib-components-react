import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FormInputColumnsComponent from '@app/components/forms/formInputColumnsComponent';
import { InputElementEnum } from '@app/catalogs/enumCatalog';

describe('FormInputColumnsComponent', () => {
  const mockSelectorUpdateFormData = jest.fn();

  const basicProps = {
    inputColumns: [
      {
        inputProps: {
          id: 'username',
          inputType: InputElementEnum.TEXT,
          value: 'john_doe',
        },
        label: 'Username',
        tooltipText: 'Enter your username',
      },
    ],
    width: '200px',
    formData: { username: 'john_doe' },
    selectorUpdateFormData: mockSelectorUpdateFormData,
  };

  it('renders input with label and tooltip', () => {
    render(<FormInputColumnsComponent {...basicProps} />);

    expect(screen.getByText(/username/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('john_doe')).toBeInTheDocument();
  });

  it('calls selectorUpdateFormData on input change', () => {
    render(<FormInputColumnsComponent {...basicProps} />);

    const input = screen.getByDisplayValue('john_doe');
    fireEvent.change(input, { target: { value: 'new_user' } });

    expect(mockSelectorUpdateFormData).toHaveBeenCalledWith({ username: 'new_user' });
  });

  it('does not render hidden columns', () => {
    const hiddenColumnProps = {
      ...basicProps,
      inputColumns: [
        {
          ...basicProps.inputColumns[0],
          showColumn: false,
        },
      ],
    };

    render(<FormInputColumnsComponent {...hiddenColumnProps} />);

    expect(screen.queryByDisplayValue('john_doe')).toBeNull();
  });

  it('renders validation message when validator is present', () => {
    const validatorControl = {
      current: {
        message: jest.fn().mockReturnValue('This field is required'),
      },
    };

    const withValidationProps = {
      ...basicProps,
      validatorControl,
      inputColumns: [
        {
          ...basicProps.inputColumns[0],
          validations: {
            idValidation: 'username',
            validatorRules: ['required'],
          },
        },
      ],
    };

    render(<FormInputColumnsComponent {...withValidationProps} />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });
});