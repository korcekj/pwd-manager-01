import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { startSignOut } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/icons/logo-circle.svg';

import {
  HeaderContainer,
  LogoWrapper,
  NavContainer,
  NavLinkElement,
} from './header.styles';

const Header = ({ currentUser, startSignOut }) => {
  const renderActionButtons = () => {
    switch (currentUser) {
      case undefined:
        return;
      case null:
        return (
          <NavContainer>
            <NavLinkElement to='/' exact activeClassName='active'>
              Domov
            </NavLinkElement>
            <NavLinkElement to='/signin' activeClassName='active'>
              Prihlásiť
            </NavLinkElement>
          </NavContainer>
        );
      default:
        return (
          <NavContainer>
            <NavLinkElement to='/user' exact activeClassName='active'>
              Domov
            </NavLinkElement>
            <NavLinkElement as='div' to='' onClick={startSignOut}>
              Odhlásiť
            </NavLinkElement>
          </NavContainer>
        );
    }
  };

  return (
    <HeaderContainer>
      <LogoWrapper>
        <Link to='/'>
          <Logo />
        </Link>
      </LogoWrapper>
      {renderActionButtons()}
    </HeaderContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  startSignOut: () => dispatch(startSignOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
