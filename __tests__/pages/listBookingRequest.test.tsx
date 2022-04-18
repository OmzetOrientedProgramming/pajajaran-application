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
import ExampleWrapper from '../../__mocks__/pages/example';
import {
  listBookingPaginationSuccessResponse,
  mockedResponse,
  getParams,
} from '../../__mocks__/apis/listBookingMocks';
import ListBooking from '../../pages/booking';

// @ts-expect-error
global.IntersectionObserver = class FakeIntersectionObserver {
  observe() {}
  disconnect() {}
};

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
    mockAxios.get.mockResolvedValue(mockedResponse);

    render(
      <ExampleWrapper>
        <ListBooking />
      </ExampleWrapper>
    );

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${endpoint.listBooking}/booking`,
      { headers: headers, params: getParams }
    );

    await waitFor(() => {
      expect(screen.getByText('Sabtu, 18 Juni 2022')).toBeInTheDocument();
      expect(screen.getByText('mock_booking_name_0')).toBeInTheDocument();
    });
  });

  test('change state works correctly', async () => {
    mockAxios.get.mockResolvedValue(mockedResponse);

    render(
      <ExampleWrapper>
        <ListBooking />
      </ExampleWrapper>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('Belum Membayar'));
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(2);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Booking Berhasil'));
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(3);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Booking Selesai'));
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(4);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Booking Gagal'));
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(5);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Booking Selesai & Reviewed'));
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(6);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Menunggu Konfirmasi'));
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(7);
  });

  test('change page buttons work correctly', async () => {
    mockAxios.get.mockResolvedValue(mockedResponse);

    render(
      <ExampleWrapper>
        <ListBooking />
      </ExampleWrapper>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('>'));
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(2);

    await waitFor(() => {
      fireEvent.click(screen.getByText('<'));
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(3);

    await waitFor(() => {
      fireEvent.click(screen.getByText('2'));
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(4);
  });

  test('change page button limit works correctly', async () => {
    mockAxios.get.mockResolvedValue(mockedResponse);

    render(
      <ExampleWrapper>
        <ListBooking />
      </ExampleWrapper>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('>'));
      fireEvent.click(screen.getByText('>'));
      fireEvent.click(screen.getByText('>'));
      fireEvent.click(screen.getByText('>'));
      fireEvent.click(screen.getByText('>'));
    });
    expect(mockAxios.get).toHaveBeenCalled();

    await waitFor(() => {
      fireEvent.click(screen.getByText('<'));
    });
    expect(mockAxios.get).toHaveBeenCalled();
  });
});
