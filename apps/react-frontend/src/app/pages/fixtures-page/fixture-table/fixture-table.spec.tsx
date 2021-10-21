import { render } from '@testing-library/react';

import FixtureTable from './fixture-table';

describe('FixtureTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FixtureTable />);
    expect(baseElement).toBeTruthy();
  });
});
