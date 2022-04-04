import { AxiosResponse } from 'axios';

export const dummyGetBalanceInformationResponse = {
    status: 200,
    message: "success",
    data: {
        "latest_disbursement_date": "2022-12-31T11:59:30Z",
        "balance": 2500000,
    },
};

export const mockGetBalanceInformationResponse: AxiosResponse = {
    data: dummyGetBalanceInformationResponse,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
};