import { act, renderHook } from '@testing-library/react-hooks';
import useApiHook from './use-api-hook';

describe('useApiHook', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useApiHook());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
