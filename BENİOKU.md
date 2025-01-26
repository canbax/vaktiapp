# Vakitapp [(English)](README.md)

![Build](https://github.com/canbax/vakitapp/actions/workflows/build-and-test.yml/badge.svg) ![Statements](https://img.shields.io/badge/statements-94.63%25-brightgreen.svg?style=flat) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/canbax/vakitapp/blob/main/LICENSE)

Ücretsiz, reklamsız, açık kaynaklı ve şık bir Müslüman Namaz Vakitleri uygulaması. [web](https://vakitapp.com) üzerinden kullanılabilir. Yer tespiti için https://vakit.vercel.app/ servisini kullanır. Bunun dışında internet kullanmaz.

<p align="center">
  <img src="doc/şov-genel.gif" title="genel özellikler"/>
</p>

## Proje Kurulumu

```sh
npm install
```

### Geliştirme için Derleme ve Anında Yeniden Yükleme

```sh
npm run dev
```

### Veri tiplerinin Kontrolü, Derleme ve Üretim için Sıkıştırma

```sh
npm run build
```

### [Vitest](https://vitest.dev/) ile Birim Testlerini Çalıştırma

```sh
npm run test:unit
```

### [Playwright](https://playwright.dev) ile Uçtan Uca Testleri Çalıştırma

```sh
# İlk çalıştırma için tarayıcıları yükleyin
npx playwright install

# CI üzerinde test yaparken, önce projeyi derlemek gerekir
npm run build

# Uçtan uca testleri çalıştırır
npm run test:e2e
# Sadece Chromium üzerinde testleri çalıştırır
npm run test:e2e -- --project=chromium
# Belirli bir dosyanın testlerini çalıştırır
npm run test:e2e -- tests/example.spec.ts
# Testleri hata ayıklama modunda çalıştırır
npm run test:e2e -- --debug
```

### [ESLint](https://eslint.org/) ile Kod Denetimi

```sh
npm run lint
```
