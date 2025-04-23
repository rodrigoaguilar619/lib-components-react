import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FormInputColumnsComponent from '@app/components/forms/formInputColumnsComponent';
import { InputElementEnum } from '@app/catalogs/enumCatalog';

describe('FormInputColumnsComponent', () => {
  const mockSelectorUpdateFormData = jest.fn();

  const basicProps = {
    inputColumns: [
      {
        label: 'Username',
        tooltipText: 'This is your login name',
        inputProps: {
          id: 'username',
          inputType: InputElementEnum.TEXT,
          value: 'john_doe',
        },
      },
    ],
    width: '250px',
    formData: { username: 'john_doe' },
    selectorUpdateFormData: mockSelectorUpdateFormData,
  };

  beforeEach(() => {
    mockSelectorUpdateFormData.mockClear();
  });

  it('renders input with label and tooltip', () => {
    render(<FormInputColumnsComponent {...basicProps} />);

    // Tooltip button (FontAwesome Icon) is not tested directly but Label and input can be
    expect(screen.getByText(/username/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('john_doe')).toBeInTheDocument();
  });

  it('calls selectorUpdateFormData on input change', () => {
    render(<FormInputColumnsComponent {...basicProps} />);

    const input = screen.getByDisplayValue('john_doe');
    fireEvent.change(input, { target: { value: 'new_user' } });

    expect(mockSelectorUpdateFormData).toHaveBeenCalledWith({ username: 'new_user' });
  });

  it('respects showColumn: false by not rendering the column', () => {
    const propsWithHiddenColumn = {
      ...basicProps,
      inputColumns: [
        {
          ...basicProps.inputColumns[0],
          showColumn: false,
        },
      ],
    };

    render(<FormInputColumnsComponent {...propsWithHiddenColumn} />);
    expect(screen.queryByLabelText(/username/i)).not.toBeInTheDocument();
  });

  it('renders validation message when validatorControl is defined', () => {
    const mockValidatorControl = {
      current: {
        message: jest.fn().mockReturnValue('Username is required'),
      },
    };

    const propsWithValidation = {
      ...basicProps,
      validatorControl: mockValidatorControl,
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

    render(<FormInputColumnsComponent {...propsWithValidation} />);
    expect(screen.getByText('Username is required')).toBeInTheDocument();
  });
});
