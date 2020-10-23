import React from 'react';

import { HomePageOverlay, LinkTitle } from './homepage.styles';

const HomePage = () => {
  return (
    <HomePageOverlay>
      <LinkTitle to='/signin'>Sign in to manage your account</LinkTitle>
    </HomePageOverlay>
  );
};

export default HomePage;
