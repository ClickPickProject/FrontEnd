import axios from 'axios';
import https from 'https';

export const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  baseURL: `https://${process.env.NEXT_PUBLIC_BACKEND_API_URL}`,
  // baseURL: `http://localhost:3000`,
  withCredentials: true,
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
