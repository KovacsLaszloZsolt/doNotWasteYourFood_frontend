import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { isEmpty } from 'lodash';
import { ReactElement, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Chip, IconButton, Surface, Text } from 'react-native-paper';
import { getFoods } from '../../api/food.api';
import { QueryKeysEnum } from '../../enums/queryKeys';
import { SortByOptionsEnum } from '../../enums/sortByOptions';

export const FoodExpireToday = (): ReactElement => {
  const { t } = useTranslation('home');
  const {
    data: resData,
    isFetching,
    isLoading
  } = useQuery({
    queryKey: [QueryKeysEnum.FOODS_EXPIRE_TODAY],
    queryFn: async () =>
      getFoods({
        page: 1,
        pageSize: 10,
        sortBy: { name: SortByOptionsEnum.ASCENDING },
        showAteFood: false,
        otherFilters: `&filters[expireDate][$eq]=${format(new Date(), 'yyyy-MM-dd')}&fields[0]=name`
      })
  });

  const foodsExpireToday = useMemo(() => resData?.data.data, [resData]);

  const [isOpen, setIsOpen] = useState(true);
  return (
    <Surface elevation={4} style={{ margin: 8, padding: 8, borderRadius: 16 }}>
      {isFetching || isLoading ? (
        <ActivityIndicator animating />
      ) : (
        <View>
          <Text variant="headlineSmall" style={styles.title}>
            {t('foodsExpireToday')}
          </Text>
          <IconButton
            icon={`chevron-${isOpen ? 'up' : 'down'}-circle-outline`}
            iconColor="black"
            size={24}
            onPress={() => setIsOpen((prev) => !prev)}
            style={styles.indicatorButton}
          />
          {isOpen && (
            <View style={styles.foodsContainer}>
              {isEmpty(foodsExpireToday) ? (
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <Text>{t('noFoodExpireToday')}</Text>
                </View>
              ) : (
                foodsExpireToday?.map((food) => (
                  <Chip
                    key={food.id}
                    mode="flat"
                    compact
                    elevated
                    style={{ backgroundColor: 'red' }}
                  >
                    {food.name}
                  </Chip>
                ))
              )}
            </View>
          )}
        </View>
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  title: { textAlign: 'center' },
  indicatorButton: { position: 'absolute', right: -8, top: -8 },
  foodsContainer: { flexDirection: 'row', gap: 5, flexWrap: 'wrap', marginTop: 16 }
});
