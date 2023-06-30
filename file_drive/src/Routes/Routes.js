import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute.jsx';
import PrivateRoute from './PrivetRoute.jsx';

import Dashboard from '../Pages/Dashboard.jsx';
import Login from '../Pages/Auth/Login.jsx';
import Register from '../Pages/Auth/Register.jsx';
import Error from '../Pages/Error.jsx';
import NotAdmin from '../Pages/admin/NotAdmin.jsx';
import Admin from '../Pages/admin/DashboardAdmin.jsx';
import PasswordReset from '../components/PasswordReset.jsx';
import Emailverified from '../Pages/Auth/Emailverified.jsx';

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/api/resetngpassword/:token" element={<PasswordReset/>} />
          <Route path="/api/verifypass/:token" element={<Emailverified/>} />

          {/* <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        <Route path="/auth" element={<EmailAndPass />} /> */}
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/not-an-admin" element={<NotAdmin />} />
          <Route path="/admin" element={<Admin />} />

          {/* <Route path="/aboutyou" element={<AboutYou />} /> */}

          {/* <Route path="/" element={<Dashboard />} />
          <Route path="/Routine" element={<Routine />} />
          <Route path="/Links" element={<Link />} />
          <Route path="/Notices" element={<Notice />} />
          <Route path="/Peoples" element={<People />} /> */}
          {/* <Route path="/CR-Options" element={<CROption />}>
            <Route path="routineManagement" element={<RoutineManagement />} />
            <Route path="scheduleChanges" element={<ScheduleChanges />} />
            <Route path="verification" element={<h1>Verification</h1>} />
            <Route
              path="blockAndUnblock"
              element={<BlockAndUnblock/> }
            />
            <Route path="addAndRemoveCr" element={<AddAndRemoveCr />} />
            <Route path="addAndRemoveLink" element={<AddAndRemoveLink />} />
            <Route path="addAndRemoveNotice" element={<AddAndRemoveNotice />} />
          </Route> */}
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
