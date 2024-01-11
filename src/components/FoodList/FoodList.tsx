import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, DataTable, MD2Colors, Switch, Text } from 'react-native-paper';
import { SortByKeysEnum } from '../../enums/sortByOptions';
import { FoodRow } from './FoodRow';
import { useFoodList } from './useFoodList';

export const FoodList = (): ReactElement => {
  const { t } = useTranslation('foods');

  const {
    foodsData,
    from,
    isFetching,
    itemsPerPage,
    numberOfFoods,
    numberOfItemsPerPageList,
    page,
    showAteFood,
    sortBy,
    to,
    fetchNextPage,
    fetchPreviousPage,
    handleSortByOnPress,
    onItemsPerPageChange,
    onShowAteFoodSwitch,
    setPage
  } = useFoodList();
  return (
    <>
      {isFetching ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        </View>
      ) : (
        <ScrollView>
          <DataTable style={styles.dataTable}>
            <DataTable.Row style={{ alignItems: 'flex-end' }}>
              <Pressable
                style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
              >
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
            <DataTable.Header>
              <DataTable.Title
                sortDirection={sortBy[SortByKeysEnum.NAME]}
                onPress={() => handleSortByOnPress(SortByKeysEnum.NAME)}
              >
                {t('name')}
              </DataTable.Title>
              <DataTable.Title
                sortDirection={sortBy[SortByKeysEnum.EXPIRED_DATE]}
                style={styles.header}
                onPress={() => handleSortByOnPress(SortByKeysEnum.EXPIRED_DATE)}
              >
                {t('expireDate')}
              </DataTable.Title>
              <DataTable.Title
                style={styles.lastHeader}
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

const styles = StyleSheet.create({
  dataTable: {
    flex: 1
  },
  header: {
    justifyContent: 'center'
  },
  lastHeader: {
    justifyContent: 'flex-end',
    paddingRight: 8
  }
});
