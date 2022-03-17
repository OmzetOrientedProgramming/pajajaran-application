import { useMutation, useQuery } from 'react-query';
import {
  getExample,
  getExampleParams,
  postExample,
} from '../services/exampleService';

export function useGetExample(params: getExampleParams, handler?: any) {
  return useQuery('get_example', () => getExample(params), handler);
}

export function usePostExample() {
  return useMutation(postExample);
}
