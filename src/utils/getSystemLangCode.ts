import * as Localization from 'expo-localization';

export const getSystemLangCode = (): string => {
  const code = Localization.getLocales().shift();
  if (!code) return 'en';
  return code.languageCode;
};
