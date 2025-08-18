"useClient"
import ApiService from "./Axios";

export const getHeaders = (requireAuth = true) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":"Origin",
    'ngrok-skip-browser-warning': '69420',
  };
  if (requireAuth) {
    const accessToken = `Bearer ${(
      localStorage.getItem("token")
    )}`;
    headers.Authorization = `${accessToken}`;
  }
  return headers;
};

export const getBufferHeaders = (requireAuth = true) => {
  const headers = {
    "responseType": "arraybuffer",
    "Content-Type": "application/pdf",
    "Accept":"*/*"
  };
  if (requireAuth) {
    const accessToken = `Bearer ${JSON.parse(
      localStorage.getItem("access_token")
    )}`;
    headers.Authorization = `${accessToken}`;
  }
  return headers;
};

export const Get = (url, requireAuth = true) =>
  ApiService.get(url, { headers: getHeaders(requireAuth) });

export const GetBuffer = (url, requireAuth = true) =>
  ApiService.get(url, { headers: getBufferHeaders(requireAuth) });

export const Post = (url, data, requireAuth = true) =>
  ApiService.post(url, data, { headers: getHeaders(requireAuth) });

export const Patch = (url, data, requireAuth = true) =>
  ApiService.patch(url, data, { headers: getHeaders(requireAuth) });

export const Delete = (url, requireAuth = true) =>
  ApiService.delete(url, { headers: getHeaders(requireAuth) });

export const Put = (url, data, requireAuth = true) =>
  ApiService.put(url, data, { headers: getHeaders(requireAuth) });

export const getAPIUrl = (url, params = "") => {
  return url + `${params}`;
};
export const PostFormData = (url, data, requireAuth = true) =>
  ApiService.post(url, data, {
    headers: {
      ...getHeaders(requireAuth),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  export const PostMultipart = (url, data, requireAuth = true) =>
  ApiService.post(url, data, {
    headers: {
      ...(requireAuth
        ? {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          }
        : {}),

    },
  });



  export const PutFormData = (url, data, requireAuth = true) =>
    ApiService.put(url, data, {
      headers: {
        ...getHeaders(requireAuth),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
export const getErrors = (error) => {
  const errorData = error.response.data.error;
  const errors = {};
  Object.keys(errorData).forEach((key) => {
    errors[key] = errorData[key];
  });
  return errors;
};
