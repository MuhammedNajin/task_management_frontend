// pages/SignupPage.tsx
import React from 'react';

import { AuthTemplate } from '../templates/AuthTemplate';
import { SignupForm } from '../organisms/SignUpForm';

const SignupPage: React.FC = () => <AuthTemplate><SignupForm /></AuthTemplate>;

export default SignupPage;