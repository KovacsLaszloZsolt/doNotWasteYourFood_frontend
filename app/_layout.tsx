import { Stack, router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { Provider as JotaiProvider, useStore } from 'jotai';
import { ReactElement } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Pressable } from 'react-native';
import { Avatar, PaperProvider } from 'react-native-paper';
import i18n from '../i18n';
import { userAtom } from '../src/store/store';

export default function RootLayout(): ReactElement {
  const store = useStore();

  const handleLogout = (): void => {
    store.set(userAtom, undefined);
    SecureStore.deleteItemAsync('authToken').then(() => {
      router.push('/');
    });
  };

  return (
    <I18nextProvider i18n={i18n}>
      <JotaiProvider store={store}>
        <PaperProvider>
          <StatusBar style="auto" />
          {/* <SafeAreaView> */}
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: '#f4511e'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold'
              }
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="home"
              options={{
                headerLeft: () => <></>,
                headerRight: () => (
                  <Pressable onPress={() => handleLogout()}>
                    <Avatar.Icon icon={'account-arrow-left'} size={30} />
                  </Pressable>
                )
              }}
            />
          </Stack>
          {/* </SafeAreaView> */}
        </PaperProvider>
      </JotaiProvider>
    </I18nextProvider>
  );
}
