import React, { ReactElement } from 'react';
import { Text } from 'react-native-paper';
import { LanguageDropdown } from '../../components/LanguageDropdown/LanguageDropdown';
import { router } from 'expo-router';

const Settings = (): ReactElement => {
  return (
    <>
      <LanguageDropdown />
      <Text
        variant="titleMedium"
        className="p-4 underline"
        onPress={() => router.push('/user/manageCategories')}
      >
        Manage categories
      </Text>
    </>
  );
};

export default Settings;
