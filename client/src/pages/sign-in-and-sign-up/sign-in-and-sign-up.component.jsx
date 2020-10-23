import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import { SignUpAndSignInOverlay } from './sign-in-and-sign-up.styles';

const SignInAndSignUpPage = () => {
  return (
    <SignUpAndSignInOverlay>
      <SignIn />
      <SignUp />
    </SignUpAndSignInOverlay>
  );
};

export default SignInAndSignUpPage;
