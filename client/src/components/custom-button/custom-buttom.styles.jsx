import styled, { css } from 'styled-components';

const disabledStyle = css`
  cursor: not-allowed;
  opacity: 0.4;
`;

const buttonStyles = css`
  background-color: #00465f;
  color: white;
  border: 1px solid #00465f;

  &:hover {
    background-color: white;
    color: #00465f;
  }
`;

const invertedButtonStyles = css`
  background-color: white;
  color: #00465f;
  border: 1px solid #00465f;

  &:hover {
    background-color: #00465f;
    color: white;
  }
`;

const getButtonStyles = ({ inverted }) => {
  return inverted ? invertedButtonStyles : buttonStyles;
};

const getDisabledStyle = ({ disabled }) => {
  return disabled ? disabledStyle : '';
};

export const CustomButtonContainer = styled.button`
  display: inline-block;
  padding: 1em 2em;
  margin: ${({ margin }) => (margin ? margin : '')};
  font-size: 14px;
  font-weight: bolder;
  border-radius: 3px;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  outline: none;
  width: ${({ fullwidth }) => (fullwidth ? '100%' : 'auto')};
  position: relative;

  ${getButtonStyles}

  ${getDisabledStyle}
`;
