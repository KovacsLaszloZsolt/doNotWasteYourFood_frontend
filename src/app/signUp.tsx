import React, { ReactElement } from 'react';
import { AuthenticationTypeEnum } from '../../types/authentication.type';
import { Authentication } from '../components/Authentication/Authentication';

const SignUp = (): ReactElement => {
  return <Authentication type={AuthenticationTypeEnum.SIGN_UP} />;
};

export default SignUp;
