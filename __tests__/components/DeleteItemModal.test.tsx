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

describe('delete item modal behavior', () => {
  test('confirmation hapus then click background closes modal', async () => {
    mockAxios.get.mockResolvedValue(mockGetListItemsResponse);

    render(
      <ExampleWrapper>
        <Item />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Tenda ABC')).toBeInTheDocument();
      expect(screen.getAllByText('Hapus')[0]).toBeInTheDocument();

      fireEvent.click(screen.getAllByText('Hapus')[0]);

      userEvent.click(screen.getByText('Daftar Item'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Tenda ABC')).toBeInTheDocument();
      expect(screen.queryByText('Batal')).not.toBeInTheDocument();
    });
  });

  test('confirmation hapus then batal button closes modal', async () => {
    mockAxios.get.mockResolvedValue(mockGetListItemsResponse);

    render(
      <ExampleWrapper>
        <Item />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Tenda ABC')).toBeInTheDocument();
      expect(screen.getAllByText('Hapus')[0]).toBeInTheDocument();

      fireEvent.click(screen.getAllByText('Hapus')[0]);

      fireEvent.click(screen.getByText('Batal'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Tenda ABC')).toBeInTheDocument();
      expect(screen.queryByText('Batal')).not.toBeInTheDocument();
    });
  });
});
