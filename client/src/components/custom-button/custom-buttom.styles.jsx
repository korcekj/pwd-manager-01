import styled, { css } from 'styled-components';

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

const googleSignInStyles = css`
  background-color: #4285f4;
  color: white;
  border: 1px solid #4285f4;

  &:hover {
    color: #4285f4;
    background-color: white;
  }
`;

const getButtonStyles = (props) => {
  if (props.isGoogleSignIn) return googleSignInStyles;
  return props.inverted ? invertedButtonStyles : buttonStyles;
};

export const CustomButtonContainer = styled.button`
  display: inline-block;
  padding: 1em 2em;
  margin: ${({ margin }) => (margin ? margin : '')};
  font-size: 14px;
  font-weight: bolder;
  border-radius: 3px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  outline: none;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  width: ${({ fullwidth }) => (fullwidth ? '100%' : 'auto')};

  ${getButtonStyles}
`;
