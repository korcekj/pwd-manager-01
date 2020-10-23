import styled from 'styled-components';

import { SignInContainer } from '../../components/sign-in/sign-in.styles';
import { SignUpContainer } from '../../components/sign-up/sign-up-styles';

export const SignUpAndSignInOverlay = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 3em;
  max-width: 1100px;
  margin: 0 auto;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    padding: 3em 5em;

    & ${SignInContainer}, & ${SignUpContainer} {
      margin: 0 0 3em 0;
      width: 100%;
    }

    & ${SignUpContainer} {
      margin: 0;
    }
  }

  @media screen and (max-width: 550px) {
    padding: 3em;
  }
`;
