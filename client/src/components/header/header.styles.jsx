import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3em;
  height: 80px;
  background: rgb(255, 241, 175);
  background: linear-gradient(
    90deg,
    rgba(255, 241, 175, 1) 0%,
    rgba(255, 241, 175, 1) 20%,
    rgba(255, 252, 236, 1) 100%
  );
`;

export const LogoWrapper = styled.div`
  width: 60px;
  margin-right: 1em;
`;

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
`;

export const NavLinkElement = styled(NavLink)`
  position: relative;
  font-weight: bold;
  margin-right: 2em;
  transition: color 0.2s ease-in-out;
  cursor: pointer;

  &::before {
    content: '';
    opacity: 0;
    position: absolute;
    background-color: #333;
    top: 50%;
    left: -15px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    transform: translateY(-50%);
    transition: opacity 0.2s ease-in-out;
  }

  &.active::before {
    opacity: 1;
  }

  &:last-child {
    margin-right: 0;
  }

  &:hover,
  &:focus {
    color: #00465f;

    &.active::before {
      background-color: #00465f;
    }
  }
`;
