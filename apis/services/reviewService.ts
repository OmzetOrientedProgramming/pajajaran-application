import axios from 'axios';
import endpoint from '../endpoint';
import nookies from 'nookies';

export interface getReviewParams {
  limit?: number;
  page?: number;
}

export const getReview = async (params: getReviewParams) => {
  const options = {
    headers: {
      Authorization: `Bearer ${nookies.get(null)?.token}`,
      'Content-Type': 'application/json',
    },
    params: { limit: params.limit, page: params.page },
  };
  console.log('page service:', params.page);
  return await axios.get(`${endpoint.businessProfile}/review`, options);
};
