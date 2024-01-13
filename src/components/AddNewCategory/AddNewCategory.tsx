import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { DropdownOption } from '../../../types/common.type';
import { createCategory } from '../../api/food.api';
import { QueryKeysEnum } from '../../enums/queryKeys';
import { snackbarMessageAtom } from '../../store/store';

interface AddNewCategoryProps {
  onClose: () => void;
  handleCategoryChange: (item: DropdownOption<number>) => void;
}

export const AddNewCategory = ({
  onClose,
  handleCategoryChange
}: AddNewCategoryProps): ReactElement => {
  const { t } = useTranslation('createFood');
  const [newCategory, setNewCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setSnackbarMessage] = useAtom(snackbarMessageAtom);

  const queryClient = useQueryClient();

  const onSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      const createdCategory = await createCategory({ name: newCategory });

      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.CATEGORIES] });

      setSnackbarMessage(t('form.newCategory.snackbar.success'));

      handleCategoryChange({
        label: createdCategory.data.data.name,
        value: createdCategory.data.data.id
      });
      onClose();
    } catch (error) {
      setSnackbarMessage(t('form.newCategory.snackbar.error'));
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-row items-center">
      <TextInput
        mode="outlined"
        className="basis-9/12"
        label={t('form.newCategory.title')}
        autoCapitalize="none"
        onChangeText={(value) => setNewCategory(value)}
        value={newCategory}
        autoFocus
      />
      <View className="flex-row mt-2">
        <IconButton
          className="m-0 ml-1"
          onPress={onSubmit}
          icon={'check-circle'}
          size={30}
          iconColor="green"
          disabled={!newCategory || isSubmitting}
        />
        <IconButton
          className="m-0"
          onPress={onClose}
          icon={'close-circle'}
          size={30}
          iconColor="red"
          disabled={isSubmitting}
        />
      </View>
    </View>
  );
};
