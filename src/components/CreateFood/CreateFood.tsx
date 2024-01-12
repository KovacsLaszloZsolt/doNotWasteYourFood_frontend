import { router } from 'expo-router';
import React, { ReactElement } from 'react';
import { Controller } from 'react-hook-form';
import { KeyboardAvoidingView, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { ErrorText } from '../ErrorText/ErrorText';
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
    <KeyboardAvoidingView behavior="position" className="flex-1 bg-white p-5 justify-center">
      <View className="gap-8">
        <View className="gap-3">
          <Text className="font-bold text-sm" variant="displayMedium">
            {t('subTitle')}
          </Text>
        </View>
        <View>
          <View className="gap-3">
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
              <ErrorText error={errors.name?.message} />
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
              <ErrorText error={errors.expireDate?.message} />
            </View>
          </View>
          {hasError && <ErrorText error={t('form.errors.createFood')} className="text-center" />}
        </View>
        <View className="flex-row-reverse justify-center gap-8">
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
