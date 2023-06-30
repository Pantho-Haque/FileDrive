import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/authAPI';
// import { useServer } from '../server/server.context';
// import { getCookie } from '../lib/cookie';

export default function PrivateRoute() {
  const { me } = useAuth();
  
  if(!me){
    return <Navigate to="/login" />;
  }

  // const { GetMyDetails } = useServer();
  // const { loading, data } = GetMyDetails();
  
  // if (!currentUser) {
  //   return <Navigate to="/signin" />;
  // }
  // if (!currentUser.emailVerified) {
  //   alert('Verify your email first!');
  //   return <Navigate to="/signin" />;
  // }
  
  return <Outlet />;
}
