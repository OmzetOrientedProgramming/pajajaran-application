import { cleanup, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ProfilBisnis from '../../pages/profil';
import {
  mockGetDetailProfileResponse,
  mockGetReviewsResponse,
} from '../../__mocks__/apis/profileBusinessAdminMocks';
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
    mockAxios.get.mockResolvedValueOnce(mockGetReviewsResponse);
    mockAxios.get.mockResolvedValueOnce(mockGetDetailProfileResponse);

    render(
      <ExampleWrapper>
        <ProfilBisnis />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Ulasan(11)')).toBeInTheDocument();
      expect(screen.getByText('<')).toBeInTheDocument();
      expect(screen.getByText('>')).toBeInTheDocument();
    });
  });
});
