import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:8080';

export const makeRequest = (params: AxiosRequestConfig) => {
    return axios({
        ...params,
        baseURL:BASE_URL
    })
}