import * as SecureStore from 'expo-secure-store';

import { changeLanguage } from 'i18next';
import { useAtom } from 'jotai';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown as RNEDropdown } from 'react-native-element-dropdown';
import { useTheme } from 'react-native-paper';
import { languages } from '../../../constants/languages';
import { appLocaleAtom } from '../../store/store';

export const LanguageDropdown = (): ReactElement => {
  const { t } = useTranslation('settings');
  const [appLocale, setAppLocale] = useAtom(appLocaleAtom);
  const [isFocus, setIsFocus] = useState(false);
  const theme = useTheme();

  return (
    <View className="p-4">
      {appLocale || isFocus ? (
        <Text
          className={`absolute left-5 top-[6px] z-50 mx-2 text-sm bg-slate-100 ${
            isFocus ? 'text-blue-800' : 'text-slate-500'
          }`}
        >
          {t('languageDropdown.label')}
        </Text>
      ) : null}
      <RNEDropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={languages}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={appLocale}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={async (item) => {
          changeLanguage(item.value);
          await SecureStore.setItemAsync('locale', item.value);
          setAppLocale(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  }
});
