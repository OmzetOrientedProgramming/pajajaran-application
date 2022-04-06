import axios from 'axios';
import endpoint from '../endpoint';
import nookies from "nookies";

export interface getListBookingParams {
  state?: number;
  limit?: number;
  page?: number;
}

export const getListBooking = async (params: getListBookingParams) => {
  const options = {
    headers: {
      'Authorization': `Bearer ${nookies.get(null)?.token}`,
      'Content-Type': 'application/json',
    },
    params: {state: params.state, limit: params.limit, page: params.page},
  };
  return await axios.get(`${endpoint.listBooking}/booking`, options);
};
