import { cleanup, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import InformasiTransaksi from '../../pages/transaction-information/index';
import { mockGetBalanceInformationResponse } from '../../__mocks__/apis/balanceInformationMocks';
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
  test('get request fulfilled', async () => {
    mockAxios.get.mockResolvedValue(mockGetBalanceInformationResponse);

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

});
