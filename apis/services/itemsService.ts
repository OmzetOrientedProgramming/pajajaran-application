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

export interface updateItemParams {
  item_id: string;
  name: string;
  image: string;
  description: string;
  price: number | string;
}

export const updateItem = async (params: updateItemParams) => {
  const options = {
    headers: {
      Authorization: `Bearer ${nookies.get(null)?.token}`,
      'Content-Type': 'application/json',
    },
  };

  const body = {
    name: params.name,
    image: params.image,
    description: params.description,
    price: parseFloat(params.price as string),
  };

  return await axios.put(
    `${endpoint.businessProfile}/list-items/${params.item_id}`,
    body,
    options
  );
};

export interface createItemParams {
  name: string;
  image: string;
  description: string;
  price: number | string;
}

export const createItem = async (params: createItemParams) => {
  const options = {
    headers: {
      Authorization: `Bearer ${nookies.get(null)?.token}`,
      'Content-Type': 'application/json',
    },
  };

  const body = {
    name: params.name,
    image: params.image,
    description: params.description,
    price: parseFloat(params.price as string),
  };

  return await axios.post(
    `${endpoint.businessProfile}/list-items`,
    body,
    options
  );
};
