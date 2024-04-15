'use client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastWrapper({ children }) {
  return (
    <>
      {children}
      <ToastContainer autoClose={2000} closeOnClick pauseOnFocusLoss={false} limit={3} />
    </>
  );
}
