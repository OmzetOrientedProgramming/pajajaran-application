import { useMutation } from 'react-query';
import { disbursement } from '../services/disbursementService';

export function useDisbursement() {
  return useMutation(disbursement);
}
