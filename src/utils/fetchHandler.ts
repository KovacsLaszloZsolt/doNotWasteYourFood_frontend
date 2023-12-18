import { CustomError } from './customError';

export const fetchHandler = async <T>(response: Promise<Response>): Promise<T> => {
  const res = await response;
  if (!res.ok) {
    const { status, statusText } = res;
    if (status === 401) {
      throw new Error('__UNAUTHORIZED__');
    } else {
      throw new CustomError(statusText, status);
    }
  }

  const data = await res.json();

  return data;
};
