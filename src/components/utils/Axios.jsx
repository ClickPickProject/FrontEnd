import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `http://${process.env.NEXT_PUBLIC_BACKEND_API_URL}`,
  withCredentials: true,
  headers: {
    Cookie: 'name=refresh;',
  },
});

function setHeader(key, value) {
  axiosInstance.defaults.headers.common[key] = value;
}

function removedHeader(key) {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }
  delete axiosInstance.defaults.headers.common[key];
}

export { setHeader, removedHeader };
