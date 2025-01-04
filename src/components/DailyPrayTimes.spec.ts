import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { createPinia } from 'pinia';
import { i18n } from '@/plugins/i18n';
import DailyPrayTimes from './DailyPrayTimes.vue';
import type { HourString, RemainingTimeFormat } from '@/types';

describe('DailyPrayTimes', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
  });

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });

  it('can render times data', () => {
    const currTimes: HourString[] = ['05:42', '07:07', '12:37', '15:29', '17:58', '19:16'];
    const remainingTimeFormat: RemainingTimeFormat = 'XX:YY:ZZ';
    const wrapper = mount(DailyPrayTimes, {
      global: {
        plugins: [createVuetify(), createPinia(), i18n],
      },
      props: { isShowingToday: true, currTimes, remainingTimeFormat },
    });
    const renderedText = wrapper.text();
    for (const t of currTimes) {
      expect(renderedText).toContain(t);
    }
  });

  const remainingTimeFormats = [
    {
      timeFormat: 'XX:YY:ZZ' as RemainingTimeFormat,
      expectedRegex: new RegExp(/\d\d:\d\d:\d\d/),
    },
    {
      timeFormat: 'XX:YY' as RemainingTimeFormat,
      expectedRegex: new RegExp(/\d\d:\d\d/),
    },
    {
      timeFormat: 'X hour Y minute Z second' as RemainingTimeFormat,
      expectedRegex: new RegExp(/(\d)+ hour (\d)+ minute (\d)+ second/),
    },
    {
      timeFormat: 'X hour Y minute' as RemainingTimeFormat,
      expectedRegex: new RegExp(/(\d)+ hour (\d)+ minute/),
    },
  ];
  it.each(remainingTimeFormats)(
    'can render remaining time in format $timeFormat if today',
    ({ timeFormat, expectedRegex }) => {
      const currTimes: HourString[] = ['05:42', '07:07', '12:37', '15:29', '17:58', '19:16'];
      vi.setSystemTime(new Date(2023, 10, 20, 16, 1, 1));
      const wrapper = mount(DailyPrayTimes, {
        global: {
          plugins: [createVuetify(), createPinia(), i18n],
        },
        props: {
          isShowingToday: true,
          currTimes,
          remainingTimeFormat: timeFormat,
        },
      });

      const renderedText = wrapper.text();
      expect(renderedText).toContain('remaining time');
      expect(renderedText.match(expectedRegex)).toBeTruthy();
    },
  );

  it('can render show today button if not today', () => {
    const currTimes: HourString[] = ['05:42', '07:07', '12:37', '15:29', '17:58', '19:16'];
    const remainingTimeFormat: RemainingTimeFormat = 'XX:YY:ZZ';
    const wrapper = mount(DailyPrayTimes, {
      global: {
        plugins: [createVuetify(), createPinia(), i18n],
      },
      props: { isShowingToday: false, currTimes, remainingTimeFormat },
    });

    const renderedText = wrapper.text();
    expect(renderedText).not.toContain('remaining time');
    expect(wrapper.find('button').exists()).toBe(true);
  });
});
