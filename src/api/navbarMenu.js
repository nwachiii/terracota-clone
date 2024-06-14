import axios from '../utils/axiosInstance';
import { BaseURL_TWO, BaseURL_ONE, STORENAMEFROMDOMAIN as storeName } from '../constants/routes.js';

const userToken = typeof window !== 'undefined' && localStorage.getItem('userToken');
// const store_name =
//   typeof window !== "undefined" &&
//   localStorage.getItem("storeDetails") &&
//   JSON?.parse(localStorage?.getItem("storeDetails"))["store_name"];

const BEARER_TOKEN = {
  headers: { Authorization: `Bearer ${userToken}` },
};

export const reportABug = async body => {
  return axios.post(`${BaseURL_ONE}/account/bug-report`, body, BEARER_TOKEN);
};

export const suggestAFeature = async body => {
  return axios.post(`${BaseURL_ONE}/account/suggestions`, body, BEARER_TOKEN);
};

export const getfeedbackHistory = async bundleId => {
  let response = [];

  await axios
    .get(
      `${BaseURL_ONE}/investment/feedback${bundleId ? `/${bundleId}` : `?store_name=${storeName}`}`,
      BEARER_TOKEN
    )
    .then(res => (response = res));
  return response;
};

export const fetchpendingInspectionFeedbaack = async status => {
  let response = [];
  await axios
    .get(
      `${BaseURL_ONE}/investment/scheduletour?store_name=${storeName && storeName
      }&pending_feedback=true`,
      BEARER_TOKEN
    )
    .then(res => (response = res));
  return response;
};

export const fetchInspectionFeedbaackDetails = async bundleId => {
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/investment/email_feedback/${bundleId}`)
    .then(res => (response = res));
  return response;
};

//post

export const feedback = async (body, bundleId) => {
  return axios.post(
    `${BaseURL_ONE}/investment/feedback${bundleId ? `/${bundleId}` : `?store_name=${storeName}`}`,
    body,
    BEARER_TOKEN
  );
};

export const feedbackEquity = async (body, bundleId) => {
  return axios.post(
    `${BaseURL_ONE}/investment/feedback?id=${bundleId}&store_name=${storeName}`,
    body,
    BEARER_TOKEN
  );
};

export const giveInspectionFeedback = async (body, bundleId) => {
  return axios.post(
    `${BaseURL_ONE}/investment/feedback?store_name=${storeName}&id=${bundleId}`,
    body,
    BEARER_TOKEN
  );
};

export const giveInspectionFeedbackForEmail = async (body, bundleId) => {
  return axios.post(
    `${BaseURL_TWO}/investment/email_feedback/${bundleId}?store_name=${storeName}`,
    body
  );
};

export const feedbackPurchase = async (body, id) => {
  return axios.post(`${BaseURL_ONE}/investment/feedback/${id}`, body, BEARER_TOKEN);
};
