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

jest.setTimeout(15000);

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
  console.error = jest.fn();
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

    expect(screen.getAllByText('Ubah')).not.toBeNull();
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

      const blob = new Blob([
        'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==',
      ]);
      const file = new File([blob], 'values.jpg', {
        type: 'image/png',
      });

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

      await userEvent.upload(screen.getByLabelText('Foto'), file);
      fireEvent.click(screen.getByTestId('create-update-confirm'));

      expect(screen.getAllByText('Ubah')).not.toBeNull();
    });
  });
});
