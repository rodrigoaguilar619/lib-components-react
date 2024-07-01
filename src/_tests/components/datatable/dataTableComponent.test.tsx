import React from 'react';
import { render, fireEvent, queryByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DataTableComponent from '@app/components/dataTable/dataTableComponent';
import { DataTableColumnOptionsPropsI, DataTableComponentI, DataTablePropsI } from '@app/@types/components/dataTable/dataTable';

describe('DataTableComponent', () => {
  const mockColumnDataList: any[] = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Doe', age: 25 }
  ];

  const mockColumnOptionsTemplate: DataTableColumnOptionsPropsI = {
    header: 'Options',
    actionTemplate: () => <button>Options</button>, // Example action template
    tableConfig: {
      styleCss: { fontWeight: 'bold' }
    }
  };

  const mockColumnDefList: DataTablePropsI[] = [
    { field: 'id', header: 'ID', tableConfig: { isSortable: true } },
    { field: 'name', header: 'Name', tableConfig: { isSortable: true } },
    { field: 'age', header: 'Age', tableConfig: { isSortable: true } }
  ];

  const defaultProps: DataTableComponentI = {
    title: "title test",
    columnDataList: mockColumnDataList,
    columnOptionsTemplate: mockColumnOptionsTemplate,
    columnDefList: mockColumnDefList,
    totalRows: mockColumnDataList.length
  };

  it('renders DataTableComponent with correct props', () => {
    const { getByText } = render(<DataTableComponent {...defaultProps} />);

    expect(getByText('John')).toBeInTheDocument();
    expect(getByText('Doe')).toBeInTheDocument();
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Age')).toBeInTheDocument();
  });

  it('filters data when global filter input changes', () => {
    const { getByPlaceholderText, getByText } = render(<DataTableComponent {...defaultProps} />);

    fireEvent.change(getByPlaceholderText('Keyword Search'), { target: { value: 'John' } });

    expect(getByText('John')).toBeInTheDocument();
  });

  it('renders total records correctly in footer', () => {
    const { getByText } = render(<DataTableComponent {...defaultProps} />);

    expect(getByText('Total records: 2')).toBeInTheDocument();
  });

  it('does not render anything when columnOptionsTemplate is undefined', () => {
    const { container } = render(<DataTableComponent {...defaultProps} columnOptionsTemplate={undefined} />);
    
    // Assert that the component does not render anything when columnOptionsTemplate is undefined
    expect(queryByTestId(container, 'datatable-options')).toBeNull();
  });
});
