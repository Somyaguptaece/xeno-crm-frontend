import axios from "axios";

const api = axios.create({
  baseURL: "https://xeno-crm-backend-aanz.onrender.com",
});

api.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => {

    return Promise.reject(
      error
    );

  }

);

api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (
      error.response?.status === 401
    ) {

      console.log("401 ignored");

    }

    return Promise.reject(
      error
    );

  }

);

export default api;