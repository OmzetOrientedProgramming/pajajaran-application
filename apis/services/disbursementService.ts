import axios from 'axios';
import endpoint from '../endpoint';
import nookies from 'nookies';

export interface disbursementParams {
  amount: number;
}

export const disbursement = async ({ amount }: disbursementParams) => {
  const data = {
    amount,
  };
  const options = {
    headers: {
      Authorization: `Bearer ${nookies.get(null)?.token}`,
      'Content-Type': 'application/json',
    },
  };
  return axios.post(endpoint.disbursement, data, options);
};
