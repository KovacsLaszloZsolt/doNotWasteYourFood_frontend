import { router } from 'expo-router';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

export const Access = (): ReactElement => {
  const { t } = useTranslation('authentication');

  return (
    <>
      <Button mode="contained" onPress={() => router.push('signIn')}>
        {t('access.signIn')}
      </Button>
      <Text style={styles.or} variant="labelLarge">
        {t('access.or')}
      </Text>
      <Button mode="contained" onPress={() => router.push('signUp')}>
        {t('access.signUp')}
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  or: {
    textTransform: 'uppercase'
  }
});
