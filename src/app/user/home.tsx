import { useStore } from 'jotai';
import React, { ReactElement } from 'react';
import { FoodExpireToday } from '../../components/FoodExpireToday/FoodExpireToday';
import { FoodRecipe } from '../../components/FoodRecipe/FoodRecipe';
import { userAtom } from '../../store/store';

const Home = (): ReactElement => {
  const user = useStore().get(userAtom);

  return user ? (
    <>
      <FoodExpireToday />
      <FoodRecipe />
    </>
  ) : (
    <></>
  );
};

export default Home;
