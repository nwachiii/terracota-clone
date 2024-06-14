import axios from "../utils/axiosInstance";
import { BaseURL_TWO, BaseURL_ONE } from "../constants/routes.js";

const token =
  typeof window !== "undefined" && Boolean(localStorage.getItem("userToken"))
    ? localStorage.getItem("userToken")
    : undefined;

const user =
  typeof window !== "undefined" && Boolean(localStorage.getItem("LoggedinUser"))
    ? JSON?.parse(localStorage.getItem("LoggedinUser"))
    : undefined;

const store_name =
  typeof window !== "undefined" && Boolean(localStorage.getItem("LoggedinUser"))
    ? JSON?.parse(localStorage.getItem("storeDetails"))["store_name"]
    : undefined;

const BEARER_TOKEN = {
  headers: { Authorization: `Bearer ${token}` },
};


export const fetchWatchlist = async () => {
  return await axios
    .get(
      `${BaseURL_ONE}/investment/watchlist/${user?.id}?store_name=${store_name}`,
      BEARER_TOKEN
    )
};

export const toggleWatchlist = async (propertyId) => {
  return await axios
    .post(
      `${BaseURL_ONE}/investment/watchlist/${propertyId}?store_name=${store_name}`,
      BEARER_TOKEN
    )
};
