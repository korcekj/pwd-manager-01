import styled from 'styled-components';

import { CustomButtonContainer } from '../custom-button/custom-buttom.styles';

export const SignInContainer = styled.div`
  width: 46%;
  display: flex;
  flex-direction: column;
  margin-right: 4%;
`;

export const Title = styled.h2`
  text-align: center;
  color: #00465f;
  padding-bottom: 1em;
  margin: 0;
  border-bottom: 2px solid #00465f;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    justify-content: space-between;

    & ${CustomButtonContainer} {
      width: 100%;
      margin-bottom: 1em;
    }
  }
`;
