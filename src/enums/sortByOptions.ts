export enum SortByOptionsEnum {
  ASCENDING = 'ascending',
  DESCENDING = 'descending'
}

export enum SortByOptionsShortenEnum {
  ASCENDING = 'asc',
  DESCENDING = 'desc'
}

export type SortByOptions = (typeof SortByOptionsEnum)[keyof typeof SortByOptionsEnum];

export enum SortByKeysEnum {
  CATEGORY = 'category',
  EXPIRED_DATE = 'expireDate',
  IS_EATEN = 'isEaten',
  NAME = 'name'
}

export type SortByKeysType = (typeof SortByKeysEnum)[keyof typeof SortByKeysEnum];
