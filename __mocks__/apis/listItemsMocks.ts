import { AxiosResponse } from 'axios';

// Get List Items
export const dummyGetListItemsResponse = {
  status: 200,
  message: 'string',
  data: {
    pagination: {
      limit: 8,
      page: 1,
      first_url: 'string',
      last_url: 'string',
      next_url: 'string',
      previous_url: 'string',
      total_page: 4,
    },
    items: [
      {
        id: 1,
        name: 'Tenda ABC',
        image:
          'https://res.cloudinary.com/ruparupa-com/image/upload/w_360,h_360,f_auto,q_auto/f_auto,q_auto:eco/v1549301928/Products/10128311_1.jpg',
        price: 1000000,
        description: 'Kuat dan tahan lama. Kapasitas sekitar 4 - 5 orang',
      },
      {
        id: 2,
        name: 'Tenda T430',
        image:
          'https://contents.mediadecathlon.com/p1897277/k$e3d16eae384452d5c7f9fda2c95cf223/arpenaz-41-freshblack-tunnel-camping-tent-4-people-1-bedroom.jpg?&f=452x452',
        price: 2000000,
        description: 'Kuat dan tahan lama. Kapasitas sekitar 6 - 8 orang',
      },
      {
        id: 3,
        name: 'Tenda T430',
        image:
          'https://contents.mediadecathlon.com/p1897277/k$e3d16eae384452d5c7f9fda2c95cf223/arpenaz-41-freshblack-tunnel-camping-tent-4-people-1-bedroom.jpg?&f=452x452',
        price: 2000000,
        description: 'Kuat dan tahan lama. Kapasitas sekitar 6 - 8 orang',
      },
      {
        id: 4,
        name: 'Tenda T430',
        image:
          'https://contents.mediadecathlon.com/p1897277/k$e3d16eae384452d5c7f9fda2c95cf223/arpenaz-41-freshblack-tunnel-camping-tent-4-people-1-bedroom.jpg?&f=452x452',
        price: 2000000,
        description: 'Kuat dan tahan lama. Kapasitas sekitar 6 - 8 orang',
      },
      {
        id: 5,
        name: 'Tenda T430',
        image:
          'https://contents.mediadecathlon.com/p1897277/k$e3d16eae384452d5c7f9fda2c95cf223/arpenaz-41-freshblack-tunnel-camping-tent-4-people-1-bedroom.jpg?&f=452x452',
        price: 2000000,
        description: 'Kuat dan tahan lama. Kapasitas sekitar 6 - 8 orang',
      },
      {
        id: 6,
        name: 'Tenda T430',
        image:
          'https://contents.mediadecathlon.com/p1897277/k$e3d16eae384452d5c7f9fda2c95cf223/arpenaz-41-freshblack-tunnel-camping-tent-4-people-1-bedroom.jpg?&f=452x452',
        price: 2000000,
        description: 'Kuat dan tahan lama. Kapasitas sekitar 6 - 8 orang',
      },
    ],
  },
};

export const mockGetListItemsResponse: AxiosResponse = {
  data: dummyGetListItemsResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const getListItemsParams = {
  limit: 5,
  page: 1,
};

// Delete Item
export const dummyDeleteItemResponse = {
  status: 0,
  message: 'success',
};

export const mockDeleteItemResponse: AxiosResponse = {
  data: dummyDeleteItemResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const deleteItemParams = {
  item_id: '1',
};

// Update Item
export const dummyUpdateItemResponse = {
  status: 0,
  message: 'success',
};

export const mockUpdateItemResponse: AxiosResponse = {
  data: dummyUpdateItemResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const updateItemsParams = {
  item_id: '1',
  name: 'test name',
  description: 'test description',
  image: 'data:testimage',
  price: 1000.0,
};

// Create Item
export const dummyCreateItemResponse = {
  status: 0,
  message: 'success',
};

export const mockCreateItemResponse: AxiosResponse = {
  data: dummyUpdateItemResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const createItemsParams = {
  name: 'test name',
  description: 'test description',
  image: 'data:testimage',
  price: 1000.0,
};
