import React from 'react';

import { HomePageOverlay, LinkTitle } from './homepage.styles';

const HomePage = () => {
  return (
    <HomePageOverlay>
      <LinkTitle to='/signin'>Title of the page</LinkTitle>
    </HomePageOverlay>
  );
};

export default HomePage;
