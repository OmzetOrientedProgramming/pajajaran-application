import { useQuery } from 'react-query';
import {
  getListBookingParams,
  getListBooking,
} from '../services/listBookingService';

export function useGetListBooking(params: getListBookingParams, handler?: any) {
  return useQuery('get_detail_booking', () => getListBooking(params), handler);
}
