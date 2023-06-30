
import axios from "axios";
import { getToken } from "./localstorage";


let token = getToken();
console.log(token)

export const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        'Content-Type': 'application/json',
      Accept: "application/json",
     
    },
  });
export const publicreq = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        'Content-Type': 'application/json',
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });