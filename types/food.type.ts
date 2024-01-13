import { SortByOptions } from '../src/enums/sortByOptions';

export interface FoodBase {
  name: string;
  expireDate: Date;
  category?: number;
}

export interface Food extends Omit<FoodBase, 'category'> {
  id: string;
  category?: Category;
  isEaten: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IntSortBy {
  category?: SortByOptions;
  expireDate?: SortByOptions;
  isEaten?: SortByOptions;
  name?: SortByOptions;
}
