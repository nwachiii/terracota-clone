import axios from 'axios';
import {createStandaloneToast} from '@chakra-ui/react';
import Router from 'next/router';
import {BaseURL_TWO, LoggedinUser} from '../constants/routes';

const toast = createStandaloneToast();

const axiosInstance = axios.create({
  baseURL: BaseURL_TWO,
  headers: {'Content-Type': 'application/json'},
  timeout: 30 * 60 * 1000,
});

axiosInstance.interceptors.request.use(
  async config => {
    const userToken = localStorage && localStorage.getItem('userToken');
    if (userToken) config.headers['Authorization'] = `Bearer ${userToken}`;

    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => Promise.resolve(response),
  error => {
    if (!error?.response) return Promise.reject(error);

    if (LoggedinUser && error?.response?.status === 401) {
      // toast({ title: "Access denied", status: "You are not authorized to view this page" });
      localStorage.clear();
      Router.push('/');
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
