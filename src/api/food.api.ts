import { AxiosResponse } from 'axios';
import { Food, FoodBase, IntSortBy } from '../../types/food.type';
import { config } from '../config/config';
import { SortByKeysType, SortByOptions, SortByOptionsShortenEnum } from '../enums/sortByOptions';
import { api } from './api';

export const createFood = async (food: FoodBase): Promise<AxiosResponse<Food>> => {
  return api.post('/foods', { data: food });
};

export const getFoods = async ({
  page,
  pageSize,
  sortBy,
  showAteFood,
  otherFilters
}: {
  page: number;
  pageSize: number;
  sortBy: IntSortBy;
  showAteFood: boolean;
  otherFilters?: string;
}): Promise<AxiosResponse<StrapiFindResponse<Food>>> => {
  let options = showAteFood ? '' : '&filters[isEaten]=false';

  if (otherFilters) options += `${otherFilters}`;
  const [key, value] = Object.entries(sortBy)[0] as [SortByKeysType, SortByOptions];

  return api(
    `${config.backendUrl}/api/foods?sort[0]=${key}:${
      SortByOptionsShortenEnum[value.toUpperCase() as keyof typeof SortByOptionsShortenEnum]
    }${options}` + `&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
};

export const updateFood = async (food: Partial<Food>): Promise<AxiosResponse<number>> => {
  return api.put(`/foods/${food.id}`, { data: food });
  // const authToken = await SecureStore.getItemAsync('authToken');
  // return fetch(`${config.backendUrl}/api/foods/${food.id}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
  //   },
  //   body: JSON.stringify({ data: food })
  // });
};

export const getFoodRecipe = async (ingredients: string[]): Promise<AxiosResponse<unknown>> => {
  return api.get('/foods/recipe');
};
