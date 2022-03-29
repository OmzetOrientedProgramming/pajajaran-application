import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';

import { headers } from '../../apis/constants';
import endpoint from '../../apis/endpoint';
import DetailBooking from '../../pages/booking/[id]';
import ExampleWrapper from '../../__mocks__/pages/example';
import {
  confirmBookingParams,
  getDetailBookingParams,
  mockConfirmBookingResponse,
  mockGetDetailBookingResponse,
} from '../../__mocks__/apis/detailBookingMocks';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

jest.mock('next/link', () => {
  return ({ children }: any) => {
    return children;
  };
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('useGetDetailBooking()', () => {
  test('page display data requested', async () => {
    mockAxios.get.mockResolvedValueOnce(mockGetDetailBookingResponse);

    render(
      <ExampleWrapper>
        <DetailBooking />
      </ExampleWrapper>
    );

    expect(screen.getByText('Getting data . . .')).toBeInTheDocument();

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${endpoint.detailBooking}/${getDetailBookingParams.id}`,
      { headers: headers }
    );

    await waitFor(() => {
      expect(screen.getByText('22 April 2022')).toBeInTheDocument();
      expect(screen.getByText('Kopi Mocha Asik')).toBeInTheDocument();
    });
  });

  test('page failed to display data requested', async () => {
    mockAxios.get.mockReturnValueOnce(Promise.reject(new Error('get error')));

    render(
      <ExampleWrapper>
        <DetailBooking />
      </ExampleWrapper>
    );

    // await expect(mockAxios.get).rejects.toThrow('get error');
    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(screen.queryByText('22 April 2022')).not.toBeInTheDocument();
      expect(screen.queryByText('Kopi Mocha Asik')).not.toBeInTheDocument();
    });
  });
});

describe('useConfirmBooking()', () => {
  test('confirmation button request works correctly', async () => {
    mockAxios.patch.mockResolvedValueOnce(mockConfirmBookingResponse);

    render(
      <ExampleWrapper>
        <DetailBooking />
      </ExampleWrapper>
    );

    fireEvent.click(screen.getByText('Terima'));

    expect(mockAxios.patch).toHaveBeenCalledTimes(1);
    expect(mockAxios.patch).toHaveBeenCalledWith(
      `${endpoint.detailBooking}/${confirmBookingParams.id}/confirmation`,
      { booking_status: confirmBookingParams.booking_status },
      { headers: headers }
    );

    await waitFor(() => {
      expect(screen.queryByText('Terima')).not.toBeInTheDocument();
    });
  });

  test('confirmation button failed request', async () => {
    mockAxios.patch.mockReturnValueOnce(Promise.reject(new Error('get error')));

    render(
      <ExampleWrapper>
        <DetailBooking />
      </ExampleWrapper>
    );

    fireEvent.click(screen.getByText('Terima'));

    // await expect(mockAxios.get).rejects.toThrow('get error');
    await waitFor(() => {
      expect(mockAxios.patch).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Terima')).toBeInTheDocument();
    });
  });
});
