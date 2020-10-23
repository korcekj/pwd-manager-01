import React, { lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/spinner/spinner.component';
import PrivateRoute from '../../components/private-route/private-route.container';

import { DashboardOverlay } from './dashboard.styles';

// const ModulesPage = lazy(() => import('../modules/modules.container'));

const DashboardPage = ({ match }) => {
  return (
    <DashboardOverlay>
      <Suspense fallback={<Spinner />}>
        {/* <PrivateRoute path={match.path} exact component={ModulesPage} /> */}
      </Suspense>
    </DashboardOverlay>
  );
};

export default DashboardPage;
