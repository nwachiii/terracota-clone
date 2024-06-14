import axios from '../utils/axiosInstance';
import { BaseURL_TWO, BaseURL_ONE, storeName } from '../constants/routes.js';

const token = typeof window !== 'undefined' && Boolean(localStorage.getItem('userToken')) ? localStorage.getItem('userToken') : undefined;

const BEARER_TOKEN = {
	headers: { Authorization: `Bearer ${token}` },
};

export const fetchUnitAllocations = async (unit_id) => {
	return await axios.get(`${BaseURL_TWO}/developers/allocations/?unit_id=${unit_id}`, BEARER_TOKEN).then((res) => res);
};
export const fetchUnitAllocationImages = async (unit_id) => {
	return await axios.get(`${BaseURL_TWO}/developers/allocation-images?unit=${unit_id}`, BEARER_TOKEN).then((res) => res);
};


export const addAllocationToEquity = async (allocationPayload) => {
	return await axios.post(`${BaseURL_TWO}/developers/allocate/`, allocationPayload, BEARER_TOKEN).then((res) => res);
};
