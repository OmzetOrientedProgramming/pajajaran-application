import { AxiosResponse } from 'axios';

// Login
export const dummyLoginResponse = {
  status: 200,
  message: 'Login berhasil',
  data: {
    access_token: "test access token",
    refresh_token: "test refresh token",
  }
};

export const mockLoginResponse: AxiosResponse = {
  data: dummyLoginResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const loginParams = {
  email: 'test@email.com',
  password: 'mockpass',
  recaptchaToken: 'randomtoken'
};
