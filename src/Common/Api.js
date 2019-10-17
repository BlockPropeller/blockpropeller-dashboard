import axios from 'axios';

import {API_BASE_URL} from "./constants";

const Api = axios.create({
    baseURL: `${API_BASE_URL}/api/v1`,
});

export default Api;
