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

export interface confirmBookingParams {
  id: string;
  booking_status: number;
}

export const confirmBooking = async ({
  id,
  booking_status,
}: confirmBookingParams) => {
  const options = {
    headers,
  };
  const data = {
    status: booking_status,
  };
  const response = await axios.patch(
    `${endpoint.detailBooking}/${id}/confirmation`,
    data,
    options
  );
  return response;
};
