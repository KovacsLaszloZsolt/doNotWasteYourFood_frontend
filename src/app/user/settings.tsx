import { router } from 'expo-router';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native-paper';
import { LanguageDropdown } from '../../components/LanguageDropdown/LanguageDropdown';

const Settings = (): ReactElement => {
  const { t } = useTranslation('pages');
  return (
    <>
      <LanguageDropdown />
      <Text
        variant="titleMedium"
        className="p-4 underline"
        onPress={() => router.push('/user/manageCategories')}
      >
        {t('pages.manageCategories')}{' '}
      </Text>
    </>
  );
};

export default Settings;
