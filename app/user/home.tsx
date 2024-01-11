import { useStore } from 'jotai';
import React, { ReactElement } from 'react';
import { FoodExpireToday } from '../../src/components/FoodExpireToday/FoodExpireToday';
import { FoodRecipe } from '../../src/components/FoodRecipe/FoodRecipe';
import { userAtom } from '../../src/store/store';

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
