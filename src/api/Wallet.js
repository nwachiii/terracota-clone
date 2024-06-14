import axios from '../utils/axiosInstance';
import { BaseURL_TWO, BaseURL_ONE, storeName } from '../constants/routes.js';

const token = typeof window !== 'undefined' && Boolean(localStorage.getItem('userToken')) ? localStorage.getItem('userToken') : undefined;

const BEARER_TOKEN = {
	headers: { Authorization: `Bearer ${token}` },
};

// GET REQUEST
export const fetchStoreWalletTxns = async () => {
	return await axios.get(`${BaseURL_TWO}/store/transactions/?store_name=${storeName}`, BEARER_TOKEN)
};
export const fetchSavedBankDetailsForWithdrawal = async () => {
	return await axios.get(`${BaseURL_TWO}/store/wallet_withdrawal/?accounts=true&store_name=${storeName}`, BEARER_TOKEN)
};
export const fetchSupportedBanks = async () => {
	return await axios.get(`${BaseURL_TWO}/store/wallet_withdrawal/?banks=true`, BEARER_TOKEN)
};
export const fetchVirtualAccountNumber = async () => {
	return await axios.get(`${BaseURL_TWO}/store/virtual-account/?store=${storeName}`, BEARER_TOKEN)
};
export const fetchWalletCurrentBalance = async () => {
	return await axios.get(`${BaseURL_TWO}/store/account-balance/?store=${storeName}`, BEARER_TOKEN)
};

// POST REQUEST
export const walletWithdrawal = (withdrawalPayload) => {
	return axios.post(`${BaseURL_TWO}/store/wallet_withdrawal/`, withdrawalPayload, BEARER_TOKEN);
};
export const makeeDepositToWallet = (depositPayload) => {
	return axios.post(`${BaseURL_TWO}/store/deposit/`, depositPayload, BEARER_TOKEN);
};
