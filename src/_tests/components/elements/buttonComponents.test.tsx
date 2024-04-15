import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  ButtonComponent,
  ButtonSubmitComponent,
  ButtonSearchComponent,
  ButtonDataTableOptionComponent,
  ButtonDataTableOptionNestedComponent,
  ButtonWithNestedOptionsComponent,
  ButtonsOrganizerComponent,
  ButtonCustomComponent
} from '@app/components/elements/buttonComponents';
import { faSave, faSearch } from '@fortawesome/free-solid-svg-icons';

describe('ButtonComponent', () => {
  it('renders button with label and icon', () => {
    const onClick = jest.fn();
    const { getByText } = render(<ButtonComponent label="Submit" icon={faSave} onClick={onClick} />);
    const button = getByText('Submit');

    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe('ButtonSubmitComponent', () => {
  it('renders submit button', () => {
    const onClick = jest.fn();
    const { getByText } = render(<ButtonSubmitComponent label="Submit" onClick={onClick} />);
    const button = getByText('Submit');

    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe('ButtonSearchComponent', () => {
  it('renders search button', () => {
    const onClick = jest.fn();
    const { getByText } = render(<ButtonSearchComponent label="Search" onClick={onClick} />);
    const button = getByText('Search');

    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe('ButtonDataTableOptionComponent', () => {
  it('renders button with options for data table', () => {
    const onClick = jest.fn();
    const { getByText } = render(<ButtonDataTableOptionComponent label="Option" icon={faSave} onClick={onClick} />);
    const button = getByText('Option');

    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe('ButtonDataTableOptionNestedComponent', () => {
  it('renders button with nested options for data table', () => {
    const onClick = jest.fn();
    const { getByText } = render(<ButtonDataTableOptionNestedComponent label="Option" icon={faSave} onClick={onClick} />);
    const button = getByText('Option');

    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe('ButtonWithNestedOptionsComponent', () => {
  it('renders button with nested options', () => {
    const { getByText } = render(
      <ButtonWithNestedOptionsComponent
        idTooltip="123"
        buttonOptions={[<button key="1">Option 1</button>, <button key="2">Option 2</button>]}
      />
    );
    const button = getByText('...');

    expect(button).toBeInTheDocument();
  });
});

describe('ButtonsOrganizerComponent', () => {
  it('renders buttons organized in flex container', () => {
    const { getByText } = render(
      <ButtonsOrganizerComponent
        buttonOptions={[<button key="1">Button 1</button>, <button key="2">Button 2</button>]}
      />
    );
    const button1 = getByText('Button 1');
    const button2 = getByText('Button 2');

    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
  });
});

describe('ButtonCustomComponent', () => {
  it('renders custom button', () => {
    const onClick = jest.fn();
    const { getByText } = render(<ButtonCustomComponent label="Custom" icon={faSearch} onClick={onClick} />);
    const button = getByText('Custom');

    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
