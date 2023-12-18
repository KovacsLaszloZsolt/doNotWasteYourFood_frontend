import { config } from '../config/config';

export const createUser = async (data: {
  email: string;
  password: string;
  username: string;
}): Promise<Response> => {
  return fetch(`${config.backendUrl}/api/auth/local/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const getCurrentUser = async (authToken: string): Promise<Response> => {
  return fetch(`${config.backendUrl}/api/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
};

export const loginUser = async (data: {
  identifier: string;
  password: string;
}): Promise<Response> => {
  return fetch(`${config.backendUrl}/api/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};
