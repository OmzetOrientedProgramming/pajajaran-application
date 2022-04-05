// Base URL based on environment variable
export const baseUrl = `${process.env.NEXT_PUBLIC_API_URL!}/api/v1`; // staging URL
export const baseUrlMock = `${process.env.NEXT_PUBLIC_API_URL_MOCK!}/api/v1`; // mock stoplight URL
export const localURL = `${process.env.NEXT_PUBLIC_API_URL_LOCAL!}/api/v1`;

const endpoint = {
  // Add more URL endpoints to request here
  example: `${baseUrlMock}/example`,
  detailBooking: `${baseUrl}/business-admin/booking`,
  listBooking: `${baseUrl}/business-admin`,
  balanceInformation: `${baseUrl}/business-admin/balance`,
  login: `${baseUrl}/auth/business-admin/login`,
};

export default endpoint;
