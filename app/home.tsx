import { useStore } from 'jotai';
import React, { ReactElement } from 'react';
import { Text } from 'react-native-paper';
import { userAtom } from '../src/store/store';

const Home = (): ReactElement => {
  const user = useStore().get(userAtom);

  return user ? <Text>user</Text> : <></>;
};

export default Home;
