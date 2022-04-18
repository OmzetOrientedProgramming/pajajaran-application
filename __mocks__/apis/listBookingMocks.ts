import { AxiosResponse } from 'axios';

export const listBookingPaginationSuccessResponse = {
  status: 200,
  message: 'success',
  data: {
    pagination: {
      limit: 5,
      page: 1,
      first_url: 'string',
      last_url: 'string',
      next_url: 'string',
      previous_url: 'string',
      total_page: 6,
    },
    bookings: [
      {
        id: 0,
        name: 'mock_booking_name_0',
        capacity: 1,
        date: '2022-06-18T00:00:00Z',
        start_time: '0000-01-01T22:17:17Z',
        end_time: '0000-01-01T22:17:17Z',
      },
      {
        id: 1,
        name: 'mock_booking_name_1',
        capacity: 1,
        date: '2022-07-18T00:00:00Z',
        start_time: '0000-01-01T22:17:17Z',
        end_time: '0000-01-01T22:17:17Z',
      },
      {
        id: 2,
        name: 'mock_booking_name_2',
        capacity: 1,
        date: '2022-08-18T00:00:00Z',
        start_time: '0000-01-01T22:17:17Z',
        end_time: '0000-01-01T22:17:17Z',
      },
      {
        id: 3,
        name: 'mock_booking_name_3',
        capacity: 1,
        date: '2022-09-18T00:00:00Z',
        start_time: '0000-01-01T22:17:17Z',
        end_time: '0000-01-01T22:17:17Z',
      },
      {
        id: 4,
        name: 'mock_booking_name_4',
        capacity: 1,
        date: '2022-10-18T00:00:00Z',
        start_time: '0000-01-01T22:17:17Z',
        end_time: '0000-01-01T22:17:17Z',
      },
    ],
  },
};

export const mockedResponse: AxiosResponse = {
  data: listBookingPaginationSuccessResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const getParams = {
  state: 0,
  limit: 5,
  page: 1,
};
