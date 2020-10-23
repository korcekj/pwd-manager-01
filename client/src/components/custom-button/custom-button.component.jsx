import React from 'react';

import { CustomButtonContainer } from './custom-buttom.styles';

const CustomButton = ({ children, ...props }) => {
  return <CustomButtonContainer {...props}>{children}</CustomButtonContainer>;
};

export default CustomButton;
