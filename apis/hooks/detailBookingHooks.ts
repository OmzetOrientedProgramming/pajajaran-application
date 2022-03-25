import { useQuery } from 'react-query';
import {
  getDetailBooking,
  getDetailBookingParams,
} from '../services/detailBookingService';

export function useGetDetailBooking(
  params: getDetailBookingParams,
  handler?: any
) {
  return useQuery(
    'get_detail_booking',
    () => getDetailBooking(params),
    handler
  );
}
