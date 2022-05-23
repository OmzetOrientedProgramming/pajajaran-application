import { cleanup, render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import DetailTrasactionHistory from '../../pages/transaction-history/[id]';
import { mockGetDetailTransactionHistoryResponse } from '../../__mocks__/apis/detailTransactionHistoryMocks';
import ExampleWrapper from '../../__mocks__/pages/example';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

jest.mock('next/link', () => {
  return ({ children }: any) => {
    return children;
  };
});

beforeAll(() => {
  console.warn = jest.fn();
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('ui components', () => {
  test('sections title exist', async () => {
    mockAxios.get.mockResolvedValue(mockGetDetailTransactionHistoryResponse);

    render(
      <ExampleWrapper>
        <DetailTrasactionHistory />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Waktu Pemesanan')).toBeInTheDocument();
      expect(screen.getByText('Jumlah Pesanan')).toBeInTheDocument();
      expect(screen.getByText('Detail Item')).toBeInTheDocument();
    });
  });
});
