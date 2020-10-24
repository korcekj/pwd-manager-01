import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { selectError } from '../../redux/user/user.selectors';

import { startSignIn, clearError } from '../../redux/user/user.actions';
import {
  setMessage,
  hideMessage,
} from '../../redux/flash-message/flash-message.actions';

import { SignInContainer, ButtonsContainer, Title } from './sign-in.styles';

const SignIn = ({
  startSignIn,
  setMessage,
  clearError,
  hideMessage,
  error,
}) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { email, password } = credentials;

  useEffect(() => {
    if (error) {
      setMessage({
        message: error,
        type: 'error',
      });
      clearError();
    }
  }, [error, setMessage, clearError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    hideMessage();

    startSignIn(email, password);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <SignInContainer>
      <Title>I have already an account</Title>
      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          value={email}
          label='E-mail'
          handleChange={handleChange}
          required
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          label='Password'
          handleChange={handleChange}
          required
        />

        <ButtonsContainer>
          <CustomButton type='submit'>LOGIN</CustomButton>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startSignIn: (email, password) => dispatch(startSignIn({ email, password })),
  clearError: () => dispatch(clearError()),
  hideMessage: () => dispatch(hideMessage()),
  setMessage: (data) => dispatch(setMessage(data)),
});

const mapStateToProps = createStructuredSelector({
  error: selectError,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
