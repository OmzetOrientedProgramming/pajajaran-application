import { useQuery } from 'react-query';
import { getDetailProfile } from '../services/detailProfileService';

export function useGetDetailProfile(handler?: any) {
  return useQuery('get_detail_profile', () => getDetailProfile(), handler);
}
