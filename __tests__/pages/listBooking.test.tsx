import { cleanup, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ListBooking from '../../pages/booking';
import { mockedResponse } from '../../__mocks__/apis/listBookingMocks';
import ExampleWrapper from '../../__mocks__/pages/example';

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

describe('ui components', () => {
  test('sections title exist', async () => {
    mockAxios.get.mockResolvedValue(mockedResponse);

    render(
      <ExampleWrapper>
        <ListBooking />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Daftar Customer Booking')).toBeInTheDocument();
      expect(screen.getByText('Menunggu Konfirmasi')).toBeInTheDocument();
      expect(screen.getByText('Belum Membayar')).toBeInTheDocument();
      expect(screen.getByText('Booking Berhasil')).toBeInTheDocument();
      expect(screen.getByText('Booking Selesai')).toBeInTheDocument();
      expect(screen.getByText('Booking Gagal')).toBeInTheDocument();
      expect(
        screen.getByText('Booking Selesai & Reviewed')
      ).toBeInTheDocument();
      expect(screen.getByText('Menunggu Konfirmasi')).toBeInTheDocument();
      expect(screen.getByText('previous')).toBeInTheDocument();
      expect(screen.getByText('next')).toBeInTheDocument();
    });
  });
});
