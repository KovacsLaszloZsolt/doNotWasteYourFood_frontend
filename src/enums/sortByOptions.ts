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
  NAME = 'name',
  EXPIRED_DATE = 'expireDate',
  IS_EATEN = 'isEaten'
}

export type SortByKeysType = (typeof SortByKeysEnum)[keyof typeof SortByKeysEnum];
