import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export const userAxios = axios.create({
  baseURL: baseURL + "/user",
  withCredentials: true,
});
export const productAxios = axios.create({
  baseURL: baseURL + "/product",
  withCredentials: true,
});
export const categoryAxios = axios.create({
  baseURL: baseURL + "/category",
  withCredentials: true,
});
export const cartAxios = axios.create({
  baseURL: baseURL + "/cart",
  withCredentials: true,
});
export const reviewAxios = axios.create({
  baseURL: baseURL + "/review",
  withCredentials: true,
});
export const orderAxios = axios.create({
  baseURL: baseURL + "/order",
  withCredentials: true,
});

export const axiosInstances = [
  userAxios,
  productAxios,
  categoryAxios,
  cartAxios,
  reviewAxios,
  orderAxios,
];
