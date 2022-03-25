import { AxiosResponse } from 'axios';

export const dummyGetDetailBookingResponse = {
  status: 200,
  message: 'success',
  data: {
    id: 1,
    date: '22 April 2022',
    start_time: '21:00',
    end_time: '23:00',
    capacity: 10,
    status: 2,
    total_price: 500000,
    total_price_ticket: 150000,
    total_price_item: 350000,
    created_at: '20 April 2022',
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
