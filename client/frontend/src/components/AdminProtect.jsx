import React from 'react';
import { useCookies } from 'react-cookie';
import { Outlet} from 'react-router-dom';
import SignIn from '../pages/SignIn';

const AdminProtectComponent = () => {
  const [adminCookies] = useCookies(['admin_access_token']);

  return adminCookies.admin_access_token ? <Outlet /> : <SignIn/>;
};

export default AdminProtectComponent;
