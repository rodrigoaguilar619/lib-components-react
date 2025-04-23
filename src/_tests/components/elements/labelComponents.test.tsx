import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { LabelInputComponent } from '@app/components/elements/labelComponents';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { TooltipIdCustomEnum } from '@app/catalogs/enumCatalog';

describe('LabelInputComponent', () => {
  it('renders only label when no icon or tooltip is provided', () => {
    render(<LabelInputComponent label="Username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.queryByTestId('tooltip-icon')).not.toBeInTheDocument();
  });

  it('renders label with tooltip icon and tooltip content', () => {
    const tooltipText = 'Enter a unique username';
    const { container } = render(
      <LabelInputComponent
        label="Username"
        icon={faInfoCircle}
        tooltipHelpText={tooltipText}
      />
    );

    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();

    const icon = container.querySelector('svg[data-tooltip-id]');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-tooltip-id', TooltipIdCustomEnum.TOOLTIP_INPUT_HELP);
    expect(icon).toHaveAttribute('data-tooltip-html', tooltipText);
  });

  it('does not render tooltip icon if tooltipHelpText is provided but no icon', () => {
    render(<LabelInputComponent label="Email" tooltipHelpText="Enter your email" />);
    expect(screen.queryByTestId('tooltip-icon')).not.toBeInTheDocument();
  });

  it('does not render tooltip icon if icon is provided but tooltipHelpText is not', () => {
    render(<LabelInputComponent label="Email" icon={faInfoCircle} />);
    expect(screen.queryByTestId('tooltip-icon')).not.toBeInTheDocument();
  });

  it('applies left padding only when label has value', () => {
    const { container } = render(<LabelInputComponent label="Name" />);
    const span = container.querySelector('span');
    expect(span).toHaveStyle('padding-left: 3px');
  });

  it('does not apply padding when label is empty', () => {
    const { container } = render(<LabelInputComponent label="" />);
    const span = container.querySelector('span');
    expect(span).not.toHaveStyle('padding-left: 3px');
  });
});
