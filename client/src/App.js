// Importovanie potrebnych packages
import React, { lazy, Suspense, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from './redux/user/user.selectors';
import { trySignIn } from './redux/user/user.actions';

import { GlobalStyles } from './global.styles';

// Importovanie React komponentov
import Header from './components/header/header.component';
import FlashMessage from './components/flash-message/flash-message.component';
import Spinner from './components/spinner/spinner.component';
import PublicRoute from './components/public-route/public-route.container';
import PrivateRoute from './components/private-route/private-route.container';

// Importovanie React komponentov
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const DashboardPage = lazy(() =>
  import('./pages/dashboard/dashboard.component')
);
const SignInAndSignUpPage = lazy(() =>
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')
);

const App = ({ trySignIn, currentUser }) => {
  useEffect(() => {
    trySignIn();
  }, [trySignIn]);

  return (
    <div>
      <GlobalStyles />
      <FlashMessage />
      <Header />
      {/* Zistenie aktualne prihlaseneho pouzivatela */}
      {currentUser === undefined ? (
        <Spinner />
      ) : (
        <Switch>
          <Suspense fallback={<Spinner />}>
            {/* Domovska stranka pre neprihlaseneho pouzivatela */}
            <PublicRoute
              exact
              path='/'
              isAuth={!!currentUser}
              component={HomePage}
            />
            {/* Prihlasovacia stranka pre pouzivatela */}
            <PublicRoute
              path='/signin'
              isAuth={!!currentUser}
              component={SignInAndSignUpPage}
            />
            {/* Domovska stranka pre prihlaseneho pouzivatela */}
            <PrivateRoute
              path='/user'
              isAuth={!!currentUser}
              component={DashboardPage}
            />
          </Suspense>
        </Switch>
      )}
    </div>
  );
};

// Vytiahnutie aktualnych dat z Store a poskytnutie ich komponentu ako parameter
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

// Poskytnutie funckii ako parameter komponentu pre aktualizaciu Store
const mapDispatchToProps = (dispatch) => ({
  trySignIn: () => dispatch(trySignIn()),
});

// Export App komponentu
export default connect(mapStateToProps, mapDispatchToProps)(App);
