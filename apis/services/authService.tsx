import axios from 'axios';
import endpoint from "../endpoint";
import {headers} from '../constants';

// Login
export interface loginParams {
  email: string;
  password: string;
  recaptchaToken: string;
}

export const login = async ({email, password, recaptchaToken}: loginParams) => {
  const data = {
    email,
    password,
    recaptcha_token: recaptchaToken,
  };
  const options = {
    headers,
  };
  return axios.post(endpoint.login, data, options);
};
