import {
  FetchNextPageOptions,
  FetchPreviousPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Food, IntSortBy } from '../../../types/food.type';
import { getFoods } from '../../api/food.api';
import { QueryKeysEnum } from '../../enums/queryKeys';
import { SortByKeysType, SortByOptionsEnum } from '../../enums/sortByOptions';

interface UseFoodList {
  foodsData: InfiniteData<AxiosResponse<StrapiFindResponse<Food>, unknown>, unknown> | undefined;
  from: number;
  isFetching: boolean;
  itemsPerPage: number;
  numberOfFoods: number;
  numberOfItemsPerPageList: number[];
  page: number;
  showAteFood: boolean;
  sortBy: IntSortBy;
  to: number;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<AxiosResponse<StrapiFindResponse<Food>, unknown>, unknown>,
      Error
    >
  >;
  fetchPreviousPage: (
    options?: FetchPreviousPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<AxiosResponse<StrapiFindResponse<Food>, unknown>, unknown>,
      Error
    >
  >;
  handleSortByOnPress: (key: SortByKeysType) => void;
  onItemsPerPageChange: Dispatch<SetStateAction<number>>;
  onShowAteFoodSwitch: () => void;
  setPage: Dispatch<SetStateAction<number>>;
}

export const useFoodList = (): UseFoodList => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([10, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const [showAteFood, setShowAteFood] = useState(true);
  const [sortBy, setSortBy] = useState<IntSortBy>({ expireDate: SortByOptionsEnum.ASCENDING });

  const onShowAteFoodSwitch = (): void => setShowAteFood((previousState) => !previousState);

  const handleSortByOnPress = (key: SortByKeysType): void => {
    if (sortBy[key]) {
      if (sortBy[key] === SortByOptionsEnum.ASCENDING) {
        setSortBy({ [key]: SortByOptionsEnum.DESCENDING });
      } else {
        setSortBy({ [key]: SortByOptionsEnum.ASCENDING });
      }

      return;
    }

    setSortBy({ [key]: SortByOptionsEnum.ASCENDING });
  };

  const {
    data: foodsData,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage
  } = useInfiniteQuery({
    queryKey: [QueryKeysEnum.FOODS, itemsPerPage, sortBy, showAteFood],
    queryFn: async ({ pageParam: page }) =>
      getFoods({ page, pageSize: itemsPerPage, sortBy, showAteFood }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.data.data.length !== itemsPerPage) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    }
  });

  const numberOfFoods = useMemo(
    () => foodsData?.pages[0].data.meta.pagination.total ?? 0,
    [foodsData?.pages]
  );

  const from = useMemo(() => page * itemsPerPage + 1, [page, itemsPerPage]);
  const to = useMemo(
    () => Math.min((page + 1) * itemsPerPage, numberOfFoods),
    [itemsPerPage, numberOfFoods, page]
  );

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage, showAteFood]);

  return {
    foodsData,
    from,
    isFetching: isFetchingNextPage || isFetchingPreviousPage,
    itemsPerPage,
    numberOfFoods,
    numberOfItemsPerPageList,
    page,
    showAteFood,
    sortBy,
    to,
    fetchNextPage,
    fetchPreviousPage,
    handleSortByOnPress,
    onItemsPerPageChange,
    onShowAteFoodSwitch,
    setPage
  };
};
