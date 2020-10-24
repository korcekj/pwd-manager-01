import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { startSignOut } from '../../redux/user/user.actions';
import {
  selectCurrentUser,
  selectIsLoading,
} from '../../redux/user/user.selectors';

import {
  HeaderContainer,
  LogoContainer,
  LogoWrapper,
  NavContainer,
  NavLinkElement,
  Logo,
  LogoTitle,
  LogoLoadingSpinner,
} from './header.styles';

const Header = ({ currentUser, isLoading, startSignOut }) => {
  const renderActionButtons = () => {
    switch (currentUser) {
      case undefined:
        return;
      case null:
        return (
          <NavContainer>
            <NavLinkElement to='/' exact activeClassName='active'>
              Home
            </NavLinkElement>
            <NavLinkElement to='/signin' activeClassName='active'>
              Login
            </NavLinkElement>
          </NavContainer>
        );
      default:
        return (
          <NavContainer>
            <NavLinkElement to='/user' exact activeClassName='active'>
              Home
            </NavLinkElement>
            <NavLinkElement as='div' to='' onClick={startSignOut}>
              Logout
            </NavLinkElement>
          </NavContainer>
        );
    }
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoWrapper>
          <Link to='/'>
            <Logo />
          </Link>
          <LogoLoadingSpinner loading={isLoading} />
        </LogoWrapper>
        <Link to='/'>
          <LogoTitle>Pwd | Manager</LogoTitle>
        </Link>
      </LogoContainer>
      {renderActionButtons()}
    </HeaderContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoading: selectIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  startSignOut: () => dispatch(startSignOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
