import axios from 'axios';
import endpoint from '../endpoint';
import { headers } from '../constants';

export interface getListItemsParams {
  limit?: number;
  page?: number;
}

export const getListItems = async (params: getListItemsParams) => {
  const options = {
    headers,
    params: { limit: params.limit, page: params.page },
  };
  return await axios.get(`${endpoint.businessProfile}/list-items`, options);
};
