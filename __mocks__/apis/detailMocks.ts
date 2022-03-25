import { AxiosResponse } from 'axios';

export const dummyGetDetailBookingResponse = {
  status: 200,
  message: 'success',
  data: {
    id: 1,
    date: '22 Oktober 2022',
    start_time: '21:00',
    end_time: '23:00',
    capacity: 10,
    status: 2,
    total_price: 400000,
    total_price_ticket: 100000,
    total_price_item: 300000,
    created_at: '26 Oktober 2022',
    items: [
      {
        name: 'Kopi Mocha Asik',
        image:
          'https://asset.winnetnews.com/image/cache/slide/post/image-kopi-mocha-bisa-tingkatkan-konsentrasi-daripada-kopi-biasa-loh-.jpg',
        qty: 5,
        price: 25000,
      },
      {
        name: 'Kacang Goreng',
        image:
          'https://asset.kompas.com/crops/9lQ0OMqPUCFReecNr0lCP8bJB-M=/128x85:1152x768/750x500/data/photo/2021/04/23/60826e8d1d256.jpg',
        qty: 10,
        price: 5000,
      },
      {
        name: 'Kacang Rebus',
        image:
          'https://asset.kompas.com/crops/9lQ0OMqPUCFReecNr0lCP8bJB-M=/128x85:1152x768/750x500/data/photo/2021/04/23/60826e8d1d256.jpg',
        qty: 12,
        price: 6000,
      },
      {
        name: 'Kacang Mentah',
        image:
          'https://asset.kompas.com/crops/9lQ0OMqPUCFReecNr0lCP8bJB-M=/128x85:1152x768/750x500/data/photo/2021/04/23/60826e8d1d256.jpg',
        qty: 3,
        price: 1000,
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
