import '@testing-library/jest-dom';
import { render, screen, fireEvent, within } from '@testing-library/react';
import FormInputMultipleComponent from '@app/components/forms/formInputsMultipleComponent';
import { InputElementEnum } from '@app/catalogs/enumCatalog';

describe('FormInputMultipleComponent', () => {
  const mockSelectorUpdateFormDataList = jest.fn();

  const inputColumns = [
    {
      label: 'Name',
      tooltipText: 'Full name',
      inputProps: {
        id: 'name',
        inputType: InputElementEnum.TEXT,
        value: '',
      },
    },
    {
      label: 'Email',
      tooltipText: 'User email',
      inputProps: {
        id: 'email',
        inputType: InputElementEnum.TEXT,
        value: '',
      },
    },
  ];

  const formDataList = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
  ];

  beforeEach(() => {
    mockSelectorUpdateFormDataList.mockClear();
  });

  it('renders header labels and options column', () => {
    render(
      <FormInputMultipleComponent
        inputColumns={inputColumns}
        formDataList={formDataList}
        selectorUpdateFormDataList={mockSelectorUpdateFormDataList}
      />
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('OPTIONS')).toBeInTheDocument();
  });

  it('renders rows based on formDataList', () => {
    render(
      <FormInputMultipleComponent
        inputColumns={inputColumns}
        formDataList={formDataList}
        selectorUpdateFormDataList={mockSelectorUpdateFormDataList}
      />
    );

    expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
    expect(screen.getByDisplayValue('alice@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Bob')).toBeInTheDocument();
    expect(screen.getByDisplayValue('bob@example.com')).toBeInTheDocument();
  });

  it('calls selectorUpdateFormDataList when adding a row (button inside container)', () => {
    const { container } = render(
      <FormInputMultipleComponent
        inputColumns={inputColumns}
        formDataList={[formDataList[0]]} // only 1 row to allow add
        selectorUpdateFormDataList={mockSelectorUpdateFormDataList}
      />
    );
  
    // Find the div with class "container"
    const containerDiv = container.querySelector('.container') as HTMLElement;
    expect(containerDiv).toBeInTheDocument();
  
    // Find the "+" button inside that container
    const addButton = within(containerDiv).getAllByRole('button').find((btn) =>
      btn.querySelector('svg')?.getAttribute('data-icon') === 'plus'
    );
  
    expect(addButton).toBeDefined();
    fireEvent.click(addButton!);
  
    expect(mockSelectorUpdateFormDataList).toHaveBeenCalled();
    expect(mockSelectorUpdateFormDataList.mock.calls[0][0].length).toBe(2); // new row added
  });

  it('calls selectorUpdateFormDataList when removing a row (button inside container)', () => {
    const { container } = render(
      <FormInputMultipleComponent
        inputColumns={inputColumns}
        formDataList={formDataList}
        selectorUpdateFormDataList={mockSelectorUpdateFormDataList}
      />
    );
  
    // Find the div with class "container"
    const containerDiv = container.querySelector('.container') as HTMLElement;
    expect(containerDiv).toBeInTheDocument();
  
    // Find the delete button (faTrash icon) inside the container
    const deleteButtons = within(containerDiv)
      .getAllByRole('button')
      .filter((btn) => btn.querySelector('svg')?.getAttribute('data-icon') === 'trash');
  
    // Click the first delete button
    fireEvent.click(deleteButtons[0]);
  
    // Check if the mock function was called
    expect(mockSelectorUpdateFormDataList).toHaveBeenCalled();
    expect(mockSelectorUpdateFormDataList.mock.calls[0][0].length).toBe(1); // One row removed
  });

  it('shows add row button when formDataList is empty', () => {
    render(
      <FormInputMultipleComponent
        inputColumns={inputColumns}
        formDataList={[]}
        selectorUpdateFormDataList={mockSelectorUpdateFormDataList}
      />
    );

    const addButton = screen.getByRole('button');
    fireEvent.click(addButton);

    expect(mockSelectorUpdateFormDataList).toHaveBeenCalled();
  });
});
