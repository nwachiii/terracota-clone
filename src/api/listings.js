import axios from '../utils/axiosInstance';
import { useEffect } from 'react';
import { BaseURL_TWO, BaseURL_ONE, storeName } from '../constants/routes';

const userToken = typeof window !== 'undefined' && Boolean(localStorage.getItem('userToken')) ? localStorage.getItem('userToken') : undefined;


const BEARER_USER_TOKEN = {
	headers: { Authorization: `Bearer ${userToken}` },
};

// const storeName = typeof window !== 'undefined' && localStorage.getItem('storeDetails') && JSON?.parse(localStorage?.getItem('storeDetails'))['store_name'];
// const storeName = 'cherry';

// GET REQUESTS EXAMPLE
export const fetchAmenities = async () => {
	return await axios.get(`${BaseURL_ONE}/investment/amenity`, BEARER_USER_TOKEN)
};

export const fetchPaymentPlanDoc = async param => {
	return await axios.get(`${BaseURL_TWO}/developers/project-documents?${param}`, BEARER_USER_TOKEN)
};

export const fetchListings = async (querySting) => {
	return await axios.get(`${BaseURL_ONE}/investment/project?store_name=${storeName}` + '?' + querySting ?? '')
};

export const fetchListingStats = async () => {
	return await axios.get(`${BaseURL_ONE}/investment/data_stats`, BEARER_USER_TOKEN)
};
export const fetchAllListingBundles = async (projectId) => {
	return await axios.get(`${BaseURL_TWO}/investment/project-bundles/?project_id=${projectId}`, BEARER_USER_TOKEN)
};
export const fetchAllArchivedUnits = async (projectId) => {
	return await axios.get(`${BaseURL_TWO}/developers/archive/${projectId}`, BEARER_USER_TOKEN)
};
export const fetchListingTxns = async (projectId) => {
	return await axios.get(`${BaseURL_ONE}/transaction/project/${projectId}/`, BEARER_USER_TOKEN)
};
export const fetchDocument = async (projectId, purpose) => {
	return await axios.get(`${BaseURL_TWO}/developers/project-documents?project=${projectId}&purpose=${purpose}`, BEARER_USER_TOKEN)
};

export const fetchAllBundlePaymentPlan = async (bundleId) => {
	return await axios.get(`${BaseURL_TWO}/investment/bundle-paymentplans/?bundle_id=${bundleId}`, BEARER_USER_TOKEN)
};
export const fetchFractionalizedInfo = async (bundleId) => {
	return await axios.get(`${BaseURL_TWO}/developers/fractions/info/${bundleId}`, BEARER_USER_TOKEN)
};


// POST REQUESTS

export const addListingDocument = (projectId, body) => {
	return axios.post(`${BaseURL_TWO}/developers/project-documents?project=${projectId}`, body, BEARER_USER_TOKEN);
};
export const addAmenitiesToProject = (projectId, body) => {
	return axios.post(`${BaseURL_TWO}/developers/add-project-amenities/${projectId}/`, body, BEARER_USER_TOKEN);
};
export const addUnitsToArchive = (bundleId, body) => {
	return axios.patch(`${BaseURL_TWO}/developers/archive/${bundleId}`, body, BEARER_USER_TOKEN);
};
export const publishProject = (body) => {
	return axios.post(`${BaseURL_TWO}/developers/publish-project/`, body, BEARER_USER_TOKEN);
};
export const scheduleInspection = (body) => {
	return axios.post(`${BaseURL_ONE}/investment/scheduletour/${projectId}`, body, BEARER_USER_TOKEN);
};
export const CreateCustomerEquity = (body) => {
	return axios.post(`${BaseURL_TWO}/developers/equity/`, body, BEARER_USER_TOKEN);
};

export const calculateTotalFractions = (body) => {
	return axios.post(`${BaseURL_TWO}/developers/fractions `, body, BEARER_USER_TOKEN);
};

export const createFractions = (body) => {
	return axios.post(`${BaseURL_TWO}/developers/fractions`, body, BEARER_USER_TOKEN);
};

