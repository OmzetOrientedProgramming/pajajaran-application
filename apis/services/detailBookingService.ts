import axios from 'axios';
import endpoint from '../endpoint';
import {headers} from '../constants';
import nookies from "nookies";

export interface getDetailBookingParams {
  id: string;
}

export const getDetailBooking = async ({id}: getDetailBookingParams) => {
  const options = {
    headers: {
      'Authorization': `Bearer ${nookies.get(null)?.token}`,
      'Content-Type': 'application/json',
    }
  };
  return await axios.get(`${endpoint.detailBooking}/${id}`, options);
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
  return await axios.patch(
    `${endpoint.detailBooking}/${id}/confirmation`,
    data,
    options
  );
};
