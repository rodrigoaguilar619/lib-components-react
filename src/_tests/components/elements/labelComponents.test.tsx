import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LabelInputComponent } from '@app/components/elements/labelComponents';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

describe('LabelInputComponent', () => {
  it('renders label without icon and tooltip', () => {
    const { getByText, queryByTestId } = render(<LabelInputComponent label="Label" />);
    const labelElement = getByText('Label');
    expect(labelElement).toBeInTheDocument();
    const tooltipElement = queryByTestId('tooltip-form-inputs');
    expect(tooltipElement).toBeNull();
  });

  it('renders label with icon and tooltip', () => {
    const tooltipHelpText = 'Help text';
    const icon: IconProp = faQuestionCircle;
    const { getByText, getByTestId } = render(<LabelInputComponent label="Label" icon={icon} tooltipHelpText={tooltipHelpText} />);
    const labelElement = getByText('Label');
    expect(labelElement).toBeInTheDocument();
  });

  it('renders label with icon but without tooltip', () => {
    const icon: IconProp = faQuestionCircle;
    const { getByText, queryByTestId } = render(<LabelInputComponent label="Label" icon={icon} />);
    const labelElement = getByText('Label');
    const iconElement = queryByTestId('tooltip-form-inputs');
    expect(labelElement).toBeInTheDocument();
    expect(iconElement).toBeNull();
  });
});
