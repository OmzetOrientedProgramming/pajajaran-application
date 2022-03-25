import axios from 'axios';
import endpoint from '../endpoint';
import { headers } from '../constants';

export interface getDetailBookingParams {
  id: string;
}

export const getDetailBooking = async ({ id }: getDetailBookingParams) => {
  const options = {
    headers,
  };
  const response = await axios.get(`${endpoint.detailBooking}/${id}`, options);
  return response;
};
