import { cleanup } from '@testing-library/react';
import axios from 'axios';
import { headers } from '../../apis/constants';
import endpoint from '../../apis/endpoint';
import { getListBooking } from '../../apis/services/listBookingService';
import {
  listBookingPaginationSuccessResponse,
  mockedResponse,
  getParams,
} from '../../__mocks__/apis/listBookingMocks';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('getListCustomerBooking()', () => {
  test('getListCustomerBooking return correct data', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);

    expect(mockedAxios.post).not.toHaveBeenCalled();
    const data = await getListBooking(getParams);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${endpoint.listBooking}/booking`,
      { headers: headers, params: { state: 0, limit: 5, page: 1 } }
    );
    expect(data).toEqual(mockedResponse);
  });
});
