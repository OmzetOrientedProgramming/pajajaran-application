import { useMutation, useQuery } from 'react-query';
import {
  getListItemsParams,
  getListItems,
  deleteItem,
  updateItem,
  createItem,
} from '../services/itemsService';

export function useGetListItems(params: getListItemsParams, handler?: any) {
  return useQuery('get_list_items', () => getListItems(params), handler);
}

export function useDeleteItem() {
  return useMutation(deleteItem);
}

export function useUpdateItem() {
  return useMutation(updateItem);
}

export function useCreateItem() {
  return useMutation(createItem);
}
