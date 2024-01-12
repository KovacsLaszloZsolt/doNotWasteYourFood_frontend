import React, { ReactElement } from 'react';
import { AuthenticationTypeEnum } from '../../types/authentication.type';
import { Authentication } from '../components/Authentication/Authentication';

const SignIn = (): ReactElement => {
  return <Authentication type={AuthenticationTypeEnum.SIGN_IN} />;
};

export default SignIn;
