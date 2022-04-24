import axios from 'axios';
import endpoint from '../endpoint';
import nookies from 'nookies';

export interface getListItemsParams {
  limit?: number;
  page?: number;
}

export const getListItems = async (params: getListItemsParams) => {
  const options = {
    headers: {
      Authorization: `Bearer ${nookies.get(null)?.token}`,
      'Content-Type': 'application/json',
    },
    params: { limit: params.limit, page: params.page },
  };
  return await axios.get(`${endpoint.businessProfile}/list-items`, options);
};

export interface deleteItemParams {
  item_id: string;
}

export const deleteItem = async (params: deleteItemParams) => {
  const options = {
    headers: {
      Authorization: `Bearer ${nookies.get(null)?.token}`,
      'Content-Type': 'application/json',
    },
  };
  return await axios.delete(
    `${endpoint.businessProfile}/list-items/${params.item_id}`,
    options
  );
};
