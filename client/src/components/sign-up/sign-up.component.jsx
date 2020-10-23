import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { selectError } from '../../redux/user/user.selectors';
import { startSignUp, clearError } from '../../redux/user/user.actions';
import { setMessage } from '../../redux/flash-message/flash-message.actions';

import { SignUpContainer, Title } from './sign-up-styles';

const SignUp = ({ startSignUp, setMessage, clearError, error }) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = credentials;

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

    if (password !== confirmPassword) {
      setMessage({
        message: 'Heslá sa nezhodujú',
        type: 'error',
      });
      return;
    }

    startSignUp(name, email, password);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <SignUpContainer>
      <Title>Chcem sa zaregistrovať</Title>
      <form onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='name'
          value={name}
          onChange={handleChange}
          label='Meno'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          label='E-mail'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          label='Heslo'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          label='Zopakuj heslo'
          required
        />
        <CustomButton type='submit'>ZAREGISTROVAŤ</CustomButton>
      </form>
    </SignUpContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startSignUp: (name, email, password) =>
    dispatch(startSignUp({ name, email, password })),
  clearError: () => dispatch(clearError()),
  setMessage: (data) => dispatch(setMessage(data)),
});

const mapStateToProps = createStructuredSelector({
  error: selectError,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
