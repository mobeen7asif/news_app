import React, { useEffect } from "react";
import Header from "./Elements/Header";
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    // Add a response interceptor
    axios.interceptors.response.use(
      (response) => {
        // Handle successful responses
        if (response.data && response.data.message) {
          // toast.success(response.data.message);
        }
        return response;
      },
      (error) => {
        // Handle errors
        const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
        toast.error(errorMessage);
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <AppRoutes />
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
