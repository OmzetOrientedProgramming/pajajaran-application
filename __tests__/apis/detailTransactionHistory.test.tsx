import { cleanup } from "@testing-library/react";
import axios from "axios";
import { headers } from "../../apis/constants";
import endpoint from "../../apis/endpoint";
import { getDetailTransactionHistory } from "../../apis/services/detailTransactionHistoryService";
import { dummyGetDetailTransactionHistoryResponse, getDetailTransactionHistoryParams, mockGetDetailTransactionHistoryResponse } from "../../__mocks__/apis/detailTransactionHistoryMocks";


jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('getDetailTransactionHistory()', () => {
    test('getDetailTransactionHistory works correctly', async () => {
      mockAxios.get.mockResolvedValueOnce(mockGetDetailTransactionHistoryResponse);
  
      expect(mockAxios.get).not.toHaveBeenCalled();
      const data = await getDetailTransactionHistory(getDetailTransactionHistoryParams);
  
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(mockAxios.get).toHaveBeenCalledWith(
        `${endpoint.transactionHistory}/${getDetailTransactionHistoryParams.id}`,
        { headers: headers }
      );
      expect(data.data).toEqual(dummyGetDetailTransactionHistoryResponse);
    });
});
  