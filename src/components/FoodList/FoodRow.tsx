import { useQueryClient } from '@tanstack/react-query';
import { compareAsc, format } from 'date-fns';
import { ReactElement, useCallback, useMemo, useState } from 'react';
import { Checkbox, DataTable, Text } from 'react-native-paper';
import { Food } from '../../../types/food.type';
import { updateFood } from '../../api/food.api';
import { QueryKeysEnum } from '../../enums/queryKeys';

interface FoodRowProps {
  food: Food;
}

const date = format(new Date(), 'yyyy-MM-dd');

export const FoodRow = ({ food }: FoodRowProps): ReactElement => {
  const [isChecked, setIsChecked] = useState(food.isEaten);
  const queryClient = useQueryClient();

  const foodDateCompare = useMemo(() => compareAsc(food.expireDate, date), [food.expireDate]);

  const textColor = useMemo(() => {
    return `${foodDateCompare === -1 ? '!text-red-800' : ''}`;
  }, [foodDateCompare]);

  const handleCheckboxPress = useCallback(async (): Promise<void> => {
    try {
      setIsChecked(!isChecked);
      const res = await updateFood({ isEaten: !isChecked, id: food.id });

      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.FOODS] });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(error));
      setIsChecked(food.isEaten);
    }
  }, [food.id, food.isEaten, isChecked, queryClient]);

  return (
    <DataTable.Row key={food.id}>
      <DataTable.Cell>
        <Text className={textColor}>{food.name}</Text>
      </DataTable.Cell>
      <DataTable.Cell className="justify-center">
        <Text className={textColor}>{food.category?.name ?? '-'}</Text>
      </DataTable.Cell>
      <DataTable.Cell className="justify-center">
        <Text className={textColor}>{food.expireDate.toString()}</Text>
      </DataTable.Cell>
      <DataTable.Cell className="justify-end">
        <Checkbox.Android
          status={isChecked ? 'checked' : 'unchecked'}
          onPress={handleCheckboxPress}
        />
      </DataTable.Cell>
    </DataTable.Row>
  );
};
