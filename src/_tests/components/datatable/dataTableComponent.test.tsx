import { render, screen, fireEvent } from '@testing-library/react';
import DataTableComponent from '@app/components/dataTable/dataTableComponent';
import { DataTableComponentI } from '@app/@types/components/dataTable/dataTable';
import '@testing-library/jest-dom';

describe('DataTableComponent', () => {
  const defaultProps: DataTableComponentI = {
    columnDataList: [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ],
    columnDefList: [
      {
        field: 'name',
        header: 'Name',
        tableConfig: { isSortable: true, styleCss: {} },
      },
      {
        field: 'age',
        header: 'Age',
        tableConfig: { isSortable: false, styleCss: {} },
      },
    ],
    isShowFooter: true,
    isShowHeader: true,
    isShowSearch: true,
    title: 'Test Table',
    totalRows: 2,
  };

  it('renders the title', () => {
    render(<DataTableComponent {...defaultProps} />);
    expect(screen.getByText('Test Table')).toBeInTheDocument();
  });

  it('shows column headers', () => {
    render(<DataTableComponent {...defaultProps} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders correct number of rows', () => {
    render(<DataTableComponent {...defaultProps} />);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  it('filters data when search input is used', () => {
    render(<DataTableComponent {...defaultProps} />);
    const input = screen.getByPlaceholderText('Keyword Search');

    fireEvent.change(input, { target: { value: 'Jane' } });

    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  it('shows total records in footer', () => {
    render(<DataTableComponent {...defaultProps} />);
    expect(screen.getByText(/Total records: 2/)).toBeInTheDocument();
  });
});
