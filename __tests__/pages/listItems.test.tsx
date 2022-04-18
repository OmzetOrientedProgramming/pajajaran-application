import { cleanup, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
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

describe('ui components', () => {
  test('important title and button exist', async () => {
    mockAxios.get.mockResolvedValue(mockGetListItemsResponse);

    render(
      <ExampleWrapper>
        <ListItems />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Daftar Item')).toBeInTheDocument();
      expect(screen.getByText('Tenda ABC')).toBeInTheDocument();
      expect(screen.getAllByText('Ubah')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Hapus')[0]).toBeInTheDocument();
    });
  });
});
