import { cleanup, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import TransactionHistory from '../../pages/transaction-history';
import { mockedResponse } from '../../__mocks__/apis/transactionHistoryMocks';
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
        <TransactionHistory />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Riwayat Transaksi')).toBeInTheDocument();
      expect(screen.getByText('<')).toBeInTheDocument();
      expect(screen.getByText('>')).toBeInTheDocument();
    });
  });
});
