import { useQuery } from 'react-query';
import {
  getTransactionHistoryParams,
  getTransactionHistory,
} from '../services/transactionHistoryService';

export function useGetTransactionHistory(
  params: getTransactionHistoryParams,
  handler?: any
) {
  return useQuery(
    'get_transaction_history',
    () => getTransactionHistory(params),
    handler
  );
}
