import styled, { css } from 'styled-components';

const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
`;

export const GroupContainer = styled.div`
  position: relative;
  margin: 2.5em 0;

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;

const getShrink = ({ shrink }) => (shrink ? shrinkLabelStyles : '');

export const FormInputLabel = styled.label`
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  ${getShrink}
`;

export const FormInputContainer = styled.input`
  background-color: white;
  font-size: 18px;
  padding: 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid #333;
  outline: none;

  &:focus ~ ${FormInputLabel} {
    ${shrinkLabelStyles}
  }
`;
