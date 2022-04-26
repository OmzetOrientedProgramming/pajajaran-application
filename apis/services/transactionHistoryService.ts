import axios from 'axios';
import endpoint from '../endpoint';
import nookies from 'nookies';

export interface getTransactionHistoryParams {
  limit?: number;
  page?: number;
}

export const getTransactionHistory = async (
  params: getTransactionHistoryParams
) => {
  const options = {
    headers: {
      Authorization: `Bearer ${nookies.get(null)?.token}`,
      'Content-Type': 'application/json',
    },
    params: { limit: params.limit, page: params.page },
  };
  return await axios.get(`${endpoint.transactionHistory}`, options);
};
