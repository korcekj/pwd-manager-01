import styled from 'styled-components';

import { CustomButtonContainer } from '../custom-button/custom-buttom.styles';

export const SignUpContainer = styled.div`
  width: 46%;
  display: flex;
  flex-direction: column;
  margin-left: 4%;

  @media screen and (max-width: 1000px) {
    & ${CustomButtonContainer} {
      width: 100%;
    }
  }
`;

export const Title = styled.h2`
  text-align: center;
  color: #00465f;
  padding-bottom: 1em;
  margin: 0;
  border-bottom: 2px solid #00465f;
`;
