import { SortByOptions } from '../src/enums/sortByOptions';

export interface FoodBase {
  name: string;
  expireDate: Date;
}

export interface Food extends FoodBase {
  id: string;
  isEaten: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IntSortBy {
  expireDate?: SortByOptions;
  name?: SortByOptions;
  isEaten?: SortByOptions;
}
