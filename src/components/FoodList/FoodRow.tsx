import { useQueryClient } from '@tanstack/react-query';
import React, { ReactElement, useCallback, useState } from 'react';
import { Checkbox, DataTable } from 'react-native-paper';
import { Food } from '../../../types/food.type';
import { updateFood } from '../../api/food.api';
import { QueryKeysEnum } from '../../enums/queryKeys';

interface FoodRowProps {
  food: Food;
}

export const FoodRow = ({ food }: FoodRowProps): ReactElement => {
  const [isChecked, setIsChecked] = useState(food.isEaten);
  const queryClient = useQueryClient();

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
      <DataTable.Cell>{food.name}</DataTable.Cell>
      <DataTable.Cell className="justify-center">{food.expireDate.toString()}</DataTable.Cell>
      <DataTable.Cell className="justify-end">
        <Checkbox.Android
          status={isChecked ? 'checked' : 'unchecked'}
          onPress={handleCheckboxPress}
        />
      </DataTable.Cell>
    </DataTable.Row>
  );
};
