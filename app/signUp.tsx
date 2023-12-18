import React, { ReactElement } from 'react';
import { Authentication } from '../src/components/Authentication/Authentication';
import { AuthenticationTypeEnum } from '../types/authentication';

const SignUp = (): ReactElement => {
  return <Authentication type={AuthenticationTypeEnum.SIGN_UP} />;
};

export default SignUp;
