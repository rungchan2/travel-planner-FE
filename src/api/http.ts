import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "@/pages/TravelList";

const DEFAULT_TIMEOUT = 30000;

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};


export const createClient = (config?: AxiosRequestConfig) => {
  const token = getToken();

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

const httpClient = createClient();

type RequestMethod = "get" | "post" | "put" | "delete";

export const requestHandler = async <T>(
  method: RequestMethod,
  url: string,
  payload?: T
) => {
  let response;

  switch (method) {
    case "get":
      response = await httpClient.get(url);
      break;
    case "post":
      response = await httpClient.post(url, payload);
      break;
    case "put":
      response = await httpClient.put(url, payload);
      break;
    case "delete":
      response = await httpClient.delete(url);
      break;
  }

  return response.data;
};
