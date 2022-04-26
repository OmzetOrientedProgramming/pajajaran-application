import { AxiosResponse } from 'axios';

export const transactionHistoryPaginationSuccessResponse = {
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
      total_page: 5,
    },
    transactions: [
      {
        id: 1,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 1',
        price: 100000,
        date: '2022-04-18T00:00:00Z',
      },
      {
        id: 2,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 2',
        price: 100000,
        date: '2022-04-19T00:00:00Z',
      },
      {
        id: 3,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 3',
        price: 100000,
        date: '2022-04-20T00:00:00Z',
      },
      {
        id: 4,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 4',
        price: 100000,
        date: '2022-04-21T00:00:00Z',
      },
      {
        id: 5,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 5',
        price: 100000,
        date: '2022-04-22T00:00:00Z',
      },
      {
        id: 6,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 6',
        price: 100000,
        date: '2022-04-23T00:00:00Z',
      },
      {
        id: 7,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 7',
        price: 100000,
        date: '2022-04-24T00:00:00Z',
      },
      {
        id: 8,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 8',
        price: 100000,
        date: '2022-04-25T00:00:00Z',
      },
      {
        id: 9,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 9',
        price: 100000,
        date: '2022-04-26T00:00:00Z',
      },
      {
        id: 10,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 10',
        price: 100000,
        date: '2022-04-27T00:00:00Z',
      },
      {
        id: 11,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 11',
        price: 100000,
        date: '2022-04-28T00:00:00Z',
      },
      {
        id: 12,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 12',
        price: 100000,
        date: '2022-04-29T00:00:00Z',
      },
      {
        id: 13,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 13',
        price: 100000,
        date: '2022-04-30T00:00:00Z',
      },
      {
        id: 14,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 14',
        price: 100000,
        date: '2022-05-18T00:00:00Z',
      },
      {
        id: 15,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 15',
        price: 100000,
        date: '2022-06-18T00:00:00Z',
      },
      {
        id: 16,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 16',
        price: 100000,
        date: '2022-07-18T00:00:00Z',
      },
      {
        id: 17,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 17',
        price: 100000,
        date: '2022-08-18T00:00:00Z',
      },
      {
        id: 18,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 18',
        price: 100000,
        date: '2022-09-18T00:00:00Z',
      },
      {
        id: 19,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 19',
        price: 100000,
        date: '2022-10-18T00:00:00Z',
      },
      {
        id: 20,
        image:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
        name: 'test 20',
        price: 100000,
        date: '2022-11-18T00:00:00Z',
      },
    ],
  },
};

export const mockedResponse: AxiosResponse = {
  data: transactionHistoryPaginationSuccessResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const getParams = {
  limit: 5,
  page: 1,
};
