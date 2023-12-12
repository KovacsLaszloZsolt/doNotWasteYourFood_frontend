//i18n.ts

import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translate/en.json';
import hu from './translate/hu.json';

const getLangCode = (): string => {
  const code = Localization.getLocales().shift();
  if (!code) return 'en';
  return code.languageCode;
};

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: getLangCode(),
  defaultNS: 'translation',
  interpolation: {
    // We disable this because it's not required, given that react already scapes the text
    escapeValue: false
  },
  // Here you can add all your supported languages
  resources: {
    en: { translation: en },
    hu: { translation: hu }
  }
});

export default i18n;
