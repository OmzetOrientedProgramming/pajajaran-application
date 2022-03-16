import { AxiosResponse } from 'axios';

// Dummy GET data response
export const dummyGetExampleResponse = {
  status: 201,
  message: 'success',
  data: [
    { name: 'Abik', age: 13 },
    { name: 'Babik', age: 52 },
    { name: 'Cabik', age: 90 },
  ],
};

// Necessary for wrapped axios response
export const mockGetExampleResponse: AxiosResponse = {
  data: dummyGetExampleResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

// Params example
export const getExampleParams = {
  id: '1',
  page: 2,
};

// Dummy POST data response
export const dummyPostExampleResponse = {
  status: 200,
  message: 'success',
};

// Necessary for wrapped axios response
export const mockPostExampleResponse: AxiosResponse = {
  data: dummyPostExampleResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

// Params example
export const postExampleParams = {
  name: 'budi',
  job: 'softeng',
};
