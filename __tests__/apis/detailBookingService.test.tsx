import { cleanup } from '@testing-library/react';
import axios from 'axios';
import { headers } from '../../apis/constants';
import endpoint from '../../apis/endpoint';
import { getDetailBooking } from '../../apis/services/detailBookingService';
import {
  dummyGetDetailBookingResponse,
  getDetailBookingParams,
  mockGetDetailBookingResponse,
} from '../../__mocks__/apis/detailBookingMocks';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('getDetailBooking()', () => {
  test('getDetailBooking works correctly', async () => {
    mockAxios.get.mockResolvedValueOnce(mockGetDetailBookingResponse);

    expect(mockAxios.post).not.toHaveBeenCalled();
    const data = await getDetailBooking(getDetailBookingParams);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${endpoint.detailBooking}/${getDetailBookingParams.id}`,
      { headers: headers }
    );
    expect(data.data).toEqual(dummyGetDetailBookingResponse);
  });
});
