import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';
import DetailBooking from '../../pages/booking/[id]';
import { mockGetDetailBookingResponse } from '../../__mocks__/apis/detailBookingMocks';
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
  test('sections title exist', async () => {
    mockAxios.get.mockResolvedValue(mockGetDetailBookingResponse);

    render(
      <ExampleWrapper>
        <DetailBooking />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Detail Booking')).toBeInTheDocument();
      expect(screen.getByText('Pesanan Tambahan')).toBeInTheDocument();
      expect(screen.getByText('Ringkasan')).toBeInTheDocument();
    });
  });

  test('back button', async () => {
    mockAxios.get.mockResolvedValue(mockGetDetailBookingResponse);

    render(
      <ExampleWrapper>
        <DetailBooking />
      </ExampleWrapper>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('back-button'));
    });
  });
});
