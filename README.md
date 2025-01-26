# Vakitapp [(Türkçe)](BENİOKU.md)

![Build](https://github.com/canbax/vakitapp/actions/workflows/build-and-test.yml/badge.svg) ![Statements](https://img.shields.io/badge/statements-94.63%25-brightgreen.svg?style=flat) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/canbax/vakitapp/blob/main/LICENSE)

Free, ad-free, open-source, and sleek Muslim Praying Times app. Available on [web](https://vakitapp.com). Uses https://vakit.vercel.app/ for finding places. In other cases, it doesn't uses the Internet.

<p align="center">
  <img src="doc/show-case.gif" title="general features"/>
</p>

## Features

### No-internet needed

Once a place is selected, it doesn't need internet. So it's blazing fast.

### Hijri Calender

You can see religious days from the menu item _"Religious Days"_.

Hijri calendar calculations are without using any third-party application. The logic is inside [HijriDate.ts file](https://github.com/canbax/vakitapp/blob/master/src/util/HijriDate.ts)

### Various Customizations

- Multiple themes (_Dark_ or _Light_)
- Change language (currently English and Turkish)
- Show or hide hijri date
- Change zoom level
- Multiple date formats
- Multiple time formats

### Share times

You can share times using a share link or embed it your own website.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
