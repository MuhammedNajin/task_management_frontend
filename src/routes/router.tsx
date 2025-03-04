import { createBrowserRouter } from 'react-router-dom';
import { Landing } from '../pages/Landing';
import SignInPage from '../pages/SignIn';
import SignUpPage from '../pages/SignUp';
import { Home } from '../pages/Home';
import AnalyticsPage from '../pages/Analytics';
import { ProtectedRoute } from './ProtectRoute';
import { AuthRedirect } from './AuthRedirect';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/signin",
    element:  <AuthRedirect> <SignInPage /> </AuthRedirect>
  },
  {
    path: "/signup",
    element:  <AuthRedirect> <SignUpPage /> </AuthRedirect>
  },
  {
    path: "/home",
    element:  <ProtectedRoute> <Home /> </ProtectedRoute>
  },
  {
    path: "/analytics",
    element:<ProtectedRoute > <AnalyticsPage /> </ProtectedRoute> 
  }
]);
