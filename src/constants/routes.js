export const BaseURL_ONE = 'https://dev.matadortrust.com/v1';
export const BaseURL_TWO = 'https://dev.matadortrust.com/v2';

export const ROUTES = {};

export const EXTERNAL_ROUTES = {};

// export const BASE_ROUTE = "https://matadortrust.com";

const isEnvDev = process && process.env.NODE_ENV === 'development';

// export const STORE__DOMAIN = 'cherry.6787878.com';
export const STORE__DOMAIN = 'mainstoneltd.com';

export const STORENAMEFROMDOMAIN = 'mainstone';
// 'mainstone';

export const storeName = 'mainstone';
// 'mainstone';

export const appWindow = typeof window !== 'undefined' ? window : null;

export const LoggedinUser =
  appWindow &&
  localStorage.getItem('storeDetails') &&
  JSON?.parse(localStorage?.getItem('LoggedinUser'));

export const STORE =
  appWindow &&
  localStorage.getItem('storeDetails') &&
  JSON?.parse(localStorage?.getItem('storeDetails'));

export const BUSINESS_ID = () =>
  appWindow &&
  localStorage.getItem('businessId') !== 'undefined' &&
  JSON?.parse(localStorage.getItem('businessId'));
