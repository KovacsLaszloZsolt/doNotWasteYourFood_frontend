export interface StrapiMultiResponse<T> {
  data: T[];
  meta: Meta;
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Meta;
}

interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface DropdownOption<T> {
  label: string;
  value: T;
}
