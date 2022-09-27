import { renderHook } from '@testing-library/react-hooks/pure';

import useIsFirstRender from './useIsFirstRender';

describe('useIsFirstRender', () => {
  test('should initially be true', () => {
    const { result } = renderHook<void, boolean>(() => useIsFirstRender());
    expect(result.current).toBeTruthy();
  });
  test('should return false after first interaction', () => {
    const { result, rerender } = renderHook<void, boolean>(() => useIsFirstRender());
    rerender();
    expect(result.current).toBeFalsy();
  });
});
