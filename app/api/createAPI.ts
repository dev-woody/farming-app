"use client" 

import { useRecoilValue } from "recoil";
import { TokenState } from "@/common/atom/loginState";

import axios from "axios";

const customAxios = axios.create({
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    validateStatus: false,
  },
});

const accessAxios = (() => {
  const tokenState = useRecoilValue(TokenState);
  return axios.create({
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${tokenState}`,
    validateStatus: false,
  },
})
  })()

export {customAxios, accessAxios}
