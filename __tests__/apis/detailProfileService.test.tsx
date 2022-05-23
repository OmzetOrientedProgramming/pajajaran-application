import { cleanup } from '@testing-library/react';
import axios from 'axios';
import { headers } from '../../apis/constants';
import endpoint from '../../apis/endpoint';
import { getDetailProfile } from '../../apis/services/detailProfileService';
import {
  dummyGetDetailProfileResponse,
  mockGetDetailProfileResponse,
} from '../../__mocks__/apis/profileBusinessAdminMocks';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('getDetailProfile()', () => {
  test('getDetailProfile works correctly', async () => {
    mockAxios.get.mockResolvedValueOnce(mockGetDetailProfileResponse);

    expect(mockAxios.get).not.toHaveBeenCalled();
    const data = await getDetailProfile();

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${endpoint.businessProfile}/detail`,
      { headers: headers }
    );
    expect(data.data).toEqual(dummyGetDetailProfileResponse);
  });
});
