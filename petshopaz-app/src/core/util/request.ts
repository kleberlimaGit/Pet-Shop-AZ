import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:8080';
const UF_URL = 'https://servicodados.ibge.gov.br'

export const makeRequest = (params: AxiosRequestConfig) => {
    return axios({
        ...params,
        baseURL:BASE_URL
    })
}

export const makeRequestUF = (params:AxiosRequestConfig) => {
    return axios({
        ...params,
        baseURL:UF_URL
    })
}