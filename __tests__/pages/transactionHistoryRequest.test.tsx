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
  mockedResponse,
  getParams,
} from '../../__mocks__/apis/transactionHistoryMocks';
import TransactionHistory from '../../pages/transaction-history';

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

describe('useGetTransactionHistory()', () => {
  test('page display data requested', async () => {
    mockAxios.get.mockResolvedValue(mockedResponse);

    render(
      <ExampleWrapper>
        <TransactionHistory />
      </ExampleWrapper>
    );

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${endpoint.transactionHistory}`,
      { headers: headers, params: getParams }
    );

    await waitFor(() => {
      expect(screen.getByText('18 April 2022')).toBeInTheDocument();
      expect(screen.getByText('test 1')).toBeInTheDocument();
    });
  });

  test('change page buttons work correctly', async () => {
    mockAxios.get.mockResolvedValue(mockedResponse);

    render(
      <ExampleWrapper>
        <TransactionHistory />
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
      fireEvent.click(screen.getByText('1'));
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(4);
  });
});
