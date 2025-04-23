import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
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
import { Tooltip } from 'react-tooltip';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: any) => <span data-testid="icon">{icon?.iconName ?? 'icon'}</span>,
}));

describe('ButtonComponent', () => {
  it('renders with label and icon, and triggers onClick', () => {
    const onClick = jest.fn();
    render(<ButtonComponent label="Submit" icon={faSave} onClick={onClick} />);
    const button = screen.getByRole('button', { name: /submit/i });

    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe('ButtonSubmitComponent', () => {
  it('renders submit button and fires onClick', () => {
    const onClick = jest.fn();
    render(<ButtonSubmitComponent label="Submit" onClick={onClick} />);
    const button = screen.getByRole('button', { name: /submit/i });

    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe('ButtonSearchComponent', () => {
  it('renders search button and fires onClick', () => {
    const onClick = jest.fn();
    render(<ButtonSearchComponent label="Search" onClick={onClick} />);
    const button = screen.getByRole('button', { name: /search/i });

    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe('ButtonDataTableOptionComponent', () => {
  it('renders button with label and icon', () => {
    const onClick = jest.fn();
    render(<ButtonDataTableOptionComponent label="Option" icon={faSave} onClick={onClick} tooltip="Save it" />);
    const button = screen.getByRole('button', { name: /option/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-tooltip-content', 'Save it');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe('ButtonDataTableOptionNestedComponent', () => {
  it('renders button with nested option styling', () => {
    const onClick = jest.fn();
    render(<ButtonDataTableOptionNestedComponent label="Nested" icon={faSave} onClick={onClick} tooltip="Nested tooltip" />);
    const button = screen.getByRole('button', { name: /nested/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-tooltip-content', 'Nested tooltip');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe('ButtonWithNestedOptionsComponent', () => {
  it('shows nested buttons inside tooltip on hover', async () => {
    render(
      <>
        <ButtonWithNestedOptionsComponent
          idTooltip="test"
          buttonOptions={[
            <button key="1">Option 1</button>,
            <button key="2">Option 2</button>
          ]}
        />
        <Tooltip id="tooltip_nested_options_test" />
      </>
    );

    const mainButton = screen.getByRole('button', { name: '...' });
    expect(mainButton).toBeInTheDocument();

    // Hover over the button to trigger tooltip
    fireEvent.mouseOver(mainButton);

    // Wait for tooltip to appear with nested buttons
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });
  });
});

describe('ButtonsOrganizerComponent', () => {
  it('renders multiple buttons in flex container', () => {
    render(
      <ButtonsOrganizerComponent
        buttonOptions={[
          <button key="a">A</button>,
          <button key="b">B</button>
        ]}
      />
    );

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });
});

describe('ButtonCustomComponent', () => {
  it('renders custom button and fires onClick', () => {
    const onClick = jest.fn();
    render(<ButtonCustomComponent label="Custom" icon={faSearch} onClick={onClick} tooltip="Custom Tooltip" />);
    const button = screen.getByRole('button', { name: /custom/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-tooltip-content', 'Custom Tooltip');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
