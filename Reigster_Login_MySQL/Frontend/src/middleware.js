import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast } from "react-toastify";
export const checkToken = async () => {
  try {
    const response = await axios.get('/api/verify-token');  

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // console.error('Token verification failed', error);
    
    toast.error("Please login" ,{
      autoClose: 2000,
    });
    return false;
  }
};


export const checkAdmin = async () => {
  try {
    const response = await axios.get('/api/verify-admin');  
   
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // console.error('Token or role verification failed', error);
    toast.error("Only Admin!",{
      autoClose: 2000,
    });
    return false;
  }
};


export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const checkAndRedirect = async () => {
    const isTokenValid = await checkToken();
    if (!isTokenValid) {
      navigate('/login');
    }
  };

  checkAndRedirect();

  return children;
};


export const AdminRoute = ({ children }) => {
  const navigate = useNavigate();

  const checkAndRedirect = async () => {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      navigate('/');
    }
  };

  checkAndRedirect();

  return children;
};
