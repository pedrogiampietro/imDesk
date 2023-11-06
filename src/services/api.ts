import axios from "axios";
import { auth } from "../constants/auth";
import { getStorageModel } from "../utils/storage";

let isRefreshing = false;
let failedRequestQueue = [];

const limit = 20;

export function apiClient() {
  const token = getStorageModel(auth.TOKEN);
  const restoreUser = getStorageModel(auth.USER);
  const user = JSON.parse(restoreUser);

  const api = axios.create({
    baseURL: "https://imdesk-api-production.up.railway.app",
    headers: {
      Authorization: `Bearer ${token}`,
      userId: user.userId,
      ContentType: "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  });

  api.interceptors.request.use(
    (request: any) => {
      if (request.method?.toLowerCase() === "get") {
        request.headers.limit = request.headers.limit ?? String(limit);
      }

      return request;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },

    (error) => {
      // console.log('error:', error.response);

      //TODO

      return Promise.reject(error);
    }
  );

  return api;
}
