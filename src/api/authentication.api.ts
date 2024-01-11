import { AxiosResponse } from 'axios';
import Constants from 'expo-constants';
import { AuthenticationResponse, User } from '../../types/authentication.type';
import { api, unprotectedApi } from './api';

const { manifest2 } = Constants;
// const api = 'http://192.168.10.142:1337';

export const createUser = async (data: {
  email: string;
  password: string;
  username: string;
}): Promise<AxiosResponse<AuthenticationResponse>> => {
  return unprotectedApi.post('/api/auth/local/register', data);
};

export const getCurrentUser = async (): Promise<AxiosResponse<User>> => {
  return api('users/me');
};

export const loginUser = async (data: {
  identifier: string;
  password: string;
}): Promise<AxiosResponse<AuthenticationResponse>> => {
  return unprotectedApi.post('/api/auth/local', data);
};
