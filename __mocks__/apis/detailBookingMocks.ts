import { AxiosResponse } from 'axios';

// Get Detail Booking
export const dummyGetDetailBookingResponse = {
  status: 200,
  message: 'success',
  data: {
    id: 1,
    // date: '2022-04-22T00:00:00Z',
    date: '2022-04-22',
    // start_time: '0000-01-01T23:14:06Z',
    start_time: '18:00:00',
    // end_time: '0000-01-01T23:14:06Z',
    end_time: '18:30:00',
    capacity: 10,
    status: 0,
    total_price: 500000,
    total_price_ticket: 150000,
    total_price_item: 350000,
    created_at: '2022-04-22T00:00:00Z',
    items: [
      {
        name: 'Kopi Mocha Asik',
        image:
          'https://asset.winnetnews.com/image/cache/slide/post/image-kopi-mocha-bisa-tingkatkan-konsentrasi-daripada-kopi-biasa-loh-.jpg',
        qty: 10,
        price: 25000,
      },
      {
        name: 'Kacang Goreng',
        image:
          'https://asset.kompas.com/crops/9lQ0OMqPUCFReecNr0lCP8bJB-M=/128x85:1152x768/750x500/data/photo/2021/04/23/60826e8d1d256.jpg',
        qty: 10,
        price: 5000,
      },
    ],
  },
};

export const mockGetDetailBookingResponse: AxiosResponse = {
  data: dummyGetDetailBookingResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const getDetailBookingParams = {
  id: '1',
};

// Confirm Booking
export const dummyConfirmBookingResponse = {
  status: 200,
  message: 'success update booking status',
};

export const mockConfirmBookingResponse: AxiosResponse = {
  data: dummyConfirmBookingResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const confirmBookingParams = {
  id: '1',
  booking_status: 1,
};
