import axios from 'axios';
import endpoint from '../endpoint';
import nookies from 'nookies';

export const getDetailProfile = async () => {
  const options = {
    headers: {
      Authorization: `Bearer ${nookies.get(null)?.token}`,
      'Content-Type': 'application/json',
    },
  };
  return await axios.get(`${endpoint.businessProfile}/detail`, options);
};
