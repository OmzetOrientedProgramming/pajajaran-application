import { useQuery } from 'react-query';
import { getReview, getReviewParams } from '../services/reviewService';

export function useGetReview(params: getReviewParams, handler?: any) {
  return useQuery('get_review', () => getReview(params), handler);
}
