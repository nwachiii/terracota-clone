import axios from '../utils/axiosInstance';
import {BaseURL_TWO, BaseURL_ONE, storeName, BUSINESS_ID} from '../constants/routes.js';

const token =
  typeof window !== 'undefined' &&
  localStorage.getItem('devToken') !== 'undefined' &&
  JSON?.parse(localStorage.getItem('devToken'));

const BEARER_TOKEN = {
  headers: {Authorization: `Bearer ${token}`},
};

export const fetchDeveloperTerms = async querySting => {
  return await axios.get(`${BaseURL_TWO}/store/terms?store_name=${storeName && storeName}`);
};

export const fetchContactPerson = async contactid => {
  return await axios.get(`${BaseURL_TWO}/developers/contact_person/${contactid}`);
};

export const requestATour = async (data, listingid) => {
  return await axios.post(`${BaseURL_ONE}/investment/scheduletour/${listingid}`, data);
};

export const contactPerson = async (data, contactid) => {
  return await axios.post(`${BaseURL_TWO}/developers/contact_person/${contactid}`, data);
};

export const fetchProjectsWithFilters = async querySting => {
  return await axios.get(
    `${BaseURL_ONE}/investment/project?store_name=${storeName && storeName}` + '&' + querySting ??
      ''
  );
};
export const fetchProjectsById = async id => {
  return await axios.get(
    `${BaseURL_ONE}/investment/project/${parseInt(id)}?store_name=${storeName}`
  );
};

export const fetchFractionalInfo = async id => {
  return await axios.get(`${BaseURL_TWO}/developers/fractions/info/${parseInt(id)}`, BEARER_TOKEN);
};

export const fractionalEquityTransactionHistory = async equityId => {
  return await axios.get(
    `${BaseURL_TWO}/investment/fraction-history/?equity_id=${equityId}`,
    BEARER_TOKEN
  );
};

export const fetchUserEquity = async status => {
  return await axios.get(
    `${BaseURL_TWO}/investment/equity/?paymentStatus=${status}&store_name=${storeName && storeName}`
  );
};

export const fetchEquity = async equityId => {
  return await axios.get(
    `${BaseURL_TWO}/investment/equity/${equityId}/?store_name=${storeName && storeName}`,
    BEARER_TOKEN
  );
};

export const fetchOffers = async () => {
  return await axios.get(
    `${BaseURL_TWO}/investment/pending-equity-offers/?store_name=${storeName && storeName}`
  );
};
export const fetchAllUnits = async id => {
  return await axios.get(`${BaseURL_TWO}/investment/project-bundles/?project_id=${parseInt(id)}`);
};

export const fetchSavedFilters = async () => {
  return await axios.get(`${BaseURL_ONE}/investment/saved-project-filters`);
};

export const deleteSavedFilters = async id => {
  return axios.delete(`${BaseURL_ONE}/investment/saved-project-filters${id ? `/${id}` : ''}`);
};

export const fetchProjectDocument = async id => {
  return await axios.get(
    `${BaseURL_TWO}/developers/project-documents?project_id=${parseInt(id)}&purpose=brochure`
  );
};
export const fetchAllBundlePaymentPlan = async bundleId => {
  return await axios.get(
    `${BaseURL_TWO}/investment/bundle-paymentplans/?bundle_id=${parseInt(bundleId)}`
  );
};

export const fetchFractionalizedInfo = async bundleId => {
  return await axios.get(`${BaseURL_TWO}/developers/fractions/info/${parseInt(bundleId)}`);
};

//post request
export const saveFilters = async filterQuery => {
  return axios.post(`${BaseURL_ONE}/investment/saved-project-filters`, filterQuery);
};
export const requestPropeertyTour = async (body, id) => {
  return axios.post(`${BaseURL_ONE}/investment/scheduletour/${id}`, body);
};

export const contactAnAgent = async (body, id) => {
  return axios.post(`${BaseURL_TWO}/developer/add_contact/${id}?contact_agent=true`, body);
};

// AGENTS

export const getAllUpcomingPayment = async id => {
  return axios.get(`${BaseURL_ONE}/transaction/upcoming?equity=${id}`);
};

export const setRecurringPayment = async (body, id) => {
  return axios.patch(`${BaseURL_TWO}/investment/equity/${id}/`, body);
};

export const messageContactPerson = async body => {
  return axios.post(`${BaseURL_TWO}/store/contact_agent/`, body);
};

export const fetchForCustomerEquityValidation = async () => {
  return await axios.get(
    `${BaseURL_TWO}/investment/equity-validation/?business_id=${BUSINESS_ID()}`
  );
};

export const PostForCustomerEquityValidationoOrDispute = async body => {
  return axios.post(`${BaseURL_TWO}/investment/equity-validation/`, body);
};
