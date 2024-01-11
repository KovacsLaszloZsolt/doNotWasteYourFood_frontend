import { useQueryClient } from '@tanstack/react-query';
import { router, useFocusEffect } from 'expo-router';
import { TFunction } from 'i18next';
import { useAtom } from 'jotai';
import { isEmpty } from 'lodash';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormReset,
  useForm
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { createFood } from '../../api/food.api';
import { QueryKeysEnum } from '../../enums/queryKeys';
import { appLocaleAtom } from '../../store/store';

interface UseCreateFood {
  appLocale: string;
  control: Control<FormValues, unknown>;
  errors: FieldErrors<FormValues>;
  hasError: boolean;
  isDatePickerOpen: boolean;
  rules: { name: { required: RequiredRule }; expireDate: { required: RequiredRule } };
  t: TFunction<[string, string], undefined>;
  getValues: UseFormGetValues<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues, undefined>;
  onConfirmSingle: (params: { date: Date | undefined }) => void;
  onDismissSingle: () => void;
  onSubmit: (data: FormValues) => Promise<void>;
  reset: UseFormReset<FormValues>;
  setIsDatePickerOpen: Dispatch<SetStateAction<boolean>>;
}

interface FormValues {
  name: string;
  expireDate: Date | undefined;
}

export const useCreateFood = (): UseCreateFood => {
  const { t } = useTranslation(['createFood', 'common']);

  const [appLocale] = useAtom(appLocaleAtom);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const queryClient = useQueryClient();

  const rules = {
    name: {
      required: {
        value: true,
        message: t('common:form.errors.required', { field: t('form.name') })
      }
    },
    expireDate: {
      required: {
        value: true,
        message: t('common:form.errors.required', { field: t('form.expireDate') })
      }
    }
  };

  const onSubmit = async (data: FormValues): Promise<void> => {
    if (!isEmpty(errors)) return;

    setHasError(false);

    const { name, expireDate } = data;

    if (!name || !expireDate) return;
    const food = { name, expireDate };

    try {
      const res = await createFood(food);

      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.FOODS] });
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.FOODS_EXPIRE_TODAY] });
      reset();
      router.push('/user/foods');
    } catch (e) {
      setHasError(true);
    }
  };

  const {
    control,
    formState: { errors },
    reset,
    getValues,
    handleSubmit,
    setValue
  } = useForm<FormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      expireDate: undefined
    }
  });

  const onDismissSingle = useCallback(() => {
    setIsDatePickerOpen(false);
  }, [setIsDatePickerOpen]);

  const onConfirmSingle = useCallback(
    (params: { date: Date | undefined }) => {
      setIsDatePickerOpen(false);
      setValue('expireDate', params.date);
    },
    [setIsDatePickerOpen, setValue]
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset();
      };
    }, [reset])
  );
  return {
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
  };
};
