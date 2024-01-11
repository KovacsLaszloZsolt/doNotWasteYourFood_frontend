import React, { ReactElement } from 'react';
import { Button } from 'react-native-paper';
import { getFoodRecipe } from '../../api/food.api';

export const FoodRecipe = (): ReactElement => {
  const handleOnPress = async (): Promise<void> => {
    const res = await getFoodRecipe(['beef meat', 'rice', 'vegetables']);
    // console.log({ res });
  };
  return <Button onPress={handleOnPress}>Get recipe</Button>;
};
