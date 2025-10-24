import { withSetup } from '@/util/test-utils';
import { useRoute } from './route';
import { describe, it, expect } from 'vitest';
import { RouteManager } from '@/types';
import TimesPage from '@/pages/TimesPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import ReligiousDaysPage from '@/pages/ReligiousDaysPage.vue';
import { parsePathWithLanguage } from './route';

describe('useRoute', () => {
  it("should open 'Times Page' by default", () => {
    const { result, app } = withSetup<RouteManager>(() => useRoute());
    expect(result.currentView.value).toStrictEqual(TimesPage);
    app.unmount();
  });

  it("Should redirect to 'Not Found' page for undefined paths ", () => {
    const { result, app } = withSetup<RouteManager>(() => useRoute());
    result.setViewFromPathMenuItem({ icon: '', title: 'asd' });
    expect(result.currentView.value).toStrictEqual(NotFoundPage);
    app.unmount();
  });

  it("Should redirect to 'sabbaticals' page after setting view", () => {
    const { result, app } = withSetup<RouteManager>(() => useRoute());
    result.setViewFromPathMenuItem({ icon: '', title: 'sabbaticals' });
    expect(result.currentView.value).toStrictEqual(ReligiousDaysPage);
    app.unmount();
  });
});

describe('parsePathWithLanguage', () => {
  it('should extract language code and route from path with language prefix', () => {
    const result = parsePathWithLanguage('sabbaticals/en');
    expect(result).toEqual({
      languageCode: 'en',
      routePath: 'sabbaticals',
    });
  });

  it('should handle multiple path segments after language', () => {
    const result = parsePathWithLanguage('/settings/general/tr');
    expect(result).toEqual({
      languageCode: 'tr',
      routePath: 'settings/general',
    });
  });

  it('should return null language code for paths without language prefix', () => {
    const result = parsePathWithLanguage('sabbaticals');
    expect(result).toEqual({
      languageCode: null,
      routePath: 'sabbaticals',
    });
  });

  it('should handle empty path', () => {
    const result = parsePathWithLanguage('');
    expect(result).toEqual({
      languageCode: null,
      routePath: '',
    });
  });

  it('should handle root path', () => {
    const result = parsePathWithLanguage('/');
    expect(result).toEqual({
      languageCode: null,
      routePath: '',
    });
  });

  it('should handle language code only', () => {
    const result = parsePathWithLanguage('es');
    expect(result).toEqual({
      languageCode: 'es',
      routePath: '',
    });
  });

  it('should not treat unsupported language codes as languages', () => {
    const result = parsePathWithLanguage('sabbaticals/xx');
    expect(result).toEqual({
      languageCode: null,
      routePath: `sabbaticals/xx`,
    });
  });

  it('should not treat 3-letter codes as languages', () => {
    const result = parsePathWithLanguage('sabbaticals/eng/');
    expect(result).toEqual({
      languageCode: null,
      routePath: 'sabbaticals/eng/',
    });
  });

  it('should handle all supported languages', () => {
    const supportedLanguages = [
      'ar',
      'az',
      'de',
      'en',
      'es',
      'fa',
      'fr',
      'id',
      'it',
      'kk',
      'ko',
      'ky',
      'ms',
      'ru',
      'tr',
      'zh',
    ];

    supportedLanguages.forEach((lang) => {
      const result = parsePathWithLanguage(`/sabbaticals/${lang}`);
      expect(result).toEqual({
        languageCode: lang,
        routePath: 'sabbaticals',
      });
    });
  });
});
