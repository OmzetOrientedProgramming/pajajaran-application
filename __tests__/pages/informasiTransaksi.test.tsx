import { cleanup, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import InformasiTransaksi from '../../pages/transaction-information/index';
import {
  mockGetBalanceInformationResponse,
  mockGetBalanceInformationEmptyResponse,
} from '../../__mocks__/apis/balanceInformationMocks';
import { mockedResponse } from '../../__mocks__/apis/transactionHistoryMocks';
import ExampleWrapper from '../../__mocks__/pages/example';

jest.setTimeout(50000);

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
  test('get request fulfilled', async () => {
    mockAxios.get.mockResolvedValueOnce(mockGetBalanceInformationResponse);
    mockAxios.get.mockResolvedValueOnce(mockedResponse);

    render(
      <ExampleWrapper>
        <InformasiTransaksi />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Saldo')).toBeInTheDocument();
      expect(screen.getByText('Terakhir dicairkan:')).toBeInTheDocument();
      expect(screen.getByText('Riwayat Transaksi')).toBeInTheDocument();
      expect(screen.getByText('Lihat Semua')).toBeInTheDocument();
    });
  });

  test('get request failed', async () => {
    mockAxios.get.mockReturnValueOnce(Promise.reject(new Error('get error')));

    render(
      <ExampleWrapper>
        <InformasiTransaksi />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.queryByText('Saldo')).not.toBeInTheDocument();
      expect(screen.queryByText('Terakhir dicairkan:')).not.toBeInTheDocument();
    });
  });

  test('get request with empty balance', async () => {
    mockAxios.get.mockResolvedValueOnce(mockGetBalanceInformationResponse);
    mockAxios.get.mockResolvedValueOnce(mockedResponse);

    render(
      <ExampleWrapper>
        <InformasiTransaksi />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Saldo')).toBeInTheDocument();
      expect(screen.getByText('Terakhir dicairkan:')).toBeInTheDocument();
    });
  });
});
