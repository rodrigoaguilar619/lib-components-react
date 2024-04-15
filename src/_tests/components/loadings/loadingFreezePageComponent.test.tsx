import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoadingFreezePageComponent from '@app/components/loadings/loadingFreezePageComponent';
import { TemplateLoadingStateI } from '@app/@types/controller/reducers/templateLoadingReducer';

describe('LoadingFreezePageComponent', () => {
  const defaultProps: TemplateLoadingStateI = {
    isActive: true,
    text: 'Loading...'
  };

  it('renders with correct props', () => {
    const { getByText } = render(<LoadingFreezePageComponent {...defaultProps} />);
    
    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
