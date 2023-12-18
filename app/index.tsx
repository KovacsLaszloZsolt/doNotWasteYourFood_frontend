import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useStore } from 'jotai';
import React, { ReactElement, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { getCurrentUser } from '../src/api/authentication.api';
import { Access } from '../src/components/Access/Access';
import { userAtom } from '../src/store/store';
import { fetchHandler } from '../src/utils/fetchHandler';
import { User } from '../types/authentication';

export default function HomePage(): ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  const store = useStore();
  const user = store.get(userAtom);

  useEffect(() => {
    SecureStore.getItemAsync('authToken')
      .then((authToken) => {
        if (authToken) {
          fetchHandler<User>(getCurrentUser(authToken))
            .then((res) => {
              if (res) {
                store.set(userAtom, res);
                router.push('home');
              } else {
                setIsLoading(false);
              }
            })
            .catch(() => {
              SecureStore.deleteItemAsync('authToken');
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
        }
      })
      .catch(() => {
        SecureStore.deleteItemAsync('authToken');
        setIsLoading(false);
      });
  }, [store]);

  return (
    <SafeAreaView style={styles.buttonContainer}>
      {!isLoading && !user ? <Access /> : <ActivityIndicator animating={true} />}
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
