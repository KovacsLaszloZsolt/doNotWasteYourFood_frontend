import * as SecureStore from 'expo-secure-store';

import { changeLanguage } from 'i18next';
import { useAtom } from 'jotai';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown as RNEDropdown } from 'react-native-element-dropdown';
import { useTheme } from 'react-native-paper';
import { appLocaleAtom } from '../../store/store';
import { languages } from '../../../constants/languages';

export const LanguageDropdown = (): ReactElement => {
  const { t } = useTranslation('settings');
  const [appLocale, setAppLocale] = useAtom(appLocaleAtom);
  const [isFocus, setIsFocus] = useState(false);
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {appLocale || isFocus ? (
        <Text
          style={[
            styles.label,
            isFocus && { color: 'blue' },
            { backgroundColor: theme.colors.inverseOnSurface }
          ]}
        >
          {t('languageDropdown.label')}
        </Text>
      ) : null}
      <RNEDropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
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
  container: {
    padding: 16
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8
  },
  icon: {
    marginRight: 5
  },
  label: {
    position: 'absolute',
    left: 22,
    top: 8,
    zIndex: 999,
    marginHorizontal: 8,
    fontSize: 14
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  }
});
