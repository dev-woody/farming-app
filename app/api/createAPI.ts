// "use client"

import axios from "axios";
import {cookies } from 'next/headers'
// const access_token = cookies().get('ACCESS_TOKEN');

export const customAxios = axios.create({
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    validateStatus: false,
  },
});

export const accessAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${access_token}`,
    validateStatus: false,
  },
});
