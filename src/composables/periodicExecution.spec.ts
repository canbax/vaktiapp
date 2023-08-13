import { withSetup } from "@/util/test-utils";
import { usePeriodicExecution } from "./periodicExecution";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("usePeriodicExecution", () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
  });

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });

  it("Should return a void function", () => {
    const fn = vi.fn();
    const { result, app } = withSetup(() => usePeriodicExecution(fn, 1000));
    expect(result).toBeUndefined();
    app.unmount();
  });

  it("Should call the parameter function periodically till unmounting", () => {
    const fn = vi.fn();
    const { app } = withSetup(() => usePeriodicExecution(fn, 1000));
    vi.advanceTimersByTime(1000 * 10 + 100);
    expect(fn).toBeCalledTimes(10);
    app.unmount();
    vi.advanceTimersByTime(1000 * 10);
    expect(fn).toBeCalledTimes(10);
  });
});
