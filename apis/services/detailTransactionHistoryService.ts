import axios from 'axios';
import endpoint from '../endpoint';
import nookies from 'nookies';

export interface getDetailTransactionHistoryParams {
  id: string;
}

export const getDetailTransactionHistory = async ({
  id,
}: getDetailTransactionHistoryParams) => {
  const options = {
    headers: {
      Authorization: `Bearer ${nookies.get(null)?.token}`,
      'Content-Type': 'application/json',
    },
  };
  return await axios.get(`${endpoint.transactionHistory}/${id}`, options);
};
