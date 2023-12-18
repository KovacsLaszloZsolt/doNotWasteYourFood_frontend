import React, { ReactElement } from 'react';
import { Authentication } from '../src/components/Authentication/Authentication';
import { AuthenticationTypeEnum } from '../types/authentication';

const SignIn = (): ReactElement => {
  return <Authentication type={AuthenticationTypeEnum.SIGN_IN} />;
};

export default SignIn;
