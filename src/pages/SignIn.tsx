// pages/SignupPage.tsx
import React from 'react';

import { AuthTemplate } from '../templates/AuthTemplate';
import { LoginForm } from '../organisms/SignInForm';

const SignupPage: React.FC = () => <AuthTemplate><LoginForm/></AuthTemplate>;

export default SignupPage;