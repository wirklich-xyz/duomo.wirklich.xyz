import { derived, writable, get } from "svelte/store";
import translations from "./translations";
import { onMount } from "svelte";

export const locale = writable("en");
export const locales = Object.keys(translations);

locale.set(navigator.language.replace(/-.*$/, ''));
if (!locales.includes(get(locale))) {
  locale.set("en"); // fallback
}

export const fns = derived(locale, ($locale) => { let r=translations[$locale]["fns"]; console.log("AAAAA ", $locale, $r); return r; });

function translate(locale, key, vars) {
  // Let's throw some errors if we're trying to use keys/locales that don't exist.
  // We could improve this by using Typescript and/or fallback values.
  if (!key) throw new Error("no key provided to $t()");
  if (!locale) throw new Error(`no translation for key "${key}"`);

  // Grab the translation from the translations object.
  let text = translations[locale][key];

  if (!text) throw new Error(`no translation found for ${locale}.${key}`);

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
