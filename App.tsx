import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { ReactElement } from 'react';
import { I18nextProvider } from 'react-i18next';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { expo } from './app.json';
import i18n from './i18n';

export default function App(): ReactElement {
  return (
    <I18nextProvider i18n={i18n}>
      <PaperProvider>
        <StatusBar style="auto" />
      </PaperProvider>
    </I18nextProvider>
  );
}

AppRegistry.registerComponent(expo.name, () => App);
