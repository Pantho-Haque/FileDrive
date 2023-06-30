import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import { useToast } from '@chakra-ui/react';
import { getToken, removeToken, setToken } from '../lib/localstorage';
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const API_HOST = '/api';  // for backend public route
  // const API_HOST = 'http://127.0.0.1:8000/api';
  const toast = useToast();
  const statuses = {
    s: 'success',
    e: 'error',
    w: 'warning',
    i: 'info',
  };
  const tosting = (title, s) => {
    toast({
      title: title,
      status: statuses[s],
      isClosable: true,
      position: 'top',
    });
  };

  // const [responseLoading, setResponseLoading] = useState(false);
  const [me, setMe] = useState();
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_HOST}/me`, {
          headers: {
            
            Authorization: `Bearer ${getToken()}`,
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        setMe(response.data);
        setLoading(false);
      } catch (error) {
        setMe(false);
        setLoading(false);
        tosting(error?.response?.data?.message, 'e');
      }
    };
    if (getToken()) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [refetch]);

  const registerAPI = async (data, navigate, setRegistering) => {
    axios
      .post(`${API_HOST}/register`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        tosting(response.data.message, 's');
        setRegistering(false);
        navigate('/login');
      })
      .catch(error => {
        setRegistering(false);
        tosting(error?.response?.data?.message, 'e');
      });
  };

  const loginAPI = async (logData, setLogloading) => {
    axios
      .post(`${API_HOST}/login`, logData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        setToken(response.data.token);
        tosting(response.data.message, 's');
        setRefetch(!refetch);
        setLogloading(false);
      })
      .catch(error => {
        tosting(error?.response?.data?.message, 'e');
        setLogloading(false);
      });
  };

  const logoutAPI = setLogoutLoading => {
    axios
      .post(`${API_HOST}/logout`, '', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        removeToken();
        tosting(response.data.message, 's');
        window.location.reload();
      })
      .catch(error => {
        tosting(error?.response?.data?.message, 'e');
      });
    setLogoutLoading(false);
  };
  const updatenameemailAPI = data => {
    axios
      .post(`${API_HOST}/updatenameemail`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        tosting(response.data.message, 's');
      })
      .catch(error => {
        tosting(error?.response?.data?.message, 'e');
      });
    setRefetch(!refetch);
  };

  const changepassAPI = data => {
    axios
      .post(`${API_HOST}/changepassword`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        tosting(response.data.message, 's');
      })
      .catch(error => {
        tosting(error?.response?.data?.message, 'e');
      });
    setRefetch(!refetch);
  };

  const sendemailtoresetAPI = (data, setLoadingBtn) => {
    axios
      .post(`${API_HOST}/resetPassemailsend`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        tosting(response.data.message, 's');
        setLoadingBtn(false);
      })
      .catch(error => {
        tosting(error?.response?.data?.message, 'e');
        setLoadingBtn(false);
      });
  };

  const resetPasswordAPI = (pass, setSubmitting, gotoLogin) => {
    axios
      .post(`${API_HOST}/resetingPassword/`, pass, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        tosting(response.data.message, 's');
        setSubmitting(false);
        gotoLogin();
      })
      .catch(error => {
        tosting(error?.response?.data?.message, 'e');
        setSubmitting(false);
      });
  };

  const emailverificationAPI = async token => {
    try {
      const response = await axios.get(`${API_HOST}/emailverified/${token}`, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data.message;
    } catch (error) {
      tosting(error?.response?.data?.message, 'e');
    }
  };

  const value = {
    API_HOST,
    tosting,
    setRefetch,
    registerAPI,
    loginAPI,
    logoutAPI,
    me,
    updatenameemailAPI,
    changepassAPI,
    sendemailtoresetAPI,
    resetPasswordAPI,
    emailverificationAPI,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
