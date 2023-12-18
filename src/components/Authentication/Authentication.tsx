import { Link } from 'expo-router';
import React, { ReactElement } from 'react';
import { Controller } from 'react-hook-form';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { AuthenticationTypeEnum, AuthenticationTypeType } from '../../../types/authentication';
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
    getValues,
    handleSubmit,
    onSubmit,
    setShowConfirmPassword,
    setShowPassword
  } = useAuthentication({ type });

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ gap: 40 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} variant="displayMedium">
              {t(`access.${type}`)}
            </Text>
            <Text variant="headlineSmall" style={{ color: theme.colors.backdrop }}>
              {t(`authentication.subTitle.${type}`)}
            </Text>
          </View>
          <View>
            <View style={styles.inputContainer}>
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

                <HelperText style={styles.errorText} type="error">
                  {errors.email ? errors.email.message : ''}
                </HelperText>
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <HelperText style={styles.errorText} type="error">
                    {errors.password ? errors.password.message : ''}
                  </HelperText>
                  {type === AuthenticationTypeEnum.SIGN_IN && (
                    <Link style={styles.forgetPassword} href="/forget-password">
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

                  <HelperText style={styles.errorText} type="error">
                    {errors.confirmPassword ? errors.confirmPassword.message : ''}
                  </HelperText>
                </View>
              )}
            </View>
            {hasError && (
              <HelperText style={[styles.errorText, { textAlign: 'center' }]} type="error">
                {t(`form.errors.${type === AuthenticationTypeEnum.SIGN_IN ? 'signIn' : 'signUp'}`)}
              </HelperText>
            )}
          </View>
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            {t(`access.${type === AuthenticationTypeEnum.SIGN_IN ? 'signIn' : 'signUp'}`)}
          </Button>
          <View style={styles.doNotHaveAccountContainer}>
            <Text variant="bodyMedium">
              {t(
                `authentication.${
                  type === AuthenticationTypeEnum.SIGN_IN ? 'doNotHaveAnAccount' : 'haveAnAccount'
                }`
              )}
            </Text>
            <Link href={type === AuthenticationTypeEnum.SIGN_IN ? '/signUp' : '/signIn'}>
              <Text
                variant="bodyMedium"
                style={[styles.signUpText, { color: theme.colors.primary }]}
              >
                {t(`access.${type === AuthenticationTypeEnum.SIGN_IN ? 'signUp' : 'signIn'}`)}
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  titleContainer: {
    gap: 10
  },
  title: {
    fontWeight: 'bold'
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
  }
});
