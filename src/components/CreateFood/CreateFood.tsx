import { router } from 'expo-router';
import React, { ReactElement, useState } from 'react';
import { Controller } from 'react-hook-form';
import { KeyboardAvoidingView, View } from 'react-native';
import { Button, IconButton, Text, TextInput, useTheme } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { AddNewCategory } from '../AddNewCategory/AddNewCategory';
import { CustomDropdown } from '../CustomDropdown/CustomDropdown';
import { ErrorText } from '../ErrorText/ErrorText';
import { useCreateFood } from './useCreateFood';

export const CreateFood = (): ReactElement => {
  const theme = useTheme();
  const [isAddNewCategoryOpen, setIsAddNewCategoryOpen] = useState(false);

  const {
    appLocale,
    categoriesOptions,
    control,
    errors,
    hasError,
    isDatePickerOpen,
    queryClient,
    rules,
    t,
    getValues,
    handleCategoryChange,
    handleSubmit,
    onConfirmSingle,
    onDismissSingle,
    onSubmit,
    reset,
    setIsDatePickerOpen
  } = useCreateFood();

  return (
    <KeyboardAvoidingView behavior="position" className="flex-1 bg-white p-5 justify-center">
      <View className="gap-y-8">
        <View className="gap-y-3">
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
                    disabled={isAddNewCategoryOpen}
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
                    disabled={isAddNewCategoryOpen}
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
            <View className="flex-row justify-between items-center">
              <View className="basis-10/12">
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomDropdown
                      label={t('form.category.label')}
                      placeholder={t('form.category.placeholder')}
                      searchPlaceholder={t('form.category.searchPlaceholder')}
                      options={categoriesOptions}
                      selected={categoriesOptions.find((c) => c.value === value)}
                      onChange={handleCategoryChange}
                      disabled={isAddNewCategoryOpen}
                    />
                  )}
                  name="category"
                />
              </View>
              <IconButton
                onPress={() => setIsAddNewCategoryOpen(true)}
                icon={'plus-circle'}
                size={30}
                disabled={isAddNewCategoryOpen}
              />
            </View>
            {isAddNewCategoryOpen && (
              <View className="justify-center">
                <AddNewCategory
                  onClose={() => {
                    setIsAddNewCategoryOpen(false);
                  }}
                  handleCategoryChange={handleCategoryChange}
                />
              </View>
            )}
          </View>
          {hasError && <ErrorText error={t('form.errors.createFood')} className="text-center" />}
        </View>
        <View className="flex-row justify-center gap-x-8">
          <Button
            mode="contained"
            buttonColor={theme.colors.error}
            onPress={() => {
              reset();
              setIsAddNewCategoryOpen(false);
              router.back();
            }}
          >
            {t('form.button.cancel')}
          </Button>
          <Button mode="contained" onPress={handleSubmit(onSubmit)} disabled={isAddNewCategoryOpen}>
            {t('form.button.create')}
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
