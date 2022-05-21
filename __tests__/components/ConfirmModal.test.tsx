import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';
import DetailBooking from '../../pages/booking/[id]';
import {
  mockGetDetailBookingBerhasilResponse,
  mockGetDetailBookingResponse,
} from '../../__mocks__/apis/detailBookingMocks';
import ExampleWrapper from '../../__mocks__/pages/example';
import userEvent from '@testing-library/user-event';

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

describe('confirm modal behavior', () => {
  test('confirmation terima then click background closes modal', async () => {
    mockAxios.get.mockResolvedValue(mockGetDetailBookingResponse);

    render(
      <ExampleWrapper>
        <DetailBooking />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Jumat, 22 April 2022')).toBeInTheDocument();
      expect(screen.getByText('Terima')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Terima'));

      userEvent.click(screen.getByText('Detail Booking'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Terima')).toBeInTheDocument();
      expect(screen.queryByText('Batal')).not.toBeInTheDocument();
    });
  });

  test('confirmation terima then batal button closes modal', async () => {
    mockAxios.get.mockResolvedValue(mockGetDetailBookingResponse);

    render(
      <ExampleWrapper>
        <DetailBooking />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Jumat, 22 April 2022')).toBeInTheDocument();
      expect(screen.getByText('Terima')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Terima'));

      fireEvent.click(screen.getByText('Batal'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Terima')).toBeInTheDocument();
    });
  });

  test('confirmation tolak then batal button closes modal', async () => {
    mockAxios.get.mockResolvedValue(mockGetDetailBookingResponse);

    render(
      <ExampleWrapper>
        <DetailBooking />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Jumat, 22 April 2022')).toBeInTheDocument();
      expect(screen.getByText('Tolak')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Tolak'));

      fireEvent.click(screen.getByText('Batal'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Tolak')).toBeInTheDocument();
    });
  });

  test('confirmation selesai then batal button closes modal', async () => {
    mockAxios.get.mockResolvedValue(mockGetDetailBookingBerhasilResponse);

    render(
      <ExampleWrapper>
        <DetailBooking />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Jumat, 22 April 2022')).toBeInTheDocument();
      expect(screen.getByText('Selesai')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Selesai'));

      fireEvent.click(screen.getByText('Batal'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Selesai')).toBeInTheDocument();
      expect(screen.queryByText('Batal')).not.toBeInTheDocument();
    });
  });

  test('confirmation selesai then batal click background closes modal', async () => {
    mockAxios.get.mockResolvedValue(mockGetDetailBookingBerhasilResponse);

    render(
      <ExampleWrapper>
        <DetailBooking />
      </ExampleWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Jumat, 22 April 2022')).toBeInTheDocument();
      expect(screen.getByText('Selesai')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Selesai'));

      userEvent.click(screen.getByText('Detail Booking'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Selesai')).toBeInTheDocument();
      expect(screen.queryByText('Batal')).not.toBeInTheDocument();
    });
  });
});
