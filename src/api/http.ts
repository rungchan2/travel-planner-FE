import axios, { AxiosRequestConfig } from "axios";
// import { BASE_URL } from "@/pages/TravelList";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DEFAULT_TIMEOUT = 30000;

export const getToken = () => {
  let token = "";
  const googleInfos = localStorage.getItem("google-infos");
  const justToken = localStorage.getItem("token");
  if (googleInfos) {
    token = JSON.parse(googleInfos).stsTokenManager.accessToken;
  }

  return { token, justToken };
};


export const createClient = (config?: AxiosRequestConfig) => {
  const { token } = getToken();
  console.log("tokenzzzzzz", token);

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
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
