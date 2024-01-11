//i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getSystemLangCode } from './src/utils/getSystemLangCode';
import enAuthentication from './translate/en/authentication.json';
import enCommon from './translate/en/common.json';
import enCreateFood from './translate/en/createFood.json';
import enFoods from './translate/en/foods.json';
import enHome from './translate/en/home.json';
import enPages from './translate/en/pages.json';
import enSettings from './translate/en/settings.json';
import huAuthentication from './translate/hu/authentication.json';
import huCommon from './translate/hu/common.json';
import huCreateFood from './translate/hu/createFood.json';
import huFoods from './translate/hu/foods.json';
import huHome from './translate/hu/home.json';
import huPages from './translate/hu/pages.json';
import huSettings from './translate/hu/settings.json';

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: getSystemLangCode(),
  fallbackLng: 'en',
  ns: ['common', 'pages'],
  defaultNS: 'common',
  interpolation: {
    // We disable this because it's not required, given that react already scapes the text
    escapeValue: false
  },
  // resources: ['en', 'hu']
  // Here you can add all your supported languages
  resources: {
    en: {
      authentication: enAuthentication,
      common: enCommon,
      createFood: enCreateFood,
      foods: enFoods,
      home: enHome,
      pages: enPages,
      settings: enSettings
    },
    hu: {
      authentication: huAuthentication,
      common: huCommon,
      createFood: huCreateFood,
      foods: huFoods,
      home: huHome,
      pages: huPages,
      translation: huCommon,
      settings: huSettings
    }
  }
});

export default i18n;
