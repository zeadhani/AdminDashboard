import axios from "axios";
import { authActions } from "../store/authStore";
import store from "../store/store";
const authFetch = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

authFetch.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token").replace(/"/g, "") || "";
    request.headers["Authorization"] = `Bearer ${token}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(authActions.Logout());
    }
    return Promise.reject(error);
  }
);

export default authFetch;
