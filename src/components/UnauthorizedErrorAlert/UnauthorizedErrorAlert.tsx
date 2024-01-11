import { router } from 'expo-router';
import { useStore } from 'jotai';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { userAtom } from '../../store/store';

export const UnauthorizedErrorAlert = (): ReactElement => {
  const { t } = useTranslation('common');
  const store = useStore();

  const handleLogout = (): void => {
    router.push('/?alert');
    store.set(userAtom, undefined);
  };

  Alert.alert('', t('errors.sessionExpired'), [{ text: 'OK', onPress: () => handleLogout() }]);
  return <></>;
};
