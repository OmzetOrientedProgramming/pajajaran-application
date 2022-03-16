import { cleanup } from '@testing-library/react';
import axios from 'axios';
import { headers } from '../../requests/constants';
import endpoint from '../../requests/endpoint';
import {
  getExample,
  postExample,
} from '../../requests/services/exampleService';
import {
  dummyGetExampleResponse,
  dummyPostExampleResponse,
  getExampleParams,
  mockGetExampleResponse,
  mockPostExampleResponse,
  postExampleParams,
} from '../../__mocks__/requests/exampleMocks';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('getExample()', () => {
  test('getExample works correctly', async () => {
    mockAxios.get.mockResolvedValueOnce(mockGetExampleResponse);

    expect(mockAxios.post).not.toHaveBeenCalled();
    const data = await getExample(getExampleParams);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${endpoint.example}/${getExampleParams.id}`,
      { headers: headers, params: { page: getExampleParams.page } }
    );
    expect(data.data).toEqual(dummyGetExampleResponse);
  });
});

describe('postExample()', () => {
  test('postExample works correctly', async () => {
    mockAxios.post.mockResolvedValueOnce(mockPostExampleResponse);

    expect(mockAxios.post).not.toHaveBeenCalled();
    const data = await postExample(postExampleParams);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      endpoint.example,
      { name: postExampleParams.name, job: postExampleParams.job },
      { headers }
    );
    expect(data.data).toEqual(dummyPostExampleResponse);
  });
});
