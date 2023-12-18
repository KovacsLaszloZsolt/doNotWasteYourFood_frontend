import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { TFunction } from 'i18next';
import { useStore } from 'jotai';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  useForm
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MD3Theme, useTheme } from 'react-native-paper';
import { REGEX } from '../../../constants/regex';
import {
  AuthenticationResponse,
  AuthenticationTypeEnum,
  AuthenticationTypeType,
  FormValues,
  Rules
} from '../../../types/authentication';
import { createUser, loginUser } from '../../api/authentication.api';
import { userAtom } from '../../store/store';
import { fetchHandler } from '../../utils/fetchHandler';

const PASSWORD_MIN_LENGTH = 6;

interface UseAuthenticationProps {
  type: AuthenticationTypeType;
}

interface UseAuthentication {
  control: Control<FormValues, unknown>;
  errors: FieldErrors<FormValues>;
  hasError: boolean;
  rules: Rules;
  showConfirmPassword: boolean;
  showPassword: boolean;
  t: TFunction<'translation', undefined>;
  theme: MD3Theme;
  getValues: UseFormGetValues<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues, undefined>;
  onSubmit: (data: FormValues) => void;
  setShowConfirmPassword: Dispatch<SetStateAction<boolean>>;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}
export const useAuthentication = ({ type }: UseAuthenticationProps): UseAuthentication => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [hasError, setHasError] = useState(false);
  const store = useStore();

  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit
  } = useForm<FormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: FormValues): Promise<void> => {
    if (!isValid) return;

    setHasError(false);

    try {
      let res: AuthenticationResponse;

      if (type === AuthenticationTypeEnum.SIGN_UP) {
        res = await fetchHandler<AuthenticationResponse>(
          createUser({ ...data, username: data.email })
        );
      } else {
        res = await fetchHandler<AuthenticationResponse>(
          loginUser({ identifier: data.email, password: data.password })
        );
      }

      store.set(userAtom, res.user);
      await SecureStore.setItemAsync('authToken', res.jwt);

      router.push('/home');
    } catch (error) {
      setHasError(true);
    }
  };

  const rules = {
    email: {
      required: {
        value: true,
        message: t('form.errors.required', { field: t('form.input.email') })
      },
      pattern: {
        message: t('form.errors.invalid', { field: t('form.input.email') }),
        value: REGEX.email
      }
    },
    password: {
      required: {
        value: true,
        message: t('form.errors.required', { field: t('form.input.password') })
      },
      minLength: {
        value: PASSWORD_MIN_LENGTH,
        message: t('form.errors.minLength', {
          field: t('form.input.password'),
          length: PASSWORD_MIN_LENGTH
        })
      }
    },
    confirmPassword: {
      required: {
        value: true,
        message: t('form.errors.required', { field: t('form.input.confirmPassword') })
      },
      minLength: {
        value: PASSWORD_MIN_LENGTH,
        message: t('form.errors.minLength', {
          field: t('form.input.confirmPassword'),
          length: PASSWORD_MIN_LENGTH
        })
      },
      validate: (value: string | undefined) =>
        value === getValues('password') ||
        t('form.errors.match', {
          field: t('form.input.confirmPassword'),
          match: t('form.input.password').toLowerCase()
        })
    }
  };
  return {
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
  };
};
