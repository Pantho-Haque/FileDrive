import axios from 'axios';
import React, { useContext } from 'react';
import { getToken } from '../lib/localstorage';
import { useAuth } from './authAPI';
const DataContext = React.createContext();
export function useData() {
  return useContext(DataContext);
}
export function DataProvider({ children }) {
  const { tosting, setRefetch, API_HOST } = useAuth();

  const uploadfilesAPI = (
    data,
    setUploading,
    onClose,
    setFilename,
    setFile
  ) => {
    axios
      .post(`${API_HOST}/uploadfile`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        tosting(response.data.message, 's');
        setRefetch(prev => !prev);
        setUploading(false);
        onClose();
        setFilename('');
        setFile();
      })
      .catch(error => {
        tosting(error.response.data.message, 'e');
        setUploading(false);
      });
  };

  const createFolderAPI = data => {
    axios
      .post(`${API_HOST}/createfolder`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        tosting(response.data.message, 's');
        console.log(response.data);
        setRefetch(prev => !prev);
      })
      .catch(error => {
        tosting(error.response.data.message, 'e');
      });
  };

  const folderListAPI = async () => {
    try {
      const response = await axios.get(`${API_HOST}/folders`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      tosting(error.response.data.message, 'e');
    }
  };

  const fileListAPI = async () => {
    try {
      const response = await axios.get(`${API_HOST}/files`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      tosting(error.response.data.message, 'e');
    }
  };
  const deletefileAPI = async id => {
    try {
      const response = await axios.delete(`${API_HOST}/deletefile/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      tosting(response.data.message, 's');
      setRefetch(prev => !prev);
    } catch (error) {
      tosting(error.response.data.message, 'e');
    }
  };

  const deletefolderAPI = async id => {
    try {
      const response = await axios.delete(`${API_HOST}/deletefolder/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      tosting(response.data.message, 's');
      setRefetch(prev => !prev);
    } catch (error) {
      tosting(error.response.data.message, 'e');
    }
  };

  const filesoffolderAPI = async id => {
    try {
      const response = await axios.get(`${API_HOST}/filesoffolder/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      tosting(error.response.data.message, 'e');
    }
  };

  const allusersAPI = async () => {
    try {
      const response = await axios.get(`${API_HOST}/users`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      tosting(error.response.data.message, 'e');
    }
  };
  const usersearchAPI = async str => {
    try {
      const response = await axios.get(`${API_HOST}/users/search/${str}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      tosting(error.response.data.message, 'e');
    }
  };

  const allAdminsAPI = async () => {
    try {
      const response = await axios.get(`${API_HOST}/admins`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      tosting(error.response.data.message, 'e');
    }
  };
  const setresetadminAPI = async (id, setSelecteduser, setAsAdminLoading) => {
    try {
      const response = await axios.get(`${API_HOST}/setresetadmin/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      tosting(response.data.message, 's');
      setRefetch(prev => !prev);
      setSelecteduser(response.data.user);
      setAsAdminLoading(false);
    } catch (error) {
      console.log(error);
      tosting(error.response.data.message, 'e');
      setAsAdminLoading(false);
    }
  };
  const useractivationAPI = async (
    id,
    setSelecteduser,
    setActivationLoading,
    setdeactivatingaccount
  ) => {
    try {
      const response = await axios.get(`${API_HOST}/useractivation/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      tosting(response.data.message, 's');
      setRefetch(prev => !prev);
      setSelecteduser(response.data.user);
      setActivationLoading(false);
      setdeactivatingaccount(false);
    } catch (error) {
      tosting(error.response.data.message, 'e');
      setActivationLoading(false);
      setdeactivatingaccount(false);
    }
  };
  const graphAPI = async () => {
    try {
      const response = await axios.get(`${API_HOST}/graph`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      tosting(error.response.data.message, 'e');
    }
  };
  const resettheaccountAPI = async (
    id,
    setSelecteduser,
    setReseting,
    onClose
  ) => {
    try {
      const response = await axios.get(`${API_HOST}/resettheuser/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      tosting(response.data.message, 's');
      setRefetch(prev => !prev);
      setSelecteduser(response.data.user);
      setReseting(false);
      onClose();
    } catch (error) {
      tosting(error.response.data.message, 'e');
      setReseting(false);
    }
  };

  const bugfeedbackAPI = (data, setSubmitting, setText, onClose) => {
    axios
      .post(`${API_HOST}/bugfeedback`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        tosting(response.data.message, 's');
        setRefetch(prev => !prev);
        setSubmitting(false);
        setText('');
        onClose();
      })
      .catch(error => {
        tosting(error.response.data.message, 'e');
        setSubmitting(false);
      });
  };

  const getallbugsfeedbacksAPI = async () => {
    try {
      const response = await axios.get(`${API_HOST}/getallbugsfeedbacks`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      tosting(error.response.data.message, 'e');
    }
  };
  const value = {
    folderListAPI,
    fileListAPI,
    filesoffolderAPI,
    allusersAPI,
    resettheaccountAPI,
    usersearchAPI,
    allAdminsAPI,
    setresetadminAPI,
    useractivationAPI,
    graphAPI,
    uploadfilesAPI,
    createFolderAPI,
    deletefileAPI,
    deletefolderAPI,
    bugfeedbackAPI,
    getallbugsfeedbacksAPI,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
