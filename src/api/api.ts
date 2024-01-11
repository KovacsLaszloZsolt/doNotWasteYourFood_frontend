import axios, { InternalAxiosRequestConfig } from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { config } from '../config/config';

const api = axios.create({
  baseURL: `${config.backendUrl}/api/`,
  withCredentials: true
});

const unprotectedApi = axios.create({
  baseURL: `${config.backendUrl}`,
  withCredentials: true
});

api.interceptors.request.use(
  async (axiosConfig: InternalAxiosRequestConfig) => {
    const authToken = await SecureStore.getItemAsync('authToken');

    if (authToken) {
      axiosConfig.headers.Authorization = `Bearer ${authToken}`;
    }
    // const authToken = (axiosConfig.headers.Authorization as string)?.split(' ')[1];

    // if (!isServerSide && prevAuthToken && prevAuthToken !== authToken) {
    //   window.location.reload();
    //   return Promise.reject();
    // }

    // logger.info({
    //   url: axiosConfig.url,
    //   method: axiosConfig.method,
    //   data: axiosConfig.data,
    //   authToken
    // });

    return axiosConfig;
  }
  //   (error) => {
  //     logger.error(error);
  //     Promise.reject(error);
  //   }
);

api.interceptors.response.use(
  (_) => _,
  (error) => {
    if (error.response.status === 401) {
      SecureStore.deleteItemAsync('authToken');
      router.push('/?alert=1');
    }

    return Promise.reject(error);
  }
);

export { api, unprotectedApi };
