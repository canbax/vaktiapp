import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { createPinia } from 'pinia';
import { i18n } from '@/plugins/i18n';
import DateView from './DateView.vue';

describe('DateView', () => {
  it('can render a gregorian date', () => {
    const wrapper = mount(DateView, {
      global: {
        plugins: [createVuetify(), createPinia(), i18n],
      },
      props: {
        date: new Date(2023, 10, 20),
        dateStringFormat: { month: 'MM', weekDay: '-', year: 'YYYY' },
        isShowHijriDate: false,
      },
    });
    const renderedText = wrapper.text();
    expect(renderedText).toContain('20 11 2023');
  });

  it('can render a hijri date', () => {
    const wrapper = mount(DateView, {
      global: {
        plugins: [createVuetify(), createPinia(), i18n],
      },
      props: {
        date: new Date(2023, 10, 20),
        dateStringFormat: { month: 'MM', weekDay: '-', year: 'YYYY' },
        isShowHijriDate: true,
      },
    });
    const renderedText = wrapper.text();
    expect(renderedText).toContain('1445 Jumada Al Oula 07');
  });
});
