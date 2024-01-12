import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider as JotaiProvider, useStore } from 'jotai';
import { ReactElement } from 'react';
import { I18nextProvider } from 'react-i18next';
import { PaperProvider } from 'react-native-paper';
import { registerTranslation } from 'react-native-paper-dates';
import i18n from '../../i18n';

registerTranslation('en', {
  save: 'Save',
  selectSingle: 'Select date',
  selectMultiple: 'Select dates',
  selectRange: 'Select period',
  notAccordingToDateFormat: (inputFormat) => `Date format must be ${inputFormat}`,
  mustBeHigherThan: (date) => `Must be later then ${date}`,
  mustBeLowerThan: (date) => `Must be earlier then ${date}`,
  mustBeBetween: (startDate, endDate) => `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: 'Day is not allowed',
  previous: 'Previous',
  next: 'Next',
  typeInDate: 'Type in date',
  pickDateFromCalendar: 'Pick date from calendar',
  close: 'Close',
  hour: 'Hour',
  minute: 'Minute'
});

registerTranslation('hu', {
  save: 'Mentés',
  selectSingle: 'Válasz dátumot',
  selectMultiple: 'Válasz dátumokat',
  selectRange: 'Válasz időszakot',
  notAccordingToDateFormat: (inputFormat) => `A dátum formátumának ${inputFormat} kell lennie`,
  mustBeHigherThan: (date) => `Későbbinek kell lennie, mint ${date}`,
  mustBeLowerThan: (date) => `Korábbinak kell lennie, mint ${date}`,
  mustBeBetween: (startDate, endDate) => `${startDate} és ${endDate} között kell lennie`,
  dateIsDisabled: 'A nap nem engedélyezett',
  previous: 'Előző',
  next: 'Következő',
  typeInDate: 'Adja meg a dátumot',
  pickDateFromCalendar: 'Válassza ki a dátumot a naptárból',
  close: 'Bezárás',
  hour: 'Óra',
  minute: 'Perc'
});

export default function RootLayout(): ReactElement {
  const store = useStore();

  const queryClient = new QueryClient();

  return (
    <I18nextProvider i18n={i18n}>
      <JotaiProvider store={store}>
        <PaperProvider>
          <QueryClientProvider client={queryClient}>
            <StatusBar style="auto" />
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
                name="user"
                options={{
                  headerShown: false
                }}
              />
            </Stack>
          </QueryClientProvider>
        </PaperProvider>
      </JotaiProvider>
    </I18nextProvider>
  );
}
