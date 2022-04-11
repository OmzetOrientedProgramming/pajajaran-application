import { AxiosResponse } from 'axios';

// Login
export const dummyLoginResponse = {
  status: 200,
  message: 'Login berhasil',
  data: {
    access_token: 'test access token',
    refresh_token: 'test refresh token',
  },
};

export const dummyLogin400Response = {
  status: 400,
  message: 'bad request',
};

export const mockLoginResponse: AxiosResponse = {
  data: dummyLoginResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const mockLogin400Response: AxiosResponse = {
  data: dummyLogin400Response,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const loginParams = {
  email: 'test@email.com',
  password: 'mockpass',
  recaptchaToken: 'randomtoken',
};
