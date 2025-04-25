import '@testing-library/jest-dom';
import { render, screen, fireEvent, within } from '@testing-library/react';
import FilterAccordionComponent from '@app/components/filterAccordion/filterAccordionComponent';
import { FilterAccordionPropsI } from '@app/@types/components/filterAccordion/filterAccordion';

jest.mock('@app/components/forms/formInputColumnsComponent', () => () => (
  <div>Mocked Form Input Columns</div>
));

describe('FilterAccordionComponent', () => {
  const mockFormData = {
    name: 'John',
    email: 'john@example.com'
  };

  const props: FilterAccordionPropsI = {
    title: 'Search Filters',
    formData: mockFormData,
    selectorUpdateFormData: jest.fn(),
    executeFilterSearch: jest.fn(),
    formContainer: {
      columnstotal: 2,
      inputColumns: [
        {
          label: 'Name',
          inputProps: {
            id: 'name',
            inputType: 'text',
            value: '',
          }
        }
      ]
    }
  };

  it('renders accordion with title and form inputs', () => {
    render(<FilterAccordionComponent {...props} />);
  
    // Accordion tab header
    expect(screen.getByText('Search Filters')).toBeInTheDocument();
  
    // Form content is mocked
    expect(screen.getByText('Mocked Form Input Columns')).toBeInTheDocument();
  
    // Get the specific Col container by traversing from the button text
    const buttonContainer = screen.getByText('Search').closest('div');
  
    // Search within that container to get the specific button
    const searchButton = within(buttonContainer!).getByRole('button', { name: /Search/i });
  
    expect(searchButton).toBeInTheDocument();
  });

  it('clicks search button and calls handler', () => {
    render(<FilterAccordionComponent {...props} />);
    const buttonContainer = screen.getByText('Search').closest('div');// screen.getByRole('button', { name: /Search/i });
    const searchButton = within(buttonContainer!).getByRole('button', { name: /Search/i });
    
    fireEvent.click(searchButton);
    expect(props.executeFilterSearch).toHaveBeenCalled();
  });

  it('does not render form if formData is empty', () => {
    const emptyProps = {
      ...props,
      formData: {},
    };

    const { queryByText } = render(<FilterAccordionComponent {...emptyProps} />);
    expect(queryByText('Mocked Form Input Columns')).not.toBeInTheDocument();
    expect(screen.getByText('Search Filters')).toBeInTheDocument(); // Accordion still renders
  });
});
