import axios from 'axios';
import endpoint from '../endpoint';
import { headers } from '../constants';

// GET request example with path param & query param
export interface getExampleParams {
  id: string;
  page: number;
}

export const getExample = async ({ id, page }: getExampleParams) => {
  const options = {
    headers,
    // query param '...?page='
    params: {
      page,
    },
  };
  const response = await axios.get(`${endpoint.example}/${id}`, options); // path param '../id'
  return response;
};

// POST request example with body param
export interface postExampleParams {
  name: string;
  job: string;
}

export const postExample = async ({ name, job }: postExampleParams) => {
  const options = {
    headers,
  };
  // body params
  const data = {
    name,
    job,
  };
  const response = await axios.post(endpoint.example, data, options);
  return response;
};
