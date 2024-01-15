import { UseMutateFunction, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { StrapiMultiResponse } from '../../types/common.type';
import { Category } from '../../types/food.type';
import { deleteCategory, getCategories, updateCategory } from '../api/food.api';
import { QueryKeysEnum } from '../enums/queryKeys';
import { snackbarMessageAtom } from '../store/store';

interface UseCategoriesProps {
  onDeleteSuccess?: () => void;
}

interface UseCategories {
  categories: StrapiMultiResponse<Category> | undefined;
  isDeletingCategory: boolean;
  isUpdatingCategory: boolean;
  isUpdateSuccess: boolean;
  mutateDeleteCategory: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, number, unknown>;
  mutateUpdateCategory: UseMutateFunction<
    AxiosResponse<unknown, unknown>,
    Error,
    Pick<Category, 'id' | 'name'>,
    unknown
  >;
}

export const useCategories = ({ onDeleteSuccess }: UseCategoriesProps): UseCategories => {
  const { t } = useTranslation('manageCategories');
  const queryClient = useQueryClient();
  const [, setSnackbarMessage] = useAtom(snackbarMessageAtom);

  const { data: categories } = useQuery({
    queryKey: [QueryKeysEnum.CATEGORIES],
    queryFn: async () => getCategories(),
    select: (response) => response.data
  });

  const {
    mutate: mutateUpdateCategory,
    isPending: isUpdatingCategory,
    isSuccess: isUpdateSuccess
  } = useMutation({
    mutationFn: (data: Pick<Category, 'id' | 'name'>) => updateCategory(data),
    onError: (error) => {
      setSnackbarMessage(t('edit.error'));

      // eslint-disable-next-line no-console
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.CATEGORIES] });
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.FOODS] });
      setSnackbarMessage(t('edit.success'));
    }
  });

  const { mutate: mutateDeleteCategory, isPending: isDeletingCategory } = useMutation({
    mutationFn: (data: number) => deleteCategory(data),
    onError: (error) => {
      setSnackbarMessage(t('delete.error'));

      // eslint-disable-next-line no-console
      console.error(error);
    },
    onSuccess: () => {
      onDeleteSuccess?.();
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.CATEGORIES] });
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.FOODS] });
      setSnackbarMessage(t('delete.success'));
    }
  });
  return {
    categories,
    isDeletingCategory,
    isUpdatingCategory,
    isUpdateSuccess,
    mutateDeleteCategory,
    mutateUpdateCategory
  };
};
