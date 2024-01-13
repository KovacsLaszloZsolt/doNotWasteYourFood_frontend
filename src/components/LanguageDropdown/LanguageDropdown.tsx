import * as SecureStore from 'expo-secure-store';

import { changeLanguage } from 'i18next';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { languages } from '../../../constants/languages';
import { appLocaleAtom } from '../../store/store';
import { CustomDropdown } from '../CustomDropdown/CustomDropdown';

export const LanguageDropdown = (): ReactElement => {
  const { t } = useTranslation('settings');
  const [appLocale, setAppLocale] = useAtom(appLocaleAtom);

  const handleOnChange = async (item: { label: string; value: string }): Promise<void> => {
    changeLanguage(item.value);
    setAppLocale(item.value);

    try {
      await SecureStore.setItemAsync('locale', item.value);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <View className="p-4">
      <CustomDropdown
        label={t('languageDropdown.label')}
        options={languages}
        selected={languages.find((lang) => lang.value === appLocale)}
        onChange={handleOnChange}
      />
    </View>
  );
};
