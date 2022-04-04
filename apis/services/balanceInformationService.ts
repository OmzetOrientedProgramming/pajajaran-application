import axios from 'axios';
import endpoint from '../endpoint';
import { headers } from '../constants';

export const getBalanceInformation = async () => {
  const options = {
    headers,
  };
  const response = await axios.get(`${endpoint.balanceInformation}`, options);
  return response;
};