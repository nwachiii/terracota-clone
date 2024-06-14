import axios from 'axios';
import {BaseURL_TWO, BUSINESS_ID} from '../constants/routes.js';

const token =
  typeof window !== 'undefined' && Boolean(localStorage.getItem('userToken'))
    ? localStorage.getItem('userToken')
    : undefined;

const BEARER_TOKEN = {
  headers: {Authorization: `Bearer ${token}`},
};

// initiate support
export const initiateSupport = body => {
  return axios.post(`${BaseURL_TWO}/supports/${BUSINESS_ID()}/initiate/`, body, BEARER_TOKEN);
};

// send new message
export const sendMessage = (support_id, body) => {
  return axios.post(`${BaseURL_TWO}/supports/chat/${support_id}/`, body, BEARER_TOKEN);
};

// fetch all chats in support
export const fetchSupportChats = async support_id => {
  let response = [];

  await axios
    .get(`${BaseURL_TWO}/supports/chat/${support_id}/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

// fetch events
export const fetchSupportEvents = async id => {
  let response = [];

  await axios
    .get(`${BaseURL_TWO}/supports/event/${id}/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

// get support initiation
export const getSupportInitiation = business_id => {
  return axios.get(`${BaseURL_TWO}/supports/${business_id}/initiate/`, BEARER_TOKEN);
};
