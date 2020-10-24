import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

import { ReactComponent as LogoIcon } from '../../assets/icons/logo-circle.svg';

const spinnerStyle = css`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: 3px solid rgba(0, 75, 95, 0.4);
  border-top-color: #001c26;
  border-radius: 50%;
  animation: spin 1s infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3em;
  height: 80px;
  background: rgb(0, 70, 95);
  background: linear-gradient(
    90deg,
    rgba(0, 70, 95, 1) 0%,
    rgba(0, 70, 95, 0.6) 100%
  );
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 1.5em;
  position: relative;
`;

export const LogoLoadingSpinner = styled.div`
  ${({ loading }) => (loading ? spinnerStyle : '')}
`;

export const Logo = styled(LogoIcon)`
  height: 100%;
  width: 100%;
`;

export const LogoTitle = styled.h2`
  margin: 0;
  color: #fff;
  transition: color 0.1s ease-in-out;

  &:hover {
    color: #001c26;
  }
`;

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
`;

export const NavLinkElement = styled(NavLink)`
  color: #fff;
  position: relative;
  font-weight: bold;
  margin-right: 2em;
  transition: color 0.1s ease-in-out;
  cursor: pointer;

  &::before {
    content: '';
    opacity: 0;
    position: absolute;
    background-color: #fff;
    top: 50%;
    left: -1em;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    transform: translateY(-50%);
    transition: opacity 0.2s ease-in-out;
  }

  &.active {
    color: #001c26;
  }

  &.active::before {
    background-color: #001c26;
  }

  &.active::before {
    opacity: 1;
  }

  &:last-child {
    margin-right: 0;
  }

  &:hover,
  &:focus {
    color: #001c26;

    &.active::before {
      background-color: #001c26;
    }
  }
`;
