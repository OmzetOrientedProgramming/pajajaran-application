import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { headers } from '../../apis/constants';
import endpoint from '../../apis/endpoint';
import { updateItem } from '../../apis/services/itemsService';
import ListItems from '../../pages/profil/item';
import {
  createItemsParams,
  deleteItemParams,
  mockCreateItemResponse,
  mockDeleteItemResponse,
  mockGetListItemsResponse,
  mockUpdateItemResponse,
  updateItemsParams,
} from '../../__mocks__/apis/listItemsMocks';
import ExampleWrapper from '../../__mocks__/pages/example';

jest.setTimeout(30000);

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

beforeAll(() => {
  console.warn = jest.fn();
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('useGetListItems()', () => {
  test('useGetListItems is called correctly', async () => {
    mockAxios.get.mockResolvedValueOnce(mockGetListItemsResponse);
    expect(mockAxios.get).not.toHaveBeenCalled();

    render(
      <ExampleWrapper>
        <ListItems />
      </ExampleWrapper>
    );

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${endpoint.businessProfile}/list-items`,
      {
        headers: headers,
        params: {
          limit: 8,
          page: 1,
        },
      }
    );

    await waitFor(() => {
      expect(screen.getByText('Tenda ABC')).toBeInTheDocument();
    });
  });
});

describe('pagination', () => {
  test('change page buttons work correctly', async () => {
    mockAxios.get.mockResolvedValue(mockGetListItemsResponse);

    render(
      <ExampleWrapper>
        <ListItems />
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
      fireEvent.click(screen.getByText('3'));
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(4);
  });

  test('change page button limit works correctly', async () => {
    mockAxios.get.mockResolvedValue(mockGetListItemsResponse);

    render(
      <ExampleWrapper>
        <ListItems />
      </ExampleWrapper>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('>'));
      fireEvent.click(screen.getByText('>'));
      fireEvent.click(screen.getByText('>'));
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(2);

    await waitFor(() => {
      fireEvent.click(screen.getByText('<'));
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(3);
  });
});

describe('useDeleteItem()', () => {
  test('useDeleteItem is called correctly', async () => {
    mockAxios.delete.mockResolvedValueOnce(mockDeleteItemResponse);
    expect(mockAxios.delete).not.toHaveBeenCalled();

    render(
      <ExampleWrapper>
        <ListItems />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Tenda ABC')).toBeInTheDocument();

      fireEvent.click(screen.getAllByText('Hapus')[0]);

      fireEvent.click(screen.getByTestId('hapus-confirm'));
    });

    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    expect(mockAxios.delete).toHaveBeenCalledWith(
      `${endpoint.businessProfile}/list-items/${deleteItemParams.item_id}`,
      { headers: headers }
    );
  });
});

describe('useCreateItem()', () => {
  test('useCreateItem is called correctly', async () => {
    mockAxios.post.mockResolvedValueOnce(mockCreateItemResponse);
    expect(mockAxios.post).not.toHaveBeenCalled();

    render(
      <ExampleWrapper>
        <ListItems />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByAltText('PlusIcon')).toBeInTheDocument;
    });

    const blob = new Blob(['test input']);
    const file = new File([blob], 'values.jpg', {
      type: 'image/png',
    });

    await waitFor(() => {
      userEvent.click(screen.getByAltText('PlusIcon'));

      fireEvent.input(screen.getByLabelText('Nama'), {
        target: { value: createItemsParams.name },
      });
      fireEvent.input(screen.getByLabelText('Deskripsi'), {
        target: { value: createItemsParams.description },
      });
      fireEvent.input(screen.getByLabelText('Harga'), {
        target: { value: createItemsParams.price },
      });
      userEvent.upload(screen.getByLabelText('Foto'), file);

      fireEvent.click(screen.getByTestId('create-update-confirm'));
    });

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      `${endpoint.businessProfile}/list-items`,
      {
        name: createItemsParams.name,
        description: createItemsParams.description,
        image: null,
        price: createItemsParams.price,
      },
      { headers: headers }
    );
  });
});

describe('useUpdateItem()', () => {
  test('useUpdateItem is called correctly', async () => {
    mockAxios.put.mockResolvedValueOnce(mockUpdateItemResponse);
    expect(mockAxios.put).not.toHaveBeenCalled();

    render(
      <ExampleWrapper>
        <ListItems />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Tenda ABC')).toBeInTheDocument();
    });

    const blob = new Blob(['test input']);
    const file = new File([blob], 'values.jpg', {
      type: 'image/png',
    });

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Ubah')[0]);

      fireEvent.input(screen.getByLabelText('Nama'), {
        target: { value: updateItemsParams.name },
      });
      fireEvent.input(screen.getByLabelText('Deskripsi'), {
        target: { value: updateItemsParams.description },
      });
      fireEvent.input(screen.getByLabelText('Harga'), {
        target: { value: updateItemsParams.price },
      });
      userEvent.upload(screen.getByLabelText('Foto'), file);

      fireEvent.click(screen.getByTestId('create-update-confirm'));
    });

    expect(mockAxios.put).toHaveBeenCalledTimes(1);
    expect(mockAxios.put).toHaveBeenCalledWith(
      `${endpoint.businessProfile}/list-items/${updateItemsParams.item_id}`,
      {
        name: updateItemsParams.name,
        description: updateItemsParams.description,
        image:
          'https://res.cloudinary.com/ruparupa-com/image/upload/w_360,h_360,f_auto,q_auto/f_auto,q_auto:eco/v1549301928/Products/10128311_1.jpg',
        price: updateItemsParams.price,
      },
      { headers: headers }
    );
  });
});
