import { cleanup } from '@testing-library/react';
import axios from 'axios';
import { headers } from '../../apis/constants';
import endpoint from '../../apis/endpoint';
import {
  getDetailBooking,
  confirmBooking,
} from '../../apis/services/detailBookingService';
import {
  confirmBookingParams,
  dummyConfirmBookingResponse,
  dummyGetDetailBookingResponse,
  getDetailBookingParams,
  mockConfirmBookingResponse,
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

    expect(mockAxios.get).not.toHaveBeenCalled();
    const data = await getDetailBooking(getDetailBookingParams);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${endpoint.detailBooking}/${getDetailBookingParams.id}`,
      { headers: headers }
    );
    expect(data.data).toEqual(dummyGetDetailBookingResponse);
  });
});

describe('confirmBooking()', () => {
  test('confirmBooking works correctly', async () => {
    mockAxios.patch.mockResolvedValueOnce(mockConfirmBookingResponse);

    expect(mockAxios.patch).not.toHaveBeenCalled();
    const data = await confirmBooking(confirmBookingParams);

    expect(mockAxios.patch).toHaveBeenCalledTimes(1);
    expect(mockAxios.patch).toHaveBeenCalledWith(
      `${endpoint.detailBooking}/${confirmBookingParams.id}/confirmation`,
      { status: confirmBookingParams.booking_status },
      { headers: headers }
    );
    expect(data.data).toEqual(dummyConfirmBookingResponse);
  });
});
