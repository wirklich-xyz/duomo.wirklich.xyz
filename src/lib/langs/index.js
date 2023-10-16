import i18n from 'sveltekit-i18n';
import { dev } from '$app/environment';
import langs from './langs';

export const defaultLocale = 'en';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
  log: {
    level: dev ? 'warn' : 'error',
  },
  translations: {
    en: { langs },
    de: { langs },
  },
  loaders: [
    {
      locale: 'en',
      key: 'menu',
      loader: async () => (await import('./en/menu.json')).default,
    },
    {
      locale: 'en',
      key: 'about',
      routes: ['/about'],
      loader: async () => (await import('./en/about.json')).default,
    },
    {
      locale: 'en',
      key: 'home',
      routes: ['/'],
      loader: async () => (await import('./en/home.json')).default,
    },
    {
      locale: 'cs',
      key: 'menu',
      loader: async () => (await import('./cs/menu.json')).default,
    },
    {
      locale: 'cs',
      key: 'about',
      routes: ['/about'],
      loader: async () => (await import('./cs/about.json')).default,
    },
    {
      locale: 'cs',
      key: 'home',
      routes: ['/'],
      loader: async () => (await import('./cs/home.json')).default,
    },
  ],
};

export const { t, loading, locales, locale, translations, loadTranslations, addTranslations, setLocale, setRoute } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
