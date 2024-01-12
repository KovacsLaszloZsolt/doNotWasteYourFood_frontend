import { Link } from 'expo-router';
import React, { ReactElement } from 'react';
import { Controller } from 'react-hook-form';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { AuthenticationTypeEnum, AuthenticationTypeType } from '../../../types/authentication.type';
import { ErrorText } from '../ErrorText/ErrorText';
import { useAuthentication } from './useAuthentication';

interface AuthenticationProps {
  type: AuthenticationTypeType;
}

export const Authentication = ({ type }: AuthenticationProps): ReactElement => {
  const {
    control,
    errors,
    hasError,
    rules,
    showConfirmPassword,
    showPassword,
    t,
    theme,
    handleSubmit,
    onSubmit,
    setShowConfirmPassword,
    setShowPassword
  } = useAuthentication({ type });

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1 justify-center p-5">
      <ScrollView className="flex-1">
        <View className="gap-10">
          <View className="gap-3">
            <Text className="font-bold" variant="displayMedium">
              {t(`access.${type}`)}
            </Text>
            <Text variant="headlineSmall" style={{ color: theme.colors.backdrop }}>
              {t(`authentication.subTitle.${type}`)}
            </Text>
          </View>
          <View>
            <View className="gap-3">
              <View>
                <Controller
                  control={control}
                  rules={rules.email}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="outlined"
                      label={t('form.input.email')}
                      autoCapitalize="none"
                      error={!!errors.email}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="email"
                />
                <ErrorText error={errors.email?.message} />
              </View>
              <View>
                <Controller
                  control={control}
                  rules={rules.password}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="outlined"
                      label={t('form.input.password')}
                      secureTextEntry={!showPassword}
                      error={!!errors.password}
                      autoCapitalize="none"
                      right={
                        <TextInput.Icon
                          icon={showPassword ? 'eye-off' : 'eye'}
                          onPress={() => setShowPassword((prev) => !prev)}
                        />
                      }
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="password"
                />
                <View className="flex-row items-center">
                  <ErrorText error={errors.password?.message} />
                  {type === AuthenticationTypeEnum.SIGN_IN && (
                    <Link className="ml-auto" href="/forget-password">
                      <HelperText type="info">{t('authentication.forgotPassword')}</HelperText>
                    </Link>
                  )}
                </View>
              </View>
              {type === AuthenticationTypeEnum.SIGN_UP && (
                <View>
                  <Controller
                    control={control}
                    rules={rules.confirmPassword}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        mode="outlined"
                        label={t('form.input.confirmPassword')}
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
                        error={!!errors.confirmPassword}
                        right={
                          <TextInput.Icon
                            icon={showConfirmPassword ? 'eye-off' : 'eye'}
                            onPress={() => setShowConfirmPassword((prev) => !prev)}
                          />
                        }
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="confirmPassword"
                  />

                  <ErrorText error={errors.confirmPassword?.message} />
                </View>
              )}
            </View>
            {hasError && (
              <ErrorText
                className="text-center"
                error={t(
                  `form.errors.${type === AuthenticationTypeEnum.SIGN_IN ? 'signIn' : 'signUp'}`
                )}
              />
            )}
          </View>
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            {t(`access.${type === AuthenticationTypeEnum.SIGN_IN ? 'signIn' : 'signUp'}`)}
          </Button>
          <View className="flex-row gap-3 items-center justify-center">
            <Text variant="bodyMedium">
              {t(
                `authentication.${
                  type === AuthenticationTypeEnum.SIGN_IN ? 'doNotHaveAnAccount' : 'haveAnAccount'
                }`
              )}
            </Text>
            <Link href={type === AuthenticationTypeEnum.SIGN_IN ? '/signUp' : '/signIn'}>
              <Text variant="bodyMedium" className="font-bold text-purple-800">
                {t(`access.${type === AuthenticationTypeEnum.SIGN_IN ? 'signUp' : 'signIn'}`)}
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
