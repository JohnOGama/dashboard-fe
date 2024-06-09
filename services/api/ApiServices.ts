import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
// import { toast } from 'react-toastify';

const API_ROOT = "https://staging-api.strateji.co";
// 'http://staging222.ap-southeast-2.elasticbeanstalk.com'
// 'http://localhost:8080'
// || process.env.API_ENDPOINT;

const NOT_FOUND_ERROR_MESSAGES = ["Not Found", "report not found"];

const handleErrors = (error: AxiosError, errorMessage?: string) => {
  const data: { message?: string } = error?.response?.data || { message: "" };
  const status = error?.response?.status;
  if (
    errorMessage &&
    typeof window !== "undefined" &&
    !NOT_FOUND_ERROR_MESSAGES.includes(data?.message || "")
  ) {
    // toast.warn(errorMessage, { position: 'top-center' });
    console.log("errorMessage: ", errorMessage);
  }
  return {
    status,
    data,
    error: true,
  };
};

const handleResponse = (res: AxiosResponse) => {
  return {
    ...res?.data,
  };
};

const createApi = () => {
  let headers: any = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  // @ts-ignore
  let AUTH_TOKEN = JSON.parse(localStorage.getItem("Auth"))?.state?.token;
  if (AUTH_TOKEN) {
    headers.Authorization = `Bearer ${AUTH_TOKEN}`;
  }

  const api = axios.create({
    baseURL: API_ROOT,
    timeout: 1200000,
    headers,
  });

  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const { status } = error.response;

      return Promise.reject(error);
    }
  );

  return api;
};

export const requests = {
  get: (url: string, errorMessage?: string) =>
    createApi()
      .get(`${API_ROOT}${url}`)
      .then(handleResponse)
      .catch((error) => handleErrors(error, errorMessage)),
  post: (url: string, data?: any, errorMessage?: string) =>
    createApi()
      .post(`${API_ROOT}${url}`, data)
      .then(handleResponse)
      .catch((error) => handleErrors(error, errorMessage)),
  put: (url: string, data: any, errorMessage?: string) =>
    createApi()
      .put(`${API_ROOT}${url}`, data)
      .then(handleResponse)
      .catch((error) => handleErrors(error, errorMessage)),
  delete: (url: string, errorMessage?: string) =>
    createApi()
      .delete(`${API_ROOT}${url}`)
      .then(handleResponse)
      .catch((error) => handleErrors(error, errorMessage)),
};
