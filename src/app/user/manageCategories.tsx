import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import { useFocusEffect } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { DataTable, IconButton, TextInput } from 'react-native-paper';
import { Category } from '../../../types/food.type';
import { useCategories } from '../../QueryHooks/useCategories';
import { Modal } from '../../components/Modal/Modal';

const ManageCategories = (): ReactElement => {
  const { t } = useTranslation('manageCategories');
  const [editedCategoryId, setEditedCategoryId] = useState<null | number>(null);
  const [editedCategoryName, setEditedCategoryName] = useState<string>('');
  const [deleteCategory, setDeleteCategory] = useState<null | Category>(null);

  const handleDeleteCategoryConfirm = (): void => {
    deleteCategory && mutateDeleteCategory(deleteCategory.id);
  };

  const onDeleteSuccess = (): void => {
    setDeleteCategory(null);
  };

  const {
    categories,
    isDeletingCategory,
    isUpdatingCategory,
    isUpdateSuccess,
    mutateDeleteCategory,
    mutateUpdateCategory
  } = useCategories({ onDeleteSuccess });

  const reset = (): void => {
    setEditedCategoryId(null);
    setEditedCategoryName('');
  };

  useEffect(() => reset(), [isUpdateSuccess]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset();
      };
    }, [])
  );

  return (
    <>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 3 }}>{t('name')}</DataTable.Title>
          <DataTable.Title style={{ flex: 2 }} className="justify-center">
            {t('edit.title')}
          </DataTable.Title>
          <DataTable.Title className="justify-center">{t('delete.title')}</DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={categories?.data}
          renderItem={({ item: category, index }) => (
            <DataTable.Row key={category.id}>
              <DataTable.Cell style={{ flex: 3 }}>
                {editedCategoryId === category.id ? (
                  <TextInput
                    mode="outlined"
                    className="w-full h-9"
                    autoFocus
                    onChangeText={(value) => setEditedCategoryName(value)}
                    value={editedCategoryName}
                    dense
                  />
                ) : (
                  category.name
                )}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }} className="justify-center">
                {editedCategoryId === category.id ? (
                  <>
                    <IconButton
                      className="m-0 ml-1"
                      onPress={() =>
                        mutateUpdateCategory({ id: category.id, name: editedCategoryName })
                      }
                      icon={'check-circle'}
                      size={30}
                      iconColor="green"
                      disabled={!editedCategoryName || editedCategoryName === category.name}
                      loading={isUpdatingCategory && editedCategoryId === category.id}
                    />
                    <IconButton
                      className="m-0"
                      onPress={reset}
                      icon={'close-circle'}
                      size={30}
                      iconColor="red"
                      disabled={isUpdatingCategory && editedCategoryId === category.id}
                    />
                  </>
                ) : (
                  <IconButton
                    icon="pencil"
                    iconColor="orange"
                    size={25}
                    onPress={() => {
                      setEditedCategoryId(category.id);
                      setEditedCategoryName(category.name);
                    }}
                    disabled={!!editedCategoryId}
                  />
                )}
              </DataTable.Cell>
              <DataTable.Cell className="justify-center">
                <IconButton
                  icon="delete"
                  iconColor="red"
                  size={25}
                  onPress={() => setDeleteCategory(category)}
                  disabled={!!editedCategoryId || isDeletingCategory}
                  loading={isDeletingCategory && editedCategoryId === category.id}
                />
              </DataTable.Cell>
            </DataTable.Row>
          )}
        />
      </DataTable>
      <Modal
        isVisible={!!deleteCategory}
        isLoading={isDeletingCategory}
        title={t('deleteConfirmModal.title')}
        description={t('deleteConfirmModal.description', {
          name: deleteCategory?.name
        })}
        confirmButtonText={t('deleteConfirmModal.confirmButtonText')}
        onClose={() => {
          setDeleteCategory(null);
        }}
        onConfirm={handleDeleteCategoryConfirm}
      />
    </>
  );
};

export default ManageCategories;
