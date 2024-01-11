import { router, useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { changeLanguage } from 'i18next';
import { useAtom } from 'jotai';
import React, { ReactElement, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { getCurrentUser } from '../src/api/authentication.api';
import { Access } from '../src/components/Access/Access';
import { UnauthorizedErrorAlert } from '../src/components/UnauthorizedErrorAlert/UnauthorizedErrorAlert';
import { appLocaleAtom, userAtom } from '../src/store/store';
import { getSystemLangCode } from '../src/utils/getSystemLangCode';

export default function HomePage(): ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useAtom(userAtom);
  const [, setAppLocale] = useAtom(appLocaleAtom);

  const local = useLocalSearchParams();

  useEffect(() => {
    SecureStore.getItemAsync('authToken')
      .then((authToken) => {
        if (!authToken) {
          setUser(undefined);
          setIsLoading(false);
        } else {
          getCurrentUser()
            .then((res) => {
              if (res.data) {
                setUser(res.data);
                router.push('user/home');
              } else {
                setIsLoading(false);
              }
            })
            .catch(() => {
              SecureStore.deleteItemAsync('authToken');
              setIsLoading(false);
            });
        }
      })
      .catch(() => {
        SecureStore.deleteItemAsync('authToken');
        setUser(undefined);
        setIsLoading(false);
      });
  }, [setUser]);

  useEffect(() => {
    SecureStore.getItemAsync('locale')
      .then((locale) => {
        if (locale) {
          changeLanguage(locale);
          setAppLocale(locale);
          return;
        }

        const systemLangCode = getSystemLangCode();
        setAppLocale(systemLangCode);
      })
      .catch((error) => {
        const systemLangCode = getSystemLangCode();
        setAppLocale(systemLangCode);
        console.log(error);
      });
  }, [setAppLocale]);

  return (
    <SafeAreaView style={styles.buttonContainer}>
      {local.alert && user && <UnauthorizedErrorAlert />}
      {!isLoading ? <Access /> : <ActivityIndicator animating={true} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
