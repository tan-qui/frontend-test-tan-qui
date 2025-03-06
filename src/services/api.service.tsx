import axios, { AxiosRequestConfig } from "axios";
import { pathUrl } from "../data/path-url";
import { getNavigate } from "../navigate-service.";

const headers: any = {
  "Content-Type": "application/json",
  "Accept": "*",
}

const config: AxiosRequestConfig = {
  timeout: 50000,
  headers: headers
};

const apiInstance = axios.create(config);

// Add a request interceptor
apiInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const get = async (endpoint: any,) => {
  try {
    const res = await apiInstance.get(endpoint);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};


const post = async (endpoint: any, body: any) => {
  try {
    const res = await apiInstance.post(endpoint, body);
    return res.data;
  } catch (error: any) {
    let statusCode = error.response?.status;
    const navigate = getNavigate();
    if (statusCode === 500 || error.code === "ERR_NETWORK") {
      navigate(pathUrl.PAGE_500);
    }
    return Promise.reject(error);
  }
};

const upload = async (endpoint: any, body: any) => {
  try {
    const formData = new FormData();
    formData.append("file", body.file);
    formData.append("folder", body.folder || "common");
    delete config.headers?.["Content-Type"];
    const res = await apiInstance.postForm(endpoint, formData, config);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const serviceApi = {
  get,
  post,
  upload
};