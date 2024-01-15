import { useAtom } from 'jotai';
import React, { ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, View } from 'react-native';
import { ActivityIndicator, DataTable, MD2Colors, Switch, Text } from 'react-native-paper';
import { SortByKeysEnum } from '../../enums/sortByOptions';
import { appLocaleAtom } from '../../store/store';
import { FoodRow } from './FoodRow';
import { useFoodList } from './useFoodList';

export const FoodList = (): ReactElement => {
  const { t } = useTranslation('foods');
  const [appLocale] = useAtom(appLocaleAtom);

  const isAppLocaleEn = useMemo(() => appLocale === 'en', [appLocale]);
  const isAppLocaleHu = useMemo(() => appLocale === 'hu', [appLocale]);

  const {
    foodsData,
    from,
    isFetching,
    itemsPerPage,
    numberOfFoods,
    numberOfItemsPerPageList,
    page,
    showAteFood,
    showExpiredFood,
    sortBy,
    to,
    fetchNextPage,
    fetchPreviousPage,
    handleSortByOnPress,
    onItemsPerPageChange,
    onShowAteFoodSwitch,
    onShowExpiredFoodSwitch,
    setPage
  } = useFoodList();

  return (
    <>
      {isFetching ? (
        <View className="flex-1 justify-center">
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        </View>
      ) : (
        <ScrollView>
          <DataTable className="flex-1">
            <DataTable.Row className={`${isAppLocaleHu ? 'items-end' : ''}`}>
              <Pressable
                className={`flex-row justify-end items-center ${isAppLocaleEn ? 'mr-auto' : ''}`}
              >
                <Text>{t('showExpiredFoods')}</Text>
                <Switch
                  style={{
                    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                  }}
                  value={showExpiredFood}
                  onValueChange={onShowExpiredFoodSwitch}
                />
              </Pressable>
              {isAppLocaleEn && (
                <Pressable className="justify-end flex-row items-center">
                  <Text>{t('showAteFoods')}</Text>
                  <Switch
                    style={{
                      transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                    }}
                    value={showAteFood}
                    onValueChange={onShowAteFoodSwitch}
                  />
                </Pressable>
              )}
            </DataTable.Row>
            {isAppLocaleHu && (
              <DataTable.Row className="items-end">
                <Pressable className="justify-end flex-row items-center">
                  <Text>{t('showAteFoods')}</Text>
                  <Switch
                    style={{
                      transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                    }}
                    value={showAteFood}
                    onValueChange={onShowAteFoodSwitch}
                  />
                </Pressable>
              </DataTable.Row>
            )}
            <DataTable.Header>
              <DataTable.Title
                sortDirection={sortBy[SortByKeysEnum.NAME]}
                onPress={() => handleSortByOnPress(SortByKeysEnum.NAME)}
              >
                {t('name')}
              </DataTable.Title>
              <DataTable.Title
                className="justify-center"
                sortDirection={sortBy[SortByKeysEnum.CATEGORY]}
                onPress={() => handleSortByOnPress(SortByKeysEnum.CATEGORY)}
              >
                {t('category')}
              </DataTable.Title>
              <DataTable.Title
                className="justify-center"
                sortDirection={sortBy[SortByKeysEnum.EXPIRED_DATE]}
                onPress={() => handleSortByOnPress(SortByKeysEnum.EXPIRED_DATE)}
              >
                {t('expireDate')}
              </DataTable.Title>
              <DataTable.Title
                className="justify-end pr-2"
                sortDirection={sortBy[SortByKeysEnum.IS_EATEN]}
                onPress={() => handleSortByOnPress(SortByKeysEnum.IS_EATEN)}
              >
                {t('ate')}
              </DataTable.Title>
            </DataTable.Header>

            {foodsData?.pages[page]?.data.data.map((food) => <FoodRow key={food.id} food={food} />)}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(numberOfFoods / itemsPerPage)}
              onPageChange={(newPage) => {
                if (newPage > page) {
                  fetchNextPage();
                }

                if (newPage < page) {
                  fetchPreviousPage();
                }
                setPage(newPage);
              }}
              label={`${from}-${to} of ${numberOfFoods}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={t('rowsPerPage')}
            />
          </DataTable>
        </ScrollView>
      )}
    </>
  );
};
