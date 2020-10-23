import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './spinner.styles';

const Spinner = props => (
  <SpinnerOverlay {...props}>
    <SpinnerContainer />
  </SpinnerOverlay>
);

export default Spinner;
