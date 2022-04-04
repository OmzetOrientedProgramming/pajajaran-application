import { useQuery } from 'react-query';
import { getBalanceInformation } from '../services/balanceInformationService';

export function useGetBalanceInformation( handler?: any ) {
  return useQuery('get_balance_information', () => getBalanceInformation(), handler );
}
