import axios from "../utils/axiosInstance";
import { BaseURL_TWO, BaseURL_ONE } from "../constants/routes.js";

const token =
  typeof window !== "undefined" && Boolean(localStorage.getItem("userToken"))
    ? localStorage.getItem("userToken")
    : undefined;

const BEARER_TOKEN = {
  headers: { Authorization: `Bearer ${token}` },
};

// GET REQUESTS
export const checkStoreNameAvailability = async (storeName) => {
  return await axios.get(
    `${BaseURL_TWO}/store/name/?name_to_check=${storeName}`,
    BEARER_TOKEN
  )
};

export const fetchStoreDetailsByDev = async () => {
  return await axios.get(`${BaseURL_TWO}/store/settings/`, BEARER_TOKEN)
};

export const fetchLogo = async () => {
  return await axios.get(`${BaseURL_TWO}/developers/compliance`, BEARER_TOKEN)
};

export const fetchStoreDetailsByUser = async (storeName) => {
  return await axios.get(`${BaseURL_TWO}/store/settings/?storeName=${storeName}`, BEARER_TOKEN)
};

export const fetchAllDomain = async (storeName) => {
  return await axios.get(`${BaseURL_TWO}/store/domains/`, BEARER_TOKEN)
};

export const fetchStoreWallet = async (storeName) => {
  return await axios.get(`${BaseURL_TWO}/store/wallet/?store=${storeName}`, BEARER_TOKEN).then((res) => (response = res));
};

// POST REQUEST
export const createStore = async (storeDetailsPayload) => {
  return await axios.post(`${BaseURL_TWO}/store/settings/`, storeDetailsPayload, BEARER_TOKEN)
};
