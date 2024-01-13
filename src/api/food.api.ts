import { AxiosResponse } from 'axios';
import { StrapiMultiResponse, StrapiSingleResponse } from '../../types/common.type';
import { Category, Food, FoodBase, IntSortBy } from '../../types/food.type';
import {
  SortByKeysEnum,
  SortByKeysType,
  SortByOptions,
  SortByOptionsShortenEnum
} from '../enums/sortByOptions';
import { api } from './api';

export const createFood = async (
  food: FoodBase
): Promise<AxiosResponse<StrapiSingleResponse<Food>>> => {
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
}): Promise<AxiosResponse<StrapiMultiResponse<Food>>> => {
  let options = showAteFood ? '' : '&filters[isEaten]=false';

  if (otherFilters) options += `${otherFilters}`;
  const [key, value] = Object.entries(sortBy)[0] as [SortByKeysType, SortByOptions];

  return api(
    `/foods?populate[0]=category&sort[0]=${key}${key === SortByKeysEnum.CATEGORY ? '.name' : ''}:${
      SortByOptionsShortenEnum[value.toUpperCase() as keyof typeof SortByOptionsShortenEnum]
    }${options}` + `&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
};

export const updateFood = async (food: Partial<Food>): Promise<AxiosResponse<number>> => {
  return api.put(`/foods/${food.id}`, { data: food });
};

export const getFoodRecipe = async (ingredients: string[]): Promise<AxiosResponse<unknown>> => {
  return api.get('/foods/recipe');
};

export const getCategories = async (): Promise<AxiosResponse<StrapiMultiResponse<Category>>> => {
  return api('/categories?sort[0]=name:ASC');
};

export const createCategory = async (
  category: Pick<Category, 'name'>
): Promise<AxiosResponse<StrapiSingleResponse<Category>>> => {
  return api.post('/categories', { data: category });
};
