import axios from "../utils/axiosInstance";
import { BaseURL_TWO, BaseURL_ONE } from "../constants/routes.js";

const userToken =
  typeof window !== "undefined" && localStorage.getItem("userToken");

const store_name =
  typeof window !== "undefined" &&
  localStorage.getItem("storeDetails") &&
  JSON?.parse(localStorage?.getItem("storeDetails"))["store_name"];

const BEARER_TOKEN = {
  headers: { Authorization: `Bearer ${userToken}` },
};

export const fetchNotifs = async () => {
  return await axios.get(`${BaseURL_TWO}/store/get_notify_store?notify=true&store=${store_name}`, BEARER_TOKEN)
};

export const fetchSpace = async () => {
  return await axios.get(`${BaseURL_TWO}/store/get_notify_store?space=true&store=${store_name}`, BEARER_TOKEN)
};

export const getMoreInfo = async (id) => {
  return await axios.get(`${BaseURL_TWO}/store/view_notification_data/${parseInt(id)}`, BEARER_TOKEN)
};

export const UpdateStatus = async (body) => {
  return axios.patch(`${BaseURL_TWO}/store/get_notify_store`, body, BEARER_TOKEN);
};

export const UpdateSingleNotif = async (body) => {
  const id = body.id;
  delete body.id;

  return axios.patch(`${BaseURL_TWO}/store/get_notify_store/${parseInt(id)}`, body, BEARER_TOKEN);
};

export const handleCoownerShipRequest = (requestId, body) => {
  return axios.post(`${BaseURL_TWO}/investment/co-own/respond/${parseInt(requestId)}/`, body, BEARER_TOKEN);
};
