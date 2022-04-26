import { useQuery } from 'react-query';
import {
  getDetailTransactionHistory,
  getDetailTransactionHistoryParams,
} from '../services/detailTransactionHistoryService';

export function useGetDetailTransactionHistory(
  params: getDetailTransactionHistoryParams,
  handler?: any
) {
  return useQuery(
    'get_detail_transaction_history',
    () => getDetailTransactionHistory(params),
    handler
  );
}

// export function useConfirmBooking() {
//   return useMutation(confirmBooking);
// }