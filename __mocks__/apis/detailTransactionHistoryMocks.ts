import { AxiosResponse } from "axios";

export const dummyGetDetailTransactionHistoryResponse = {
    status: 200,
    message: 'success',
    data: {
        customer_name: "Testing User Staging",
        customer_image: "",
        date: "2022-04-10",
        start_time: "08:00:00",
        end_time: "10:00:00",
        capacity: 4,
        total_price_item: 150000,
        items: [
            {
                name: "Kopi-kopi",
                qty: 12,
                price: 10000
            },
            {
                name: "Kopi-kopi",
                qty: 12,
                price: 10000
            },
            {
                name: "Kopi-kopi",
                qty: 12,
                price: 10000
            },
            {
                name: "Wowo Deluxe",
                qty: 10,
                price: 10000
            },
            {
                name: "Tenda Deluxe",
                qty: 10,
                price: 10000
            },
            {
                name: "Tenda Deluxe",
                qty: 10,
                price: 10000
            },
            {
                name: "Apa yaa",
                qty: 2,
                price: 25000
            }
        ]
    }
}

export const mockGetDetailTransactionHistoryResponse: AxiosResponse = {
    data: dummyGetDetailTransactionHistoryResponse,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
};

export const getDetailTransactionHistoryParams = {
    id: '32',
};