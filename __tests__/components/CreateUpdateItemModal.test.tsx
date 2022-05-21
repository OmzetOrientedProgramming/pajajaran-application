import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';
import { mockGetListItemsResponse } from '../../__mocks__/apis/listItemsMocks';
import ExampleWrapper from '../../__mocks__/pages/example';
import userEvent from '@testing-library/user-event';
import Item from '../../pages/profil/item';

jest.setTimeout(50000);

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

describe('create item modal behavior', () => {
  test('modal create pop up then click background closes modal', async () => {
    mockAxios.get.mockResolvedValue(mockGetListItemsResponse);

    render(
      <ExampleWrapper>
        <Item />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByAltText('PlusIcon')).toBeInTheDocument();

      fireEvent.click(screen.getByAltText('PlusIcon'));

      userEvent.click(screen.getByText('Daftar Item'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Tenda ABC')).toBeInTheDocument();
      expect(screen.queryByText('Batal')).not.toBeInTheDocument();
    });
  });

  test('modal create pop up then batal button closes modal', async () => {
    mockAxios.get.mockResolvedValue(mockGetListItemsResponse);

    render(
      <ExampleWrapper>
        <Item />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByAltText('PlusIcon')).toBeInTheDocument();

      fireEvent.click(screen.getByAltText('PlusIcon'));

      fireEvent.click(screen.getByText('Batal'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Tenda ABC')).toBeInTheDocument();
      expect(screen.queryByText('Batal')).not.toBeInTheDocument();
    });
  });
});

describe('update item modal behavior', () => {
  test('modal update pop up then click background closes modal', async () => {
    mockAxios.get.mockResolvedValue(mockGetListItemsResponse);

    render(
      <ExampleWrapper>
        <Item />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Tenda ABC')).toBeInTheDocument();
      expect(screen.getAllByText('Ubah')[0]).toBeInTheDocument();

      fireEvent.click(screen.getAllByText('Ubah')[0]);

      userEvent.click(screen.getByText('Daftar Item'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Tenda ABC')).toBeInTheDocument();
      expect(screen.queryByText('Batal')).not.toBeInTheDocument();
    });
  });

  test('modal update pop up then batal button closes modal', async () => {
    mockAxios.get.mockResolvedValue(mockGetListItemsResponse);

    render(
      <ExampleWrapper>
        <Item />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Tenda ABC')).toBeInTheDocument();
      expect(screen.getAllByText('Ubah')[0]).toBeInTheDocument();

      fireEvent.click(screen.getAllByText('Ubah')[0]);

      fireEvent.click(screen.getByText('Batal'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Tenda ABC')).toBeInTheDocument();
      expect(screen.queryByText('Batal')).not.toBeInTheDocument();
    });
  });
});
