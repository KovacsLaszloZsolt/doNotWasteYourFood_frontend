export enum AuthenticationTypeEnum {
  SIGN_IN = 'signIn',
  SIGN_UP = 'signUp'
}

export type AuthenticationTypeType =
  | AuthenticationTypeEnum.SIGN_IN
  | AuthenticationTypeEnum.SIGN_UP;

export interface FormValues {
  email: string;
  password: string;
  confirmPassword?: string;
}

interface Required {
  value: boolean;
  message: string;
}

interface MinLength {
  value: number;
  message: string;
}

interface Password {
  required: Required;
  minLength: MinLength;
}
export interface Rules {
  email: {
    required: Required;
    pattern: {
      message: string;
      value: RegExp;
    };
  };
  password: Password;
  confirmPassword: Password & { validate: (value: string | undefined) => string | boolean };
}

export interface User {
  blocked: boolean;
  confirmed: boolean;
  createdAt: Date;
  email: string;
  id: number;
  provider: string;
  updatedAt: Date;
  username: string;
}

export interface AuthenticationResponse {
  jwt: string;
  user: User;
}
