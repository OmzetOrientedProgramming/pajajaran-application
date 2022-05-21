import { cleanup } from '@testing-library/react';
import axios from 'axios';
import { headers } from '../../apis/constants';
import endpoint from '../../apis/endpoint';
import {
  getListItems,
  deleteItem,
  updateItem,
  createItem,
} from '../../apis/services/itemsService';
import {
  deleteItemParams,
  dummyDeleteItemResponse,
  dummyGetListItemsResponse,
  dummyUpdateItemResponse,
  getListItemsParams,
  mockDeleteItemResponse,
  mockGetListItemsResponse,
  mockUpdateItemResponse,
  updateItemsParams,
  mockCreateItemResponse,
  createItemsParams,
} from '../../__mocks__/apis/listItemsMocks';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('getListItems()', () => {
  test('getListItems works correctly', async () => {
    mockAxios.get.mockResolvedValueOnce(mockGetListItemsResponse);

    expect(mockAxios.get).not.toHaveBeenCalled();
    const data = await getListItems(getListItemsParams);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${endpoint.businessProfile}/list-items`,
      {
        headers: headers,
        params: {
          limit: getListItemsParams.limit,
          page: getListItemsParams.page,
        },
      }
    );
    expect(data.data).toEqual(dummyGetListItemsResponse);
  });
});

describe('deleteItem()', () => {
  test('deleteItem works successfully', async () => {
    mockAxios.delete.mockResolvedValueOnce(mockDeleteItemResponse);

    expect(mockAxios.delete).not.toHaveBeenCalled();
    const data = await deleteItem(deleteItemParams);

    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    expect(mockAxios.delete).toHaveBeenCalledWith(
      `${endpoint.businessProfile}/list-items/${deleteItemParams.item_id}`,
      { headers: headers }
    );
    expect(data.data).toEqual(dummyDeleteItemResponse);
  });
});

describe('updateItem()', () => {
  test('updateItem works successfully', async () => {
    mockAxios.put.mockResolvedValueOnce(mockUpdateItemResponse);

    expect(mockAxios.put).not.toHaveBeenCalled();
    const data = await updateItem(updateItemsParams);

    expect(mockAxios.put).toHaveBeenCalledTimes(1);
    expect(mockAxios.put).toHaveBeenCalledWith(
      `${endpoint.businessProfile}/list-items/${updateItemsParams.item_id}`,
      {
        name: updateItemsParams.name,
        description: updateItemsParams.description,
        image: updateItemsParams.image,
        price: updateItemsParams.price,
      },
      { headers: headers }
    );
    expect(data.data).toEqual(dummyUpdateItemResponse);
  });
});

describe('createItem()', () => {
  test('createItem works successfully', async () => {
    mockAxios.post.mockResolvedValueOnce(mockCreateItemResponse);

    expect(mockAxios.post).not.toHaveBeenCalled();
    const data = await createItem(createItemsParams);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      `${endpoint.businessProfile}/list-items`,
      {
        name: updateItemsParams.name,
        description: updateItemsParams.description,
        image: updateItemsParams.image,
        price: updateItemsParams.price,
      },
      { headers: headers }
    );
    expect(data.data).toEqual(dummyUpdateItemResponse);
  });
});
