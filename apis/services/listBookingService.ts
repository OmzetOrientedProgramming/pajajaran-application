import axios from 'axios';
import endpoint from '../endpoint';
import { headers } from '../constants';
import { parseMutationArgs } from 'react-query/types/core/utils';

export interface getListBookingParams {
  state?: number;
  limit?: number;
  page?: number;
}

export const getListBooking = async (params: getListBookingParams) => {
  const options = {
    headers,
    params: { state: params.state, limit: params.limit, page: params.page },
  };
  const response = await axios.get(`${endpoint.listBooking}/booking`, options);
  return response;
};
