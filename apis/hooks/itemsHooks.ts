import { useQuery } from 'react-query';
import { getListItemsParams, getListItems } from '../services/itemsService';

export function useGetListItems(params: getListItemsParams, handler?: any) {
  return useQuery('get_list_items', () => getListItems(params), handler);
}