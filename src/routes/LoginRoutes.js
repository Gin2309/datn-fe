import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from '../layout/MinimalLayout';
const AuthLogin = Loadable(lazy(() => import('../pages/authentication/Login')));

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <AuthLogin />
    }
  ]
};

export default LoginRoutes;
