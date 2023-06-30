import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authAPI';
// import { getCookie } from '../lib/cookie';
// import { useAuth } from '../server/auth.context';

export default function PublicRoute() {
  const { me } = useAuth();

  if(me){
    return <Navigate to="/" />;
  }

  // if(currentUser){
  //   if (currentUser.emailVerified && getCookie("ccm")) {
  //     return <Navigate to="/" />;
  //   }
  // }

  return <Outlet />;
}
