import { router } from 'expo-router';
import React, { ReactElement } from 'react';
import { Controller } from 'react-hook-form';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { useCreateFood } from './useCreateFood';

export const CreateFood = (): ReactElement => {
  const theme = useTheme();

  const {
    appLocale,
    control,
    errors,
    hasError,
    isDatePickerOpen,
    rules,
    t,
    getValues,
    handleSubmit,
    onConfirmSingle,
    onDismissSingle,
    onSubmit,
    reset,
    setIsDatePickerOpen
  } = useCreateFood();

  return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <View style={{ gap: 40 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} variant="displayMedium">
            {t('subTitle')}
          </Text>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <View>
              <Controller
                control={control}
                rules={rules.name}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    label={t('form.name')}
                    autoCapitalize="none"
                    error={!!errors.name}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="name"
              />

              <HelperText style={styles.errorText} type="error">
                {errors.name ? errors.name.message : ''}
              </HelperText>
            </View>

            <View>
              <Controller
                control={control}
                rules={rules.expireDate}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    label={t('form.expireDate')}
                    error={!!errors.expireDate}
                    autoCapitalize="none"
                    value={value?.toLocaleDateString(appLocale)}
                    onFocus={() => setIsDatePickerOpen(true)}
                  />
                )}
                name="expireDate"
              />
              <DatePickerModal
                locale={appLocale}
                mode="single"
                visible={isDatePickerOpen}
                onDismiss={onDismissSingle}
                date={getValues('expireDate')}
                onConfirm={onConfirmSingle}
              />
              <HelperText style={styles.errorText} type="error">
                {errors.expireDate ? errors.expireDate.message : ''}
              </HelperText>
            </View>
          </View>
          {hasError && (
            <HelperText style={[styles.errorText, { textAlign: 'center' }]} type="error">
              {t('form.errors.createFood')}
            </HelperText>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            {t('form.button.create')}
          </Button>
          <Button
            mode="contained"
            buttonColor={theme.colors.error}
            onPress={() => {
              reset();
              router.back();
            }}
          >
            {t('form.button.cancel')}
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    flex: 1,
    justifyContent: 'center'
  },
  titleContainer: {
    gap: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14
  },
  inputContainer: { gap: 10 },
  forgetPassword: {
    marginLeft: 'auto'
  },
  doNotHaveAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  signUpText: {
    fontWeight: 'bold'
  },
  errorText: {
    minHeight: 29
  },
  buttonContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    gap: 30
  }
});
