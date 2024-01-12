import { router } from 'expo-router';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'react-native-paper';

export const Access = (): ReactElement => {
  const { t } = useTranslation('authentication');

  return (
    <>
      <Button mode="contained" onPress={() => router.push('signIn')}>
        {t('access.signIn')}
      </Button>
      <Text className="uppercase" variant="labelLarge">
        {t('access.or')}
      </Text>
      <Button mode="contained" onPress={() => router.push('signUp')}>
        {t('access.signUp')}
      </Button>
    </>
  );
};
