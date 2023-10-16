import { derived, writable, get } from "svelte/store";
import translations from "$lib/translations";
import { onMount } from "svelte";
import { getLocaleFromNavigator } from "svelte-i18n";

const isInitialized = writable(false);
export const locale = writable("en");
export const locales = Object.keys(translations);

locale.set("en"); // default and fallback

export function init_i18n() {
  if (get(isInitialized)) return;
  isInitialized.set(true);
  onMount(async () => {
    let loc = getLocaleFromNavigator().replace(/-.*$/, '');
    if (locales.includes(get(locale))) {
      locale.set(loc);
    }
  });
}

export const fns = derived(locale, ($locale) => get_translate($locale, "fns") );

function get_translate(locale, key) {
  // Let's throw some errors if we're trying to use keys/locales that don't exist.
  // We could improve this by using Typescript and/or fallback values.
  if (!key) throw new Error("no key provided to $t()");
  if (!locale) throw new Error(`no translation for key "${key}"`);

  // Grab the translation from the translations object.
  let data = translations[locale][key];
  if (!data) throw new Error(`no translation found for ${locale}.${key}`);
  return data;
}

function translate(locale, key, vars) {
  let text = get_translate(locale, key);
  // Replace any passed in variables in the translation string.
  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, vars[k]);
  });
  return text;
}

export const t = derived(locale, ($locale) => (key, vars = {}) =>
  translate($locale, key, vars)
);
