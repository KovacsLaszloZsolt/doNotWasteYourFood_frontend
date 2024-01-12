import { router, useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { changeLanguage } from 'i18next';
import { useAtom } from 'jotai';
import React, { ReactElement, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { getCurrentUser } from '../api/authentication.api';
import { Access } from '../components/Access/Access';
import { UnauthorizedErrorAlert } from '../components/UnauthorizedErrorAlert/UnauthorizedErrorAlert';
import { appLocaleAtom, userAtom } from '../store/store';
import { getSystemLangCode } from '../utils/getSystemLangCode';

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
      });
  }, [setAppLocale]);

  return (
    <SafeAreaView className="flex-1 gap-3 items-center justify-center">
      {local.alert && user && <UnauthorizedErrorAlert />}
      {!isLoading ? <Access /> : <ActivityIndicator animating={true} />}
    </SafeAreaView>
  );
}
