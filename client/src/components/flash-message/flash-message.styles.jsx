import styled, { css } from 'styled-components';

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

const slideDownStyles = css`
  animation: slideDown 0.2s forwards;

  @keyframes slideDown {
    100% {
      transform: translateY(0%);
    }
  }
`;

const slideUpStyles = css`
  animation: slideUp 0.2s forwards;

  @keyframes slideUp {
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(-100%);
    }
  }
`;

const types = {
  error: '#E34040',
  success: '#27AD3C',
  info: '#1E6984'
};

const getColor = ({ type }) => {
  return types[type] || types.info;
};

const getAnimationSlide = ({ hidden, disabled }) => {
  if (disabled) return;
  return hidden ? slideUpStyles : slideDownStyles;
};

export const FlashMessageContainer = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1em 2em;
  background-color: ${getColor};
  z-index: 20;
  transform: translateY(-100%);

  ${getAnimationSlide}
`;

export const FlashMessageText = styled.span`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CloseButton = styled(CloseIcon)`
  width: 14px;
  height: 14px;
  margin-left: 1em;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  & > g > path {
    fill: white;
  }
`;
