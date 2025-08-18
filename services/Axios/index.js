"useClient"
import { message } from "antd";
import axios from "axios";
// import { messageConfiguration } from "../../utils";
const ApiService = axios.create({
  withCredentials: true,
baseURL : process.env.NEXT_PUBLIC_API_BASE_URL || "https://carauctionadmin.ezulix.com",
});
// Add a request interceptor
ApiService.interceptors.request.use(
  (config) => {
    // Add the timestamp to the headers of the API request
    config.headers["X-Timezone"] =
      Intl.DateTimeFormat().resolvedOptions().timeZone;
    return config;
  },
  (error) => {
    console.log(error);
    // Handle the error before the request is sent
    return Promise.reject(error);
  }
);


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Add a response interceptor
ApiService.interceptors.response.use(
  (response) => {
    return response;
  },
  async err => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return ApiService(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(process.env.REACT_APP_BASE_URL + '/api/admin/account/refresh', {}, {
          withCredentials: true
        });

        const newToken = res.data.data;
        localStorage.setItem('token', newToken);
        ApiService.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

        processQueue(null, newToken);
        return ApiService(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('token');
        window.location.href = '/'; // or logout()
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
  // error => {
  //   const { status } = error?.response;
  //   if (status && status === 401) {
  //     localStorage.clear();
  //     message.open(messageConfiguration("error", "Session Timeout ", 3));
  //     window.location.href = "/";
  //   }
  //   if (status && status >= 400 && status <= 500) {
  //     message.open(
  //       messageConfiguration("error", error.response.data.message, 3)
  //     );
  //   }
  // }
);

export default ApiService;
