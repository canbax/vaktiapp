import { withSetup } from '@/util/test-utils';
import { useSafeCall } from './safeCall';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useSafeCall', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
  });

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });

  it('Should not throw error even if function call throws ', async () => {
    const errMsg = 'hey!';
    const fn = vi.fn(() => {
      throw new Error(errMsg);
    });
    const { result, app } = withSetup<ReturnType<typeof useSafeCall>>(() => useSafeCall(fn));

    expect(async () => await result.execute()).not.toThrow();
    expect(result.error.value).toContain(errMsg);
    expect(result.loading.value).toBe(false);
    app.unmount();
  });

  it('Should set loading value dynamically ', async () => {
    const mockAsyncFunction = vi.fn().mockImplementation(() => {
      return new Promise((res) =>
        setTimeout(() => {
          res('resolved value');
        }, 100),
      );
    });
    const { result, app } = withSetup<ReturnType<typeof useSafeCall>>(() =>
      useSafeCall(mockAsyncFunction),
    );

    expect(result.loading.value).toBe(false);
    result.execute();
    await vi.advanceTimersByTimeAsync(50);
    expect(result.loading.value).toBe(true);
    await vi.advanceTimersByTimeAsync(60);
    expect(result.loading.value).toBe(false);
    app.unmount();
  });
});
