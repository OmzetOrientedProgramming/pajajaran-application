import { AxiosResponse } from 'axios';

// Get Detail Booking
export const dummyGetDetailProfileResponse = {
  status: 200,
  message: 'string',
  data: {
    id: 1,
    name: 'Kafe Joko',
    image: 'test',
    address: 'Jl. Asep',
    description: 'Tempat makan favorit',
    open_hour: '08:00',
    close_hour: '19:00',
    booking_price: 10000,
    capacity: 100,
    min_slot: 1,
    max_slot: 5,
    min_interval_booking: 1,
    max_interval_booking: 3,
    average_rating: 4.7,
  },
};

export const mockGetDetailProfileResponse: AxiosResponse = {
  data: dummyGetDetailProfileResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

// Confirm Booking
export const dummyGetReviews = {
  status: 200,
  message: 'string',
  data: {
    pagination: {
      page: 5,
      limit: 1,
      first_url: 'string',
      last_url: 'string',
      next_url: 'string',
      previous_url: 'string',
      total_page: 5,
    },
    reviews: [
      {
        id: 0,
        name: 'mock_name_0',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-13 23:17:17.107',
      },
      {
        id: 1,
        name: 'mock_name_1',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-14 23:17:17.107',
      },
      {
        id: 2,
        name: 'mock_name_2',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-15 23:17:17.107',
      },
      {
        id: 3,
        name: 'mock_name_3',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-16 23:17:17.107',
      },
      {
        id: 4,
        name: 'mock_name_4',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-17 23:17:17.107',
      },
      {
        id: 5,
        name: 'mock_name_5',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-18 23:17:17.107',
      },
      {
        id: 6,
        name: 'mock_name_6',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-19 23:17:17.107',
      },
      {
        id: 7,
        name: 'mock_name_7',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-20 23:17:17.107',
      },
      {
        id: 8,
        name: 'mock_name_8',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-21 23:17:17.107',
      },
      {
        id: 9,
        name: 'mock_name_9',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-22 23:17:17.107',
      },
      {
        id: 10,
        name: 'mock_name_10',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-23 23:17:17.107',
      },
    ],
    total_review: 11,
  },
};

export const mockGetReviewsResponse: AxiosResponse = {
  data: dummyGetReviews,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const getReviewParams = {
  limit: 5,
  page: 1,
};
