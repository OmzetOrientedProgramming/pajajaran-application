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
import ProfilBisnis from '../../pages/profil';
import {
  mockGetDetailProfileResponse,
  mockGetReviewsResponse,
  getReviewParams,
} from '../../__mocks__/apis/profileBusinessAdminMocks';
import ExampleWrapper from '../../__mocks__/pages/example';

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

describe('useGetReview() & useGetDetailProfile', () => {
  test('page display data requested', async () => {
    mockAxios.get.mockResolvedValueOnce(mockGetReviewsResponse);
    mockAxios.get.mockResolvedValueOnce(mockGetDetailProfileResponse);

    render(
      <ExampleWrapper>
        <ProfilBisnis />
      </ExampleWrapper>
    );

    expect(mockAxios.get).toHaveBeenCalledTimes(2);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${endpoint.businessProfile}/review`,
      { headers: headers, params: getReviewParams }
    );
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${endpoint.businessProfile}/detail`,
      { headers: headers }
    );

    await waitFor(() => {
      expect(screen.getByText('Kafe Joko')).toBeInTheDocument();
      expect(screen.getByText('mock_name_0')).toBeInTheDocument();
    });
  });
});

describe('pagination', () => {
  test('previous page buttons work correctly', async () => {
    mockAxios.get.mockResolvedValueOnce(mockGetReviewsResponse);
    mockAxios.get.mockResolvedValueOnce(mockGetDetailProfileResponse);

    render(
      <ExampleWrapper>
        <ProfilBisnis />
      </ExampleWrapper>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('<'));
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(2);
  });

  test('page buttons work correctly', async () => {
    mockAxios.get.mockResolvedValueOnce(mockGetReviewsResponse);
    mockAxios.get.mockResolvedValueOnce(mockGetDetailProfileResponse);

    render(
      <ExampleWrapper>
        <ProfilBisnis />
      </ExampleWrapper>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('2'));
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(3);
  });

  test('next page buttons work correctly', async () => {
    mockAxios.get.mockResolvedValueOnce(mockGetReviewsResponse);
    mockAxios.get.mockResolvedValueOnce(mockGetDetailProfileResponse);

    render(
      <ExampleWrapper>
        <ProfilBisnis />
      </ExampleWrapper>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('>'));
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(3);
  });
});
