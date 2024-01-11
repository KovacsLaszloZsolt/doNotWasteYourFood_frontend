import { Tabs, router, usePathname } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useStore } from 'jotai';
import React, { ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { userAtom } from '../../src/store/store';

const _layout = (): ReactElement => {
  const { t } = useTranslation('pages');
  const store = useStore();

  const handleLogout = (): void => {
    store.set(userAtom, undefined);
    SecureStore.deleteItemAsync('authToken').then(() => {
      router.push('/');
    });
  };

  const pathname = usePathname();

  const isCreateFood = useMemo(() => pathname === '/user/createFood', [pathname]);

  return (
    <>
      <Tabs
        screenOptions={{
          headerRight: () =>
            !isCreateFood && (
              <IconButton
                onPress={() => router.push('user/createFood')}
                icon={'plus-circle'}
                size={30}
              />
            ),
          headerLeft: () => (
            <IconButton onPress={() => handleLogout()} icon={'account-arrow-left'} size={30} />
          )
        }}
      >
        <Tabs.Screen name="home" options={{ title: t('pages.home') }} />
        <Tabs.Screen name="foods" options={{ title: t('pages.foods') }} />
        <Tabs.Screen name="scan" options={{ title: t('pages.scan') }} />
        <Tabs.Screen name="settings" options={{ title: t('pages.settings') }} />
        <Tabs.Screen name="createFood" options={{ href: null, title: t('pages.createFood') }} />
      </Tabs>
    </>
  );
};

export default _layout;

const styles = StyleSheet.create({
  logoutIcon: {
    marginLeft: 10
  }
});