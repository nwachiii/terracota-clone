import axios from "../utils/axiosInstance";
import { BaseURL_TWO, BaseURL_ONE, storeName } from "../constants/routes.js";

export const storeDetails = async () => {
  return await axios.get(`${BaseURL_TWO}/store/store_info/?store_name=${storeName}`)

};

// POST REQUEST
export const verifyMagicToken = async (token) => {
  return axios.post(`${BaseURL_TWO}/store/verify-magic-token/`, token);
};

export const AttemptLogin = async (data) => {
  return await axios.post(`${BaseURL_TWO}/store/login/`, data)
};

export const registerUser = async (data) => {
  return await axios.post(`${BaseURL_TWO}/store/customers/`, data)
};

export const outreach = async (data) => {
  return await axios.post(`${BaseURL_TWO}/developers/outreach`, data)
};

// agents

export const VerifyTokenAgents = async (data) => {
  return await axios.post(`${BaseURL_TWO}/store/verify-agent-token`, data)

};

export const agentLogin = async (data) => {
  return await axios.post(`${BaseURL_TWO}/store/agent-webstore`, data)
};

export const agentAccount = async (data) => {
  return await axios.post(`${BaseURL_ONE}/user/agent-login`, data)
};
