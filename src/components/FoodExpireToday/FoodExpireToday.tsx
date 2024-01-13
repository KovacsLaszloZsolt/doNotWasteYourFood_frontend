import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { isEmpty } from 'lodash';
import { ReactElement, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
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
    <Surface elevation={4} className="m-2 p-2 rounded-2xl">
      {isFetching || isLoading ? (
        <ActivityIndicator animating />
      ) : (
        <View>
          <Text variant="headlineSmall" className="text-center">
            {t('foodsExpireToday')}
          </Text>
          <IconButton
            icon={`chevron-${isOpen ? 'up' : 'down'}-circle-outline`}
            iconColor="black"
            size={24}
            onPress={() => setIsOpen((prev) => !prev)}
            className="absolute -top-2 -right-2"
          />
          {isOpen && (
            <View className="flex-row gap-2 flex-wrap mt-4">
              {isEmpty(foodsExpireToday) ? (
                <View className="w-full items-center">
                  <Text>{t('noFoodExpireToday')}</Text>
                </View>
              ) : (
                foodsExpireToday?.map((food) => (
                  <Chip key={food.id} mode="flat" compact elevated className="bg-slate-400">
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
