import { render } from '@testing-library/react';

import FilterForm from './filter-form';

describe('FilterForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterForm />);
    expect(baseElement).toBeTruthy();
  });
});
