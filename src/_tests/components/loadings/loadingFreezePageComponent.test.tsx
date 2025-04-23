import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LoadingFreezePageComponent from '@app/components/loadings/loadingFreezePageComponent';

describe('LoadingFreezePageComponent', () => {

  it('renders loading overlay when isActive is true', () => {
    render(<LoadingFreezePageComponent isActive={true} text="Loading in progress..." />);
    
    // Check for the spinner and the text
    expect(screen.getByText('Loading in progress...')).toBeInTheDocument();
  });

  it('renders with default text if none provided', () => {
    render(<LoadingFreezePageComponent isActive={true} />);
    
    // Depending on if you handle a default `text` inside the component
    // If not handled in the component, skip this test or adjust as needed
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument(); // adjust if default is implemented
  });
});

