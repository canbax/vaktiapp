import { withSetup } from "@/util/test-utils";
import { useRemainingTimeToPray } from "./remainingTimeToPray";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ref } from "vue";
import { HourString, RemainingTimeFormat, RemainingToPray } from "@/types";

describe("useRemainingTimeToPray", () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
  });

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });

  it("Should return current pray index and remaining time to the pray", () => {
    const remainingTimeFormat: RemainingTimeFormat = "XX:YY:ZZ";

    const { result, app } = withSetup<RemainingToPray>(() =>
      useRemainingTimeToPray(
        ref(["05:42", "07:07", "12:37", "15:29", "17:58", "19:16"]),
        ref(remainingTimeFormat)
      )
    );

    vi.setSystemTime(new Date(2023, 10, 20, 17));
    vi.advanceTimersByTime(1010);
    expect(result.currPrayIdx.value).toBe(4);
    expect(result.remainingTime.value).toBe("00:57:59");
    app.unmount();
  });

  it("Should return updated current pray index and remaining time when input parameters are updated", () => {
    const remainingTimeFormat = ref<RemainingTimeFormat>("XX:YY:ZZ");
    const times = ref<HourString[]>([]);
    times.value = ["05:42", "07:07", "12:37", "15:29", "17:58", "19:16"];
    const { result, app } = withSetup<RemainingToPray>(() =>
      useRemainingTimeToPray(times, remainingTimeFormat)
    );

    vi.setSystemTime(new Date(2023, 10, 20, 17));
    vi.advanceTimersByTime(1010);
    expect(result.currPrayIdx.value).toBe(4);
    expect(result.remainingTime.value).toBe("00:57:59");

    times.value = ["05:42", "07:07", "12:37", "17:29", "19:00", "19:16"];
    vi.advanceTimersByTime(1010);
    expect(result.currPrayIdx.value).toBe(3);
    expect(result.remainingTime.value).toBe("00:28:58");
    app.unmount();
  });

  it("Should not update values after unmount", () => {
    const remainingTimeFormat = ref<RemainingTimeFormat>("XX:YY:ZZ");
    const times = ref<HourString[]>([]);
    times.value = ["05:42", "07:07", "12:37", "15:29", "17:58", "19:16"];
    const { result, app } = withSetup<RemainingToPray>(() =>
      useRemainingTimeToPray(times, remainingTimeFormat)
    );

    vi.setSystemTime(new Date(2023, 10, 20, 17));
    vi.advanceTimersByTime(1010);
    expect(result.currPrayIdx.value).toBe(4);
    expect(result.remainingTime.value).toBe("00:57:59");

    app.unmount();
    vi.advanceTimersByTime(1010);
    expect(result.currPrayIdx.value).toBe(4);
    expect(result.remainingTime.value).toBe("00:57:59");
  });
});
