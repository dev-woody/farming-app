import axios from "axios";
import Cookies from "js-cookie";

const access_token = JSON.parse(Cookies.get("access_token") || "null");

export const customAxios = axios.create({
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    validateStatus: false,
  },
});

export const accessAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${access_token}`,
    validateStatus: false,
  },
});