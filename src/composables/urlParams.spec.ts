import { describe, it, expect } from 'vitest';
import { encodeParamsForIframe } from './urlParams';
import { ref } from 'vue';
import type { Params } from './urlParams';
import type { GenericPlace, UserInterfaceLanguage } from '../types';

describe('encodeParamsForIframe', () => {
  const createMockPlace = (id: number, name: string = 'Test City'): GenericPlace => ({
    id,
    name,
    latitude: 41.0082,
    longitude: 28.9784,
    countryCode: 'TR',
    stateName: 'Test State',
    alternativeNames: [],
    country: 'Test Country',
  });

  const createMockLanguage = (languageCode: string = 'en'): UserInterfaceLanguage => ({
    languageCode: languageCode as 'en',
    text: 'English',
  });

  const createBaseParams = (): Params => ({
    currPlaceParam: ref(createMockPlace(123)),
    theme: ref('light'),
    zoom: ref(1),
    isShowHijri: ref(false),
    year: ref('YYYY'),
    month: ref('MMMM'),
    weekDay: ref('DDDD'),
    time: ref('XX:YY:ZZ'),
    method: ref('Turkey'),
    madhab: ref('shafi'),
  });

  it('should encode all required parameters correctly', () => {
    const params = createBaseParams();
    const result = encodeParamsForIframe(params);

    expect(result).toBe(
      'city=123&theme=light&isShowHijri=0&year=YYYY&month=MMMM&weekDay=DDDD&time=XX%3AYY%3AZZ&method=Turkey&madhab=shafi&zoom=1',
    );
  });

  it('should handle null currPlaceParam', () => {
    const params = createBaseParams();
    params.currPlaceParam.value = null;

    const result = encodeParamsForIframe(params);

    expect(result).toContain('city=undefined');
  });

  it('should handle undefined currPlaceParam', () => {
    const params = createBaseParams();
    params.currPlaceParam.value = null;

    const result = encodeParamsForIframe(params);

    expect(result).toContain('city=undefined');
  });

  it('should encode isShowHijri as 1 when true', () => {
    const params = createBaseParams();
    params.isShowHijri.value = true;

    const result = encodeParamsForIframe(params);

    expect(result).toContain('isShowHijri=1');
  });

  it('should encode isShowHijri as 0 when false', () => {
    const params = createBaseParams();
    params.isShowHijri.value = false;

    const result = encodeParamsForIframe(params);

    expect(result).toContain('isShowHijri=0');
  });

  it('should include date parameter when defined', () => {
    const params = createBaseParams();
    params.date = ref('2025-09-06');

    const result = encodeParamsForIframe(params);

    expect(result).toContain('date=2025-09-06');
  });

  it('should not include date parameter when undefined', () => {
    const params = createBaseParams();
    params.date = ref(null);

    const result = encodeParamsForIframe(params);

    expect(result).not.toContain('date=');
  });

  it('should not include date parameter when not provided', () => {
    const params = createBaseParams();
    // date is not included in params

    const result = encodeParamsForIframe(params);

    expect(result).not.toContain('date=');
  });

  it('should include language parameter when defined', () => {
    const params = createBaseParams();
    params.language = ref(createMockLanguage('tr'));

    const result = encodeParamsForIframe(params);

    expect(result).toContain('language=tr');
  });

  it('should not include language parameter when undefined', () => {
    const params = createBaseParams();
    params.language = ref(null as UserInterfaceLanguage | null);

    const result = encodeParamsForIframe(params);

    expect(result).not.toContain('language=');
  });

  it('should not include language parameter when not provided', () => {
    const params = createBaseParams();
    // language is not included in params

    const result = encodeParamsForIframe(params);

    expect(result).not.toContain('language=');
  });

  it('should handle different theme values', () => {
    const params = createBaseParams();
    params.theme.value = 'dark';

    const result = encodeParamsForIframe(params);

    expect(result).toContain('theme=dark');
  });

  it('should handle different zoom values', () => {
    const params = createBaseParams();
    params.zoom.value = 2.5;

    const result = encodeParamsForIframe(params);

    expect(result).toContain('zoom=2.5');
  });

  it('should handle different date format values', () => {
    const params = createBaseParams();
    params.year.value = 'YY';
    params.month.value = 'MMM';
    params.weekDay.value = 'DDD';

    const result = encodeParamsForIframe(params);

    expect(result).toContain('year=YY');
    expect(result).toContain('month=MMM');
    expect(result).toContain('weekDay=DDD');
  });

  it('should handle different time format values', () => {
    const params = createBaseParams();
    params.time.value = 'XX:YY';

    const result = encodeParamsForIframe(params);

    expect(result).toContain('time=XX%3AYY');
  });

  it('should handle different method values', () => {
    const params = createBaseParams();
    params.method.value = 'MuslimWorldLeague';

    const result = encodeParamsForIframe(params);

    expect(result).toContain('method=MuslimWorldLeague');
  });

  it('should handle different madhab values', () => {
    const params = createBaseParams();
    params.madhab.value = 'hanafi';

    const result = encodeParamsForIframe(params);

    expect(result).toContain('madhab=hanafi');
  });

  it('should URL encode special characters in parameters', () => {
    const params = createBaseParams();
    params.time.value = 'X hour Y minute Z second';

    const result = encodeParamsForIframe(params);

    expect(result).toContain('time=X+hour+Y+minute+Z+second');
  });

  it('should handle complex scenario with all optional parameters', () => {
    const params = createBaseParams();
    params.date = ref('2025-12-25');
    params.language = ref(createMockLanguage('ar'));
    params.theme.value = 'dark';
    params.zoom.value = 3;
    params.isShowHijri.value = true;
    params.currPlaceParam.value = createMockPlace(456, 'İstanbul');

    const result = encodeParamsForIframe(params);

    expect(result).toContain('city=456');
    expect(result).toContain('theme=dark');
    expect(result).toContain('isShowHijri=1');
    expect(result).toContain('zoom=3');
    expect(result).toContain('date=2025-12-25');
    expect(result).toContain('language=ar');
  });

  it('should maintain parameter order consistently', () => {
    const params = createBaseParams();
    const result = encodeParamsForIframe(params);

    // Check that parameters appear in the expected order
    const parameterOrder = [
      'city=123',
      'theme=light',
      'isShowHijri=0',
      'year=YYYY',
      'month=MMMM',
      'weekDay=DDDD',
      'time=XX%3AYY%3AZZ',
      'method=Turkey',
      'madhab=shafi',
      'zoom=1',
    ];

    expect(result).toBe(parameterOrder.join('&'));
  });

  it('should handle zero zoom value', () => {
    const params = createBaseParams();
    params.zoom.value = 0;

    const result = encodeParamsForIframe(params);

    expect(result).toContain('zoom=0');
  });

  it('should handle negative city id', () => {
    const params = createBaseParams();
    params.currPlaceParam.value = createMockPlace(-1);

    const result = encodeParamsForIframe(params);

    expect(result).toContain('city=-1');
  });

  it('should handle very large city id', () => {
    const params = createBaseParams();
    params.currPlaceParam.value = createMockPlace(999999);

    const result = encodeParamsForIframe(params);

    expect(result).toContain('city=999999');
  });
});
