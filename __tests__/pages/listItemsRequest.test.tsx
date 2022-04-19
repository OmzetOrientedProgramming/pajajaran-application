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
import ListItems from '../../pages/profil/item';
import { mockGetListItemsResponse } from '../../__mocks__/apis/listItemsMocks';
import ExampleWrapper from '../../__mocks__/pages/example';

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