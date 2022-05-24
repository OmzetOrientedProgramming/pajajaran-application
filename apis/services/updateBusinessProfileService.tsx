import axios from "axios";
import { headers } from "../constants";
import endpoint from "../endpoint";

export interface updateBusinessProfileParams {
    name: string;
    description: string;
}

export const updateBusinessProfile = async ({name, description,}: updateBusinessProfileParams) => {
    const options = {headers,};
    const data = {name: name, description: description};
    return await axios.put(`${endpoint.businessProfile}`, data, options);
};