import { useMutation, useQuery } from 'react-query';
import {
  confirmBooking,
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

export function useConfirmBooking() {
  return useMutation(confirmBooking);
}
